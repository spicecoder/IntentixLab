---
title: "Bounded Computation and Open-Ended Intention"
subtitle: "A Research Note on Intention Space, CPUX Decidability, Turing Undecidability, Gödelian Extension, and Human–AI Agency"
author: "Pronab Pal"
organisation: "Intentix Lab / Keybyte Systems Australia"
status: "Research note for further investigation"
date: "2026-07-19"
research_pillar: "Foundations of Intention Space"
keywords:
  - Intention Space
  - PnR Computing
  - CPUX
  - SyncLogic
  - Turing machine
  - undecidability
  - halting problem
  - diagonalisation
  - Gödel incompleteness
  - open-endedness
  - artificial intelligence
  - human agency
---

# Bounded Computation and Open-Ended Intention

## Abstract

Intention Space represents intentions, observable phrases, computational components, and execution paths as explicit elements of a software system. Its operational strength depends on boundedness: within a particular Intention Space, the Pulses, Signals, Intentions, Design Nodes, Objects, and CPUX paths must be sufficiently identifiable for execution, validation, and audit.

A CPUX is decidable by design. SyncLogic evaluates a finite, declared CPUX structure against an enumerable Pulse Field and observable runtime states. It can therefore determine the next coordination action—activate, skip, continue, enter pre-halt, or halt—without attempting to solve the internal computation performed by a Design Node.

Human intention appears to possess a different characteristic. A human actor is not obviously restricted to a permanently fixed catalogue of possible intentions. A person may formulate a new goal, negate a proposed goal, reject the vocabulary in which a problem has been framed, or introduce a distinction unavailable in the preceding system. At any particular time, active intentions may be finite, while the process by which future intentions are generated may be indefinitely extensible.

This note separates three levels:

1. decidable CPUX coordination;
2. potentially unrestricted computation inside Design Nodes;
3. open-ended extension of Intention Space by human or artificial actors.

Turing undecidability applies to unrestricted computation and universal semantic prediction, not to CPUX progression itself. Gödelian incompleteness is used as a structural analogy for extension, not as proof that the human mind is non-computable.

The resulting principle is:

> Every executable Intention Space must be locally bounded and decidable in its coordination, while the succession of Intention Spaces available to an intentional actor may remain open to extension.

---

## 1. Background

Traditional software represents data, control flow, functions, and state explicitly, while the intentions responsible for those structures remain largely in requirements, documentation, conversations, or the developer’s mind.

Intention Space was introduced to make intention a first-class operational element of software interaction.

In the present model:

- **Pulses** are identifiable phrases carrying trivalent states and optional Responses.
- **Signals** are coherent subsets of Pulses.
- **Intentions** carry Signals between participants.
- **Objects** receive and reflect Intentions.
- **Design Nodes** contain executable or procedural content.
- **CPUX** describes a Common Path of Understanding and Execution.
- **The Field** records the evolving Pulse state during execution.
- **SyncLogic** determines valid CPUX progression from the current Field and observable member states.

A CPUX execution is therefore intentionally bounded. Its phrases, conditions, participants, and transitions are declared and identifiable.

PnR Computing has previously been presented as Turing-complete by mapping Turing-machine state and transition behaviour into PnR transformations and an Intention Loop. That result concerns the computational expressiveness available through the Design Node and PnR transformation model.

It does not imply that CPUX coordination itself is undecidable.

This note develops that distinction by separating:

1. the decidable coordination structure of CPUX;
2. the potentially unrestricted computation enclosed within Design Nodes;
3. the open-ended capacity of an actor to extend an Intention Space.

---

## 2. The Initial Observation

At any moment, a human being has limited attention, working memory, bodily capacity, and opportunity for action. It would therefore be unjustified to claim that a person simultaneously possesses an actually infinite collection of active intentions.

Nevertheless, no scientific result presently establishes a complete, fixed catalogue containing every intention that a human could ever formulate. Human beings can construct novel phrases, combine prior concepts, invent tools, create institutions, revise values, and perceive previously unrepresented distinctions.

