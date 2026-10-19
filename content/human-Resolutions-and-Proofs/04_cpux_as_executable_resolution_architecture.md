# CPUX as an Executable Resolution Architecture

## Abstract

The distinction between Proof and Resolution becomes more useful when it can be represented in executable systems.

This note presents **CPUX**—a Common Path of Understanding and Execution in Intention Space—as an architecture for making Resolution computationally explicit.

A CPUX does not attempt to prove the internal correctness of every participating computation. Instead, it composes trusted participants at declared Signal boundaries, allows conditions to accumulate in a shared Field, activates participants when their input conditions are satisfied, and produces human-perceptible Resolution Prompts from which a requirement holder can determine whether the original requirement has been satisfactorily resolved.

> **CPUX is an executable structure for composing a bounded Situational Reality from trusted computational participants and exposing the resulting resolution evidence to a human requirement holder.**

---

## 1. From epistemic model to executable model

The preceding notes distinguish:

```text
Requirement
Granularity
Trust Point
Black Box
Resolution Boundary
Situational Reality
Proof
Resolution
```

The next question is:

```text
Can a software architecture represent these distinctions directly?
```

Traditional orchestration often focuses on:

```text
what process runs next?
```

CPUX instead focuses on:

```text
what conditions must exist
for a participant to be appropriate to act?
```

and:

```text
what new conditions become available after it acts?
```

This makes CPUX naturally suited to representing Resolution.

---

## 2. Core CPUX vocabulary

A CPUX is composed from several Intention Space concepts.

### Intention

An **Intention** gives semantic direction to a Signal.

### Pulse

A **Pulse** represents a named condition and its associated state or value.

### Signal

A **Signal** is an immutable unit consisting of:

```text
one Intention
+
a unique set of Pulses
```

### Design Node

A **Design Node (DN)** is a computational participant treated as a trusted black box at the CPUX granularity.

Its public runtime boundary is conceptually:

```text
is_perform(inputSignal) -> outputSignal
```

### Intention Container

An **Intention Container (IC)** hosts the DN within the CPUX execution discipline.

Simplified:

```text
S1 → OH → DN → S2
```

More completely:

```text
S1 → OH → DN → S2I → RO → S2
```

where:

- S1 = designated input Signal;
- OH = Object Holder;
- S2I = terminal DN output before reflection;
- RO = Reflector Object;
- S2 = designated reflected output Signal.

### Field

Each CPUX owns a shared Field containing the currently accumulated Intention and Pulse conditions.

### FieldBoard

An App-level FieldBoard coordinates one or more CPUXs and explicit cross-CPUX Signal routes.

---

## 3. CPUX as a bounded Situational Reality

A CPUX can be understood as operating over:

\[
SR_{CPUX}
\]

whose accepted granularity contains:

```text
Signal contracts
DN black boxes
IC boundaries
Field conditions
explicit routes
human inputs
external capability results
formal proof results
```

The internal implementation of a DN is normally outside the CPUX Resolution Boundary.

Thus:

```text
S1 → DN → S2
```

acts as a trust relationship.

The CPUX is not claiming that the DN is infallible. It is declaring:

> For this requirement, this participant is accepted at this Signal boundary.

That is the computational form of a requirement-relative trust point.

---

## 4. Requirement and Resolution Prompt

CPUX design should begin outside the runtime.

First state:

```text
Requirement R
```

Then ask:

```text
How will the human requirement holder
know that progress is occurring?

How will the human recognise that
the requirement is resolved?
```

The resulting human-perceptible Signals are **Resolution Prompts**.

A Resolution Prompt may:

- inform;
- solicit input;
- request action;
- request confirmation;
- expose evidence;
- record verifiable information.

A Resolution Prompt remains a Signal. The special term describes its role in the Resolution process.

---

## 5. Participating ICs

For each Resolution Prompt ask:

```text
Which IC is responsible for producing it?
```

This identifies an initial set of participants.

Then ask:

