import { automationDesignProjects } from "./automation-design"

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
    slug: "tfiac",
    name: "Terraform IaC",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "automation", title: "Automation", file: "automation.md" },
      { id: "design", title: "Design", file: "design.md" },
    ],
  },
]

// Merge repos from automationDesignProjects automatically
export const automationDesignExpanded: ProjectDocs[] = baseExpanded.map((p) => {
  const match = automationDesignProjects.find((s) => s.slug === p.slug)
  return {
    ...p,
    repos: match?.repos || [],
  }
})
