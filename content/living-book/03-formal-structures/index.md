---
title: Formal Structures
order: 1
description: First draft canonical data structures for representing Intention Space concepts across CPUX, GridLookout, and cross-platform runtimes.
---

# Formal Structures

The earlier chapters introduced the vocabulary of Intention Space without committing to implementation data structures.

This section begins the next step.

It gives first-draft, platform-neutral structures for the main concepts:

- Pulse
- Intention
- Signal
- Object
- Design Node
- Field
- GridLookout Cell

These are not final locked APIs. They are canonical working forms for discussion, implementation, and refinement across ReactJS, Android, iOS, Flutter, desktop, embedded, backend, and AI-assisted runtimes.

---

## Why Start With JSON-Like Shapes

JSON-like examples are useful because they are readable by both humans and machines.

They can later be mapped into:

- TypeScript interfaces
- Kotlin data classes
- Swift structs
- Dart classes
- Go structs
- database records
- wire-format messages
- persistence events

The important point is not JSON itself. The important point is that the structure preserves the conceptual contract.

---

## Design Rule

Every formal structure should answer three questions:

```text
What concept does this represent?
What must remain stable across platforms?
What can be adapted by a specific implementation?
```

If a field is only convenient for one framework, it should not be placed too early in the canonical structure.

If a field preserves semantic identity, traceability, human perception, or CPUX execution, it belongs closer to the core.

---

## The Boundary

This section introduces data structures.

It does not yet define:

- a final wire protocol
- a complete validation schema
- a persistence engine
- a runtime lifecycle implementation
- a language-specific SDK

Those can grow from these canonical shapes.

