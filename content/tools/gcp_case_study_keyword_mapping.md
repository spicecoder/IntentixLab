# Google Cloud PCA Case Study Keyword Mapping

Source case-study labels:

| Label | Case study |
|---|---|
| A | Altostrat Media |
| C | Cymbal Retail |
| E | EHR Healthcare |
| K | KnightMotives Automotive |

Google Cloud product keywords are selected from the official Google Cloud product list: https://docs.cloud.google.com/docs/product-list

## Table 1: SR-keywords, Significant Business Situational Requirement Keywords

| SR cluster | Requirement keyword | Situational meaning | Sources |
|---|---|---|---|
| Hybrid modernization | Hybrid cloud | Workloads span on-premises and Google Cloud; architecture must bridge both worlds. | A, C, E, K |
| Hybrid modernization | On-premises legacy systems | Some legacy systems cannot move immediately and need integration/connectivity. | A, C, E, K |
| Hybrid modernization | Mainframe / outdated ERP | Core business systems need gradual modernization or replacement. | K |
| Hybrid modernization | Colocation exit | Existing data-center/colo footprint must be replaced or reduced. | E |
| Connectivity | High-performance private connectivity | Secure, performant connection between on-premises, cloud, plants, providers, or ingestion systems. | A, E, K |
| Connectivity | Rural / edge connectivity | Vehicles and remote areas need reliable connectivity for real-time features and telemetry. | K |
| Application modernization | Containerized applications | Customer-facing or platform workloads already run in Kubernetes/containers. | A, C, E |
| Application modernization | Consistent container platform | Need standard management across multiple Kubernetes/container environments. | A, E |
| Application modernization | Rapid application deployment | Infrastructure and delivery must support faster rollout of application changes. | A, E |
| Application modernization | CI/CD modernization | Modernize build, deploy, release, and centralized deployment management. | A, E |
| Scaling and reliability | High availability | Customer-facing systems or media services need resilient, always-on design. | A, E, C |
| Scaling and reliability | Dynamic scaling | Environments and services must scale for growth, traffic spikes, large catalogs, or media volume. | A, C, E |
| Scaling and reliability | Low latency | Improve customer latency globally or across distributed users. | E, K |
| Data platform | Data silos | Business data is fragmented across systems, limiting customer, provider, or corporate insight. | C, K |
| Data platform | Data ingestion | Need interfaces and pipelines to ingest provider, supplier, media, vehicle, or operational data. | A, C, E, K |
| Data platform | Analytics and insights | Analyze content, healthcare trends, customer journeys, vehicle data, or business trends. | A, E, K |
| Data platform | Reports and predictions | Generate reports and predictive insights from provider or corporate data. | E, K |
| Data platform | Data monetization | Turn corporate/vehicle/customer data into new revenue streams. | A, K |
| AI / GenAI | Generative AI | Use AI to create content, descriptions, summaries, recommendations, or experiences. | A, C, K |
| AI / GenAI | Natural language interaction | Users/customers interact through conversational or natural language interfaces. | A, C |
| AI / GenAI | Personalized recommendations | Improve engagement through personalized content, product, driver, or customer experiences. | A, C, K |
| AI / GenAI | Automated summarization | Generate concise summaries for media or other unstructured content. | A |
| AI / GenAI | Metadata / attribute extraction | Extract product attributes or rich media metadata from text, image, audio, or video. | A, C |
| AI / GenAI | Computer vision | Use image/video understanding for metadata, product imagery, safety, or vehicle intelligence. | A, C, K |
| AI / GenAI | Harmful / inappropriate content detection | Detect and filter unsafe or inappropriate generated/media content. | A |
| AI governance | Explainable / auditable AI | AI decisions must be explainable, auditable, and governable. | A, C, K |
| AI governance | Human-in-the-loop review | Human associates approve, reject, or modify AI-generated content. | C |
| Customer experience | Conversational commerce | AI agents help customers search, discover, and buy products. | C |
| Customer experience | Call-center cost reduction | Reduce manual order entry and staffing through self-service automation. | C |
| Customer experience | Dealer / CRM tooling | Dealer, sales, service, inventory, and customer interaction tools must improve. | K |
| Cost optimization | Storage cost optimization | Store growing media/content volumes cost-effectively while preserving availability. | A |
| Cost optimization | Infrastructure cost reduction | Reduce administration, hosting, manual process, or operational costs. | C, E |
| Security and compliance | Regulatory compliance | Maintain healthcare, industry, or EU data protection compliance. | E, K |
| Security and compliance | Data security and privacy | Protect customer, product, interaction, vehicle, and corporate data. | C, K |
| Security and compliance | Breach / cyber risk management | Need stronger security framework, incident response, and threat protection. | K |
| Observability | Centralized visibility | Consolidated monitoring/logging/alerting across applications and environments. | A, C, E |
| Observability | Proactive alerting | Alerts should trigger action and reduce ignored email-only operational signals. | E, C |
| Integration | Third-party / provider integration | Insurance, supplier, dealer, SFTP, API, and enterprise integrations need modernization. | C, E, K |
| Integration | File and batch integration | Legacy SFTP/file transfer/ETL must be handled during modernization. | C, E |

