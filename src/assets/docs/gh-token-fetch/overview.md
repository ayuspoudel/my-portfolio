
# Overview

When building automations around GitHub, authentication becomes one of the trickiest parts to handle cleanly. Personal access tokens are long-lived, often over-scoped, and not ideal for automated workflows. GitHub Apps, on the other hand, offer a secure, short-lived, and auditable approach — but fetching those installation tokens reliably in CI/CD environments is a hassle.

This project solves that problem through a lightweight command-line utility written in Rust. It fetches short-lived GitHub installation tokens by generating a JWT signed with a GitHub App’s private key and exchanging it with the GitHub API. The tool is fully self-contained — no dependencies, no runtime, just a single binary that can be dropped into any pipeline or used locally.

### What it does

The utility handles the full authentication flow required by GitHub Apps:

1. Reads a GitHub App private key from disk or environment  
2. Generates a JWT signed with that key  
3. Exchanges the JWT for an installation access token using GitHub’s REST API  
4. Outputs the token for direct use in workflows, scripts, or API clients  

The process takes only a few milliseconds and avoids storing credentials anywhere. It’s designed to be used by pipelines or server-side jobs that need short-lived GitHub access without human interaction.

The token can then be used to clone repositories, call the GitHub REST API, or trigger actions programmatically — all without ever exposing a personal access token.

# Design

### Code Design

The code is structured in a modular way, focusing on separation of logic rather than abstraction. Each Rust module handles a distinct part of the flow:

```

src/
├── main.rs           → CLI entrypoint (argument parsing, routing)
├── jwt.rs            → Handles JWT creation and signing
└── fetch_token.rs    → Exchanges JWT for installation token

```

The CLI uses `clap` for command parsing and `reqwest` for API calls. Serialization is handled through `serde`, and JWT creation uses the `jsonwebtoken` crate. This keeps the binary lean while remaining highly readable and maintainable.

### Security and Efficiency

Because this is written in Rust, it compiles into a single statically linked binary that’s both safe and portable. The tool never stores or caches tokens; it only generates and prints them. Each token is short-lived (usually one hour), reducing the attack surface for any automation that relies on it.

It can be embedded into CI/CD workflows, container builds, or other scripts without introducing any runtime dependencies like Python or Node. This makes it ideal for minimal environments like GitHub Actions, CodeBuild, or even EC2 instances that just need quick GitHub access.

### Release and Distribution

Releases are automated using GitHub Actions. The workflows build binaries for Linux, macOS, and Windows, attach them as release artifacts, and update version metadata automatically through `CHANGE_LOG.md`. A shell installer (`install.sh`) simplifies installation across systems, and developers can install it directly from a release URL.

Every build is reproducible — tagged commits trigger versioned releases, and all binaries are built from clean environments. This ensures that the tool can be trusted in production pipelines without manual intervention.

### Summary

This project represents a small but critical piece of my automation ecosystem. It removes the manual steps from GitHub App authentication, keeps credentials ephemeral, and provides a clean CLI that other systems can depend on. 

It’s a practical example of how small, focused tools can have a big impact on simplifying automation workflows — reliable, secure, and built for speed.
