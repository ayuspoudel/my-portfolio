export interface Step {
  id: string;
  title: string;
  status: "success" | "failed" | "pending";
  description?: string;
}

export interface Node {
  id: string;
  title: string;
  company?: string;
  date?: string;
  statusText?: string;
  status: "done" | "pending" | "inprogress" | "activelypending";
  x: number;
  y: number;
  width: number;
  details?: string;
  steps?: Step[];
}

export const nodes: Node[] = [
    {
    id: "undergrad",
    title: "Undergrad @ USF",
    date: "Started Aug 2022",
    status: "done",
    x: 20,
    y: 20,
    width: 110,
    details: "Pursuing a Bachelor's in Computer Science at USF with a focus on systems, cloud, and DevOps. Expected graduation May 2026.",
    steps: [
        { 
        id: "gpa", 
        title: "GPA & Honors", 
        status: "success", 
        description: "Current GPA: 3.92/4.00\nHonors: Dean’s List (Fall 2023, Spring 2024), Green & Gold Presidential Waiver Award." 
        },
        { 
        id: "systems", 
        title: "Systems & Architecture Courses", 
        status: "success", 
        description: "Operating Systems, Computer Architecture (I, II, III), System Design, Program Design" 
        },
        { 
        id: "data", 
        title: "Software Engineering Courses", 
        status: "success", 
        description: "Database Design, Software System Development, Data Structures, \nAnalysis of Algorithms, Software Engineering" 
        },
        { 
        id: "ai", 
        title: "AI & ML Courses", 
        status: "pending", 
        description: "Intro to AI, Network Analysis and ML" 
        },
    ]
    },


  {
    id: "sde",
    title: "SDE Intern",
    company: "Green Rise Nepal",
    date: "Summer 2024",
    status: "done",
    x: 20,
    y: 100,
    width: 180,
    details: "Worked on full-stack features and backend optimization for Green Rise Nepal’s e-commerce platform.",
    steps: [
      { id: "frontend", title: "Frontend development", status: "success", description: "Built React components for product catalog and cart." },
      { id: "backend", title: "Backend optimization", status: "success", description: "Optimized API endpoints reducing response time by 40%." }
    ]
  },
    {
    id: "sre",
    title: "SRE Intern",
    company: "VSP Vision",
    date: "Feb 2025 – Jun 2025",
    status: "done",
    x: 260,
    y: 160,
    width: 120,
    details: "Worked on infrastructure reliability, monitoring, automation, and cloud migrations at VSP Vision.",
    steps: [
        { 
        id: "packer-ansible", 
        title: "Packer + Ansible provisioning", 
        status: "success", 
        description: `Built AMI golden images with Packer and automated server setup with Ansible playbooks.\nReduced provisioning time from 2+ hours to minutes.`
        },
        { 
        id: "mongodb", 
        title: "MongoDB cluster on AWS", 
        status: "success", 
        description: `Deployed multi-AZ MongoDB cluster with CloudFormation.\nAdded automated failover and backup policies.`
        },
        { 
        id: "eks", 
        title: "EKS shared cluster", 
        status: "success", 
        description: `Set up centralized EKS cluster hosting GitHub runners, AWX Tower, Redis, dashboards, and cron jobs.\nServed 200+ engineers.` 
        },
        { 
        id: "lambda-dynamodb", 
        title: "Lambda + DynamoDB scheduling", 
        status: "success", 
        description: `Developed a serverless appointment scheduling system with API Gateway, Lambda, and DynamoDB.\nScaled to 5k+ concurrent users.`
        },
        { 
        id: "migration", 
        title: "Windows → EKS migration", 
        status: "success", 
        description: `Rebuilt workloads with Helm charts and GitHub Actions + ArgoCD pipelines.\nMigrated services off Windows servers, saving ~$5k/month.`
        }
    ]
    },
   {
    id: "devops",
    title: "DevOps Intern",
    company: "CCC Intelligent Solutions",
    date: "Jun 2025 – Present",
    status: "inprogress",
    x: 520,
    y: 160,
    width: 220,
    details: "Focused on DevOps automation, CI/CD, Kubernetes, GitOps, and developer platform improvements at CCC Intelligent Solutions.",
    steps: [
        { 
        id: "dashboard", 
        title: "DevOps Dashboard (Vue.js + Flask)", 
        status: "success", 
        description: `Built dashboard with Vue.js + Flask APIs backed by MySQL (RDS).\nAdded Redis caching, Kafka pipelines, and CDN for scale (1k+ users).`
        },
        { 
        id: "eks", 
        title: "EKS cluster deployments", 
        status: "success", 
        description: `Managed backend services on AWS EKS with Helm, Liquibase migrations, and ArgoCD GitOps.\nEnabled zero-downtime deployments across environments.` 
        },
        { 
        id: "cicd", 
        title: "GitHub Actions CI/CD", 
        status: "success", 
        description: `Built reusable pipelines for multiple environments with ArgoCD integration.\nAdded approvals, caching, artifact promotion, and notifications.\nReduced release cycle by 40%.`
        },
        { 
        id: "jira-ado", 
        title: "Jira → Azure DevOps sync", 
        status: "pending", 
        description: `Built Jira-to-ADO sync using Atlassian Forge.\nAutomated comments, attachments, and description updates.\nCut manual migration delays by 90%.`
        },
        { 
        id: "access-requests", 
        title: "Access request automation API", 
        status: "pending", 
        description: `Built Flask API for Jira-triggered access requests.\nHandles email approvals, group provisioning, and Confluence/Jira automation on Kubernetes.`
        }
    ]
    },

  {
    id: "graduation",
    title: "Graduation",
    date: "Expected May 2026",
    statusText: "Waiting for Review",
    status: "pending",
    x: 350,
    y: 10.75,
    width: 200,
    details: "Completing undergraduate studies at USF. Expected to graduate May 2026.",
    steps: [
      { id: "credits", title: "Final courses", status: "pending", description: "Completing senior electives and capstone project." },
      { id: "review", title: "Graduation review", status: "pending", description: "Awaiting degree audit approval." }
    ]
  },
  {
    id: "open",
    title: "Open To Full Time Opportunities",
    status: "activelypending",
    x: 680,
    y: 22.5,
    width: 200,
    details: "Currently exploring full-time software engineering, SRE, or DevOps opportunities.",
    steps: [
      { id: "applications", title: "Job applications", status: "pending", description: "Applying to software engineering and DevOps positions." },
      { id: "interviews", title: "Interviews", status: "pending", description: "Preparing for technical interviews and take-home projects." }
    ]
  },
];

export const edges: [string, string][] = [
  ["undergrad", "graduation"],
  ["undergrad", "sde"],
  ["sde", "sre"],
  ["sre", "devops"],
  ["devops", "open"],
  ["graduation", "open"],
];
