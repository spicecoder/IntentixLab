# Try Intention Space With Your Own Situation

Use any AI model to explore a real situation through **Pulses, Design Nodes (DNs), Signals, Objects, and candidate CPUX paths**.

This page gives a **prompt ladder** rather than one giant prompt, so people can inspect the structure step by step.

---

## Core Operational Idea

A **situational reality** can be viewed as a **bounded combination of perceived pulses in a context**.  
Those pulses may give rise to an **Intention** to be absorbed by a participant.

Keep it practical:

- A **Pulse** is an observed semantic condition
- A **DN** is an active participant that can absorb and emit signals
- An **Intention** is a communicative transfer direction
- A **Signal** is an **Intention + Pulse set**, conveyed through a **medium**
- An **Object** mediates between DNs
- A **CPUX** arranges these into a candidate path

Compactly:

- A Pulse is discovered
- A DN participates
- An Intention transfers
- An Object mediates
- A Signal carries intention with pulses through a medium
- A CPUX arranges these into a candidate path

---

## Important Discipline

When using these prompts:

- do not invent institutions
- do not invent addresses, contact details, or authority
- preserve uncertainty explicitly
- do not force direct DN-to-DN communication
- prefer:

`DN -> Intention/Signal -> Object -> Intention/Signal -> DN`

## Important Scope Note — This is Requirement Discovery

These prompts do not automatically produce a deployed intelligent system.

They do not:
- generate a complete smart system
- guarantee Design Nodes are implementation-ready
- replace engineering design
- produce a finished CPUX runtime

Their purpose is requirement discovery.

They help identify:
- candidate Pulses
- candidate Design Nodes
- candidate Intentions and Signals
- candidate Objects
- candidate CPUX execution paths

Think of this as requirement gathering for possible CPUX execution paths.

The outputs are exploratory requirements for later Intention Space design,
not a completed operational architecture.
## Three Levels

Level 1 — Prompt Discovery
Explore situational reality and discover candidate structures.

Level 2 — Design
Refine DNs, Objects, Signals and formal CPUX definitions fit for purpose.

Level 3 — Execution
Build and run an actual Intention Space system.

## Human Review Required

Candidate paths produced by an AI model are hypotheses.

They may omit:
- missing pulses
- wrong DNs
- incorrect grounding
- weak intentions
- unsuitable Objects

Human review is expected before using them as design inputs.


---

## Prompt 0 — Describe the Situational Reality

```text
Describe a real situation you want to understand.

Include:
- where it is happening
- who is affected
- who may help resolve it
- extra context

Do not solve it yet.
Only describe the reality.
```

Example:

```text
Garbage has not been collected for two weeks in our area.
Residents are affected.
The municipality may be a resolver.
No response has been received.
```

---

## Prompt 1 — Discover Pulses

```text
Convert this situation into a bounded semantic field.

Focus:
- identify observable conditions as Pulses
- construct a concise summary
- produce a stable semantic title

Important:
At this stage, do NOT identify Design Nodes (DNs) or Objects explicitly.

Interpretation rules:
- Treat the situation as a field of observable semantic conditions
- Extract Pulses representing:
  - conditions
  - facts
  - known context

Return:
- title
- summary
- pulse set only
```

Example shape:

```json
{
  "title": "waste_collection_delay",
  "summary": "Waste has not been collected for two weeks and residents remain affected without response.",
  "pulses": [
    { "name": "location_known", "TV": "Y" },
    { "name": "situation_reported", "TV": "Y" },
    { "name": "affected_people_known", "TV": "Y" },
    { "name": "possible_resolver_known", "TV": "Y" },
    { "name": "response_missing", "TV": "Y" }
  ]
}
```

---

## Prompt 2A — Define What Counts as a Design Node

```text
Before identifying Design Nodes, apply this interpretation:

A Design Node (DN) is an active participant that can:
- absorb an incoming intention
- hold or process within its own boundary
- emit an outgoing intention

A DN may be:
- a human
- a group
- an organisation
- an office
- a clinic
- a software service
- a digital platform
- a device
- a sensor
- an observer
- an artwork or designed artifact that can participate in signalling

A DN is not merely a noun in the situation.
It must be capable of participation in an intention transfer.

Now re-read the situation and identify only entities that qualify as DNs.
```

---

## Prompt 2B — Identify Candidate DNs

```text
Using the situation and pulse field, identify possible Design Nodes (DNs).

For each DN provide:
- name
- role
- why it qualifies as a DN

Possible roles include:
- affected_group
- possible_resolver
- intermediary
- observer
- software_processor
- signal_source

Do not connect DNs directly yet.
Do not ground exact institutions yet.
```

---

## Prompt 3 — Define Communication Mediums

A Signal travels through a **medium**.  
The medium is not the pulse, not the payload, and not the DN.  
It is the **means of communication or transfer**.

Examples of mediums:

- meeting_in_person
- spoken_language
- gesture
- written_note
- phone_call
- sms
- email
- portal_submission
- ui_interaction
- http_request
- http_response
- api_call
- api_response
- database_write
- notification_event
- sensor_signal
- visual_display
- artwork_label
- sale_arrangement_display

Use this prompt:

```text
For each likely interaction in this situation, identify the communication medium.

A medium is the means by which a Signal can be conveyed.

Examples:
- in-person conversation
- written notice
- phone call
- HTTP request
- API response
- portal submission
- UI interaction
- sensor signal
- visual display
- artwork sale label

Return a list of likely mediums and what kinds of DNs may use them.
```

