import React, { useEffect, useState } from "react"
import { loadMarkdown } from "../utils/markdownLoader"
import { expandedProjects } from "../data/projects/software-expanded"

interface ProjectModalProps {
  slug: string
  isOpen: boolean
  onClose: () => void
  initialSection?: string | null
}

export default function ProjectModal({
  slug,
  isOpen,
  onClose,
  initialSection = null,
}: ProjectModalProps) {
  const [content, setContent] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const [docTitle, setDocTitle] = useState("")

  const project = expandedProjects.find((p) => p.slug === slug)

  useEffect(() => {
    if (!isOpen || !project) return
    const file = project.sections[activeIndex].file
    loadMarkdown(slug, file).then((html) => {
      setContent(html)
      const temp = document.createElement("div")
      temp.innerHTML = html
      const title =
        temp.querySelector("h1")?.textContent ||
        temp.querySelector("h2")?.textContent ||
        project.sections[activeIndex].title
      setDocTitle(title || project.name)
    })
  }, [slug, activeIndex, isOpen])

  useEffect(() => {
    if (isOpen && project && initialSection) {
      const idx = project.sections.findIndex((s) => s.id === initialSection)
      if (idx !== -1) setActiveIndex(idx)
    }
  }, [isOpen, initialSection, project])

  if (!isOpen || !project) return null

  const prev = () => setActiveIndex((i) => (i > 0 ? i - 1 : project.sections.length - 1))
  const next = () => setActiveIndex((i) => (i < project.sections.length - 1 ? i + 1 : 0))

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-top">
          <h3 className="project-title">{docTitle}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="section-nav">
          <button onClick={prev} className="arrow">←</button>
          <div className="section-buttons">
            {project.sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveIndex(i)}
                className={`section-btn ${i === activeIndex ? "active" : ""}`}
              >
                {s.title}
              </button>
            ))}
          </div>
          <button onClick={next} className="arrow">→</button>
        </div>

        <div
          className="project-markdown"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}
