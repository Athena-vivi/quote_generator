// ESV API utility for batch scripture queries
// https://api.esv.org/docs/

export interface Verse {
  reference: string
  content: string
}

// ESV API key from environment
const ESV_API_KEY = process.env.ESV_API_KEY || ""
const ESV_API_BASE = "https://api.esv.org/v3/passage/text/"

/**
 * Clean scripture text - remove extra whitespace and formatting
 */
function cleanScriptureText(text: string): string {
  return text
    // Replace multiple spaces with single space
    .replace(/\s+/g, " ")
    // Remove leading/trailing whitespace
    .trim()
}

/**
 * Fetch a single passage from ESV API
 */
export async function fetchESVPassage(reference: string): Promise<Verse> {
  const params = new URLSearchParams({
    q: reference,
    "include-headings": "false",
    "include-footnotes": "false",
    "include-verse-numbers": "false",
    "include-short-copyright": "false",
    "include-passage-references": "false",
  })

  const response = await fetch(`${ESV_API_BASE}?${params}`, {
    headers: {
      Authorization: `Token ${ESV_API_KEY}`,
    },
    next: { revalidate: 86400 }, // Cache for 24 hours
  })

  if (!response.ok) {
    throw new Error(`ESV API error: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()

  return {
    reference,
    content: cleanScriptureText(text),
  }
}

/**
 * Fetch multiple passages from ESV API in a single batch request
 * ESV API supports semicolon-separated passages
 * Returns an array of verses in the same order as the input references
 */
export async function fetchESVPassages(references: string[]): Promise<Verse[]> {
  if (references.length === 0) return []

  // If only one reference, use single fetch
  if (references.length === 1) {
    return [await fetchESVPassage(references[0])]
  }

  // Split into batches of 10 (ESV API recommended limit per request)
  const batchSize = 10
  const batches: string[][] = []

  for (let i = 0; i < references.length; i += batchSize) {
    batches.push(references.slice(i, i + batchSize))
  }

  // Fetch all batches in parallel
  const allResults: Verse[] = []

  for (const batch of batches) {
    // Join references with semicolon for batch request
    const query = batch.join(";")

    const params = new URLSearchParams({
      q: query,
      "include-headings": "false",
      "include-footnotes": "false",
      "include-verse-numbers": "false",
      "include-short-copyright": "false",
      "include-passage-references": "true", // Include reference separators
    })

    const response = await fetch(`${ESV_API_BASE}?${params}`, {
      headers: {
        Authorization: `Token ${ESV_API_KEY}`,
      },
      next: { revalidate: 86400 }, // Cache for 24 hours
    })

    if (!response.ok) {
      throw new Error(`ESV API error: ${response.status} ${response.statusText}`)
    }

    // ESV returns raw text - need to parse it
    // Format: passages are separated by double newlines, with reference like "John 3:16" before each
    const text = await response.text()

    // Split by double newlines to get individual passages
    const rawPassages = text.split(/\n\s*\n/)

    // Parse each passage
    for (let i = 0; i < rawPassages.length; i++) {
      const rawPassage = rawPassages[i]

      // Split into lines
      const lines = rawPassage.split("\n").map(line => line.trim()).filter(Boolean)

      // Find the content (skip the reference line if present)
      // ESV puts the reference as the first line like "John 3:16" or "John 3:16-17"
      let contentStartIndex = 0

      for (let j = 0; j < lines.length; j++) {
        const line = lines[j]
        // Check if this line looks like a reference (contains "chapter:verse" pattern)
        // Example: "John 3:16", "Psalm 23:1-3"
        const isReferenceLine = /^\d*\s*\w+\s+\d+:\d+/.test(line)

        if (!isReferenceLine && contentStartIndex === 0) {
          // Found first non-reference line - this is content
          contentStartIndex = j
          break
        }
      }

      // Extract content from this point
      const contentLines = lines.slice(contentStartIndex)

      // If we couldn't find proper content (maybe reference wasn't on its own line), use all lines
      const finalContent = contentLines.length > 0
        ? contentLines.join(" ")
        : lines.join(" ")

      const cleanContent = cleanScriptureText(finalContent)

      if (cleanContent) {
        allResults.push({
          reference: batch[i] || references[allResults.length],
          content: cleanContent,
        })
      }
    }
  }

  return allResults
}

/**
 * Fetch verses for a theme using batch API calls
 */
export async function fetchThemeVerses(references: string[]): Promise<Verse[]> {
  try {
    return await fetchESVPassages(references)
  } catch (error) {
    console.error("Failed to fetch theme verses:", error)

    // Return fallback verses on error
    return references.map(ref => ({
      reference: ref,
      content: "Loading scripture...", // Fallback text
    }))
  }
}
