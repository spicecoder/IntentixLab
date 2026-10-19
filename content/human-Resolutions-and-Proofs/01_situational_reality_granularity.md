# Situational Reality: Requirement-Relative Reality Under Explicit Granularity

## Abstract

Software systems, mathematical formalisms, scientific models, and human decision processes do not operate on reality in its entirety. They operate on selected distinctions. Some distinctions are observed directly; others are accepted through measurements, models, contracts, institutions, formal results, or computational components whose internal structure is intentionally not reopened.

This note develops **Situational Reality** as a requirement-relative and granularity-bounded account of what an observer accepts as presently meaningful. It introduces **Granularity**, **Trust Points**, **Black Boxes**, and the **Resolution Boundary** as explicit concepts.

> **A Situational Reality is the bounded set of distinctions, observations, propositions, and trusted behaviours that an observer accepts as meaningful for a requirement, at a declared granularity.**

The purpose of this concept is not to deny an objective world. It is to make explicit the much narrower reality on which actual reasoning, software execution, proof, and human acceptance depend.

---

## 1. Systems never operate on the whole world

Any requirement begins in a world richer than the representation used to address it.

A hospital-planning system does not contain the population, road network, emergency demand, political priorities, human behaviour, or future of a region in their entirety. It operates on data sets, models, assumptions, computations, and observations selected for the planning problem.

A theorem prover does not operate on all meanings a mathematician might associate with a mathematical statement. It operates on a formal expression, a chosen logic, libraries, declared axioms, and trusted checking mechanisms.

A software component normally does not know the full internal reality of another component. It accepts a contract.

The practical world therefore repeatedly takes this form:

```text
rich external reality
        ↓
selected distinctions
        ↓
accepted representation
        ↓
reasoning / computation
```

The important missing concept is the boundary at which that selection becomes accepted.

Situational Reality names that bounded operational reality.

---

## 2. Observer and Requirement

Let:

- \(O\) denote an observer;
- \(R\) denote a requirement.

The observer may be a person, a group, an institution, or a computational participant acting under an explicitly defined role.

The requirement determines what distinctions matter.

A population model adequate for national planning may be inadequate for locating an emergency department. A proof certificate adequate to establish formal correctness may be inadequate to explain why a theorem is mathematically interesting.

Thus the representation of reality is not independent of the requirement.

We can write:

\[
SR(O,R)
\]

for the Situational Reality available to observer \(O\) with respect to requirement \(R\).

This remains incomplete because it does not yet state the level of detail at which reality is being accepted. That requires **Granularity**.

---

## 3. Granularity

**Granularity** is the explicitly or implicitly selected level at which distinctions are treated as meaningful for the current requirement.

Let \(G\) denote a granularity. A conceptual projection can be written as:

\[
\pi_G : W \rightarrow SR_G
\]

where:

- \(W\) is the richer world from which distinctions could in principle be made;
- \(\pi_G\) is the selection induced by granularity \(G\);
- \(SR_G\) is the reality exposed at that granularity.

This notation does not assume that a complete world \(W\) is available to us. It expresses a methodological fact: the observer chooses, explicitly or implicitly, which distinctions remain visible and which internal structures are collapsed.

For example:

```text
fine granularity

source code
compiler behaviour
machine instructions
processor behaviour
physical state

        ↓ abstraction

coarser granularity

Signal In → Design Node → Signal Out
```

The lower-level structure has not ceased to exist. It has ceased to be reopened for the present requirement.

---

## 4. Black Boxes as accepted granularity

A **Black Box** is not simply an unknown object.

In this framework:

> **A Black Box is an entity whose internal distinctions are deliberately placed below the currently accepted granularity and replaced by an accepted observable contract.**

This definition is relative.

The same object can be a black box in one Situational Reality and an object of detailed inquiry in another.

For example:

```text
CPUX designer:
    DN_Population is a black box
    Input Signal → Output Signal

DN developer:
    DN_Population is open
    algorithms, code, data structures, tests

compiler engineer:
    compiled DN may be open at another granularity
```

Black-box status is therefore neither permanent nor intrinsic. It is a choice imposed by the current requirement and its accepted granularity.

---

## 5. Trust Points

Once an entity is placed below the selected granularity, the observer must decide what is accepted about it.

A **Trust Point** is an accepted proposition, contract, observation, capability, or behaviour on which the current Situational Reality is allowed to depend without reopening its internal derivation.

We may write:

\[
T_G(x)
\]

to mean that \(x\) is accepted as a trust point at granularity \(G\).

Examples include:

- a Design Node contract;
- a calibrated sensor reading;
- a database regarded as authoritative for a particular purpose;
- a formally checked theorem;
- a certified algorithm;
- a human confirmation;
- a legally authoritative document;
- an experimentally established measurement;
- a software library whose behaviour is accepted through testing and provenance.

Trust need not be arbitrary. A trust point can itself be supported by:

```text
proof
experimentation
testing
certification
measurement
provenance
institutional authority
peer review
contractual responsibility
```

The important distinction is that this supporting evidence belongs to a deeper or different inquiry. For the present resolution, the trust point is accepted at its declared boundary.

---

## 6. Resolution Boundary

The **Resolution Boundary** is the boundary across which internal structure is deliberately abstracted and replaced by accepted trust points for the purpose of resolving a particular requirement.

```text
                  Requirement R
                       |
                       v

+---------------------------------------------+
|            Resolution Boundary              |
|                                             |
|  observation                                |
|  trusted data                               |
|  formally established proposition           |
|  Design Node contract                       |
|  human confirmation                         |
|  model output                               |
|                                             |
|  internal structures below accepted         |
|  granularity are not recursively reopened   |
+---------------------------------------------+

                       |
                       v
              Situational Reality
```