Let:

\[
I_t = \{\text{intentions active or available to an actor at time }t\}.
\]

For a finite embodied actor, \(I_t\) may be finite or operationally bounded.

Let:

\[
G(A_t,O_t,L_t,M_t,E_t)
\]

denote an intention-generation process dependent on the actor’s current attention, observations, language, memory, and environment.

A future intention may satisfy:

\[
i_{t+1} \notin I_t
\]

while still being generated through the actor’s interaction with the world.

The central claim is therefore not that a human possesses infinitely many intentions at once. It is:

> No permanently closed operational vocabulary of all possible future human intentions is presently known, and human intention formation appears capable of recursive and contextual extension.

This property is called **indefinite extensibility of intention**.

---

## 3. CPUX Is Decidable by Design

### 3.1 Finite Operational Structure

A CPUX is defined through a finite and declared structure:

\[
CX = (M, P, S, R)
\]

where:

- \(M\) is the ordered set of CPUX members;
- \(P\) is the Pulse vocabulary;
- \(S\) is the set of declared Signals;
- \(R\) is the SyncLogic rule set.

At any runtime snapshot, SyncLogic receives:

\[
(CX,F,\Sigma)
\]

where:

- \(CX\) is the CPUX definition;
- \(F\) is the current Field;
- \(\Sigma\) is the observable runtime state of participating Objects and Design Nodes.

SyncLogic computes:

\[
Decision(CX,F,\Sigma)
ightarrow
\{activate, skip, continue, prehalt, halt\}.
\]

Each decision is based on:

- finite Signal–Field matching;
- declared source and target associations;
- enumerable CPUX members;
- observable runtime states;
- and explicit progression and termination rules.

Therefore, the next CPUX coordination action is decidable.

### 3.2 CPUX Decidability Proposition

> **For a finite, structurally valid CPUX operating over an enumerable Pulse Field, SyncLogic provides a terminating decision procedure for determining the next coordination action from any observable runtime snapshot.**

This proposition does not require prediction of the internal behaviour of a Design Node.

### 3.3 Signal Matching Is Decidable

Each Signal is a finite mapping:

\[
S_i = \{P_1:v_1,P_2:v_2,\ldots,P_k:v_k\}
\]

where each \(v_j\) belongs to the trivalent set:

\[
TV = \{Y,N,UN\}.
\]

The Field is also a finite Pulse-state mapping.

Signal matching reduces to finite comparison:

\[
Match(S_i,F)=
\begin{cases}
true & \text{if every required Pulse state in }S_i\text{ appears in }F\\
false & \text{otherwise.}
\end{cases}
\]

The comparison can be implemented directly or through precomputed Signal identifiers and hashes.

### 3.4 Pre-Halt and Halt Are Defined States

After each CPUX pass, SyncLogic can determine:

- whether any Design Node is still executing;
- whether any Design Node remains ready;
- whether a ready node was activated during the pass;
- whether the CPUX should continue;
- whether it has entered pre-halt;
- or whether it must halt.

These are explicit decision rules rather than predictions about arbitrary future program behaviour.

---

## 4. Design Node Computation and the Boundary of Undecidability

### 4.1 Design Nodes Are Black Boxes

A Design Node may contain:

- a conventional program;
- a Python or Go function;
- an LLM agent;
- an external service;
- a human participant;
- a simulation;
- or a nested Intention Space.

The internal computation may be Turing-complete and unrestricted.

For an arbitrary program inside a Design Node, it may be undecidable in advance whether the program:

- terminates naturally;
- computes a particular semantic property;
- always fulfils its declared intention;
- or produces a specific result for every possible input.

This undecidability belongs to the internal computation, not to CPUX progression.

### 4.2 Observable Runtime Contract

SyncLogic does not attempt to prove what an arbitrary Design Node will do internally.

It interacts through an observable contract such as:

