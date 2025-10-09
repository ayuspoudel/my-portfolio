// src/data/projects/software.ts
export interface SoftwareProject {
  name: string;
  slug: string;
  repos: string[]; // multiple GitHub repos
  description: string;
  tools: string[];
  image?: string; // optional project image
}

export const softwareProjects: SoftwareProject[] = [
  {
    name: "TMS",
    slug: "tms",
    repos: [
      "ayuspoudel/tms-k8s-gitops",
      "ayuspoudel/pulumi-eks",
      "ayuspoudel/tms",
      "ayuspoudel/tms-frontend",
      "ayuspoudel/tms-infra"
    ],
    description:
      "TMS is a serverless multi-service platform designed for automating, orchestrating, and monitoring workloads. It’s built with Node.js microservices, MongoDB, and deep AWS integrations. Each module runs independently — from job definitions to integrations — while the control plane stays fully serverless. The platform connects to GitHub, EKS, and ArgoCD for end-to-end workflow automation.",
    tools: ["TypeScript", "Node.js", "Express", "MongoDB", "AWS Serverless", "AWS DynamoDB", "AWS EKS", "AWS Networking", "Pulumi", "ArgoCD"],
    image: "/src/assets/diagrams/tms/TMS.png", // path relative to /public or /src/assets
  },
{
  name: "DMZ",
  slug: "dmz",
  repos: [
    "ayuspoudel/dmz",
    "ayuspoudel/homebrew-dmz"
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
    "ReleaseOps"
  ],
  image: "/src/assets/diagrams/dmz/demo1.gif",
},

];
