---
title: Design Node Manifest
order: 5
description: A first canonical manifest for describing a Design Node and its Signal contract.
---

# Design Node Manifest

A Design Node is an independently executable unit of computation.

Its manifest describes the Signal contract and runtime expectations.

```json
{
  "id": "DN_validate_login",
  "label": "Validate Login",
  "runtime": {
    "kind": "javascript",
    "entrypoint": "validateLogin.execute"
  },
  "absorbs": [
    {
      "intentionId": "I_validate_login",
      "requiredPulses": ["username", "password entered"]
    }
  ],
  "emits": [
    {
      "intentionId": "I_reflect_login_result",
      "pulsePhrases": ["credentials valid", "login message"]
    }
  ]
}
```

---

## Required Fields

`id`

Stable identifier for the Design Node:

```json
"id": "DN_validate_login"
```

`runtime`

How the DN is executed:

```json
"runtime": {
  "kind": "javascript",
  "entrypoint": "validateLogin.execute"
}
```

`absorbs`

Signals the DN can receive.

`emits`

Signals the DN is expected to emit.

---

## Runtime Kinds

The runtime kind should stay open:

```text
javascript
kotlin
swift
dart
go
rust
python
wasm
http
ai-model
native
```

CPUX should not be bound to one implementation language.

---

## Signal Contract

The important part is the Signal contract:

```json
"absorbs": [
  {
    "intentionId": "I_validate_login",
    "requiredPulses": ["username", "password entered"]
  }
]
```

This tells the CPUX runtime and developers when the DN is meaningful to invoke.

---

## Developer Rule

Keep the DN manifest focused on execution and Signal contract.

Do not hide business rules in the manifest if they belong inside the DN's explicit computation.

