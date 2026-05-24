---
title: Intention
order: 6
description: Intention as the semantic communication context under which Pulses move through CPUX.
---

# Intention

An Intention is the semantic communication context under which a Pulse set moves through Intention Space.

It is not merely a task, command, route, function name, or event topic.

An Intention says how the Pulse set should be understood.

---

## Intention As Stance

Consider the Pulse:

```text
<"username", Y, ["alice"]>
```

This Pulse may participate in different situations:

```text
I_validate_login
I_update_profile
I_audit_session
I_display_current_user
```

The Pulse phrase and response are the same, but the semantic stance changes.

That stance is the Intention.

---

## Sample Anchor: Move If Allowed

In the Green Light sample, the same Pulse can participate under a particular Intention:

```json
{
  "intention": {
    "id": "I_move_if_allowed"
  },
  "pulses": [
    {
      "phrase": "current light",
      "tv": "Y",
      "response": ["green"]
    }
  ]
}
```

The Pulse says what perception is present.

The Intention says what stance the runtime should take toward that perception.

Here, the current light is being carried for the purpose of deciding whether movement is allowed.

---

## Communication Becomes First-Class

Traditional applications often treat communication identifiers as infrastructure:

- method names
- event names
- API routes
- message topics
- callback labels

Intention Space elevates communication into a first-class semantic entity.

This matters because CPUX wants the path of understanding to be represented, not hidden inside implementation details.

---

## Input And Output Intentions

A Design Node may absorb a Signal under one Intention and emit another Signal under a different Intention.

For example:

```text
absorbed: I_validate_login
emitted:  I_reflect_login_result
```

The input Intention expresses the stance under which the DN receives the Pulse set.

The output Intention expresses the stance under which downstream participants should interpret the result.

---

## Why This Helps Reuse

Because Intention is externalised, a Design Node can sometimes be reused in different CPUX structures.

The internal executable logic may remain stable while the surrounding Signals and Intentions configure its role in a particular path of understanding.

This supports cross-platform and cross-context design.

---

## Developer Rule

When naming an Intention, ask:

```text
What semantic purpose does this communication carry?
Who should interpret it next?
What situation does it belong to?
```

An Intention should be understandable as part of a human-facing explanation of the system.
