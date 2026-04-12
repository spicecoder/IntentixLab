# Pulse-Based Situational Reality  
## A Perception-Centric Interface for Aligning AI and Traditional Software Systems

**Author:** Pronab Pal  
**Affiliation:** IntentixLab, Keybyte Systems, Melbourne, Australia  

---

## Abstract

Modern software systems struggle to integrate human intent, AI reasoning, and deterministic computation within a unified and auditable framework. While large language models (LLMs) enable powerful semantic interpretation, they lack a structured representation of situational context that can interoperate with traditional systems.

This paper introduces **Pulse-Based Situational Reality**, where a **Signal**—an Intention paired with a set of Pulses—represents a complete, identifiable state of contextual relevance. This model forms the foundation of **Perceptive Applications**, in which human, AI, and system components operate symmetrically as Design Nodes over explicitly represented situational states.

---

## 1. Introduction

Traditional systems operate on:
- data structures  
- control flow  
- hidden state transitions  

AI systems operate on:
- natural language  
- inference over unstructured context  

Human interaction operates through:
- perception  
- interpretation  
- intention  

There is no unified representation across these domains.

This paper introduces:

> **Situational Reality as the unit of computation.**

---

## 2. Situational Reality

### 2.1 Definition

A **Situational Reality** is defined as:

```
Situation = (Intention, {Pulse_i})
Pulse = (phrase, trivalence ∈ {Y, N, UN})
```

Situational reality is defined by **what is known, unknown, or fixed**, not by data values.

---

### 2.2 Identity of Situation

Two situations are identical if:

- Their intention matches  
- Their pulse sets (name + trivalence) match  

This enables:
- deterministic matching  
- traceable execution  
- replayable state  

---

## 3. From State to Reality

Traditional systems:
> State = stored data

Perceptive systems:
> State = perceived relevance

Example:

```
Intention: "order.checkout"

Pulses:
- items selected: Y
- payment entered: Y
- address missing: Y
```

This represents a complete situation:
> Checkout is attempted, but address is missing.

---

## 4. Design Nodes as Reality Transformers

A Design Node (DN) operates as:

```
Signal (Situation) → DN → Signal (New Situation)
```

- Input Signal = current reality  
- Output Signal = transformed reality  

Computation happens **only inside DN**.

---

## 5. Perceptive Applications

Perceptive Applications are systems where:

- State = Signals (Intentions + Pulses)  
- Interaction = Signal exchange  
- Computation = DN transformations  
- Flow = CPUX  

This enables:

- full visibility of application state  
- traceable causality  
- AI-native integration  

---

## 6. Dual Role of Human and AI

### Human as End-User DN

- perceives situation  
- acts through Signals  
- validates outcomes  

AI role:
> situational assistant  

---

### Human as Designer DN

- defines Pulses  
- builds CPUX flows  
- validates logic  

AI role:
> structural collaborator  

---

### Structural Invariance

```
Signal → DN → Signal
```

This remains constant across roles.

---

## 7. Dual-role Human–AI–System Interaction Model

```
AI DN (propose) → Human DN (commit) → System DN (execute)
```

AI proposes, Human commits, System executes.

---

## 8. CPUX as Situational Flow

```
S1 → DN1 → S2 → DN2 → S3 ...
```

Each step transforms reality.

---

## 9. Positioning with Emerging AI Development Approaches

Modern approaches introduce:

- implicit agent reasoning  
- hidden state  
- reliance on memory and checkpoints  

Perceptive Applications:

- make state explicit  
- expose transitions  
- reduce reconstruction effort  

| Aspect | Emerging AI | Perceptive Apps |
|-------|------------|----------------|
| State | Implicit | Explicit |
| Flow | Hidden | Visible |
| Debugging | Reconstruction | Direct |
| AI Role | Opaque | Observable |

---

## 10. Conclusion

Computation becomes:

> Transformation of situational realities.

---

## Final Principle

> Computation is the transformation of perceived reality through intention.
