import React, { useEffect, useState } from "react"
import { automationDesignProjects } from "../data/projects/automation-design"
import { automationDesignExpanded } from "../data/projects/automation-design-expanded"
import {
  fetchGitHubStatsForProjects,
  AggregatedStats,
} from "../utils/useGithubStats"
import AutomationModal from "./AutomationModal"
import SweetRepoOverview from "./SweetRepoOverview"

interface RepoInfo {
  label: string
  repo: string
}

export default function Automation() {
  const [stats, setStats] = useState<AggregatedStats[]>([])
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN || ""
    fetchGitHubStatsForProjects(automationDesignProjects, token).then(setStats)
  }, [])

  const getSectionsForProject = (slug: string) => {
    const project = automationDesignExpanded.find((p) => p.slug === slug)
    return project ? project.sections : []
  }

  const openProject = (slug: string, sectionId?: string) => {
    setActiveProject(slug)
    setActiveSection(sectionId || "overview")
    setIsModalOpen(true)
  }

  const normalizeRepos = (repos: (string | RepoInfo)[]): RepoInfo[] => {
    const inferredLabels = ["Infra", "Backend", "Serverless", "CLI"]
    return repos.map((r, i) =>
      typeof r === "string"
        ? { label: inferredLabels[i] || `Repo ${i + 1}`, repo: r }
        : r
    )
  }

  return (
    <section id="automation" className="automation-timeline-section">
      <h2 className="automation-heading">Automation & Design</h2>

      <div className="automation-timeline">
        {automationDesignProjects.map((proj, i) => {
          const reverse = i % 2 !== 0
          const sections = getSectionsForProject(proj.slug)
          const repos = normalizeRepos(proj.repos || [])
          const mainRepo = repos[0]?.repo || ""

          return (
            <div
              key={proj.slug}
              className={`automation-timeline-item ${reverse ? "reverse" : ""}`}
            >
              {/* === Center Node === */}
              <div className="timeline-node" />

              {/* === Left: Repo & Info (STATIC) === */}
              <div className="project-info non-clickable">
                <h3 className="automation-title">{proj.name}</h3>

                <div className="github-meta">
                  <a
                    href={`https://github.com/${mainRepo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {mainRepo}
                  </a>
                </div>

                <div className="automation-repo-card">
                  <SweetRepoOverview repo={mainRepo} />
                </div>

                <div className="automation-tools">
                  {proj.tools.map((tool, i) => (
                    <span key={i} className="tool-pill">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* === Right: Clickable Description === */}
              <div
                className="project-desc clickable"
                onClick={() => openProject(proj.slug, "overview")}
              >
                <p>{proj.description}</p>

                <div className="automation-links">
                  {sections.map((s, idx) => (
                    <a
                      key={s.id}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        openProject(proj.slug, s.id)
                      }}
                    >
                      {s.title}
                      {idx < sections.length - 1 && " • "}
                    </a>
                  ))}

                  {sections.length === 0 && (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        openProject(proj.slug)
                      }}
                    >
                      See More →
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {isModalOpen && activeProject && (
        <AutomationModal
          slug={activeProject}
          initialSection={activeSection}
          isOpen={true}
          onClose={() => {
            setIsModalOpen(false)
            setActiveProject(null)
            setActiveSection(null)
          }}
        />
      )}
    </section>
  )
}
