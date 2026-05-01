---
title: AnyCurrency Bank Lab
order: 7
description: A hands-on Google Cloud PCA implementation lab for Intention Space using Customer, Shop, Seller, Bank, FX, and AI-mediated Signals.
---

# AnyCurrency Bank Lab

This lab turns Intention Space into a hands-on implementation exercise. It uses an imaginary multi-currency transaction world where a Customer buys from a Shop, the Seller receives settlement, the Bank authorizes payment, an FX service converts currency, and optional AI mediaries help route or explain unresolved Signals.

The purpose is not to build a real bank. The purpose is to make Intention Space concrete enough for Google Cloud Professional Architect implementation practice.

The lab covers:

- GridLookout native UI implementation
- device-side CPUX and client-side DNs
- server-side DN containers
- Signal contracts
- Object reflection and audit
- Cloud Run deployment
- Pub/Sub events
- Firestore or Spanner persistence
- BigQuery trace analysis
- Apigee-style API governance
- Terraform and staged global rollout

---

## 1. Learning Goal

By the end of the lab, learners should understand how an Intention Space application can be deployed and operated as a cloud solution.

The core idea:

```text
Human perception
  → GridLookout Cell
  → Signal
  → Client Intention Container
  → Client DN or Server DN
  → Object reflection
  → Field update
  → visible response
```

This is also a useful bridge into Google Cloud PCA Section 5: managing implementation.

---

## 2. Domain Story

A Customer wants to buy tea from a Shop.

The Customer may pay in any currency.
The Shop may price goods in another currency.
The Bank authorizes funds.
The FX DN converts currency if required.
The Seller receives settlement.
The system records all important transitions as Signals.

Example transaction:

```text
Customer buys tea for 5 ACU.
Bank authorizes payment.
Shop releases goods.
Seller receives settlement.
Receipt is emitted.
```

ACU means Any Currency Unit.

---

## 3. Intention Space Mapping

| Lab concept | Intention Space concept |
|---|---|
| Customer action | Signal emitted from GridLookout |
| Bank authorization | Server-side DN |
| FX conversion | Server-side DN |
| Cart state | Client-side O_holder accumulation |
| Payment result | Reflected Signal |
| Receipt | CPUX release Signal |
| Audit | Object persistence stream |
| UI update | GridLookout cell subscription |

---

## 4. Architecture Diagram