```text
What additional computation must occur
even though it does not directly produce
human-facing evidence?
```

These become supporting ICs.

Thus a CPUX can contain:

```text
human-visible participants
and
supporting participants
```

without making them different runtime types.

The distinction exists only for design understanding.

---

## 6. S1 as Activation Condition

A CPUX should not initially be designed by asking a new developer:

```text
What should be in the FIS and FPS?
```

Instead ask:

> **What must be true before this IC is allowed to act?**

The answer becomes the S1 Signal contract.

Example:

```text
IC_AddTodo

Before it may act:

- Todo text has been supplied.
- Add has been explicitly requested.
```

Studio can represent this formally as:

```text
S_AddTodoRequest

Intention:
    AddTodo

Pulses:
    P_TodoTextPresent
    P_AddRequested
```

The Field's Intention and Pulse sets provide the runtime matching mechanism.

The design concept remains:

```text
activation condition
```

---

## 7. S2 as Consequence

After defining S1, ask:

> **What becomes true after this IC completes?**

The answer shapes S2.

Example:

```text
IC_AddTodo completes.

Now true:

- the Todo exists;
- the mutation succeeded;
- a refresh is required.
```

The output Signal may therefore contain:

```text
Intention:
    TodoAdded

Pulses:
    P_TodoCreated
    P_TodoMutationCompleted
    P_RefreshRequired
```

S2 is therefore not merely returned data. It is a contribution to the shared Situational Reality.

---

## 8. Activation Dependency

An **Activation Dependency** exists when one IC contributes conditions required by another IC's S1.

Example:

```text
IC_AddTodo
      |
      | S_TodoAdded
      | P_RefreshRequired
      v
IC_RefreshTodos
```

The correct interpretation is not merely:

```text
IC_AddTodo runs before IC_RefreshTodos.
```

It is:

> **IC_AddTodo changes the Field so that IC_RefreshTodos becomes eligible to participate.**

This is a fundamental distinction from imperative workflow sequencing.

Sequence emerges from conditions.

---

## 9. Pulses as inexpensive dependency vocabulary

Pulses should be inexpensive to create.

If a dependency deserves a distinct name, it should generally receive one.

For example:

```text
P_DataValidatedForPricing
P_HumanConfirmed
P_RefreshRequired
P_ProofVerified
P_FormalisationAccepted
P_ProvenanceKnown
```

This allows CPUX designs to prefer explicit semantics over clever reuse.

A design rule is:

> **Create a precise Pulse when it makes an activation dependency clearer.**

This improves both execution and explanation.

---

## 10. Positive and negative participation

Correct CPUX design must ask two questions.

### Who should become eligible?

```text
S2_A
    ↓
IC_B
IC_C
```

### Who must remain ineligible?

```text
S2_A
must not accidentally satisfy
S1_D
```

This provides a deterministic design test:

```text
Expected activation:
    satisfied

Forbidden activation:
    unsatisfied
```

Resolution therefore depends not merely on progress but on controlled participation.

---

## 11. The Field as evolving Situational Reality

The CPUX Field can be interpreted as the runtime accumulation of currently established conditions.

Conceptually:

```text
Field at t0
   ↓
IC_A activated
   ↓
new Signal
   ↓
Field at t1
   ↓
IC_B activated
   ↓
new Signal
   ↓
Field at t2
```

This can be written abstractly:

\[
F_{t+1}=\Phi(F_t,S_{new})
\]

where the Field evolves through accepted Signal occurrences.

The Field does not represent objective reality. It represents the CPUX's current bounded Situational Reality.

---

## 12. Resolution does not belong to the Field

A stable Field is not automatically a resolved requirement.

The runtime can establish:

```text
these conditions are present
these ICs participated
these Signals were emitted
these routes occurred
```

But Resolution belongs to the requirement holder.

Thus:

```text
runtime convergence
≠
human resolution
```

The CPUX provides Resolution evidence. The human accepts, rejects, or leaves the Resolution open.