\[
State(DN) \in
\{Ready,Executing,Stopped,Failed,TimedOut,Cancelled\}.
\]

The CPUX decision depends on the reported state and Field, not on a universal proof of the Design Node’s future behaviour.

Thus:

\[
\boxed{
\text{decidable intentional coordination}
\quad\text{around}\quad
\text{potentially undecidable computation}
}
\]

becomes a central architectural characteristic of Intention Space.

### 4.3 Operational Termination

A Design Node could remain in `Executing` state indefinitely if no execution boundary exists.

This does not make the next SyncLogic decision undecidable. SyncLogic can still decide to continue observing.

However, guaranteeing that the complete CPUX execution reaches a terminal state requires a runtime contract such as:

- timeout;
- heartbeat;
- lease expiry;
- cancellation;
- bounded retries;
- failure transition;
- or external confirmation.

For example:

\[
Executing \land elapsed < T
\Rightarrow continue
\]

\[
Executing \land elapsed \geq T
\Rightarrow TimedOut.
\]

Under such a contract, even non-terminating internal computation is mapped into a finite CPUX-recognised state.

### 4.4 CPUX Operational-Termination Proposition

> **A CPUX execution is operationally terminating when every participating Design Node is governed by a contract that maps completion, failure, cancellation, or timeout into a finite CPUX-recognised state transition.**

Natural termination of every internal program is not required.

---

## 5. Turing’s Undecidability Result

### 5.1 The Modern Halting Construction

Assume that a total decision procedure exists:

\[
HALT(M,x)
\]

which returns `YES` exactly when machine \(M\) halts on input \(x\), and `NO` otherwise.

Construct a machine \(D\):

```text
D(m):
    if HALT(m, m) == YES:
        loop forever
    else:
        halt
```

Now evaluate:

\[
D(D).
\]

If `HALT(D,D)` predicts halting, \(D(D)\) loops.

If it predicts non-halting, \(D(D)\) halts.

Therefore, no universal total procedure can correctly decide halting for every possible program-input pair.

Turing’s original 1936 formulation used circle-free machines and related symbol-printing behaviour rather than the exact modern textbook program named `HALT`. The modern construction expresses the same fundamental undecidability boundary in a familiar form.

### 5.2 What the Result Does Not Say

The halting result does not imply that:

- every program is undecidable;
- every workflow is undecidable;
- finite state machines are undecidable;
- bounded loops cannot be verified;
- CPUX progression is undecidable;
- or humans can decide every case that machines cannot.

It applies to a claimed universal decision procedure over unrestricted computation.

### 5.3 Relevance to Intention Space

The correct Intention Space interpretation is:

> Since arbitrary Design Node internals cannot be universally predicted, Intention Space places them inside explicit black-box boundaries. SyncLogic decides whether, when, and under what observable Signal conditions those Design Nodes may participate in CPUX execution.

The Turing result therefore supports the architectural separation between:

- internal computation;
- external coordination;
- declared intention;
- and observed result.

It does not undermine CPUX decidability.

---

## 6. Why the Opposite-Machine Argument Is Insufficient

Consider two Turing machines \(A\) and \(B\), where \(B\) moves in the opposite direction from \(A\), writes a complementary symbol, or applies a known inverse rule to each transition made by \(A\).

This creates a contrasting computation, but it does not by itself establish undecidability or a new intention.

If \(A\)'s transition table and the transformation defining \(B\) are known, then \(B\) is also a defined machine.

Therefore:

\[
\text{opposition} \neq \text{undecidability}.
\]

The useful intuition is that a fixed behavioural set can be challenged by constructing a response that differs from its members.

The formal mechanism required for an undecidability result is diagonalisation or self-reference.

---

## 7. Diagonalisation and Intention-Space Extension

Assume a proposed catalogue:

\[
C = \{I_1,I_2,I_3,\ldots\}
\]

claims to contain all intentions expressible by an actor under a particular representation.

