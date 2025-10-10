# Automation

The automation side of this setup is handled entirely through GitHub Actions using OpenID Connect for authentication with AWS. Every change merged to the main branch automatically triggers a plan and apply workflow that runs Terraform against the appropriate environment. This makes the repository self-maintaining — there are no manual steps to provision or update infrastructure. The same mechanism is used to deploy Lambda functions, update EKS node groups, or roll out new environment modules.

The bootstrap layer also provisions self-hosted GitHub runners inside EC2 instances. These runners are launched, configured, and destroyed automatically based on the workflows. This setup keeps the CI/CD layer close to the infrastructure and avoids reliance on external build agents.

By integrating the backend, automation, and provisioning logic into one repository, I can track every infrastructure change, reproduce it anytime, and maintain complete control over the entire pipeline from code to deployment.