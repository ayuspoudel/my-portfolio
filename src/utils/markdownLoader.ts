import { marked } from "marked"

marked.use({
  gfm: true,
  breaks: true,
  extensions: [],
  renderer: new marked.Renderer(),
})

export async function loadMarkdown(slug: string, file: string): Promise<string> {
  try {
    const md = await import(`../assets/docs/${slug}/${file}?raw`)
    return marked.parse(md.default)
  } catch (err) {
    console.error(`Failed to load markdown for ${slug}/${file}`, err)
    return `<p style="color:#f87171">Error loading document: ${slug}/${file}</p>`
    
  }
}