The Resolution Boundary is not a claim that everything inside it is equally certain. It records what the current inquiry has elected to treat as sufficiently established for its purpose.

Without such boundaries, every requirement would recursively reopen every assumption beneath every observation. No engineering, science, mathematics, or ordinary human action could terminate.

---

## 7. A formal sketch

We may now write:

\[
SR_{O,R}^{G,T}
\]

where:

- \(O\) = observer;
- \(R\) = requirement;
- \(G\) = accepted granularity;
- \(T\) = accepted trust relation.

A Situational Reality may contain:

\[
SR_{O,R}^{G,T}=\{p_1,\ldots,p_n; t_1,\ldots,t_m\}
\]

where:

- \(p_i\) are currently accepted observations or propositions;
- \(t_j\) are accepted trust points.

A stronger textual definition is therefore:

> **Situational Reality is the requirement-relative reality available to an observer through an explicitly selected granularity of perception and trust, in which entities beneath that granularity are represented by accepted contracts, propositions, observations, or behaviours rather than recursively reopened internal structure.**

This definition deliberately makes Situational Reality:

- bounded;
- observer-relative;
- requirement-relative;
- granularity-explicit;
- trust-aware;
- revisable.

---

## 8. Observer-relative does not mean arbitrary

Situational Reality can be constrained by strong evidence.

Two observers can share:

- the same formally verified theorem;
- the same experimental measurement;
- the same certified sensor;
- the same signed transaction;
- the same Design Node contract.

They may nevertheless choose different requirements or different granularity.

The framework therefore separates:

```text
What evidence exists?

from

What is accepted for this requirement?
```

The first can be independently tested. The second belongs to the explicitly declared Resolution Boundary.

This prevents hidden assumptions from masquerading as universal reality.

---

## 9. Granularity is requirement-dependent

Consider two mathematical requirements.

### Requirement A

```text
Is theorem T formally established in Lean?
```

A suitable granularity may accept:

- the formal theorem statement;
- declared axioms;
- the Lean kernel;
- the generated proof term.

### Requirement B

```text
What mathematical idea explains why theorem T is true?
```

The same granularity may now be inadequate. The proof term may need to be opened. The Resolution Boundary moves inward.

This yields an important principle:

> **Appropriate granularity is partly determined by the requirement.**

Conceptually:

\[
G=G(O,R,C)
\]

where \(C\) represents relevant context.

There is therefore no universally correct granularity independent of purpose.

---

## 10. Situational Reality in software design

In Intention Space, a Design Node can be treated as a black box:

```text
S1 → DN → S2
```

The CPUX designer accepts that:

- the DN admits a declared Signal form;
- the DN produces a declared terminal Signal form;
- the DN is trusted at that interface for the current requirement.

The internal programming language, implementation, model, infrastructure, or algorithm need not participate in CPUX-level reasoning.

The CPUX designer therefore operates on a Situational Reality made from:

```text
Design Nodes
Signal contracts
Intentions
Pulses
Field conditions
routing relations
human-visible evidence
```

The CPUX becomes a computational environment operating over an explicitly bounded reality.

---

## 11. Situational Reality in mathematics

Mathematical practice also depends on granularity.

A mathematician commonly uses:

- previously established theorems;
- accepted definitions;
- trusted libraries;
- standard lemmas;
- computer algebra;
- numerical calculations;
- proof assistants.

The mathematician rarely re-derives the full foundational chain for every use. A previously established theorem becomes a trust point at the current granularity.

Formal systems make this unusually visible because assumptions and dependencies can often be enumerated explicitly.

The rise of automated proof generation therefore does not invent the problem of trust boundaries. It makes the boundary more visible and potentially more distant from direct human inspection.

---

## 12. Revision of Situational Reality

Situational Reality is not permanent.

A trust point can be challenged. An observation can be replaced. A requirement can change. A black box can be opened. A finer granularity can be selected.

Thus:

\[
SR_t \rightarrow SR_{t+1}
\]

as new evidence or distinctions become accepted.

Uncertainty therefore does not require the system to pretend that no reality exists. It requires the system to state which reality it is currently operating on.

---

## 13. Why the distinction matters

Many disputes that appear to concern truth actually concern hidden differences in granularity.

One participant asks:

```text
Was the formal proposition proved?
```

Another asks:

```text
Does that proposition correspond to the problem we intended?
```

Another asks:

```text
Can I understand the mathematical mechanism?
```

Another asks:

```text
Is this result sufficiently trustworthy to use?
```

These are not the same requirement.

They produce different Situational Realities and different Resolution Boundaries.

Making those boundaries explicit can clarify disputes that would otherwise be collapsed into the single question:

```text
Do you trust it?
```

---

## 14. Central proposition

> **Human and computational reasoning cannot avoid granularity. What can be avoided is leaving granularity implicit. Situational Reality provides an explicit account of the requirement-relative reality on which reasoning and action actually proceed.**

This prepares a further distinction.

Within a Situational Reality, a proposition may be formally proved. But proving a proposition and resolving the requirement that motivated the inquiry are not necessarily the same event.

That distinction is developed in the next note.

---

## References and context

This note extends the earlier IntentixLab discussion of Situational Reality.

Contemporary context:

- DeepMind et al., “Olympiad-level formal mathematical reasoning with reinforcement learning,” *Nature* (2025). https://doi.org/10.1038/s41586-025-09833-y
- “Solutions, challenges and rising tensions in AI and mathematics,” *Nature Machine Intelligence* (2026). https://doi.org/10.1038/s42256-026-01269-x
- “Mathematicians are developing rules for AI use — other fields should follow,” *Nature* (2026). https://doi.org/10.1038/d41586-026-01881-2
