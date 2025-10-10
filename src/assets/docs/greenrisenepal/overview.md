# Green Rise Nepal

> This document breaks down the idea, system design, and purpose behind Green Rise Nepal — a digital platform I built to promote sustainable practices, connect green startups, and track real environmental impact across Nepal.

### Overview

Green Rise Nepal started as an idea to give small local initiatives a voice — farmers switching to solar, community plantations, recycling drives — and to make that data actually visible in one place.  
I wanted to design something clean, trackable, and modern — not just another awareness website.  

The platform combines a public-facing portal for stories and statistics with an internal dashboard for project tracking, partner management, and environmental metrics. It’s built to feel light but structured, with clear analytics around activities, locations, and outcomes.

### Architecture

Green Rise runs on a simple but scalable stack:
- Frontend: React + Vite, styled with Outfit and minimal components.
- Backend: Node + Express with a REST API for project listings, partners, metrics, and sustainability reports.
- Database: MongoDB for flexible document storage (project submissions, images, and updates).
- Hosting & CI/CD: Deployed via Nginx and Docker, with automated builds on GitHub Actions.
- Analytics: Integrated chart components for live stats (e.g., total trees planted, CO₂ offset, and partner reach).

Each project submission triggers a workflow — it’s validated, stored, and visualized on the main dashboard. The system uses background jobs to periodically sync data and generate monthly reports.

### Data Model

The backend is structured around three main collections:
- Projects: name, description, location, category, start/end dates, impact metrics.
- Partners: name, type (NGO, company, school, etc.), and associated projects.
- Reports: auto-generated monthly snapshots for analytics and public transparency.

Everything stays tenant-agnostic but easy to extend — I designed it so NGOs, local groups, or even government programs can integrate later without changing the schema.

### Tech Highlights

- Dynamic project filtering with pagination and lazy loading.  
- Smart caching for image-heavy content using Nginx layers.  
- A modular API with proper error boundaries and rate limits.  
- Built-in email notifications for project approvals and updates.  
- GitOps-style deployment with clean environment separation (`dev` and `prod`).

### Impact & Vision

The main goal of Green Rise Nepal is visibility.  
There are hundreds of small sustainability efforts happening every month — this platform makes them measurable. It turns individual actions into shared data, something policymakers or researchers can actually build on.

For me, it’s also a creative experiment in combining software engineering with environmental work — a way to show how clean code and clean design can help tell meaningful stories.


