# Overview

Any large organization who deal with a lot of cloud infrastructure follow the practice of using Infrastructure as Code. It allows full control of cloud provisioning through code and ensures that all environments are reproducible and traceable. In the same way, automation pipelines also need a secure, token-based way to interact with the infrastructure without exposing long-lived credentials.

This repository handles that specific problem — it automates GitHub → AWS authentication using OpenID Connect (OIDC). Each repository gets its own IAM role and trust policy, provisioned through Terragrunt, allowing it to deploy or update infrastructure securely from GitHub Actions without static keys.  

I use this setup for all of my personal and experimental projects so that every pipeline is independent, isolated, and traceable to the exact commit that triggered it.

### What it does

The repository provisions IAM roles and OIDC providers for multiple GitHub repositories. Each folder inside `oidc-github-repositories/` corresponds to a single repository and contains a Terragrunt configuration that defines the trust policy, permissions, and remote backend. This ensures isolation between repositories — no shared access, no cross-environment interference.

The workflow is designed to detect which directories have changed and only apply changes there. It uses a combination of `git log`, `awk`, and simple filters to determine which OIDC configuration needs to run:

```bash
# Detect changed OIDC Terragrunt directories
git log -m -1 --name-only --pretty="format:" ${{ github.sha }} > files
dirs=$(cat files | awk '{ sub("/[^/]*$", ""); print }' | uniq | grep '^oidc-github-repositories/' | grep -v -e '.terragrunt-cache' -e '.gitignore')
echo "dirs=$dirs" >> $GITHUB_OUTPUT
```

This logic ensures that even if multiple OIDC configurations exist, only the changed ones are initialized and applied. It’s fast, deterministic, and safe to run in parallel across multiple projects.

Every change is triggered by a commit. When a PR is merged, the pipeline automatically initializes and plans changes for the affected OIDC folders, generates artifacts, and waits for manual approval before applying.