## Table 2: SP-keywords, Significant Google Cloud Product Keywords

| SP cluster | Product keyword | Short description | Best-fit requirement signals |
|---|---|---|---|
| Hybrid and migration | Migration Center | Accelerate end-to-end migration assessment and planning. | Colo exit, legacy modernization |
| Hybrid and migration | Migrate to VMs | Migrate VMs to Compute Engine. | Lift-and-shift migration |
| Hybrid and migration | Migrate to Containers | Migrate VM workloads to GKE/container platforms. | Container modernization |
| Hybrid and migration | VMware Engine | Managed VMware environment on Google Cloud. | VMware/colo migration |
| Hybrid and migration | Google Distributed Cloud | Distributed cloud for connected, air-gapped, bare metal, or VMware environments. | Hybrid/on-prem Kubernetes |
| Networking | Virtual Private Cloud (VPC) | Software-defined networking foundation. | Cloud network segmentation |
| Networking | Cloud VPN | Encrypted VPN connection between networks. | Secure hybrid connectivity |
| Networking | Cloud Interconnect | Dedicated high-throughput connection to Google Cloud. | High-performance hybrid connectivity |
| Networking | Cloud Router | Dynamic route exchange with BGP. | Hybrid routing |
| Networking | Network Connectivity Center | Connect VPC and on-premises networks centrally. | Multi-network/hub connectivity |
| Networking | Cloud Load Balancing | Global/multi-region load distribution and balancing. | Availability, low latency |
| Networking | Cloud CDN | Cache content near users. | Low-latency web/media delivery |
| Networking | Media CDN | CDN optimized for streaming and video. | Media delivery |
| Networking | Cloud NAT | Managed outbound internet access for private resources. | Private subnet egress |
| Application platform | Google Kubernetes Engine (GKE) | Managed Kubernetes/container orchestration. | Container workloads, scale |
| Application platform | GKE fleet management | Centralized management of multiple GKE clusters. | Multi-cluster consistency |
| Application platform | Cloud Run | Fully managed serverless application platform. | Serverless apps/APIs |
| Application platform | Cloud Run functions | Serverless event-driven functions. | Event tasks, automation |
| Application platform | App Engine | Managed app platform. | Web apps with minimal ops |
| DevOps | Cloud Build | Build and CI automation platform. | CI/CD modernization |
| DevOps | Artifact Registry | Store and manage container/software artifacts. | Container supply chain |
| DevOps | Cloud Deploy | Continuous delivery for GKE and Cloud Run. | Controlled deployments |
| DevOps | Binary Authorization | Kubernetes deploy-time security. | Policy-controlled releases |
| Data analytics | BigQuery | Data warehouse and analytics. | Trends, insights, reporting |
| Data analytics | Dataflow | Stream and batch data processing. | Pipelines, ETL, ingestion |
| Data analytics | Pub/Sub | Global real-time messaging. | Event ingestion, decoupling |
| Data analytics | Cloud Data Fusion | Graphical data-pipeline management. | ETL and integration pipelines |
| Data analytics | Datastream | Change data capture and replication. | Database replication |
| Data analytics | Looker | Enterprise BI and analytics. | Dashboards and reports |
| Data analytics | Managed Service for Apache Spark | Managed Spark and Hadoop. | Large-scale data processing |
| Databases | Cloud SQL | Managed MySQL, PostgreSQL, and SQL Server. | Relational database migration |
| Databases | Spanner | Horizontally scalable relational database. | Global scale, strong consistency |
| Databases | Bigtable | Petabyte-scale, low-latency NoSQL. | Telemetry/time-series/high volume |
| Databases | Firestore | Serverless NoSQL document database. | Web/mobile app data |
| Databases | Memorystore | Managed Redis/Memcached-compatible caching. | Low-latency cache/session data |
| AI and ML | Vertex AI | Managed platform for machine learning and generative AI. | AI models, ML lifecycle |
| AI and ML | Vertex AI Search for retail | Personalized retail search and discovery. | Retail product discovery |
| AI and ML | Conversational Agents / Dialogflow CX | Conversational AI agents. | Chatbots, virtual agents |
| AI and ML | Document AI | Analyze, classify, and search documents. | Supplier/provider document extraction |
| AI and ML | Vision API | Image recognition and classification. | Image/product/media understanding |
| AI and ML | Video Intelligence API | Video content analysis. | Video metadata and insights |
| AI and ML | Speech-to-Text | Convert audio to text. | Audio/media transcription |
| AI and ML | Translation | Language detection and translation. | Multilingual content/support |
| AI and ML | Cloud Natural Language | NLP for text analysis. | Metadata, entity/sentiment extraction |
| AI and ML | Vertex AI Vision | Ingest, analyze, and store video data. | Video intelligence pipelines |
| AI and ML | Cloud TPU / Cloud GPUs | Hardware acceleration for ML workloads. | Training/simulation acceleration |
| AI and ML | AI Hypercomputer | Supercomputer architecture for AI. | Large-scale AI/autonomous development |
| Industry APIs | Healthcare Data Engine / Cloud Healthcare API | Healthcare interoperability and healthcare data APIs. | EHR/provider data integration |
| Integration | Application Integration | Enterprise application integrations. | App-to-app orchestration |
| Integration | Integration Connectors | Enterprise application connectivity. | SaaS/third-party integration |
| Integration | API Gateway | Fully managed API gateway. | API exposure and control |
| Integration | Apigee | Full API management platform. | API products, partners, governance |
| Integration | Workflows | HTTP service orchestration. | Multi-step service automation |
| Integration | Cloud Scheduler | Managed cron service. | Scheduled jobs |
| Integration | Cloud Tasks | Asynchronous task execution. | Reliable background processing |
| Storage | Cloud Storage | Multi-class, multi-region object storage. | Media, archive, data lake files |
| Storage | Filestore | Managed network-attached storage. | Shared filesystem workloads |
| Storage | Backup and DR Service | Backup and disaster recovery SaaS. | DR and backup requirements |
| Security | IAM | Resource access control. | Least privilege |
| Security | Cloud Identity | Manage users, devices, and apps. | Workforce identity |
| Security | Identity Platform | Customer identity access management. | Customer sign-in/auth |
| Security | Managed Microsoft AD | Managed Microsoft Active Directory. | AD integration |
| Security | Cloud KMS | Hosted key management service. | Encryption key control |
| Security | Secret Manager | Store and manage secrets. | Secret handling |
| Security | Sensitive Data Protection | Classify and redact sensitive data. | PII/PHI/privacy controls |
| Security | VPC Service Controls | Security perimeters for service segregation. | Data exfiltration controls |
| Security | Security Command Center | Security and data risk management platform. | Threat/risk visibility |
| Security | Google Cloud Armor | DDoS protection and web application firewall. | Web/API edge protection |
| Security | Cloud IDS | Network-based threat detection. | Network threat detection |
| Security | Assured Workloads | Compliance-oriented workload controls. | Regulated workloads |
| Observability | Cloud Monitoring | Infrastructure and application monitoring. | Metrics, alerting |
| Observability | Cloud Logging | Centralized logs and event logging. | Log retention/search |
| Observability | Cloud Trace | Application latency insights. | Latency troubleshooting |
| Observability | Error Reporting | Application error reporting. | Error triage |
| Observability | Network Intelligence Center | Network monitoring and topology. | Network visibility |
| Cost and governance | Cloud Billing | Billing and cost management tools. | Cost tracking |
| Cost and governance | Recommender | Cloud usage recommendations and insights. | Cost/performance optimization |
| Cost and governance | Cloud Quotas | Manage service quotas and usage. | Growth planning |
| Cost and governance | Resource Manager | Cloud project metadata management. | Hierarchy/governance |
| Cost and governance | Organization Policy Service | Organization-level policy enforcement. | Governance guardrails |
| IaC | Infrastructure Manager | Automate infrastructure deployment. | Repeatable provisioning |
| IaC | Config Connector | Kubernetes add-on to manage cloud resources. | Kubernetes-native resource management |
| IaC | Terraform on Google Cloud | Infrastructure as code ecosystem. | Repeatable environment provisioning |

