# EKS Cluster Provisioning

1. AWS Connection

   * The user first connects their AWS account through the Connect Service.
   * TMS deploys a CloudFormation template that creates an IAM role with an external ID trust policy.
   * This role allows TMS to assume permissions securely without storing static credentials.

2. EKS Provisioning Trigger

   * Once the AWS connection is verified, the user can click “Create Cluster” in the TMS UI.
   * This triggers the EKS Service Lambda via API Gateway.
   * The request payload includes:

     * Cluster name
     * AWS region
     * Environment (dev, int, prod)
     * Node configuration (instance type, desired/spot mix, scaling limits)

3. Pulumi Deployment

   * Pulumi runs with the assumed IAM role from the connected AWS account.
   * It provisions:

     * A dedicated VPC with private/public subnets across multiple AZs.
     * Security groups, IAM roles, and OIDC provider for IRSA.
     * The EKS control plane with version auto-detection.
     * Two node groups:

       * One on-demand group for control workloads.
       * One spot group for dynamic job workloads.
   * Pulumi outputs are stored in the `eks_metadata` table and S3 for reuse.

4. Addons via ArgoCD
After the cluster is up, TMS automatically installs a set of core addons via Pulumi and ArgoCD:

| Addon                            | Purpose                                                 |
| -- | - |
| ArgoCD (initially deployed by pulumi)                      | GitOps management for workloads, jobs, and environments |
| Nginx Ingress                | HTTP routing for APIs, dashboards, and job UIs          |
| Prometheus                   | Metric collection for workloads and clusters            |
| Grafana                      | Visualization for resource usage and costs              |
| Loki + FluentBit             | Log aggregation from all pods and nodes                 |
| Cluster Autoscaler           | Automatically scales worker nodes                       |
| AWS Load Balancer Controller | Integrates AWS ALB/NLB for exposed services             |

All addons are deployed declaratively using Helm charts managed through ArgoCD.
Each environment has its own `values.yaml` to keep configuration isolated.


6. Maintainance
* Pulumi refresh jobs run periodically to detect drift and re-sync infrastructure.
* The cluster auto-updates minor EKS versions when available (configurable per org).
* Addons are managed through ArgoCD syncs to ensure continuous reconciliation.
* Metrics from Prometheus and logs from Loki are pushed to the TMS dashboard API for visualization.

