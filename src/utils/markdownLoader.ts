import { marked } from "marked"

marked.use({
  gfm: true,
  breaks: true,
  extensions: [],
  renderer: new marked.Renderer(),
})

export async function loadMarkdown(slug: string, file: string): Promise<string> {
  const path = `/docs/${slug}/${file}` 

  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText}`)
    }

    const md = await response.text()
    return marked.parse(md)
  } catch (err) {
    console.error(`Failed to load markdown for ${slug}/${file}`, err)
    return `<p style="color:#f87171">Error loading document: ${slug}/${file}</p>`
  }
}
