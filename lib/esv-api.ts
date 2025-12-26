// ESV API utility for batch scripture queries
// https://api.esv.org/docs/

interface ESVPassage {
  query: string
  text: string
  reference: string
}

interface ESVResponse {
  query: string
  canonical: string
  passages: string[]  // Array of scripture text, separated by reference
  passage_meta: {
    passage: string[]
    chapter: number[][]
    verse_start: number[][]
    verse_end: number[][]
  }
}

export interface Verse {
  reference: string
  content: string
}

// ESV API key from environment
const ESV_API_KEY = process.env.ESV_API_KEY || ""
const ESV_API_BASE = "https://api.esv.org/v3/passage/text/"

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
    content: text.trim(),
  }
}

/**
 * Fetch multiple passages from ESV API in a single batch request
 * ESV API supports semicolon-separated passages
 * Example: ?q=John+3:16;John+1:1;Psalm+23
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
  const results: Verse[] = []

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

    // ESV returns passages separated by reference headers
    const text = await response.text()

    // Parse the response - ESV separates passages with the reference in brackets
    // Example format: "[1] John 3:16\n For God so loved...\n\n[2] John 1:1\n In the beginning..."
    const passages = text.split(/\n\s*\n/)

    for (let i = 0; i < passages.length; i++) {
      const passage = passages[i].trim()

      // Remove reference prefix if present (e.g., "[1] ")
      const cleanPassage = passage.replace(/^\[\d+\]\s*/, "").trim()

      // Extract the actual content (remove the reference line that ESV adds)
      const lines = cleanPassage.split("\n")
      let contentStartIndex = 0

      // Find where the actual verse content starts (after the reference line)
      for (let j = 0; j < lines.length; j++) {
        const line = lines[j].trim()
        // Skip lines that look like references
        if (line && !/^\d+\s+\d+:\d+/.test(line) && !line.includes(":")) {
          contentStartIndex = j
          break
        }
      }

      const content = lines.slice(contentStartIndex).join(" ").replace(/\s+/g, " ").trim()

      if (content) {
        results.push({
          reference: batch[i] || references[results.length],
          content,
        })
      }
    }
  }

  return results
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
