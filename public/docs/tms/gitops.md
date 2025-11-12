# ArgoCD and GitOps Integration

- Pulumi builds the infra — EKS, VPC, IAM, network.
- ArgoCD manages everything inside the cluster.
- Every job, API, or app is stored in Git as YAML.
- When code changes, ArgoCD auto-syncs the cluster.
- Git is the only source of truth.
- Pulumi creates the cluster and sets up a `gitops` branch.
- ArgoCD watches that branch for changes.
- Pulumi commits any infra or config change as YAML.
- ArgoCD detects it and applies it instantly.
- Pulumi = outside cluster, ArgoCD = inside cluster.
- Each cluster has a `root-app` that bootstraps everything.
```
argocd-root-app
 ├── core-addons/
 ├── workloads/
 └── monitoring/
```
- Each folder is an Argo app with its own values file.
- TMS updates them when users deploy or edit workloads.


### GitHub Integration

- TMS listens to push and merge events.
- On deploy, TMS commits YAML to the `gitops` branch.
- ArgoCD sees the commit and syncs the change.
- Every commit has metadata like cluster, env, and user.
- ArgoCD has a webhook endpoint in the cluster.
- When GitHub pushes new changes, TMS calls that webhook.
- This triggers instant syncs, faster than default polling.