Construct a meta-intention \(I^*\):

> In context \(C_n\), do not resolve the situation in the manner prescribed by \(I_n\); instead request or construct a distinct resolution.

For every indexed member \(I_n\), \(I^*\) differs from \(I_n\) in its corresponding context.

This resembles diagonalisation, but it does not yet prove that human intentions are mathematically non-enumerable or non-computable.

Several cautions apply:

1. natural-language intentions are not automatically formal functions;
2. the negative of an intention may be ambiguous;
3. the catalogue may contain higher-order or self-referential intentions;
4. new wording is not necessarily semantic novelty;
5. indefinite extension is not the same as uncountability.

The defensible conclusion is:

> Any fixed operational intention vocabulary can be challenged by a higher-order intention that rejects, revises, or extends its current modes of resolution.

This is an open-world principle, not a proof that the human mind transcends computation.

---

## 8. Rice’s Theorem and Semantic Validation

Rice’s theorem states that every non-trivial semantic property of the partial function computed by an arbitrary program is undecidable.

Examples include:

- whether a program accepts any input;
- whether it always returns a particular result;
- whether it ever produces an unsafe output;
- whether it completely implements a declared business intention.

For unrestricted Design Nodes, no general-purpose algorithm can decide every such property from the program description alone.

This means:

> Explicit intention does not make arbitrary code universally semantically decidable.

Intention Space instead improves assurance by supplying:

- narrow Design Node contracts;
- declared Signal conditions;
- preconditions and postconditions;
- typed Responses;
- bounded CPUX paths;
- runtime evidence;
- provenance;
- testing;
- policy gates;
- restricted model checking;
- and human confirmation at uncertainty points.

The goal is not to eliminate undecidability.

The goal is to expose and govern the boundary between:

\[
\text{declared intention}
\]

and:

\[
\text{observed computation}.
\]

---

## 9. Local Closure and Global Openness

### 9.1 Operational Intention Space

For a runnable Intention Space:

\[
IS_n =
(P_n,S_n,I_n,O_n,DN_n,CX_n,R_n)
\]

the operational vocabulary and rules are declared.

This local boundedness enables:

- SyncLogic decisions;
- Signal matching;
- provenance;
- validation;
- and auditability.

### 9.2 Intention-Space Extension

An actor may encounter a situation that cannot be adequately represented or resolved using the current vocabulary.

The actor may introduce:

\[
IS_n \subset IS_{n+1}.
\]

The extension may add:

- a new Pulse;
- a new Intention;
- a new Object distinction;
- a new Signal condition;
- a new Design Node;
- a new CPUX;
- or a new authority or provenance rule.

The series:

\[
IS_0 \subset IS_1 \subset IS_2 \subset \cdots
\]

need not be completed in advance.

### 9.3 Open Extension Principle

> **For any operationally closed Intention Space, an intentional actor may encounter or formulate a situation whose adequate representation or resolution requires an extension of that Intention Space.**

This principle does not make the existing CPUX undecidable.

It means that a decidable CPUX may reach an explicit unresolved or halted state from which an actor decides to design a new Intention Space or extend the current one.

---

## 10. Gödelian Incompleteness and Domain Extension

Gödel’s first incompleteness theorem applies to sufficiently expressive, effectively axiomatized, consistent formal systems capable of representing elementary arithmetic.

Such a system contains statements that it cannot prove internally.

This is not directly a theorem about:

- every software workflow;
- finite CPUX execution;
- human consciousness;
- or biological intention.

The useful relation is structural.

| Formal system | Intention Space |
|---|---|
| Axioms and formal vocabulary | Pulses, Intentions, Signals, and rules |
| Formal derivation | CPUX progression |
| Provable theorem | Verifiable state or transition |
| Undecidable sentence | Question unresolved under current formal resources |
| Addition of an axiom | Addition of a Pulse, rule, or Intention |
| Expanded formal system | Extended Intention Space |