## Table 3: Mapping by Requirement

| Requirement cluster | SR-keywords | Source cases | SP-keyword cluster / products | Mapping rationale |
|---|---|---|---|---|
| Hybrid platform modernization | Hybrid cloud; on-premises legacy systems; colocation exit; outdated ERP/mainframe; gradual modernization | A, C, E, K | Migration Center; Migrate to VMs; Migrate to Containers; VMware Engine; Google Distributed Cloud; Compute Engine; GKE | Use assessment/migration tools where workloads can move, container migration where modernization is viable, and distributed/hybrid platforms where workloads must stay near on-prem systems. |
| Secure hybrid connectivity | High-performance private connectivity; plant/provider/cloud connectivity; rural/edge connectivity | A, E, K | Cloud Interconnect; Cloud VPN; Cloud Router; Network Connectivity Center; VPC; Cloud NAT | Dedicated or encrypted connectivity plus central network topology supports provider integrations, media ingestion, plant connectivity, and hybrid routing. |
| Container application platform | Containerized applications; consistent container platform; multi-environment management; rapid deployment | A, C, E | GKE; GKE fleet management; Cloud Run; App Engine; Cloud Run functions | GKE fits containerized workloads and multi-cluster management; Cloud Run/functions fit event-driven or serverless components. |
| CI/CD and release governance | CI/CD modernization; centralized deployment; rapid application deployment; policy-controlled releases | A, E | Cloud Build; Artifact Registry; Cloud Deploy; Binary Authorization; Infrastructure Manager; Terraform; Config Connector | Build, artifact, deploy, and policy tools create a repeatable software delivery path across GKE/Cloud Run and reduce admin effort. |
| Availability, scale, and latency | 99.9% availability; high availability; dynamic scaling; low latency; traffic spikes; global customer experience | A, C, E, K | Cloud Load Balancing; Cloud CDN; Media CDN; GKE; Cloud Run; Spanner; Bigtable; Memorystore; Cloud Monitoring | Managed autoscaling, global load balancing, edge caching, low-latency data stores, and monitoring address reliability and performance. |
| Media and content intelligence | Media library; summarization; metadata extraction; NLP; computer vision; inappropriate content detection; content trends | A | Vertex AI; Video Intelligence API; Vision API; Speech-to-Text; Cloud Natural Language; Cloud Storage; BigQuery; Dataflow; Pub/Sub | Store media in Cloud Storage, transcribe/analyze with AI APIs and Vertex AI, process events with Pub/Sub/Dataflow, and analyze results in BigQuery. |
| Retail catalog enrichment | Product attributes; product descriptions; image generation/enhancement; supplier data; product accuracy/consistency; HITL review | C | Vertex AI; Vision API; Document AI; Cloud Natural Language; Cloud Storage; Cloud SQL/Firestore; Cloud Run; Workflows | GenAI and vision/NLP services extract and generate catalog content, while application services and workflows support review and update flows. |
| Conversational experiences | Natural language interaction; conversational commerce; virtual agents; self-service support; personalized assistance | A, C | Conversational Agents / Dialogflow CX; Vertex AI; Vertex AI Search for retail; Identity Platform; Cloud Run; API Gateway | Conversational agents handle natural language journeys; retail search supports product discovery; application/API layers integrate them into websites/apps. |
| Personalization and recommendation | Personalized recommendations; targeted marketing; personalized shopping; personalized driver/customer relationship | A, C, K | Vertex AI; BigQuery; Looker; Pub/Sub; Dataflow; Firestore; Memorystore; Vertex AI Search for retail | Combine behavior/event data, analytics, ML, and low-latency application data to drive recommendations and personalization. |
| Data ingestion and analytics | Data ingestion; ETL; provider/supplier/vehicle/media data; analytics; reports; predictions; data monetization | A, C, E, K | BigQuery; Dataflow; Pub/Sub; Cloud Data Fusion; Datastream; Managed Service for Apache Spark; Looker; Bigtable; Cloud Storage | Streaming/batch ingestion and warehouse/lake patterns turn operational data into reports, predictions, dashboards, and monetizable datasets. |
| Healthcare interoperability and compliance | Insurance-provider onboarding; healthcare trends; provider data; regulatory compliance; legacy provider interfaces | E | Healthcare Data Engine / Cloud Healthcare API; Apigee; API Gateway; Application Integration; Cloud Interconnect; BigQuery; Looker; Assured Workloads; Sensitive Data Protection | Healthcare APIs and integration products speed provider onboarding, while analytics and compliance/security controls support regulated healthcare data use. |
| Enterprise and third-party integration | SFTP/file transfer; API integration; supplier/provider/dealer/CRM integration; manual process reduction | C, E, K | Application Integration; Integration Connectors; Apigee; API Gateway; Workflows; Cloud Scheduler; Cloud Tasks; Cloud Data Fusion | Integration services connect legacy, SaaS, API, and batch processes while orchestration services reduce manual operational steps. |
| Security, privacy, and risk | Data security; EU data protection; breach risk; cyber threats; privacy; secure customer/vehicle/product data | C, E, K | IAM; Cloud Identity; Identity Platform; Managed Microsoft AD; Cloud KMS; Secret Manager; Sensitive Data Protection; VPC Service Controls; Security Command Center; Cloud Armor; Cloud IDS; Assured Workloads | Identity, encryption, privacy classification, service perimeters, threat detection, edge protection, and regulated workload controls form the core security stack. |
| Observability and operations | Centralized visibility; proactive alerting; log retention; ignored email alerts; performance and usage visibility | A, C, E | Cloud Monitoring; Cloud Logging; Error Reporting; Cloud Trace; Network Intelligence Center; Service Health | Centralized logging/metrics/tracing plus actionable alerting replaces fragmented open-source monitoring and ignored email-only alerts. |
| Cost optimization and governance | Storage cost optimization; infrastructure admin cost reduction; hosting cost reduction; quota/cost visibility | A, C, E | Cloud Storage storage classes/lifecycle; Cloud Billing; Recommender; Cloud Quotas; Resource Manager; Organization Policy Service | Storage lifecycle and governance tools reduce spend while keeping growth, policies, and usage visible. |
| Autonomous vehicle AI and simulation | Autonomous driving; simulation environment; scalable AI/ML infrastructure; vehicle telemetry; safety insights | K | Vertex AI; Cloud TPU; Cloud GPUs; AI Hypercomputer; BigQuery; Bigtable; Pub/Sub; Dataflow; Cloud Storage; Google Distributed Cloud | Large-scale ML training/simulation plus streaming telemetry and high-volume analytics support autonomous feature development and safety analysis. |
| Dealer and CRM modernization | Build-to-order reliability; dealer tools; sales/service/inventory; CRM; customer transparency | K | Cloud Run; GKE; Cloud SQL; Spanner; Firestore; Apigee; Application Integration; Looker; Identity Platform | Modern app platforms, scalable databases, API/integration tools, BI, and customer identity support reliable dealer/customer workflows. |
