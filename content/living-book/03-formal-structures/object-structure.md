---
title: Object Structure
order: 6
description: A first canonical structure for Object configuration, including O_holder and O_reflector roles.
---

# Object Structure

An Object reflects, persists, and releases Signals without hidden arbitrary computation.

There are two important Object roles inside an Intention Container:

- O_holder
- O_reflector

---

## O_holder Structure

O_holder accumulates perception history.

```json
{
  "id": "OH_login",
  "role": "holder",
  "persistence": {
    "stream": "login-accumulation",
    "tier": "localCache"
  },
  "modePulse": "_perception_mode"
}
```

O_holder should not compute derived values. It accumulates and replays perceptions for the DN.

---

## O_reflector Structure

O_reflector receives the DN result and reflects it outward.

```json
{
  "id": "OR_login",
  "role": "reflector",
  "designatedAbsorbedSignal": {
    "intentionId": "I_login_result_internal",
    "pulsePhrases": ["credentials valid", "login message"]
  },
  "reflectedSignal": {
    "intentionId": "I_reflect_login_result"
  },
  "persistence": {
    "stream": "login-reflection",
    "tier": "localCache"
  }
}
```

---

## Optional RTM

A reflector may use a declarative Response Transformation Matrix when explicitly configured.

The important boundary is:

> RTM should remain declarative and reflect-only. It should not become hidden arbitrary computation.

Example placeholder:

```json
{
  "rtm": [
    {
      "fromPhrase": "credentials valid",
      "toPhrase": "login visible",
      "copyResponse": true
    }
  ]
}
```

---

## Developer Rule

If an Object needs to calculate, infer, validate, or derive a new value, introduce a Design Node.

Objects preserve clarity by refusing to become hidden processors.

