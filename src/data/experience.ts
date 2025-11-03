// src/data/Experience.ts

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  logo: string; // 👈 path to logo image
}

export const experiences: ExperienceItem[] = [
  {
    id: "ccc",
    company: "CCC Intelligent Solutions",
    role: "DevOps Intern",
    period: "Jun 2025 – Present",
    bullets: [
      "Built a DevOps Dashboard (Vue.js + Flask + RDS) scaling to 1k+ users.",
      "Automated CI/CD pipelines with GitHub Actions + approvals → cut release cycle by 40%.",
      "Managed EKS + ArgoCD GitOps multi-env deployments with Helm & Liquibase.",
      "Automated Jira → ADO sync with Atlassian Forge (reduced manual migration by 90%)."
    ],
    logo: "/assets/logos/ccc.jpg",
  },
  {
    id: "vsp",
    company: "VSP Vision",
    role: "SRE Intern",
    period: "Feb 2025 – Jun 2025",
    bullets: [
      "Automated infra provisioning with Packer + Ansible (hours → minutes).",
      "Deployed multi-AZ MongoDB cluster with failover and backups.",
      "Migrated workloads to EKS with IaC and Helm-based deployments."
    ],
    logo: "/assets/logos/vsp.png",
  },
  {
    id: "greenrise",
    company: "Green Rise Nepal",
    role: "SDE Intern",
    period: "Summer 2024",
    bullets: [
      "Developed full-stack features for the e-commerce platform.",
      "Optimized backend APIs to reduce response times by 30%.",
      "Collaborated with frontend team to improve UI performance."
    ],
    logo: "/assets/logos/greenrise.svg",
  },
];