A new axiom can settle a statement undecidable in an earlier system, while the expanded system may itself contain further undecidable statements.

The analogous Intention Space claim is:

> Extension can resolve a limitation of a current formalisation without creating a final vocabulary for every future situation.

This does not mean that an established CPUX lacks a decidable next state.

It means that an actor may decide that the established vocabulary is insufficient for a newly recognised purpose.

---

## 11. Human Intention, Negation, and Conflict

Let:

\[
Intend(a,X)
\]

mean that actor \(a\) intends outcome or action \(X\).

Then:

\[
\neg Intend(a,X)
\]

means that the actor does not intend \(X\).

This is not necessarily equivalent to:

\[
Intend(a,\neg X),
\]

which means that the actor intends that \(X\) should not occur.

The following states differ:

- not intending to travel;
- intending not to travel;
- remaining undecided;
- postponing the decision;
- intending to prevent another person from travelling.

Humans may also hold conflicting candidate intentions.

For example:

- eat the cake;
- maintain the diet.

The intentions may coexist during deliberation even when their complete realisation is mutually exclusive.

This suggests an intention lifecycle:

\[
I^{proposed}
\rightarrow
I^{considered}
\rightarrow
I^{selected}
\rightarrow
I^{authorised}
\rightarrow
I^{executing}
\rightarrow
I^{realised}.
\]

Intention commitment may therefore require a separate representation from trivalent Pulse state.

---

## 12. Human Uniqueness as Intention-Space Extension

A cautious form of the human-uniqueness hypothesis is:

> Human distinctiveness may lie less in possessing a particular intention and more in the capacity to create, negate, reinterpret, socially justify, and operationalise intentions beyond a previously fixed vocabulary.

This is an empirical and philosophical hypothesis, not an established theorem.

It does not require humans to violate the Church–Turing thesis.

A finite computational process may generate indefinitely many descriptions.

The deeper research questions are:

1. Can an actor recognise that the current goal vocabulary is inadequate?
2. Can it introduce a new evaluative dimension rather than merely a new plan?
3. Can it explain why the extension is required?
4. Can it identify the provenance and authority of the proposed intention?
5. Can it negotiate the intention with other actors?
6. Can it create a bounded and decidable CPUX to operationalise the extension?
7. Can the extension be tested against observations?

---

## 13. Relation to Artificial Intelligence

Current AI agents can:

- generate plans;
- use tools;
- retain external memory;
- revise intermediate actions;
- learn from feedback;
- and produce novel descriptions.

These activities normally occur within an objective structure supplied through:

- a user request;
- a system instruction;
- a reward function;
- training data;
- a benchmark;
- or an agent framework.

There is a hierarchy:

\[
\text{select action}
<
\text{select plan}
<
\text{select goal}
<
\text{revise goal-evaluation rule}
<
\text{create a new evaluative dimension}.
\]

Current AI is strongest at action and plan selection.

It can propose apparent goals, but the provenance and authority of those goals are often unclear.

Intention Space can provide a control layer in which:

- each proposed goal becomes an explicit Intention;
- supporting observations become Pulses and Responses;
- provenance is recorded;
- authority and authorisation are explicit;
- execution occurs through a bounded CPUX;
- SyncLogic keeps coordination decidable;
- and the resulting Field provides evidence for acceptance, revision, or rejection.

Thus:

> AI-generated intentions should not pass invisibly into action. They should enter an inspectable Intention Space where provenance, authority, evidence, and execution scope are explicit.

---

## 14. Proposed Formal Vocabulary

### 14.1 Operational Intention Space

\[
IS = (P,S,I,O,DN,CX,R)
\]

where \(R\) includes SyncLogic and structural validation rules.

### 14.2 Intention-Space Extension

\[
E(IS_n,\Delta_n)=IS_{n+1}
\]

where \(\Delta_n\) contains newly introduced entities or rules.

### 14.3 Conservative Extension

