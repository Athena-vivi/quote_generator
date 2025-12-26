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
  if (!text) return ""
  return text
    .trim()
    .replace(/\s+/g, " ")  // 合并多余空格
    .replace(/\n/g, "")    // 移除换行符
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

  // Parse JSON response (not text!)
  const data = await response.json()

  // Extract from JSON structure: passages[0] for content, canonical for reference
  const content = data.passages?.[0] || ""
  const canonical = data.canonical || reference

  return {
    reference: canonical,
    content: cleanScriptureText(content),
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

    // Parse JSON response
    const data = await response.json()

    // Extract passages and canonical references from JSON
    const passages = data.passages || []
    const canonical = data.canonical || ""

    // For batch query, parse canonical to get individual references
    const referenceList = canonical ? canonical.split("; ") : batch

    // Map each passage to its reference
    for (let i = 0; i < passages.length; i++) {
      const content = passages[i]
      const ref = referenceList[i] || batch[i] || references[allResults.length]

      if (content) {
        allResults.push({
          reference: ref,
          content: cleanScriptureText(content),
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
