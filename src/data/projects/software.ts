// src/data/projects/software.ts
export interface SoftwareProject {
  name: string;
  slug: string;
  repos: string[]; // multiple GitHub repos
  description: string;
  tools: string[];
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
      "A serverless multi-service platform with modular microservices, built using Node.js, MongoDB, and AWS integrations.",
    tools: ["Node.js", "Express", "MongoDB", "AWS", "Pulumi", "ArgoCD"],
  },
  {
    name: "DMZ",
    slug: "dmz",
    repos: [
      "ayuspoudel/dmz",
      "ayuspoudel/homebrew-dmz"
    ],
    description:
      "A full-stack Flask + Vue app visualizing CI/CD metrics, Argo CD apps, CRs, deployments, and analytics.",
    tools: ["Flask", "Python", "MySQL", "Vue", "Grafana"],
  },
];