---

## Prompt 4A — Define What Counts as an Intention

```text
Before naming intentions, apply this interpretation:

An Intention is not merely a goal label.
It is a communicative transfer direction that may move between DNs through an Object.

An Intention should be a phrase such as:
- report_issue
- request_information
- seek_resolution
- acknowledge_issue
- request_grounding
- sale_arrangement

Each intention should imply:
- what is being transferred
- toward whom
- under what pulse conditions

Now identify intentions implied by the situation.
```

---

## Prompt 4B — Identify Intentions

```text
Using the candidate DNs, pulse field, and likely mediums, define intentions.

For each intention provide:
- intention name
- source side
- receiving side (semantic only, not grounded contact detail)
- reason
- likely medium
```

---

## Prompt 5 — Define Signals Explicitly

```text
Now define Signals.

A Signal = Intention + Pulse set, conveyed through a medium.

For each likely communication step produce:
- intention name
- carried pulses
- carried response payload if any
- medium
- possible receiving DN

Keep pulse identity distinct from response payload.
Do not collapse price, names, or text into pulse meaning if avoidable.
When useful, represent pulse responses using:
- simple scalar response
or
- META structured response arrays.
```

Example:

```json
{
  "intention": "report_issue",
  "pulses": [
    { "name": "situation_reported", "TV": "Y" },
    { "name": "response_missing", "TV": "Y" }
  ],
  "response": {
    "summary_text": "Garbage has not been collected for two weeks"
  },
  "medium": "written_message",
  "possible_receiver": "municipality"
}

Signal:
sale_arrangement

Pulses:
- for_sale:Y

Response:
[
 ["META","price","currency","contact_mode"],
 ["67","USD","in_person"]
]

Advanced users:
See Response Array Convention for structured pulse responses.

```

---

## Prompt 6 — Insert Mediating Objects

```text
Insert mediating Objects.

No two DNs communicate directly.
Use Object mediation.

For each transfer identify an Object such as:
- issue_handover_object
- grounding_queue
- request_router
- response_holder
- sale_display_object

For each Object provide:
- name
- role
- what kind of signal it receives
- what kind of signal it reflects
```

---

## Prompt 7 — Ground Candidate DNs Carefully

Use this public-facing wording:

```text
Ground candidate Design Nodes using context already available in the described situation first.

Use:
1. pulse relationships in the current situation
2. previously identified participants
3. previously identified objects or routes
4. known local context if explicitly supplied

Only if grounding remains unresolved,
mark external grounding candidate needed.

Do not invent institutions.
Do not invent contact details.
Preserve uncertainty explicitly.
```

---

## Prompt 8 — Candidate CPUX

```text
Construct candidate CPUX flows.

Use:

DN -> Intention -> Object -> Intention -> DN

Rules:
- no direct DN-DN
- include Object mediation
- reflect unresolved grounding
- keep flows readable

Return 1-3 candidate paths.
```

Example:

```text
residents
-> report_issue
-> issue_handover_object
-> seek_resolution
-> municipality

residents
-> report_issue
-> issue_handover_object
-> requires_grounding
-> grounding_queue
```

---

## Prompt 9 — Human Review and Revision

```text
Review the generated pulses, DNs, intentions, signals, mediums, objects, and CPUX.

Identify:
- missing pulses
- wrongly assumed DNs
- weak or incorrect intentions
- incorrect mediums
- unnecessary Objects
- unresolved grounding
- alternate candidate CPUX paths

Revise one better CPUX.
```

This is the stage where human judgment improves the structure.

---

## Special Note — Humans, Machines, and Art Can All Be DNs

A DN need not be only a person or an office.

A DN may also be:

- a machine
- a software service
- a sensor
- an observer
- an artwork or artifact participating in signal exchange

### Example: art as DN

```text
Treat the following artwork scenario using Intention Space ideas.

Artwork can be treated as a DN when it participates in signalling.

Example:
Artwork absorbs:
- viewing_interest

Artwork emits:
Intention: sale_arrangement

Signal carries:
- for_sale : Y
- price_present : Y

Response payload:
- price: 67

Likely medium:
- visual_display
- artwork_label
- in_person_viewing
```

This helps show that the same semantics can work across human, machine, and artifact participation.

---

## One-Shot Version

For visitors who want a single prompt:

```text
Analyze the following situational reality using Intention Space ideas.

Step 1 identify Pulses.
Step 2 define what qualifies as a DN and identify candidate DNs.
Step 3 define communication mediums.
Step 4 define what qualifies as an Intention and identify candidate intentions.
Step 5 define Signals as Intention + Pulse set conveyed through a medium.
Step 6 insert mediating Objects.
Step 7 ground candidate DNs carefully using only available context.
Step 8 produce 1-3 candidate CPUX paths:

DN -> Intention -> Object -> Intention -> DN

Preserve uncertainty.
Do not invent institutions.
Do not invent contact details.
Keep pulse identity distinct from response payload.
```

---

## Closing Note

This is not meant to replace human judgment.

It is a way to help people inspect how a situation may be structured through:

- pulses
- participating nodes
- communication directions
- mediums
- mediating objects
- candidate execution paths

That is the first step toward making intention visible in computation and social action.