An extension is conservative when it does not invalidate previously valid CPUX results within their original scope.

### 14.4 Revisionary Extension

An extension is revisionary when it changes the interpretation, validity, priority, or authority of an existing Intention or CPUX.

### 14.5 Intention Provenance

\[
Prov(i)=
(originator,context,evidence,authority,timestamp,derivation).
\]

### 14.6 Intention Novelty

A candidate intention may have:

1. lexical novelty;
2. compositional novelty;
3. operational novelty;
4. evaluative novelty;
5. ontological novelty;
6. normative novelty.

Only the later levels seriously test intention-space extension.

---

## 15. Research Questions

### RQ1 — CPUX Decidability

Can the CPUX Decidability Proposition be formally proved for the complete SyncLogic specification?

### RQ2 — Operational Termination

Which Design Node contracts are sufficient to guarantee CPUX-recognised termination without requiring natural termination of internal computation?

### RQ3 — Extension Detection

Can a system detect that an unresolved Field is caused by an inadequate Pulse or Intention vocabulary rather than missing data?

### RQ4 — Human–AI Difference

When humans and AI agents encounter the same unresolved Intention Space, do they propose different kinds of extensions?

### RQ5 — Novelty

Can lexical novelty be separated from operational, evaluative, ontological, and normative novelty?

### RQ6 — Provenance

Can the origin and authority of an AI-proposed intention be preserved throughout CPUX execution?

### RQ7 — Undecidability Boundary

Which semantic properties of unrestricted Design Nodes remain undecidable, and which properties become decidable under explicit contracts?

### RQ8 — Safe Open-Endedness

Can Intention Space support open-ended intention proposals while preventing unverified proposals from entering execution?

---

## 16. Proposed Experimental Programme

### Experiment 1 — Formal SyncLogic Verification

Create a formal state-transition model of SyncLogic.

Verify that for every structurally valid CPUX snapshot:

\[
(CX,F,\Sigma)
\]

exactly one permitted coordination result is produced.

Test:

- activation;
- skip;
- continue;
- pre-halt;
- halt;
- failure;
- timeout;
- cancellation.

### Experiment 2 — Design Node Contract Classes

Define Design Node classes:

1. immediately terminating;
2. bounded execution;
3. heartbeat with timeout;
4. retry-bounded;
5. human confirmation;
6. unrestricted external process.

Determine which contracts guarantee CPUX-recognised termination.

### Experiment 3 — Fixed Intention Catalogue Challenge

Give human and AI participants the same finite Intention Space and situations that cannot be adequately resolved without adding a distinction.

Measure whether they:

- force a result;
- declare uncertainty;
- request data;
- add a Pulse;
- revise an Object;
- or propose a new Intention.

### Experiment 4 — Goal Versus Plan Novelty

Provide a task in which many plans are possible but the supplied objective is defective.

Measure whether participants:

- optimise the given objective;
- detect the defect;
- revise the goal;
- add a stakeholder;
- or refuse execution.

### Experiment 5 — Scientific Intention Extension

Provide scientists or analysts with data and an initial hypothesis vocabulary.

Record when they introduce:

- a new observation;
- a confounder;
- a rival hypothesis;
- a new measurement;
- a new unit of analysis;
- or a new criterion of relevance.

Compare conventional notebook history with Intention Space provenance.

---

## 17. Expected Technical Contributions

The programme may produce:

1. a formal **SyncLogic state-transition specification**;
2. a proof of **CPUX coordination decidability**;
3. a **Design Node contract taxonomy**;
4. a **CPUX operational-termination protocol**;
5. an **Intention Extension Schema**;
6. an **Intention Provenance Ledger**;
7. an **Unresolved Field Diagnoser**;
8. a novelty classifier;
9. a Human Confirmation Design Node;
10. and benchmark scenarios for human–AI intention extension.

---

## 18. Possible AusIndustry R&D Framing

### 18.1 Core Technical Uncertainty

