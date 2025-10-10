// src/data/projects/software.ts

export interface RepoMapping {
  label: string
  repo: string
}

export interface SoftwareProject {
  name: string
  slug: string
  repos: (string | RepoMapping)[]
  description: string
  tools: string[]
  image?: string
}

export const softwareProjects: SoftwareProject[] = [
  {
    name: "TMS",
    slug: "tms",
    repos: [
      { label: "GitOps", repo: "ayuspoudel/tms-k8s-gitops" },
      { label: "Backend", repo: "ayuspoudel/tms" },
      { label: "Frontend", repo: "ayuspoudel/tms-frontend" },
      { label: "IaC", repo: "ayuspoudel/tms-infra" },
    ],
    description:
      "TMS is a serverless tool designed for automating, orchestrating, and monitoring workloads. It’s built with Node.js microservices, MongoDB, and deep AWS integrations. Each module runs independently — from job definitions to integrations — while the control plane stays fully serverless. The platform connects to GitHub, EKS, and ArgoCD for end-to-end workflow automation.",
    tools: [
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS Serverless",
      "AWS DynamoDB",
      "AWS EKS",
      "AWS Networking",
      "Pulumi",
      "ArgoCD",
    ],
    image: "/src/assets/diagrams/tms/TMS.png",
  },
  {
    name: "DMZ",
    slug: "dmz",
    repos: [
      { label: "Repo", repo: "ayuspoudel/dmz" },
      { label: "Homebrew Tap", repo: "ayuspoudel/homebrew-dmz" },
    ],
    description:
      "DMZ is a Rust-based command line utility that manages and synchronizes dotfiles, ZSH setups, and shell modules. It provides a clean interface for initializing, backing up, and restoring configurations across systems. The project is fully automated — built with GitHub Actions, deployed via Terraform-managed EC2 runners, and uses S3 for binary storage and Homebrew for distribution.",
    tools: [
      "Rust",
      "ZSH",
      "GitHub Actions",
      "Terraform",
      "AWS EC2",
      "AWS S3",
      "AWS IAM",
      "ReleaseOps",
    ],
    image: "/src/assets/diagrams/dmz/demo1.gif",
  },
  {
    name: "Green Rise Nepal Platform",
    slug: "greenrisenepal",
    repos: [
      { label: "Frontend", repo: "ayuspoudel/greenrisenepal" },
    ],
    description:
    "Green Rise is a full-stack platform using React + Redux frontend with Node.js and Express APIs backed by MongoDB. It supports blog publishing, survey analytics, and user authentication — all through a modular REST architecture with JWT-secured endpoints. The frontend consumes these APIs via Axios interceptors, visualizes insights with Recharts, and is fully containerized and deployed to Vercel and Render.",
    tools: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Axios",
      "React Router",
      "Docker",
    ],
    image: "/src/assets/diagrams/greenrise/greenrise-main.png",
  },

]
