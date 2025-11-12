# Jira Github Integration Overview

Managing tickets manually between Jira & Github Issues can get tedious fast. Developers often open PRs, fix bugs, fix and release (hotfix), while PMs track those tasks in Jira or Azure Devops or AHA, or other ticketing systems.
While Github Issues can work great to track such activities, it is not so much plausible for a product based team to have all tasks inside Github.
Therefore, this is a simple demonstration of how:
- We can integrate Jira & Github
- Easily maintain it as it is serverless
- Everything lives as code, native to what developers are used to (this one is Python)
- It is easy to extend and add more features, no need to bundle or package the API, just clean functions once written can be pushed to lambda

The design is simple, fast, and modular. Each function handles one concern — authentication, triage, or ticket creation — and the whole codebase runs in a few hundred milliseconds per event. Everything is packaged in a Docker container and deployed as a Lambda function through AWS.


### What it does

- Listens to GitHub webhooks such as issues, pull requests, and commits
- Parses the incoming payload to determine which Jira project or issue type it maps to
- Authenticates with Jira using API tokens (handled securely through AWS Secrets Manager)
- Creates or updates corresponding Jira issues automatically
- Can also post comments or metadata back to GitHub to close the loop


Here’s a simplified flow:

GitHub Event → EventBridge / API Gateway 
                          ↓
                     AWS Lambda
                          ↓
                Lambda parses payload
                          ↓
                Authenticates to Jira (via jira_authentication.py)
                          ↓
                Routes to handler (create_ticket.py or automated_triage.py)
                          ↓
                Uses Jira REST API to create / update issues


### Why Serverless

Serverless makes sense here because this system doesn’t need to run continuously — it just needs to wake up when there’s something to do. Each GitHub event is handled independently, which keeps the cost almost zero. The code runs statelessly; there’s no database or queue layer. AWS Lambda and EventBridge handle all scaling and retry logic out of the box.

The container-based deployment also simplifies dependency management. The Dockerfile packages the Python dependencies directly, so the function can be deployed easily using GitHub Actions. That makes it consistent, repeatable, and cloud-agnostic.

### Release Automation

```bash
on:
  push:
    branches:
      - master 
    ...
    - name: Build Container from the functions defined in code
    - name: Log in to AWS ECR using AWS CLI
    - name: Push Docker image to ECR
    - name: Trigger event to refresh lambda to fetch newly pushed container
```


### Summary

This project represents my take on small, event-driven automation — where one clean Lambda function can bridge two ecosystems. It doesn’t replace Jira or GitHub; it connects them seamlessly, keeping both systems synchronized with zero manual effort.

It’s simple by design, but incredibly useful for keeping workflows clean, traceable, and fully automated from code commit to ticket resolution.
