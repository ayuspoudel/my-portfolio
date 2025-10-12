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
  {
    slug: "oidc-terragrunt",
    name: "GitHub OIDC Terragrunt Setup",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "design", title: "Design", file: "design.md" },
    ],
  },
  {
    slug: "pulumi-eks",
    name: "Pulumi EKS Automation Framework",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "design", title: "Design", file: "design.md" },
    ],
  },
  {
    slug: "terraform-github",
    name: "GitHub Infrastructure as Code",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
    ],
  },
  {
    slug: "jira-github",
    name: "Serverless Jira–GitHub Integration",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
    ],
  },
  {
    slug: "gh-token-fetch",
    name: "GitHub Token Fetch Utility",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
    ],
  },
  {
    slug: "canvas-api",
    name: "Canvas Automation API",
    sections: [
      { id: "overview", title: "Overview", file: "overview.md" },
      { id: "design", title: "Design", file: "design.md" },
    ],
  },
]

export const automationDesignExpanded: ProjectDocs[] = baseExpanded.map((p) => {
  const match = automationDesignProjects.find((s) => s.slug === p.slug)
  return {
    ...p,
    repos: match?.repos || [],
  }
})
