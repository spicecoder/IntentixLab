---
title: Prompt and Response Model
order: 1
description: The PnR model — how intention-driven computation replaces traditional request-response patterns.
---

# Prompt and Response Model

The **Prompt and Response (PnR)** model reimagines the traditional request-response pattern by treating every interaction as an intention-driven exchange. Instead of imperative commands ("do this"), the system operates through declarative prompts ("this should be true") and validates responses against expected states.

## From Request-Response to PnR

Traditional computing follows a **command → execute → return** pattern where the caller must understand the implementation. PnR inverts this:

```
Traditional:  Client → Function Call → Result
PnR:          Prompt (Intention) → Validation → Forward State
```

The caller declares *what* should happen. The infrastructure determines *how* and validates *that it did*.

## Core Mechanics

The PnR model operates through three phases:

1. **Prompt Phase** — A pulse declares the intended state
2. **Resolution Phase** — Design Nodes process the pulse through pre-configured logic
3. **Response Phase** — The system validates the outcome and produces a new forward state

This creates an audit trail where every computational step is traceable back to its originating intention.

## Why This Matters

When logic lives in data rather than code, systems become intrinsically debuggable. There are no hidden branches, no implicit state mutations, no "it works on my machine" surprises.
