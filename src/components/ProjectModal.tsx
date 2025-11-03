import React, { useEffect, useState } from "react"
import { loadMarkdown } from "../utils/markdownLoader"
import { expandedProjects } from "../data/projects/software-expanded"
import ProjectCodeSection from "./ProjectsCodeSection"

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
  const [activeIndex, setActiveIndex] = useState<number | "code">(0)
  const [docTitle, setDocTitle] = useState("")

  const project = expandedProjects.find((p) => p.slug === slug)

  // Load markdown content
  useEffect(() => {
    if (!isOpen || !project || activeIndex === "code") return

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

  // Set initial section if provided
  useEffect(() => {
    if (isOpen && project && initialSection) {
      const idx = project.sections.findIndex((s) => s.id === initialSection)
      if (idx !== -1) setActiveIndex(idx)
    }
  }, [isOpen, initialSection, project])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, activeIndex])

  if (!isOpen || !project) return null

  const totalSections = project.sections.length

  const prev = () => {
    if (activeIndex === "code") setActiveIndex(totalSections - 1)
    else if (activeIndex === 0) setActiveIndex("code")
    else setActiveIndex((i) => (typeof i === "number" ? i - 1 : i))
  }

  const next = () => {
    if (activeIndex === "code") setActiveIndex(0)
    else if (activeIndex === totalSections - 1) setActiveIndex("code")
    else setActiveIndex((i) => (typeof i === "number" ? i + 1 : i))
  }

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="project-modal-top">
          <h3 className="project-title">
            {activeIndex === "code" ? `${project.name} — Code` : docTitle}
          </h3>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Section Nav */}
        <div className="section-nav">
          <button onClick={prev} className="arrow">
            ←
          </button>
          <div className="section-buttons">
            <button
              key="code"
              onClick={() => setActiveIndex("code")}
              className={`section-btn ${activeIndex === "code" ? "active" : ""}`}
            >
              Code
            </button>

            {project.sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveIndex(i)}
                className={`section-btn ${activeIndex === i ? "active" : ""}`}
              >
                {s.title}
              </button>
            ))}
          </div>
          <button onClick={next} className="arrow">
            →
          </button>
        </div>

        {/* Content Area */}
        <div className="project-content">
          {activeIndex === "code" ? (
            <div className="project-markdown code-wrapper">
              <ProjectCodeSection repos={project.repos} />
            </div>
          ) : (
            <div
              className="project-markdown"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>

      {/* Floating Arrows */}
      <button
        className="floating-arrow left"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
      >
        ←
      </button>
      <button
        className="floating-arrow right"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
      >
        →
      </button>
    </div>
  )
}
