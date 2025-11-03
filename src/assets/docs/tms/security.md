# Security Model

### 1. Authentication

* All authentication in TMS is JWT-based.
* Users receive a **short-lived access token** (default 15 minutes) after login.
* A **long-lived refresh token** (valid for 7 days) is issued alongside and stored securely in the `UserToken` table.
* Access tokens are never reused; the frontend silently refreshes them before expiry.
* Every API request must include the access token in the Authorization header.
* API Gateway validates the token signature and expiry before forwarding to any service.

### 2. Role-Based Access Control (RBAC)

* RBAC governs what actions a user or service can perform.
* Roles are hierarchical and scoped: `OWNER`, `ADMIN`, `DEVELOPER`, `VIEWER`.
* Each role defines access to certain modules:

  * `OWNER`: full access to all organizations, users, and integrations.
  * `ADMIN`: manage AWS, GitHub, and clusters, but cannot delete organizations.
  * `DEVELOPER`: manage jobs, workflows, and logs.
  * `VIEWER`: read-only access to dashboards and metrics.
* Role mappings are stored in the `RBAC` table.
* RBAC rules are enforced both at the API Gateway layer and within Lambda handlers.

### 3. Service Identity and Token Exchange

* Every internal Lambda or microservice also authenticates using a **service token**.
* These tokens are issued by the `User Service` and validated via a shared secret.
* When one service invokes another (for example, Connect → EKS), it uses a **temporary service token** signed with a time-based expiry.
* This prevents lateral movement between services if a single token is compromised.

### 4. AWS IAM Integration

* Each connected AWS account creates a dedicated IAM role with **external ID trust** for TMS.
* This ensures TMS can assume the role only when the external ID matches the organization ID in the `Connect Table`.
* The IAM policy grants least-privilege access:

  * EC2, EKS, CloudFormation, S3, IAM, and CloudWatch actions are restricted to the TMS-managed resources.
* Pulumi assumes these roles dynamically during cluster provisioning.

### 5. Data Protection, Session and Revocation Handling

* All network traffic is served over HTTPS using TLS 1.3.
* DynamoDB and S3 data are encrypted at rest using AWS-managed KMS keys.
* No plaintext tokens or credentials are ever stored.
* Secrets such as GitHub PATs or SMTP credentials are encrypted before storage using AES-256 and decrypted only at runtime inside the Lambda memory space.
* Logout triggers a hard delete of the refresh token from the `UserToken` table.
* Token revocation also propagates via the Event Bus to all services.
* Revoked tokens are cached in memory for instant validation failure.
* If a user’s role is downgraded or revoked, the corresponding service tokens are invalidated immediately.



