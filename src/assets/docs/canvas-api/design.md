# Design

This project is structured as a modular serverless ETL system. Each part of the workflow is separated into its own Lambda function, with AWS Step Functions coordinating the overall execution. The result is a clean, fault-tolerant pipeline that extracts data, transforms it, and loads it into MongoDB.

### Workflow Design

The Step Function acts as the backbone of the system. It defines a sequence of states — each representing a Lambda function call. A successful output from one function is passed as the input to the next, forming a controlled and traceable data pipeline.

Typical flow:

```

Extract → Transform → Validate → Load

```

1. Extract – Fetches data from an API (like Canvas or another service) using authenticated requests.  
2. Transform – Normalizes and cleans the data. Handles schema differences, timestamps, and nulls.  
3. Validate – Ensures data integrity before persistence.  
4. Load – Inserts the final dataset into MongoDB, maintaining audit trails and update timestamps.

Each step runs independently, allowing partial retries and parallel execution where possible. This structure keeps the pipeline resilient and cost-efficient.

### Infrastructure and Deployment

The entire setup is provisioned with Terraform:
- Lambda Functions – Defined as modular resources, each with its own IAM role and environment configuration.  
- Step Functions – Declared using a state machine definition file for easy modification.  
- MongoDB Connection – Managed via environment variables and stored in AWS Secrets Manager for security.  
- API Gateway (optional) – Used when the ETL needs to be triggered externally or exposed as an endpoint.

GitHub Actions handle the CI/CD pipeline. Each commit runs Terraform plan checks, applies on approval, and packages updated Lambda code for deployment.

### Data Storage and Schema

MongoDB stores both raw and transformed datasets in separate collections.  
- Raw collection – Stores data as fetched from the API for traceability.  
- Processed collection – Holds cleaned and structured data used for analytics or dashboards.  

This dual-layer design supports debugging and reproducibility — you can always trace any record back to its original source data.

### Extensibility

The pipeline isn’t limited to Canvas. It can be connected to any REST API, webhook feed, or event stream by:
- Adding a new “Extract” Lambda handler  
- Extending the transformation logic  
- Defining a new Step Function branch  

This makes it reusable for different data automation scenarios — from analytics ingestion to operational monitoring.

### Summary

The system uses AWS Step Functions as an orchestrator and MongoDB as the persistence layer to create a lightweight, serverless ETL engine.  
It scales automatically, runs on demand, and requires no maintenance — turning data integration into a code-defined process that’s consistent, repeatable, and easy to extend.
