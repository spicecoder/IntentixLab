---
title: Direct IC Result
order: 7
description: The frontend CPUX rule that the originating GridLookout Cell receives the receptor IC result directly from O_reflector.
---

# Direct IC Result

Direct IC result is one of the most important frontend CPUX rules.

When a GridLookout Cell sends a Signal to its receptor IC, the originating Cell must receive the IC result directly from the IC's O_reflector path.

It must not wait for Field absorption.

It must not wait for the Visitor's next pass.

---

## Why This Rule Exists

The human perception loop should remain immediate.

When a person acts, the UI should reflect the result of that action without unnecessary delay from broader orchestration mechanics.

The system can still absorb, stabilise, and cascade afterward.

But the human-facing result should return directly.

---

## The Two Delivery Paths

After the receptor IC runs, O_reflector produces the reflected Signal.

That same reflected Signal travels in two ways:

```text
direct result -> originating Cell
pickup event  -> Field queue and subscribers
```

The two paths are independent.

---

## Diagram

```text
GridLookout Cell
      |
      v
receptor IC activate()
      |
      v
O_holder -> DN -> O_reflector
      |
      |-- directResult -> originating Cell
      |
      `-- ic:pickup -> Field pickup queue
                   -> subscribing Cells
```

---

## Subscription Is Different

Subscription updates are for Cells listening to reflected Signals.

The originating Cell's direct result is not a subscription update.

This distinction prevents a common frontend error:

> making the sender wait for the Field or polling channel to receive its own result.

---

## Developer Rule

Use direct result for the caller's immediate reflected outcome.

Use subscription updates for other Cells that need to respond to the same reflected Signal.

