import React, { useEffect, useState } from "react"
import { softwareProjects } from "../data/projects/software"
import { expandedProjects } from "../data/projects/software-expanded"
import { fetchGitHubStatsForProjects, AggregatedStats } from "../utils/useGitHubStats"
import ProjectModal from "./ProjectModal"

export default function Projects() {
  const [stats, setStats] = useState<AggregatedStats[]>([])
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN || ""
    fetchGitHubStatsForProjects(softwareProjects, token).then(setStats)
  }, [])

  const getStats = (projectName: string) =>
    stats.find((s) => s.project === projectName)

  const getSectionsForProject = (slug: string) => {
    const project = expandedProjects.find((p) => p.slug === slug)
    return project ? project.sections : []
  }

  const openProject = (slug: string, sectionId?: string) => {
    setActiveProject(slug)
    setActiveSection(sectionId || null)
  }

  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-heading">Projects</h2>

      <div className="projects-grid">
        {softwareProjects.map((proj, i) => {
          const stat = getStats(proj.name)
          const sections = getSectionsForProject(proj.slug)
          const imagePath = `${import.meta.env.BASE_URL}assets/projects/${proj.slug}/1.png`

          return (
            <div
              key={i}
              className="project-card"
              onClick={() => openProject(proj.slug)}
            >
              {/* ---- Image ---- */}
              <div className="project-image-container">
                <img
                  src={proj.image || imagePath}
                  alt={proj.name}
                  className="project-image"
                  loading="lazy"
                />
              </div>

              {/* ---- Stats ---- */}
              {stat ? (
                <div className="project-stats-bar">
                  {/* Stars */}
                  <div className="stat-item" title="Stars">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="icon">
                      <path
                        fill="currentColor"
                        d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.213.612a.75.75 
                        0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 
                        01-1.088.791L8 12.347l-3.769 1.987a.75.75 0 
                        01-1.088-.79l.72-4.193L.816 6.374a.75.75 0 
                        01.416-1.28l4.213-.61L7.327.668A.75.75 0 
                        018 .25z"
                      />
                    </svg>
                    {stat.stars}
                  </div>

                  {/* Commits */}
                  <div className="stat-item" title="Commits">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="icon">
                      <path
                        fill="currentColor"
                        d="M7.5 1.75a.75.75 0 1 1 1.5 0v2.05a3.5 3.5 0 0 1 0 6.4v2.05a.75.75 
                        0 1 1-1.5 0v-2.05a3.5 3.5 0 0 1 0-6.4V1.75ZM8 
                        5.25a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
                      />
                    </svg>
                    {stat.totalCommits}
                  </div>

                  {/* Issues */}
                  <div className="stat-item" title="Issues">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="icon">
                      <path
                        fill="currentColor"
                        d="M8 1.5a6.5 6.5 0 1 0 0 13 
                        6.5 6.5 0 0 0 0-13Zm0 2a.75.75 0 0 1 .75.75v4a.75.75 
                        0 0 1-1.5 0v-4A.75.75 0 0 1 8 3.5Zm0 
                        7a.875.875 0 1 1 0 1.75A.875.875 0 0 1 8 10.5Z"
                      />
                    </svg>
                    {stat.totalIssues}
                  </div>

                  {/* Pull Requests */}
                  <div className="stat-item" title="Pull Requests">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="icon">
                      <path
                        fill="currentColor"
                        d="M5 3.25a.75.75 0 1 0-1.5 0A.75.75 0 0 0 
                        5 3.25ZM5 1a2.25 2.25 0 1 1 0 4.5A2.25 
                        2.25 0 0 1 5 1Zm6 11.75a.75.75 0 1 0 
                        0-1.5.75.75 0 0 0 0 1.5Zm0-3a2.25 2.25 0 
                        1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM8 
                        3.75a.75.75 0 0 1 1.5 0V8a2 2 0 0 1-2 
                        2H7.75a.75.75 0 0 1 0-1.5H8a.5.5 0 0 
                        0 .5-.5V3.75Z"
                      />
                    </svg>
                    {stat.totalPRs}
                  </div>
                </div>
              ) : (
                <div className="project-stats-bar">Fetching statistics...</div>
              )}

              {/* ---- Content ---- */}
              <div className="project-card-content">
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>
                <div className="project-tools">
                  {proj.tools.map((tool, i) => (
                    <span key={i}>{tool}</span>
                  ))}
                </div>
              </div>

              {/* ---- Footer with dynamic sections ---- */}
              {sections.length > 0 && (
                <div className="project-footer">
                  <span>See: </span>
                  {sections.slice(0, 3).map((section, idx) => (
                    <a
                      key={section.id}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        openProject(proj.slug, section.id)
                      }}
                    >
                      {section.title}
                      {idx < sections.slice(0, 3).length - 1 && " • "}
                    </a>
                  ))}
                  {sections.length > 3 && (
                    <>
                      {" "}
                      •{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          openProject(proj.slug)
                        }}
                      >
                        More →
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {activeProject && (
        <ProjectModal
          slug={activeProject}
          initialSection={activeSection} // 👈 Pass section to modal
          isOpen={true}
          onClose={() => {
            setActiveProject(null)
            setActiveSection(null)
          }}
        />
      )}
    </section>
  )
}
