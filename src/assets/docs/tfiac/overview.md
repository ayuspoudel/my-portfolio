# Overview

Any large organization who deal with a lot of cloud infrastructure follow the practice of using Infrastructure as Code. It is GitOps of infrastructure, as all infra components are defined as code. Any changes to the infra is done via code; similarly, any changes merged to the main branch will trigger changes in the infrastructure.

To work on my personal projects; for cost savings, tracking, audit and keeping everything in my hand I use this repository which contains end to end provisioning of almost anything I need out of the box.
These modules were itself developed by me when I was learning, deploying, breaking and fixing AWS infrastructure and development.

Such monolithic repository - in my point of view -  is a essensity for any developer who is indulged in doing a lot of PoC, bringing Ideas to life and so on

### What it does

This repository provisions complete cloud infrastructure using Terraform. It contains reusable modules that can deploy networking components like VPCs, subnets, route tables and security groups; compute resources like EC2 instances and EKS clusters; and serverless components like Lambda, DynamoDB and API Gateway. It also handles S3 storage, IAM roles and policies, and Terraform backends using S3 and DynamoDB for remote state management.

Each environment inside the repository maps directly to a project. For example, my microservices, automation tools or dashboards have their own environment folders that pull from the same shared modules. This allows me to keep consistency across all projects while controlling cost and deployment behavior from one place.

The repo also supports automation through GitHub Actions using OIDC authentication. This eliminates the need for static credentials and lets pipelines deploy infrastructure securely. I use it to bootstrap GitHub runners, manage live environments, and handle deployments to AWS without manual intervention.

Overall, this setup lets me bring up production-ready environments quickly, reuse modules across projects, and maintain full ownership of my infrastructure lifecycle from code to deployment.