> It is not known whether a practical computational architecture can combine formally decidable intention-driven coordination with unrestricted or probabilistic internal computation, while also allowing humans and AI systems to propose new intention vocabulary without permitting unverified extensions to enter execution.

### 18.2 Proposed Hypothesis

> SyncLogic can provide decidable CPUX coordination around black-box Design Nodes, while explicit extension, provenance, and authorisation protocols can support open-ended intention proposal without sacrificing bounded and attributable execution.

### 18.3 New Knowledge Sought

The project would seek new knowledge concerning:

- formal decidability of full SyncLogic;
- operational termination of CPUX around non-terminating Design Nodes;
- detection of vocabulary inadequacy;
- distinction between plan novelty and goal novelty;
- provenance of machine-proposed goals;
- authorisation of Intention Space extensions;
- and empirical differences between human and AI extension behaviour.

### 18.4 Potential Experimental Activities

- formal modelling of SyncLogic;
- model checking of CPUX state transitions;
- construction of CPUX validators;
- implementation of timeouts and terminal-state contracts;
- controlled human–AI comparison trials;
- simulation of diagonal and self-referential tasks;
- implementation of intention provenance;
- measurement of false novelty and missed novelty;
- and comparison with conventional agent workflows.

### 18.5 Observable Measures

Possible measures include:

- percentage of CPUX snapshots producing a unique valid SyncLogic decision;
- validator defect detection rate;
- operational termination rate;
- timeout and failure recovery accuracy;
- unauthorised intention execution rate;
- novelty-classification accuracy;
- provenance completeness;
- and reproducibility of extension decisions.

This section is a technical framing only. Eligibility, registration, expenditure treatment, and documentation should be assessed against the R&D Tax Incentive requirements applicable to the relevant income year.

---

## 19. Working Propositions

### Proposition A — CPUX Coordination Is Decidable

For every finite, valid CPUX snapshot, SyncLogic determines the next permitted coordination action.

### Proposition B — Internal Computation May Remain Undecidable

A Design Node may contain unrestricted computation whose natural termination or semantic behaviour cannot be universally predicted.

### Proposition C — Operational Termination Is Contractual

A CPUX can reach a recognised terminal state when every Design Node maps completion, failure, cancellation, or timeout into an observable finite state.

### Proposition D — Non-Final Vocabulary

The vocabulary sufficient for one decidable CPUX need not be sufficient for every future situation.

### Proposition E — Extension Before Execution

A newly proposed intention should be represented, attributed, validated, and authorised before entering an executable CPUX.

### Proposition F — Human Uniqueness Remains Empirical

Turing’s and Gödel’s results do not prove human non-computability. Human distinctiveness through intention-space extension remains a research hypothesis.

### Proposition G — Open-Endedness Requires Governance

An open-ended agent without explicit intention provenance and bounded execution presents a safety problem.

An entirely closed agent may fail to respond to unforeseen contexts.

Intention Space should provide the boundary between these conditions.

---

## 20. Conclusion

The relationship between intention and computation should be described through three separate layers.

First:

\[
\boxed{\text{CPUX coordination is decidable through SyncLogic}}
\]

Second:

\[
\boxed{\text{Design Node internals may contain unrestricted computation}}
\]

Third:

\[
\boxed{\text{the creation of future Intention Spaces may remain open-ended}}
\]

Turing’s undecidability results apply to universal prediction of unrestricted computation. They do not make a finite, explicitly governed CPUX undecidable.

Intention Space responds to undecidability by placing potentially unrestricted computation inside Design Node boundaries and preserving a decidable coordination layer around it.

Gödelian incompleteness provides a structural analogy for the fact that extending a formal vocabulary may resolve current limitations without producing a final vocabulary for every future context.

The deeper objective is therefore a human–machine environment in which:

- the current intention is explicit;
- CPUX progression is decidable;
- Design Node boundaries are visible;
- internal uncertainty is not confused with coordination uncertainty;
- provenance and authority are preserved;
- execution is bounded operationally;
- limitations can be declared;
- and new intentions enter only through explicit extension.

