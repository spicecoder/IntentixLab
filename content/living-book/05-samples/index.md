---
title: Samples
order: 1
description: Public-facing CPUX sample patterns that demonstrate Signals, Pulses, GridLookout, Design Nodes, and AutoInteraction without exposing proprietary engine internals.
---

# Samples

This section introduces sample patterns for CPUX without exposing proprietary engine code.

The samples focus on the public-facing contract:

- Pulses
- Signals
- Intentions
- GridLookout Cell configuration
- Design Node input/output behaviour
- reflected Signal expectations
- Field-visible outcomes

They avoid the private implementation details of the CPUX engine, such as the internal scheduler, proprietary Visitor implementation, persistence adapters, and FieldBoard runtime source.

---

## Why Contract-First Samples

CPUX should be learnable without requiring the reader to see the engine internals.

A developer can understand the model by seeing:

```text
what Signal is sent
what DN receives
what DN emits
what O_reflector is expected to validate
what Field-visible result appears
```

That is enough to learn how to build Perceptive Apps against the runtime.

---

## Sample Progression

The first samples are intentionally small:

- Runnable Samples and SDK Boundary
- Green Light / Red Light CPUX
- React GridLookout surface
- Android GridLookout surface
- LLM as Design Node
- AutoInteraction test path

Each sample should show the same CPUX idea from a different surface.

The Green Light sample is also sprinkled through the earlier concept chapters as a recurring anchor:

- [Pulse](/living-book/02-intention-space/pulse.html) introduces `current light`.
- [Intention](/living-book/02-intention-space/intention.html) introduces `I_move_if_allowed`.
- [Design Node](/living-book/02-intention-space/design-node.html) introduces a small `moveIfAllowed.execute` stub.
- [Field](/living-book/02-intention-space/field.html) introduces the resulting Field snapshot.
- [Signal Structure](/living-book/03-formal-structures/signal-structure.html) shows the same Signal as runtime carrier, synctest condition, and output validation condition.
- [Design Node Manifest](/living-book/03-formal-structures/design-node-manifest.html) shows the public DN contract.
- [GridLookout Cell Config](/living-book/03-formal-structures/gridlookout-cell-config.html) shows the UI Cell contract.

---

## Proprietary Boundary

The samples may show:

- public JSON-like Signal structures
- UI-side Cell configuration
- DN stubs
- expected reflected Signals
- testing strategy

The samples should not show:

- private CPUX engine source
- internal Visitor implementation
- proprietary FieldBoard code
- production persistence implementation
- private platform bridge internals

This keeps the book useful for developers while preserving the engine boundary.

---

## Runnable Reference Package

Runnable samples should be based on:

```text
X-PLATFORM-CPUX_abacus/iscore-cpux-platform-reference
```

That package contains the tested platform reference for the CPUX runtime binary, browser harness, React GridLookout sample, Android GridLookout material, shared manifest, and smoke tests.

See [Runnable Samples And SDK Boundary](/living-book/05-samples/runnable-samples-sdk-boundary.html).
