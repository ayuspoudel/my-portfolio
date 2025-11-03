
# Design

### Code Design

The design of this setup is based on simplicity and isolation. The root of the repository contains a shared Terragrunt configuration (`root.hcl`) that defines the backend and provider information. Each OIDC folder inherits it automatically and only defines what is specific to that repository — such as the IAM role name, trust relationship, and permissions.

This approach eliminates repetition and ensures that adding a new repository is as simple as creating a new folder with its own Terragrunt configuration.

### Module Design

Each OIDC configuration acts like its own module — standalone, version-controlled, and isolated. Terragrunt’s inheritance structure keeps the backend consistent while letting each sub-directory manage its own lifecycle. There are no dependencies between repositories; each is deployed separately with its own Terraform state file.

This structure also enables rollbacks or re-deployments without affecting other repositories.

### Pipeline Design

The logic of each workflow ensures that changes are always scoped to the modified directories and that each apply is associated with a specific commit.

* Terragrunt Init / Plan

  * Checks out the repository
  * Detects changed directories using `awk` and Git logs
  * Builds a list of affected OIDC repositories
  * Runs `terragrunt init` and `plan` for each folder
  * Uploads the generated plans as artifacts for the next stage

* Terragrunt Apply
  * Requires manual approval
    * This is managed using GitHub Environments with protection enabled
  * Downloads the plan artifact from the previous step
  * Applies the changes only to the affected OIDC configurations

This design ensures that no accidental changes reach AWS without review, while keeping the process fully automated once approved. It also means every infrastructure update, role change, or OIDC trust modification is tied directly to a Git commit, maintaining complete auditability across all environments.
