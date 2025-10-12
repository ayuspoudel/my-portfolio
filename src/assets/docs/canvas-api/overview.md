# Overview

This project is a serverless ETL framework built to automate data collection, transformation, and storage. While it integrates with Canvas LMS as an example, the design can work with any REST API or data source that produces structured data.

The system is fully event-driven. AWS Step Functions orchestrate multiple AWS Lambda functions — each responsible for a small, isolated part of the pipeline. The flow starts with a Lambda that fetches data from an API, passes it to another function for transformation or enrichment, and finally writes the processed result into MongoDB.

MongoDB acts as the persistence layer, storing raw and processed data for reporting and downstream analytics. Its flexible schema makes it ideal for data coming from multiple API endpoints with varying structures. 

### What it does

- Uses AWS Step Functions to coordinate multiple ETL steps  
- Extracts data from Canvas (or any API) through scheduled or triggered Lambda runs  
- Transforms and cleans data in intermediate Lambda stages  
- Stores processed data in MongoDB for dashboards, reporting, or further aggregation  
- Uses Terraform to provision infrastructure and define execution roles  
- Deploys automatically via GitHub Actions for continuous updates  

This framework can be adapted to collect and process data from almost any system. It’s simple, modular, and designed to scale — a clean example of how to combine AWS Step Functions and MongoDB to automate ETL workloads without maintaining servers.
