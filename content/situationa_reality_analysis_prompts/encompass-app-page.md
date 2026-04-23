---
title: Encompass Solution App
order: 11
description: Interactive workspace for the Encompass solution app
---

# Encompass Solution App

 Interactive staged analysis environment for deriving prospective Signals, Design Nodes, and resolution paths from Situational Reality

<div style="width: 100%; height: 90vh; border: none; margin-top: 20px;">
  <iframe 
    src="https://encompass-web-beige.vercel.app/" 
    style="width: 100%; height: 100%; border: 1px solid #3E92CC; border-radius: 8px;"
    title="Encompass Solution App">
  </iframe>
</div>

## Overview


# Encompass Situational Analysis

Encompass is an interactive React-based environment for staged analysis of a real-world situation ("Situational Reality") in order to derive prospective computational structures in Intention Space.

Rather than generating answers directly, Encompass assists in identifying:

- candidate Intentions  
- prospective Pulses  
- possible Design Nodes (DNs)  
- communication media  
- potential resolution paths  
- emerging CPUX execution structures



# Core Orientation

## Situational Reality as Structured Signal

A situation is treated as potentially expressible as:

Signal = Intention + Pulses

where:

- **Intention** provides direction  
- **Pulses** represent perceived semantic conditions  
- **Responses** may carry contextual values  
- **Signal** becomes the candidate unit for further routing

Example:

```json
{
 "intention":"report_issue",
 "pulses":[
   {"name":"garbage_not_collected","tv":"Y"},
   {"name":"location_known","tv":"Y","response":"Bansdroni"}
 ]
}
```

This does not assume the Signal is final.

It is a prospective semantic structure emerging from staged analysis.

---

# Staged Progression

## Stage 1 — Capture Situational Reality

Capture a free-form scenario in natural language.

Example:

"Residents report garbage not collected for three days."

Goal:

Identify perceived conditions without prematurely imposing software structure.

Outputs may include:

- actors
- events
- constraints
- context fragments

---

## Stage 2 — Role and Resolver Discovery

Explore:

Who might absorb this situation?

Possible DNs may include:

- municipal officer  
- sanitation contractor  
- citizen group  
- complaint system API

At this stage DNs are candidate resolvers, not yet committed components.

---

## Stage 3 — Internal Grounding

Search existing semantic grounding first.

Possible matches:

- frozen pulses  
- prior routes  
- known organisations  
- existing member DNs  
- earlier Signals

Grounding modes:

- internal_pulse_pair  
- known_member  
- prior_route_match  
- external_candidate_needed

Only unresolved cases move outward.

---

## Stage 4 — Prospective Signal and Media Formation

Generate possible Signals:

- which Intention may be emitted?
- which Pulse sets enable it?
- what medium may carry it?

Possible media:

- physical approach  
- phone  
- written message  
- HTTP/API request

Signal + Medium forms an actionable candidate route.

---

## Stage 5 — CPUX Prospecting

From emerging Signals and candidate DNs, infer possible CPUX fragments:

S1 → DN → S2 → O

or chains such as:

DN → Object → DN

These are design prospects for later formalization.

---

# Internal Grounding Principle

Encompass assumes:

Resolve internally before searching externally.

This reflects:

- reuse of known semantic assets  
- progressive grounding  
- lower ambiguity  
- stronger route continuity

External search acts as augmentation, not authority.

---

# Invitation Expansion

An external candidate may become internal.

Pattern:

candidate resolver  
→ invited participant  
→ recognised member DN  
→ future internal grounding

Thus semantic space can grow.

---

# What the Tool Produces

Encompass may suggest:

## Candidate Intentions

Examples:

- report_issue  
- escalate_service_failure  
- request_action

---

## Prospective Pulses

Examples:

- issue_observed:Y  
- responsible_party_known:Y  
- communication_path_available:U

---

## Candidate DNs

Examples:

- complaint_officer  
- sanitation_dispatch  
- resident_coordinator

---

## Prospective Resolution Paths

Possible routes through Signals and media.

---

# What It Does Not Do

Encompass does not:

- claim authoritative truth  
- fully synthesize final CPUX definitions  
- replace design judgment  
- automatically produce ready-to-run DNs

Its purpose is structured requirement gathering toward CPUX.

---

# Use Cases

Applicable to:

- civic issue analysis  
- organisational routing problems  
- service failures  
- human-machine coordination  
- early semantic modelling for Intention Space systems

---

# Key Shift

Traditional AI asks:

"What answer should be generated?"

Encompass asks:

"What path toward resolution can be formed within shared semantic space?"

This is the shift from answer generation to situational resolution.

---

# Future Direction

Later versions may support:

- Frozen Pulse retrieval  
- external resolver search  
- prospective DN registry  
- CPUX export  
- staged LLM grounding assistance

---