This protects the distinction between system state and human meaning.

---

## 13. Resolution Prompts close the loop

Resolution Prompts connect the internal Situational Reality to the human observer.

For example:

```text
Requirement:
Maintain an accurate Todo list.

Field:
P_TodoMutationCompleted = Y
P_CurrentTodoCollectionAvailable = Y

Resolution Prompt:
Display refreshed Todo list.

Human:
accepts that requested Todo was added.
```

The CPUX has not declared satisfaction by fiat. It has exposed the conditions from which the human can resolve the requirement.

---

## 14. CPUX and Proof

Formal proof can participate in CPUX like another trusted computational result.

For example:

```text
IC_VerifyProof
        ↓
DN_LeanVerifier
        ↓
S_ProofVerified
```

with:

```text
Intention:
    ProofChecked

Pulses:
    P_ProofVerified = Y
    P_AxiomsKnown = Y
```

Another participant may check formalisation correspondence:

```text
IC_ReviewFormalisation
        ↓
S_FormalisationReviewed

P_FormalisationAccepted = Y
```

A later Resolution Prompt may expose both.

Thus a CPUX can represent:

```text
proof
+
semantic correspondence
+
provenance
+
human acceptance
```

without pretending they are the same operation.

---

## 15. Example: machine-generated mathematical proof

Consider the requirement:

```text
Determine whether conjecture C
can be accepted as formally established.
```

A CPUX might contain:

### IC_Formalise

```text
Input:
natural mathematical requirement

Output:
formal statement F
```

### IC_CheckCorrespondence

```text
Input:
C + F

Output:
P_FormalisationAccepted
```

### IC_GenerateProof

```text
Input:
F

Output:
candidate proof P
```

### IC_VerifyProof

```text
Input:
F + P

Output:
P_ProofVerified
```

### IC_CheckProvenance

```text
Output:
P_ProvenanceKnown
```

### IC_ResolutionPrompt

Activation condition:

```text
P_FormalisationAccepted = Y
P_ProofVerified = Y
P_ProvenanceKnown = Y
```

Output:

```text
The formal statement corresponding to the
submitted conjecture has been verified under
the declared assumptions and provenance.
```

The mathematician can then accept, reject, or keep the requirement unresolved.

---

## 16. CPUX design methodology

A simple CPUX design discipline is:

### 1. State the Requirement

```text
What is this CPUX intended to resolve?
```

### 2. Define Resolution Prompts

```text
What must the human see, answer,
confirm, or inspect?
```

### 3. Identify prompt-producing ICs

```text
Which IC produces each Prompt?
```

### 4. Add supporting ICs

```text
What work is required that has no direct UI Prompt?
```

### 5. Define S1

For every IC:

```text
What must be true before it may act?
```

### 6. Define S2

For every IC:

```text
What becomes true after it acts?
```

### 7. Inspect dependencies

```text
Who should this wake up?
Who must remain inactive?
```

### 8. Refine Pulses

Create precise Pulses for unclear dependencies.

### 9. Validate Resolution coverage

Check:

```text
every required Prompt has a producer
every required IC is reachable
every intended dependency is satisfiable
no forbidden activation is introduced
no required path terminates prematurely
```

This yields a CPUX that is **structurally resolvable**.

The final human Resolution remains outside the runtime.

---

## 17. CPUX Studio

CPUX Studio can turn this methodology into a guided design environment.

The beginner should see:

```text
Requirement

Resolution Prompts

Participating ICs

When may this IC act?

What becomes true after it acts?

Who does that enable?

Who must stay inactive?

Can the required evidence be reached?
```

Studio can translate those answers into the formal Intention Space structures:

```text
Intention
Pulse
Signal
S1
OH
DN
S2I
RO
S2
FIS
FPS
Field
FieldBoard route
```

The same underlying design can therefore support:

```text
guided human view
and
formal runtime view
```

without creating two architectures.

---

