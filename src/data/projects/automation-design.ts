// src/data/projects/automation-design.ts

export interface RepoMapping {
  label: string
  repo: string
}

export interface AutomationDesignProject {
  name: string
  slug: string
  repos: (string | RepoMapping)[]
  description: string
  tools: string[]
  image?: string
}

export const automationDesignProjects: AutomationDesignProject[] = [
  {
    name: "Terraform IaC",
    slug: "tfiac",
    repos: [
      { label: "IaC Repo", repo: "ayuspoudel/aws-iac-terraform" },
    ],
    description:
      "This repository contains my self-authored Terraform modules for provisioning AWS infrastructure end to end. It includes modules for VPCs with high availability and proper subnet isolation, EC2 instances, EKS clusters, RDS databases, and serverless components like Lambda, DynamoDB, and API Gateway. I use it as the core hub for all my infrastructure — the same modules power most of my live environments, automated deployments, and personal cloud setups.",
    tools: [
      "Terraform",
      "AWS",
      "IaC",
      "Serverless",
      "EKS",
      "Networking",
      "Security",
    ],
  },
  {
    name: "GitHub OIDC Terragrunt Setup",
    slug: "oidc-terragrunt",
    repos: [
      { label: "OIDC Configs", repo: "ayuspoudel/aws-iac-terraform" },
    ],
    description:
      "This setup automates the integration between GitHub Actions and AWS using OpenID Connect (OIDC). It provisions IAM roles and trust policies through Terragrunt so that each repository can assume its own role without static credentials. The structure is simple — a shared root configuration and individual folders per repository. This lets my workflows deploy to AWS directly and securely, with full traceability and zero long-lived access keys.",
    tools: [
      "Terragrunt",
      "Terraform",
      "AWS IAM",
      "OIDC",
      "GitHub Actions",
      "Security Automation",
    ],
  },

  {
  name: "Pulumi EKS Automation Framework",
  slug: "pulumi-eks",
  repos: [
    { label: "Pulumi Repo", repo: "ayuspoudel/pulumi-eks" },
  ],
  description:
    "This repository automates the complete provisioning of EKS clusters using Pulumi and TypeScript. It builds everything from networking and IAM to Argo CD and IRSA mappings in a single programmatic workflow. The setup defines the full AWS stack including VPC, security groups, managed node groups, and GitOps bootstrapping with Argo CD. It acts as my core EKS automation framework, used for both production and experimental Kubernetes environments. It was also used in tms k8s service.",
  tools: [
    "Pulumi",
    "TypeScript",
    "AWS EKS",
    "AWS Networking", 
    "AWS EC2",
    "Argo CD",
    "IAM / IRSA",
    "GitOps",
    "Automation",
  ],
},

 {
  name: "Serverless Jira–GitHub Integration",
  slug: "jira-github",
  repos: [
    { label: "Lambda Repo", repo: "ayuspoudel/aws-lambda-serverless-jira-github-sync" },
  ],
  description:
    "This project automates synchronization between Jira and GitHub using a fully serverless architecture. It runs as an AWS Lambda that listens to GitHub webhooks and automatically creates or updates Jira issues based on repository activity. Each event is processed in real time — the Lambda authenticates to Jira, performs triage, and pushes updates back through the REST API.",
  tools: [
    "AWS Lambda",
    "Python",
    "GitHub API",
    "Jira REST API",
    "Serverless",
    "Docker",
    "Automation",
  ],
},

]