This yields the central architectural proposition of Intention Space:

> **Decidable intentional coordination can govern potentially undecidable computation, while preserving the ability of human and artificial actors to propose new bounded intention spaces.**

---

## References

1. Turing, A. M. (1936). “On Computable Numbers, with an Application to the Entscheidungsproblem.” *Proceedings of the London Mathematical Society*, s2-42(1), 230–265. https://doi.org/10.1112/plms/s2-42.1.230

2. Gödel, K. (1931). “Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I.” *Monatshefte für Mathematik und Physik*, 38, 173–198. https://doi.org/10.1007/BF01700692

3. Church, A. (1936). “An Unsolvable Problem of Elementary Number Theory.” *American Journal of Mathematics*, 58(2), 345–363. https://doi.org/10.2307/2371045

4. Rice, H. G. (1953). “Classes of Recursively Enumerable Sets and Their Decision Problems.” *Transactions of the American Mathematical Society*, 74(2), 358–366. https://doi.org/10.1090/S0002-9947-1953-0053041-6

5. Davis, M. (1958). *Computability and Unsolvability*. McGraw-Hill.

6. Rogers, H. Jr. (1967). *Theory of Recursive Functions and Effective Computability*. McGraw-Hill.

7. Copeland, B. J., and Fan, Z. (2022). “Did Turing Stand on Gödel’s Shoulders?” *The Mathematical Intelligencer*, 44, 308–319. https://doi.org/10.1007/s00283-022-10177-y

8. Hamkins, J. D., and Nenu, T. (2024). “Did Turing Prove the Undecidability of the Halting Problem?” arXiv:2407.00680. https://doi.org/10.48550/arXiv.2407.00680

9. Lucas, J. R. (1961). “Minds, Machines and Gödel.” *Philosophy*, 36(137), 112–127. https://doi.org/10.1017/S0031819100057983

10. Penrose, R. (1989). *The Emperor’s New Mind*. Oxford University Press.

11. Penrose, R. (1994). *Shadows of the Mind*. Oxford University Press.

12. Feferman, S. (1996). “Penrose’s Gödelian Argument.” *Psyche*, 2(7).

13. Raatikainen, P. “Gödel’s Incompleteness Theorems.” *Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/goedel-incompleteness/

14. De Mol, L. “Turing Machines.” *Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/turing-machine/

15. Immerman, N. “Computability and Complexity.” *Stanford Encyclopedia of Philosophy*. https://plato.stanford.edu/entries/computability/

16. Lehman, J., Clune, J., Misevic, D., et al. (2020). “The Surprising Creativity of Digital Evolution.” *Artificial Life*, 26(2), 274–306. https://doi.org/10.1162/artl_a_00319

17. Friston, K. (2010). “The Free-Energy Principle: A Unified Brain Theory?” *Nature Reviews Neuroscience*, 11, 127–138. https://doi.org/10.1038/nrn2787

18. Pal, P. (2024). “Human Intention Space: Natural Language Phrase Driven Approach to Place Social Computing Interaction in a Designed Space.” *International Journal on Natural Language Computing*, 13(3). https://doi.org/10.5121/ijnlc.2024.13302

19. Pal, P. (2024). “PnR Computing: A Turing-Complete Model in a Social Setting.” *International Journal of Computer Science and Information Technology*.

20. Pal, P. (2025). *The Intention Space Complete*. Intentix Lab research manuscript.

---

## Interpretation Note

- CPUX progression is treated here as decidable under the complete and valid SyncLogic specification.
- Turing undecidability is confined to unrestricted computation and universal semantic prediction.
- Operational termination is distinguished from natural termination of a Design Node’s internal program.
- Gödelian extension is used as a structural analogy, not as proof of human non-computability.
- Open-ended intention is presented as a research hypothesis and engineering concept.
