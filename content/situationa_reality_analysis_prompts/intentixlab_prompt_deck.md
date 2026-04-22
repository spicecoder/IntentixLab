# Try Intention Space With Your Own Situation

Use any AI model.

Paste a real situation from your life, work, neighbourhood, institution, or community, and use the prompt ladder below to discover:

- Pulses
- Design Nodes (DNs)
- Signals
- Objects
- candidate CPUX paths

This page is designed for practical use. It does not require prior study of Intention Space. The purpose is to help you convert a lived situation into a more inspectable semantic structure.

---

## What you need

You only need:

- a real situation described in plain language
- any AI model you prefer
- patience to go stage by stage

Do not start by asking the model to solve the whole problem. Start by describing the situation.

---

## Your situation input

Write your situation in plain language using this simple frame:

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

## Stage 1 — Discover Pulses

Use this prompt:

```text
Convert this situation into an initial bounded semantic field.

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
- Pulses may optionally carry response data (text or structured)

Suggested pulse patterns:
- location_known
- situation_reported
- affected_people_known
- possible_resolver_known
- extra_context_known

Do not:
- infer communication flows
- create DNs or Objects
- assume resolution paths

Output:
- title (machine-safe)
- summary (human-readable)
- pulse set only
```

What to look for:

- Is the title stable and concise?
- Do the Pulses reflect observable conditions rather than solutions?
- Are unknowns preserved honestly?

Typical result shape:

```json
{
  "title": "waste_collection_delay",
  "summary": "Garbage collection is delayed in a locality and residents remain affected without response.",
  "pulses": [
    { "name": "location_known", "TV": "Y" },
    { "name": "situation_reported", "TV": "Y" },
    { "name": "affected_people_known", "TV": "Y" },
    { "name": "possible_resolver_known", "TV": "Y" },
    { "name": "response_missing", "TV": "Y" }
  ]
}
```

Reflection question:

```text
Which Pulse seems most critical in this situation, and why?
```

---

## Stage 2 — Discover Design Nodes (DNs)

Use this prompt:

```text
Identify possible Design Nodes (DNs) and infer how they absorb and emit intentions/signals.

## Step 1 — Identify DNs
Extract all active participants.

DNs may include:
- human
- organisation
- software
- device
- sensor
- observer

Split combined phrases where appropriate.

Example:
"clinic, municipality health unit" -> two DNs

## Step 2 — Assign roles
Examples:
- affected_group
- possible_resolver
- intermediary
- observer
- software_processor
- signal_source

## Step 3 — Infer signal contracts

For each DN:

Input side:
- input intention
- payload fields
- input media classes

Output side:
- output intention
- payload fields
- output media classes

## Media classes

Examples:
- physical_approach
- spoken_language
- written_message
- phone_contact
- email_message
- online_form
- portal_update
- api_call
- api_response
- file_transfer
- database_write
- notification_event
- network_message
- sensor_signal
- environmental_capture
- camera_observation
- human_visual_observation
- touch_interaction
- human_intermediary
- written_reply
- call_back
- sms_notice

## Constraints

- DN-to-DN is NOT direct
- must be DN -> Object -> DN

Do not ground concrete instances yet.

Return JSON only.
```

What to look for:

- Are active participants split properly?
- Are roles provisional rather than overconfident?
- Is media realistic for the situation?

Helpful review prompt:

```text
Which of these DNs are clearly present, and which are still only candidates?
```

---

## Stage 3 — Ground unresolved DNs

Use this prompt:

```text
Ground semantic Design Nodes (DNs) primarily using Intention Space context already available.

## Goal

For each unresolved semantic DN:
- try to ground it using current field pulses
- try to ground it using frozen pulses
- try to ground it using known members and participating organisations
- try to ground it using known media and prior semantic routes
- only if enabled and needed, mark it as requiring external retrieval

## Grounding priority

1. internal pulse pairing
2. frozen pulse pairing
3. known member grounding
4. known organisation grounding
5. prior CPUX or object-route grounding
6. external retrieval candidate needed

## Internal grounding sources

You may use:
- current pulses
- frozen pulses
- known DN names
- known organisation names
- known member/user names
- known Objects
- known input_media and output_media
- prior successful route hints

## Output requirements

For each target include:
- semantic_name
- grounding_mode
- resolved_name
- status
- confidence
- reason
- matched_pulses
- input_media
- output_media

## grounding_mode values

- internal_pulse_pair
- frozen_pulse_pair
- known_member
- known_organisation
- prior_route_match
- external_candidate_needed

## Rules

- prefer internal grounding over external grounding
- do not invent external institutions
- do not invent contact details
- if no internal match exists, mark external_candidate_needed
- preserve uncertainty explicitly

Return JSON only.
```

What to look for:

- Has the model avoided inventing institutions?
- Are unresolved targets still shown as unresolved?
- Is confidence meaningful rather than decorative?

Helpful review prompt:

```text
Which targets remain semantically unresolved, and what exact missing pulse or evidence would improve grounding?
```

---

