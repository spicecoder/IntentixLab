---
title: Intention Structure
order: 3
description: A first canonical structure for representing an Intention as a semantic communication context.
---

# Intention Structure

An Intention is the semantic communication context under which a Pulse set is carried.

A first canonical structure can be:

```json
{
  "id": "I_validate_login",
  "label": "Validate Login",
  "description": "Carries entered login perceptions for credential validation.",
  "domain": "auth"
}
```

---

## Required Fields

`id`

The stable semantic identifier:

```json
"id": "I_validate_login"
```

The `id` should be stable across platforms.

---

## Recommended Fields

`label`

A readable label for authoring tools and documentation:

```json
"label": "Validate Login"
```

`description`

A plain-language explanation:

```json
"description": "Carries entered login perceptions for credential validation."
```

`domain`

An optional grouping:

```json
"domain": "auth"
```

---

## Why Intention Has Its Own Structure

An Intention should not be reduced to a string too quickly.

The identifier is enough for runtime matching, but the description is important for human understanding, authoring, governance, and debugging.

The Intention is part of the path of understanding.

---

## Minimal Form

```json
{
  "id": "I_validate_login"
}
```

---

## Developer Rule

Name Intentions by semantic purpose, not by framework mechanics.

Prefer:

```text
I_validate_login
```

over:

```text
onSubmitHandler
```

