---
title: Intention Processor Demo
order: 1
description: Try the Signal-bounded Intention Processor demo from Episode 1.
---

# Intention Processor Demo

The Episode 1 demo pack is available in the public repository under:

```text
demo/intention-processor
```

It demonstrates how an Intention Processor can receive:

- a designated incoming Signal,
- a designated outgoing Signal,
- and a common inference specification,

then use an LLM, or a deterministic fallback, to generate a Design Node.

```text
Incoming Signal + Outgoing Signal + common specification
        ↓
Intention Processor
        ↓
Generated Design Node
        ↓
Intention Container runtime
```

The fallback code is included for demonstration only. It shows that the Intention Processor role can be fulfilled by either a human or an LLM, while the bounded Signal pair remains the controlling contract.

## GitHub

Visit the repository and open:

```text
demo/intention-processor/README.md
```

Repository:

[github.com/spicecoder/IntentixLab](https://github.com/spicecoder/IntentixLab)