## Stage 4 — Discover Intentions and Objects

Use this prompt:

```text
Define intentions based on DNs, grounding state, and media.

## Principles

- Intentions travel via Objects
- Signals = intention + pulses
- DNs use media to absorb/emit signals

## Construct intentions

Examples:
- report_issue
- seek_resolution
- request_information
- acknowledge_issue
- request_grounding

## Include Objects

Examples:
- issue_handover_object
- grounding_queue
- request_router
- response_holder

## Rules

- no direct DN -> DN
- respect unresolved grounding
- do not invent targets

Return JSON only.
```

What to look for:

- Are intentions named as communicative actions?
- Are Objects mediating properly?
- Has unresolved grounding produced a grounded request rather than a fake resolution?

Helpful review prompt:

```text
For each intention, state what pulses it likely carries and why that intention is needed.
```

---

## Stage 5 — Make Signals explicit

This stage is very important.

A Signal is not only an intention name. A Signal is:

- an Intention
- carrying a set of Pulses

Use this prompt:

```text
Now define Signals explicitly.

A Signal = Intention + Pulse set.

For each likely communication step produce:
- signal_name
- intention_name
- carried_pulses
- possible source DN
- mediating Object
- possible target DN
- notes on uncertainty

Do not collapse Signal into intention alone.
Preserve uncertainty where grounding is unresolved.

Return JSON only.
```

What to look for:

- Does each Signal carry a meaningful pulse set?
- Is the Signal distinct from the DN?
- Is uncertainty preserved when needed?

Typical result shape:

```json
[
  {
    "signal_name": "issue_reporting_signal",
    "intention_name": "report_issue",
    "carried_pulses": [
      "situation_reported:Y",
      "affected_people_known:Y",
      "response_missing:Y"
    ],
    "source_dn": "residents",
    "object": "issue_handover_object",
    "target_dn": "municipality_candidate",
    "notes": "target may still require grounding"
  }
]
```

Reflection question:

```text
Which Signal appears most actionable, and which one still depends on better grounding?
```

---

## Stage 6 — Construct candidate CPUX paths

Use this prompt:

```text
Construct CPUX flows.

## Structure

DN -> Intention -> Object -> Intention -> DN

## Rules

- no direct DN-DN
- include Object mediation
- reflect unresolved grounding

## Example

DN -> report_issue -> object -> requires_grounding -> grounding_queue

Keep flows readable.

Return JSON only.
```

What to look for:

- Does every step preserve the DN -> Intention -> Object -> Intention -> DN discipline?
- Are unresolved cases handled through grounding rather than hallucinated closure?
- Do the flows remain readable?

Typical result shape:

```json
[
  {
    "cpux_name": "community_issue_reporting",
    "flow": [
      "residents",
      "report_issue",
      "issue_handover_object",
      "requires_grounding",
      "grounding_queue"
    ]
  },
  {
    "cpux_name": "grounded_resolution_request",
    "flow": [
      "residents",
      "report_issue",
      "issue_handover_object",
      "seek_resolution",
      "municipality_office_candidate"
    ]
  }
]
```

---

## Stage 7 — Human review and revision

This final stage is essential.

Use this prompt:

```text
Review the generated Pulses, DNs, Signals, Objects, and candidate CPUX paths.

Identify:
- missing Pulses
- wrongly assumed DNs
- weak grounding
- unnecessary Objects
- alternate intentions
- overconfident claims

Then produce:
- one revised pulse set if needed
- one revised signal set if needed
- one better candidate CPUX

Preserve uncertainty explicitly.
```

This is where human perception corrects the machine output.

---

## One-shot version

If you prefer a single prompt, use this:

```text
Analyze the following situational reality using Intention Space ideas.

Step 1 identify Pulses.
Step 2 identify Design Nodes.
Step 3 define Signals (Intention + pulses).
Step 4 insert mediating Objects.
Step 5 produce candidate CPUX paths:

DN -> Intention -> Object -> Intention -> DN

Preserve uncertainty.
Do not invent institutions.
Return structured output.
```

This is faster, but the staged method usually gives better results.

---

## Practical notes

- These prompts work best when the user stays close to lived reality.
- Do not force early resolution.
- Do not invent authorities, contact details, or institutions.
- Let unresolved grounding remain unresolved.
- Treat this as structured discovery, not automatic truth.

---

## Why this matters

Many real situations are emotionally obvious but semantically unstructured.

Intention Space encourages a different move:

- observe the situation as Pulses
- identify active participants as DNs
- represent communication as Signals
- preserve mediation through Objects
- reveal candidate paths through CPUX

This helps people inspect their own situational reality with more clarity.

---

## Related operational idea

A Signal is not merely an intention label.
A Signal is an intention carrying a pulse set.

That distinction matters because situations rarely move through language alone. They move through semantic state carried between participants and mediating objects.

---

## Invitation

Try this with:

- a civic issue
- a workplace blockage
- a healthcare access difficulty
- a support escalation problem
- a family coordination issue
- an institutional communication failure

Start with reality. Then let the structure emerge.
