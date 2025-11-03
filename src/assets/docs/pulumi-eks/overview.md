# Pulumi EKS Framework Overview

Building Kubernetes clusters manually or even through automation frameworks like Terraform can be cumbersome. Just getting the control plane ready can take up to fifteen minutes, and using the `aws cli` to do the same often takes more than twenty. Because of this, true end-to-end automation for provisioning and managing Kubernetes clusters is not just a convenience — it is a necessity.

While many organizations have strong, secure, and highly available Kubernetes build automation using Terraform, CloudFormation, or even AWS CLI, it’s worth stepping back and asking: have these tools also created a wall between us and what Kubernetes itself allows us to customize? In many cases, yes. We often end up limited by our own tooling, even though the Kubernetes API gives us the flexibility to build clusters exactly how we want.

For this framework, I decided to take a different route and use Pulumi. Pulumi’s `pulumi-eks` library integrates beautifully with `helm` and allows direct use of programming language logic for resource creation. My goal here was simple — deploy a complete EKS foundation that includes the VPC, subnets, security groups, managed node groups, launch templates, IAM roles, and IRSA mappings. I did not implement EKS Pod Identity in this version, although AWS now recommends it for clusters running version 1.30 and above.

Pulumi handles the control plane deployment seamlessly, attaches the VPC CNI plugin automatically, and within minutes a fully functional EKS environment is ready to go.

Once the cluster is online, ArgoCD takes over. ArgoCD is responsible for deploying all the core add-ons and observability stacks — AWS add-ons, EFK stack, Prometheus Operator, Loki, Grafana, NGINX Ingress Controller, Calico, and others. This design ensures that once the infrastructure is up, the cluster’s workload layer is managed entirely through GitOps. ArgoCD continuously reconciles the cluster state and eliminates the need to manually intervene during or after the build process.

Using ArgoCD does slightly increase the time it takes to spin up a production-grade cluster, but it completely removes the need to babysit or hand-configure any part of the stack. The trade-off is worth it: the process is slower, but it’s deterministic, repeatable, and self-healing.

This framework represents my approach to fully automated EKS cluster creation — where Pulumi provisions the infrastructure, and ArgoCD manages the lifecycle of everything that runs on it. If you’re interested in the GitOps part of the setup, I’ve documented that separately in the ArgoCD GitOps automation project, which goes deeper into how deployments and environment synchronization are handled once the cluster is live.
