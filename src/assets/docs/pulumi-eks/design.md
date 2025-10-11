# Design

### Code Design

The code design of this framework is based on sequential layering. Each layer builds on the previous one — starting from VPC creation, moving into IAM, security groups, and finally cluster setup and GitOps. The folder structure itself defines the provisioning order, which keeps the logic easy to follow and maintain.

The code is written in TypeScript, taking advantage of Pulumi’s runtime capabilities. This allows me to use loops, conditional logic, and shared variables while still maintaining declarative infrastructure behavior. Pulumi’s state model handles dependency tracking internally, which means I don’t have to define `depends_on` explicitly the way Terraform requires.

The main entrypoint (`index.ts`) wires all these modules together, calling each file from the `infra/` directory in order. Each file exports its resources, which can then be referenced by the next stage of the build. For example, the VPC and subnet IDs from `01_vpc.ts` are passed to the EKS cluster creation logic in `04_eks.ts`.

### Module Design

The `infra/` directory holds the main building blocks of the cluster. Each file represents a separate phase of cluster setup, and everything is numbered to maintain a clear execution order.

```bash

infra/
├── 01_vpc.ts
├── 02_iam.ts
├── 03_clustersg.ts
├── 04_eks.ts
├── 05_nodesg.ts
├── 06_sgBindings.ts
├── 07_mng.ts
├── 08_irsa.ts
└── 09_argocd.ts

```

- 01_vpc.ts — creates the VPC, subnets, route tables, and NAT gateways  
- 02_iam.ts — defines base IAM roles and policies for cluster and node access  
- 03_clustersg.ts / 05_nodesg.ts — create and configure security groups  
- 04_eks.ts — provisions the EKS control plane, attaches the VPC CNI, and outputs the cluster configuration  
- 07_mng.ts — defines and launches managed node groups  
- 08_irsa.ts — handles IAM Roles for Service Accounts (IRSA)  
- 09_argocd.ts — installs and bootstraps ArgoCD inside the cluster  

All modules share a consistent naming and tagging convention. This is handled through the `utils/` directory, which provides helper functions for generating resource tags and names. It ensures that even though each module is separate, everything in AWS looks unified under the same environment and naming pattern.

### Dependency Flow

Each module imports outputs from the one before it. This keeps the dependency chain natural — for example, node groups depend on the cluster, which depends on the VPC and IAM roles. Since Pulumi manages dependency resolution internally, this order doesn’t have to be enforced manually, making iteration and testing much faster.

### Environment Design

Multiple environments are supported through Pulumi stack configuration files (for example, `Pulumi.dev.yaml`, `Pulumi.prod.yaml`). Each stack has its own set of variables like VPC CIDRs, instance types, and node scaling ranges. Switching between environments is as simple as changing the Pulumi stack context.

### GitOps Integration Design

Once the cluster is live, the GitOps integration takes over. The `gitops/` directory contains Argo CD application definitions split into `addons/` and `projects/`. These manifests tell Argo CD which repositories and namespaces to sync once the cluster is up.

```bash
gitops/
├── addons/
│   ├── argocd.yaml
│   ├── prometheus.yaml
│   ├── loki.yaml
│   ├── grafana.yaml
│   └── ingress-nginx.yaml
└── projects/
├── dev/
├── staging/
└── prod/
```

This ensures that after Pulumi creates the infrastructure, Argo CD immediately takes control of application and add-on management. From that point onward, all cluster changes are handled through GitOps instead of manual `kubectl` commands.

### Design Philosophy

The philosophy behind this framework is to bridge infrastructure provisioning and platform operations. Pulumi provides the programmatic control and type safety needed for predictable cluster builds, while Argo CD provides the operational stability for continuous delivery. Together, they make the system both reproducible and self-healing.

The design intentionally avoids complexity. There are no hidden abstractions — every part of the infrastructure is visible, versioned, and managed in one place. Each file can be read independently and run in isolation, making it simple to debug or rebuild specific layers without touching the entire system.

