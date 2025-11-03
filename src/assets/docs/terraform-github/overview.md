# Overview

Managing a GitHub organization manually doesn’t scale. As the number of repositories, teams, and secrets grows, keeping everything consistent, secure, and auditable becomes nearly impossible without automation. That’s where Infrastructure as Code comes in — not just for cloud resources, but for GitHub itself.

This repository manages my entire GitHub organization using Terraform and Terragrunt. Every repository, team, permission, secret, and configuration is defined as code. Instead of manually creating repositories or adjusting settings through the web UI, all changes flow through version-controlled Terraform definitions. When a pull request merges, the automation pipeline applies the corresponding Terraform changes, syncing the GitHub organization in real time.

The goal of this setup is simple: make GitHub configuration reproducible, secure, and observable — just like any other infrastructure.

### What it does

The repository is built around a modular, layered structure that treats different repository groups (like AWS projects, Web apps, Automation tools, or Ops utilities) as Terragrunt environments.  
Each folder, such as `repo-aws` or `repo-web-development`, contains a Terragrunt configuration pointing to a shared Terraform module responsible for creating repositories with defined visibility, topics, and permissions.

At a high level, this setup does the following:

- Defines all repositories in code with consistent naming, topics, and visibility  
- Configures teams, collaborators, and branch protections automatically  
- Manages GitHub secrets and environment variables through Terraform  
- Uses Terragrunt to group and isolate repositories by category or project type  
- Generates CSV reports of all repositories for tracking and audits  
- Automatically fetches short-lived GitHub App tokens using a Rust-based CLI tool  
- Applies and plans infrastructure using secure GitHub Actions workflows with OIDC  

All of these actions run through CI/CD pipelines that plan, validate, and apply changes in a controlled way — ensuring every GitHub resource matches the codebase definition.

### Design

The design follows a clean, modular pattern similar to my other IaC frameworks. At its core, there’s a reusable Terraform module that defines a GitHub repository. Every Terragrunt configuration simply imports that module and passes a list of repositories to be created.  

Each Terragrunt environment contains:
- `repos.hcl` → List of repositories and their metadata  
- `terragrunt.hcl` → Calls the shared module and passes variables  
- `.pipeline/` → Python utilities to sync definitions and generate reports  

Terragrunt’s layering keeps the system scalable and readable, letting me manage dozens of repositories without duplicating any Terraform logic.

The authentication design is also unique. Instead of storing tokens or using personal credentials, the pipeline integrates a Rust-based GitHub App Token Fetcher. During each run, the pipeline dynamically requests a short-lived installation token, signs it using the app’s private key, and injects it into Terraform at runtime. This ensures authentication is ephemeral, auditable, and secure.

### Automation Pipeline

The repository’s CI/CD pipeline, built with GitHub Actions, automates the full lifecycle of GitHub management. It runs through three key phases:

1. Plan Phase — Detects changes in Terragrunt directories, initializes Terraform, and generates plans for each environment.
2. Approval Phase — Requires manual approval via GitHub Environments before applying changes.
3. Apply Phase — Fetches tokens dynamically, applies Terraform changes, and pushes updated reports.

All changes are traceable through pull requests and logs, keeping the organization’s configuration consistent with version control.

### Summary

This repository turns GitHub itself into Infrastructure as Code.  
It eliminates the manual management of repositories, enforces consistency across teams, and integrates seamlessly with existing automation workflows. Combined with ephemeral authentication and layered Terragrunt design, it provides a secure, scalable, and developer-friendly foundation for managing GitHub organizations.

It’s a practical implementation of a principle I follow in all my work: if something can be automated, it should be automated — including the tools we use to automate.
