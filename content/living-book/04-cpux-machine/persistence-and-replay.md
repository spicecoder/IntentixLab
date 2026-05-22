---
title: Persistence And Replay
order: 8
description: Persistence and replay as CPUX support for interruption, resume, audit, compensation, and zero-data-loss teardown.
---

# Persistence And Replay

CPUX needs persistence because human interaction is interruptible.

Applications refresh, devices sleep, network calls fail, processes restart, and people return later.

If perception history matters, the runtime must preserve it.

---

## Two Persistence Streams

Inside an Intention Container, the two Object roles have different persistence needs.

O_holder persists accumulation:

```text
type = accumulation
```

O_reflector persists reflection:

```text
type = reflection
```

Keeping these separate helps replay and audit the difference between what was accumulated and what was emitted.

---

## Fire-And-Forget During Normal Operation

During ordinary operation, persistence can often be asynchronous.

The Object records what happened, but the persistence write should not decide whether reflection or accumulation occurs.

This keeps interaction responsive.

---

## Await Pending Before Teardown

Before the platform destroys the execution context, the IC should flush pending work.

The contract is:

```text
IC.awaitPending()
```

It should wait for:

```text
in-flight activation
O_reflector pending write
O_holder pending write
```

This helps avoid losing the last human action during refresh, backgrounding, shutdown, or process exit.

---

## Platform Triggers

Different platforms trigger teardown differently:

```text
Browser  -> visibilitychange hidden
Android  -> Activity.onPause / onStop
iOS      -> applicationDidEnterBackground
Node.js  -> beforeExit / SIGTERM
Go       -> context done / os.Signal
```

The trigger is platform-specific.

The `awaitPending()` contract should remain platform-neutral.

---

## Replay

Replay lets O_holder reconstruct accumulated perception after interruption.

This supports the `resume` perception mode.

Replay is not only a recovery feature. It also supports audit, testing, and explanation.

---

## Developer Rule

Persist what happened.

Do not let persistence secretly decide what should happen.

Reflection and accumulation are CPUX behaviours. Persistence records them for continuity.