<div class="diagram-wrap">
<svg viewBox="0 0 980 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="AnyCurrency Bank Lab architecture">
  <defs>
    <style>
      .box { fill:#ffffff; stroke:#1f2937; stroke-width:2; rx:12; }
      .group { fill:#f8fafc; stroke:#64748b; stroke-width:2; rx:18; }
      .title { font:700 18px system-ui, -apple-system, Segoe UI, sans-serif; fill:#111827; }
      .text { font:14px system-ui, -apple-system, Segoe UI, sans-serif; fill:#1f2937; }
      .small { font:12px system-ui, -apple-system, Segoe UI, sans-serif; fill:#475569; }
      .arrow { stroke:#2563eb; stroke-width:2.5; fill:none; marker-end:url(#arrowhead); }
    </style>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" />
    </marker>
  </defs>

  <rect x="30" y="40" width="390" height="430" class="group"/>
  <text x="55" y="75" class="title">Client Device</text>

  <rect x="70" y="105" width="300" height="70" class="box"/>
  <text x="95" y="135" class="text">GridLookout Native UI</text>
  <text x="95" y="158" class="small">Cells render Pulses and emit Signals</text>

  <rect x="70" y="215" width="300" height="80" class="box"/>
  <text x="95" y="245" class="text">Device CPUX Engine</text>
  <text x="95" y="268" class="small">FieldBoard, ICs, Visitor, Golden Pass</text>

  <rect x="70" y="335" width="300" height="80" class="box"/>
  <text x="95" y="365" class="text">Client-side DNs</text>
  <text x="95" y="388" class="small">Cart, Login, Local State, Cross-App State</text>

  <rect x="550" y="40" width="390" height="430" class="group"/>
  <text x="575" y="75" class="title">Google Cloud Server Domain</text>

  <rect x="590" y="105" width="300" height="70" class="box"/>
  <text x="615" y="135" class="text">Apigee / API Boundary</text>
  <text x="615" y="158" class="small">Auth, quotas, schema validation, routing</text>

  <rect x="590" y="215" width="300" height="80" class="box"/>
  <text x="615" y="245" class="text">Server-side DN Containers</text>
  <text x="615" y="268" class="small">Bank Auth, FX, Shop Release, Ledger</text>

  <rect x="590" y="335" width="300" height="80" class="box"/>
  <text x="615" y="365" class="text">Persistence and Audit</text>
  <text x="615" y="388" class="small">Firestore / Spanner / Pub/Sub / BigQuery</text>

  <path d="M220 175 L220 215" class="arrow"/>
  <path d="M220 295 L220 335" class="arrow"/>
  <path d="M370 255 C455 255 505 140 590 140" class="arrow"/>
  <path d="M740 175 L740 215" class="arrow"/>
  <path d="M740 295 L740 335" class="arrow"/>
  <path d="M590 255 C505 255 455 375 370 375" class="arrow"/>

  <text x="415" y="225" class="small">Signal over IPTP/API</text>
  <text x="430" y="365" class="small">Reflected response</text>
</svg>
</div>

---

## 5. Client DN vs Server DN

This distinction is essential.

### Client-side DN

A client-side DN belongs to the device CPUX.

It may handle:

- cart accumulation
- local login flow
- local app state
- cross-app state
- offline perception history
- UI-facing response preparation

It receives Signals directly from GridLookout cells through the receptor Intention Container.

```text
GridLookout Cell
  → Signal
  → receptor IC
  → O_holder
  → client DN
  → O_reflector
  → ic:pickup
  → cell update and Field absorption
```

### Server-side DN

A server-side DN is a domain service container.

It may handle:

- bank authorization
- FX conversion
- ledger write
- seller settlement
- inventory release
- AI-mediated explanation or routing

It receives a Signal from the client CPUX or from a server CPUX.

```text
Client CPUX
  → Signal
  → API boundary
  → server DN container
  → reflected Signal
  → client CPUX or server CPUX
```

Both sides obey the same Signal idea, but the locus is different.

---

## 6. First Contact

The app begins with a First Contact Signal.

A bare GridLookout receives a manifest, renders the initial scene, and connects the CPUX engine.

The manifest has two major parts:

```json
{
  "app": "anycurrency-bank",
  "version": "1.0.0",
  "scene": {
    "schemaName": "GridLookout",
    "schemaVersion": "1.1",
    "cells": []
  },
  "cpux": {
    "id": "payment_cpux",
    "mode": "frontend",
    "signals": {},
    "ics": [],
    "triggerSignal": {}
  }
}
```

The First Contact pattern keeps GridLookout focused on rendering and action capture, while the manifest adapter and CPUX engine handle validation, routing, and execution.

---

## 7. Repo Layout

```text
anycurrency-is-bank/
  client/
    gridlookout-web/
    gridlookout-android/
    gridlookout-ios/
    cpux-device-engine/
    device-dns/
      dn-cart/
      dn-login/
      dn-local-state/

  server/
    apigee/
    cpux-server-engine/
    dns/
      dn-bank-auth/
      dn-fx-convert/
      dn-shop-release/
      dn-ledger-write/
    object-api/
    manifest-api/

  infra/
    terraform/
    scripts/

  tests/
    contract/
    unit/
    integration/
    load/
    native-gridlookout/
    device-cpux/
    server-domain/

  manifests/
    dev/
    test/
    prod/

  traces/
```

---

## 8. Standard Signal Shape

```json
{
  "schemaVersion": "1.0",
  "traceId": "trace-001",
  "tenantId": "shop-demo",
  "cpuxId": "payment_cpux",
  "source": "client-device",
  "region": "asia-south1",
  "intention": "payment_request",
  "pulses": [
    { "phrase": "item", "tv": "Y", "responses": ["tea"] },
    { "phrase": "price", "tv": "Y", "responses": ["5"] },
    { "phrase": "currency", "tv": "Y", "responses": ["ACU"] },
    { "phrase": "_perception_mode", "tv": "Y", "responses": ["commit"] }
  ]
}
```

---

## 9. Lab Sequence

### Lab 1 — Local Payment CPUX

Build the simplest payment flow.

```text
Customer
  → payment_request

Bank DN
  → payment_authorized

Shop DN
  → goods_release

Receipt DN
  → payment_complete
```

Observe:

- Field absorption
- pickup events
- IC activation
- Golden Pass

---

### Lab 2 — Add Cart Accumulation

Use O_holder to accumulate cart actions.

```text
add tea
add bread
add milk
commit checkout
```

O_holder perception stack:

```json
{
  "phrase": "item",
  "tv": "Y",
  "responses": ["tea", "bread", "milk"]
}
```

The commit action triggers the payment CPUX.

---

### Lab 3 — Add FX Conversion

Insert the FX DN.

```text
payment_request
  → bank_auth
  → fx_convert
  → shop_release
  → receipt
```

Example FX Signal:

```json
{
  "intention": "fx_convert",
  "pulses": [
    { "phrase": "from_currency", "tv": "Y", "responses": ["AUD"] },
    { "phrase": "to_currency", "tv": "Y", "responses": ["EUR"] },
    { "phrase": "amount", "tv": "Y", "responses": ["5"] }
  ]
}
```

---

### Lab 4 — Failure and Compensation

Force insufficient funds.

```json
{
  "intention": "bank_auth_result",
  "pulses": [
    { "phrase": "balance_sufficient", "tv": "N", "responses": ["false"] }
  ]
}
```

Then emit:

```text
payment_failed
```

Optionally trigger:

```text
offer_credit_cpux
```

This demonstrates alternate release paths and compensation.

---

### Lab 5 — Local Google Cloud Emulators

Start Firestore emulator:

```bash
gcloud beta emulators firestore start \
  --host-port=localhost:8080
```

Use it from tests:

```bash
export FIRESTORE_EMULATOR_HOST=localhost:8080
npm test -- tests/integration/firestore-object-persistence.test.js
```

Start Pub/Sub emulator:

```bash
gcloud beta emulators pubsub start \
  --project=anycurrency-test \
  --host-port=localhost:8085
```

Use it from tests:

```bash
export PUBSUB_EMULATOR_HOST=localhost:8085
npm test -- tests/integration/pubsub-signal-events.test.js
```

---

### Lab 6 — Build Server DN Containers

Set common variables:

```bash
export PROJECT_ID="anycurrency-test"
export REGION_DEV="asia-south1"
export REPO="anycurrency-dn-repo"
```

Create Artifact Registry repository:

```bash
gcloud artifacts repositories create "$REPO" \
  --repository-format=docker \
  --location="$REGION_DEV" \
  --description="Container images for Intention Space DNs"
```

Build all server DNs:

```bash
for DN in dn-bank-auth dn-fx-convert dn-shop-release dn-ledger-write; do
  gcloud builds submit "server/dns/$DN" \
    --tag "$REGION_DEV-docker.pkg.dev/$PROJECT_ID/$REPO/$DN:dev"
done
```

---

### Lab 7 — Deploy Server DNs to Cloud Run

```bash
for DN in dn-bank-auth dn-fx-convert dn-shop-release dn-ledger-write; do
  gcloud run deploy "$DN" \
    --image "$REGION_DEV-docker.pkg.dev/$PROJECT_ID/$REPO/$DN:dev" \
    --region "$REGION_DEV" \
    --no-allow-unauthenticated \
    --set-env-vars "ENV=dev,IS_REGION=$REGION_DEV"
done
```

Keep server DNs private unless the lab explicitly exposes a public test endpoint.

---

### Lab 8 — Publish Manifests

```bash
export BUCKET="gs://${PROJECT_ID}-is-manifests"

gcloud storage buckets create "$BUCKET" \
  --location="$REGION_DEV"

gcloud storage cp manifests/dev/*.json "$BUCKET/manifests/dev/"
gcloud storage cp manifests/test/*.json "$BUCKET/manifests/test/"
gcloud storage cp manifests/prod/*.json "$BUCKET/manifests/prod/"
```

Equivalent gsutil form:

```bash
gsutil mb -l "$REGION_DEV" "$BUCKET"
gsutil cp manifests/dev/*.json "$BUCKET/manifests/dev/"
```

---

### Lab 9 — BigQuery Audit Table

```bash
bq mk --location="$REGION_DEV" \
  --dataset "$PROJECT_ID:is_audit"

bq mk \
  --table "$PROJECT_ID:is_audit.signal_events" \
  trace_id:STRING,cpux_id:STRING,ic_id:STRING,intention_id:STRING,pulse_phrase:STRING,tv:STRING,region:STRING,timestamp:TIMESTAMP
```

Example query:

```sql
SELECT
  intention_id,
  COUNT(*) AS event_count
FROM `PROJECT_ID.is_audit.signal_events`
GROUP BY intention_id
ORDER BY event_count DESC;
```

---

## 10. Testing Split

Testing is deliberately split into three major areas.

### Native GridLookout Tests

Purpose:

```text
Can this platform perceive and emit?
```

Test:

- cell rendering
- pulse phrase display
- response rendering
- touch/click/voice action capture
- cell action to Signal construction
- subscription filtering
- cell update from reflected Signal

Folder:

```text
tests/native-gridlookout/
```

---

### Device CPUX Engine Tests

Purpose:

```text
Can the local app state progress correctly?
```

Test:

- IC activation
- O_holder accumulation
- O_reflector pickup
- direct UI path bypassing synctest
- Visitor path using synctest
- Golden Pass sleep/wake
- resume/reset/commit
- local persistence replay

Folder:

```text
tests/device-cpux/
```

---

### Server Domain Tests

Purpose:

```text
Can domain services process Signals safely?
```

Test:

- bank authorization
- FX conversion
- ledger write
- shop release
- compensation path
- API authentication
- retry and idempotency
- server-side CPUX if used

Folder:

```text
tests/server-domain/
```

---

### Contract Tests

Purpose:

```text
Can client and server agree on Signal meaning?
```

Test:

- Signal schema
- IPTP envelope
- Pulse shape
- trivalence values
- trace fields
- manifest version
- Object RTM shape

Folder:

```text
tests/contract/
```

---

## 11. Region Movement Strategy

The lab starts in Mumbai and expands gradually.

### Stage 0 — Local

```text
Firestore emulator
Pub/Sub emulator
local CPUX
local DN containers
local GridLookout
```

Goal: prove the protocol.

---

### Stage 1 — Mumbai Dev

```text
Region: asia-south1
Environment: dev
```

Deploy:

- Cloud Run server DNs
- manifest bucket
- Pub/Sub topics
- Firestore or Spanner test database
- BigQuery audit dataset

Goal: prove cloud deployment.

---

### Stage 2 — Mumbai Test

```text
Region: asia-south1
Environment: test
```

Add:

- Terraform-managed infrastructure
- CI/CD deployment
- load tests
- Apigee test proxy
- IAM hardening

Goal: prove repeatable implementation.

---

### Stage 3 — Mumbai Production

```text
Region: asia-south1
Environment: prod
```

Add:

- private Cloud Run services
- production service accounts
- monitoring alerts
- audit export
- controlled manifest publishing
- rollback plan

Goal: controlled regional production.

---

### Stage 4 — Asia Expansion

```text
Primary: asia-south1
Secondary: asia-southeast1
```

Replicate services:

```bash
for REGION in asia-south1 asia-southeast1; do
  gcloud run deploy dn-bank-auth \
    --image "$REGION_DEV-docker.pkg.dev/$PROJECT_ID/$REPO/dn-bank-auth:prod" \
    --region "$REGION" \
    --no-allow-unauthenticated
done
```

Goal: regional resilience and latency improvement.

---

### Stage 5 — Worldwide

```text
asia-south1
europe-west1
us-central1
asia-southeast1
```

Add:

- global HTTPS load balancing or Apigee global entry
- region-aware routing
- tenant placement policy
- data residency rules
- global trace correlation

Goal: global Intention Space deployment.

---

## 12. Terraform Principle

Everything should be declared.

```text
Cloud Run services
Artifact Registry repositories
Pub/Sub topics
Firestore or Spanner databases
BigQuery datasets
Cloud Storage buckets
IAM bindings
Apigee proxies
Monitoring alerts
```

Everything should be versioned.

```text
DN container image
CPUX manifest
GridLookout scene
Signal schema
Object RTM
AI mediator policy
Terraform module
```

---

## 13. Apigee/API Boundary

The API boundary protects server-side DNs.

Apply:

```text
JWT validation
API key or app identity
quota per tenant
schema validation
rate limiting
version routing
threat protection
trace header enforcement
```

Example public routes:

```text
/IPTP/v1/first-contact
/IPTP/v1/signals
/IPTP/v1/server-dn/bank-auth
/IPTP/v1/server-dn/fx-convert
/IPTP/v1/manifests
```

Internal DN services should remain private.

---

## 14. AI Mediary Extension

AI mediaries are optional DNs.

They can help with:

- explaining why a payment failed
- suggesting the next action
- detecting incomplete Signals
- proposing route resolution
- translating human language into draft Pulses

But they must not silently alter committed payment facts.

Recommended rule:

```text
AI may propose Signals.
Only trusted CPUX/Object rules may commit them.
```

---

## 15. PCA Section 5 Coverage

| PCA implementation topic | Lab coverage |
|---|---|
| Application deployment | Cloud Run DN containers |
| Infrastructure deployment | Terraform modules |
| API management | Apigee/API boundary |
| Unit testing | DN tests |
| Integration testing | CPUX and server flow tests |
| Load testing | payment burst tests |
| Data migration | schema and ledger migration |
| System migration | emulator to cloud, single region to multi-region |
| Gemini Cloud Assist | log analysis and deployment troubleshooting |
| Cloud Shell Editor | lab editing environment |
| Cloud Code | deploy/debug Cloud Run services |
| Cloud Shell Terminal | gcloud, bq, storage commands |
| Google Cloud SDK | gcloud, bq, gcloud storage, gsutil |
| Cloud Emulators | Firestore, Pub/Sub |
| IaC | Terraform |
| Google API best practices | service accounts, least privilege, retries, idempotency |
| Client libraries | Firestore, Pub/Sub, BigQuery SDKs |

---

## 16. Suggested Learner Exercises

1. Add a new currency.
2. Add an insufficient-funds path.
3. Add a refund CPUX.
4. Add Seller settlement.
5. Add a BigQuery audit query.
6. Add Terraform for one DN.
7. Move from local emulator to Mumbai dev.
8. Replicate one DN to a second region.
9. Add an AI mediary that explains failed payment.
10. Write a contract test that prevents Object response mutation.

---

## 17. Core Principle

This lab treats implementation as visible intention.

A payment is not just a function call.
It is a chain of named Signals.
Each DN performs a declared role.
Each Object reflects or accumulates without hidden computation.
Each Field records progress toward completion.
Each GridLookout cell shows the human what is happening.

That is the practical value of Intention Space in a cloud architecture lab.

