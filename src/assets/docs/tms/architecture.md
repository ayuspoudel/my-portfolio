# Task Management System (TMS) Architecture

<p align="center">
  <img 
    src="src/assets/diagrams/tms/TMS.png" 
    alt="TMS Architecture Diagram"
    style="max-width: 80%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: zoom-in;"
    onclick="window.open(this.src, '_blank')"
  />
</p>

> Click the image to view it full size.


> This document breaks down the architecture of TMS, explaining how its components interact to provide a seamless, cloud-native orchestration platform.

### Overview

TMS follows a modular, event-driven design that uses AWS services, serverless computing, and Kubernetes for execution. Each part of the system runs independently but communicates through events and shared tables. The platform is fully serverless on the control plane and uses EKS clusters only for runtime workloads.


### 1. User Service

* Handles user registration, login, authentication, and RBAC permissions.
* Uses a simple JWT-based authentication middleware.
* Persists user records in `User Table` and token data in `User Token Table`.
* On each create or update event, pushes a message to the Event Bus.
* These events are consumed by the Connect and EKS services to sync user data and permissions.


### 2. Connect Service

* Manages external integrations such as AWS accounts and GitHub connections.
* Uses `Connect Table` to store credentials, metadata, and IAM role info.
* Handles onboarding of AWS accounts via CloudFormation templates, creating IAM roles that the backend assumes for EKS provisioning.
* Triggers `RBAC Table` updates for authorization across services.
* Installs GitHub Apps, giving TMS access to repositories and jobs for orchestration.


### 3. EKS Service

* Automates EKS cluster creation, scaling, and management.
* Uses Pulumi for infrastructure as code to provision all core components.
* Manages clusters that include:

  * VPC, subnets, and node groups (reserved and spot instances).
  * Control plane security, IRSA roles, and add-ons.
  * ArgoCD, Nginx ingress, Prometheus, Grafana, Loki, and FluentBit.
* Saves all cluster metadata in the `EKS Info Table`.
* Periodically reports node and workload metrics to the dashboard through Prometheus and S3.


### 4. Job Scheduler Service

* Handles creation and execution of jobs, GitHub workflows, and cron-based tasks.
* Supports both short and long-running jobs with dynamic scaling.
* Communicates with the EKS Service to allocate compute resources.
* Uses `RBAC & EKS Info Table` to ensure jobs are executed in the correct namespace and cluster.
* Pushes telemetry and job data to S3 and Athena for historical analysis.
* Exposes job logs and statuses through the dashboard UI.


### 5. Event Bus

* Connects all Lambda-based services in a decoupled manner.
* Propagates updates between User, Connect, and EKS services.
* Ensures data consistency across tables without direct coupling.
* Uses Amazon EventBridge for guaranteed delivery and fault isolation.


### 6. Frontend and API Layer

* The frontend is built using Vue.js and interacts with the backend through an API Gateway.
* API endpoints follow the pattern `/user`, `/connect`, `/eks`, `/jobs`, and `/dashboard`.
* All APIs are stateless and protected by the JWT authentication middleware.
* The API layer simply routes requests to the appropriate Lambda functions.


### 7. Observability and Monitoring

* Each workload deployed through TMS automatically ships logs and metrics to the centralized monitoring stack.
* Prometheus, Loki, and FluentBit collect cluster-level telemetry.
* Grafana dashboards display performance metrics and cost breakdowns.
* Long-term data is pushed to S3 and queried using Athena for cost and job analytics.


### 8. Data Storage

* All metadata, users, connections, and cluster info are stored in DynamoDB tables.
* Logs and reports are stored in S3 for low-cost retention.
* Job metrics and performance data are queryable via Athena.


### 9. Deployment Flow

1. User connects AWS and GitHub accounts from the UI.
2. Connect Service triggers AWS account bootstrap using CloudFormation.
3. EKS Service provisions a complete cluster using Pulumi and deploys ArgoCD.
4. User creates jobs or links GitHub workflows with a TMS-provided label.
5. Jobs are executed in the cluster and telemetry is streamed to the dashboard.
6. Logs, metrics, and cost analytics are stored for visualization.


### Summary

TMS architecture is designed to be lightweight, event-driven, and fully automated.
Each component focuses on a single responsibility but integrates through shared events and persistent storage.
The result is a system that can deploy, monitor, and manage workloads at scale without manual intervention or infrastructure maintenance.
