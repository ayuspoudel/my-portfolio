import { softwareProjects } from "./software"

export interface ProjectSection {
  id: string
  title: string
  file: string
}

export interface ProjectDocs {
  slug: string
  name: string
  sections: ProjectSection[]
  repos?: (string | { label: string; repo: string })[]
}

const baseExpanded: ProjectDocs[] = [
  {
    slug: "tms",
    name: "Task Management System (TMS)",
    sections: [
      { id: "demo", title: "Quick Demo", file: "demo.md" },
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "architecture", title: "Architecture", file: "architecture.md" },
      { id: "cluster", title: "Cluster Setup", file: "cluster.md" },
      { id: "gitops", title: "ArgoCD & GitOps", file: "gitops.md" },
      { id: "orchestration", title: "Workload Orchestration", file: "orchestration.md" },
      { id: "security", title: "Security Model", file: "security.md" },
    ],
  },
  {
    slug: "dmz",
    name: "DMZ (Dotfile Manager for ZSH)",
    sections: [
      { id: "demo", title: "Demo", file: "demo.md" },
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "architecture", title: "Architecture", file: "architecture.md" },
      { id: "release", title: "Release Pipeline", file: "release.md" },
    ],
  },
  {
    slug: "greenrisenepal",
    name: "Green Rise Nepal Platform",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
    ],
  },
]

// Merge repos from softwareProjects automatically
export const expandedProjects: ProjectDocs[] = baseExpanded.map((p) => {
  const match = softwareProjects.find((s) => s.slug === p.slug)
  return {
    ...p,
    repos: match?.repos || [],
  }
})
