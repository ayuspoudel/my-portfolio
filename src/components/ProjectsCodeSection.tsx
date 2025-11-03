import React from "react"
import RepoOverview from "./RepoOverview"

interface ProjectCodeSectionProps {
  repos: (string | { label: string; repo: string })[]
}

export default function ProjectCodeSection({ repos }: ProjectCodeSectionProps) {
  if (!repos || repos.length === 0) return null

  return (
    <section className="project-code-section">


      {repos.map((r, idx) => {
        const repoPath = typeof r === "string" ? r : r.repo
        const label = typeof r === "string" ? repoPath : r.label

        return (
          <div key={idx} className="repo-block">
            <h3 className="repo-block-title">{label}</h3>
            <RepoOverview repo={repoPath} />
          </div>
        )
      })}
    </section>
  )
}
