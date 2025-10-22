# Design

### Code Design

The design of this repository is centered around reusability and consistency. Each module is written once and reused across multiple environments without modification. Variables, outputs, and module interfaces are standardized so that projects can be added quickly without rewriting any infrastructure code.

### Module Design
Every module follows a minimal and declarative layout. There are no hidden dependencies or assumptions — everything that a module needs is defined through inputs. This makes the codebase predictable and easy to extend. The structure also ensures that updates to a module can be rolled out safely across all environments with minimal drift.

The environments themselves are lightweight wrappers around these modules. They only contain what is specific to that project — such as naming, configuration, or scaling parameters — while everything else comes from the shared modules. This keeps the repository clean, uniform, and scalable as new infrastructure components are added.

### Pipeline Deisgn

The pipelines have very strict naming convention following `<environment>-<project>.yaml`. Another important aspect of this code base is how it detects changes. At once you cannot deploy changes using multiple commits; this is done by the powerful workflow this repository has. In the workflow it has following steps:

- Terraform Init/ Plan :
    - Checks out code
    - Takes the latest commit sha from git logs
    - Pulls changes from the recent most folder at depth of `<environments>`
    - if same commit contains two folders it will take both
    - Creates a artifact of where to do terraform plan and apply
    - Does terraform plan on locations recieved from previous steps
    - Uploads the terraform plan as artifact for next step

- Terraform Apply:
    - Needs Manual Approval
        - This is done by configuring Github Environemnt and enabling protection on environment using Github Environment Protection
        - Once Approved it will download artifacts from previous step and apply the changes