## 18. Studio as Resolution designer

The deeper purpose of CPUX Studio is not merely to draw process diagrams.

It can become a **Resolution designer**.

It can expose:

```text
Requirement coverage
Trust points
DN black boxes
Resolution Boundary
Activation dependencies
Expected participation
Forbidden participation
Resolution Prompts
Runtime evidence
```

This gives the designer direct control over the bounded reality the CPUX is allowed to use.

---

## 19. LLM participation

An LLM can assist Studio by proposing:

```text
candidate Resolution Prompts
candidate ICs
candidate Intentions
candidate Pulses
candidate S1 conditions
candidate S2 consequences
candidate activation dependencies
possible missing evidence
possible accidental activation
```

But the LLM need not become the authority.

A disciplined relation is:

```text
Human defines Requirement.

LLM proposes.

Studio represents.

Runtime validates contracts.

CPUX executes.

Human resolves.
```

This preserves human agency while allowing substantial AI assistance.

---

## 20. Why CPUX differs from workflow orchestration

A workflow usually emphasizes:

```text
A then B then C
```

A CPUX emphasizes:

```text
A may participate when condition X exists.

A contributes condition Y.

B may participate because Y now exists.
```

This makes CPUX particularly suitable when:

- participants are independently developed;
- some participants are humans;
- some are AI models;
- some are formally verified computations;
- conditions can arise asynchronously;
- cooperation must remain explicit;
- the same participant may belong to multiple compositions.

The primary design object becomes:

```text
conditioned participation
```

rather than:

```text
fixed procedure
```

---

## 21. The larger model

The broader framework can now be expressed as:

```text
WORLD
  ↓
selected granularity
  ↓
Resolution Boundary
  ↓
Situational Reality
  ↓
trusted participants / observations / proofs
  ↓
CPUX conditioned cooperation
  ↓
Resolution Prompts
  ↓
human acceptance
  ↓
Resolution
```

Proof is accommodated naturally:

```text
Proof
  ↓
strong trust point
  ↓
Situational Reality
```

It is neither diminished nor overloaded.

---

## 22. Central proposition

> **CPUX provides an executable architecture for Resolution by allowing trusted black-box participants to contribute explicit Signal conditions to a bounded Situational Reality, while exposing human-perceptible Resolution Prompts from which the requirement holder can determine whether the original requirement has been satisfactorily addressed.**

This makes Resolution more than philosophical terminology.

It becomes something that can be:

- designed;
- inspected;
- executed;
- tested;
- logged;
- replayed;
- challenged;
- and ultimately accepted by a human.

---

## 23. Closing perspective

Modern systems increasingly combine:

```text
formal proof
AI computation
deterministic software
human judgement
external evidence
institutional authority
```

Attempting to collapse all of these into one universal trust mechanism is unrealistic.

Leaving their boundaries implicit is dangerous.

The alternative proposed across these notes is:

```text
make the requirement explicit

declare the granularity

identify trust points

define the Resolution Boundary

construct the Situational Reality

distinguish Proof from Resolution

make cooperation explicit

present Resolution evidence

leave final acceptance with the human
```

CPUX is one computational architecture for putting that discipline into practice.

---

## Related notes and references

This note should be read with:

1. **Situational Reality: Requirement-Relative Reality Under Explicit Granularity**
2. **Proof and Resolution: Two Different Forms of Establishment**
3. **Machine Proof and Human Mathematical Resolution**

Contemporary mathematical context:

- DeepMind et al., “Olympiad-level formal mathematical reasoning with reinforcement learning,” *Nature* (2025). https://doi.org/10.1038/s41586-025-09833-y
- “Mathematicians are developing rules for AI use — other fields should follow,” *Nature* (2026). https://doi.org/10.1038/d41586-026-01881-2
- “Solutions, challenges and rising tensions in AI and mathematics,” *Nature Machine Intelligence* (2026). https://doi.org/10.1038/s42256-026-01269-x
