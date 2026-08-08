---
title: "Context Dynamic Algebra, Verified at Runtime: Intention Space as the Execution Model CDA Was Waiting For"
date: 2026-08-08
category: "Foundations"
tags: ["CDA", "Intention Space", "CPUX", "requirement algebra", "execution semantics", "category theory"]
summary: "CDA (2020) defined requirement as a closed algebraic system but explicitly declined to specify its own execution. This paper shows Intention Space is that missing execution model — and that the correspondence exposes at least one structural phenomenon (human/machine locus loop-back) CDA's original formulation could not have anticipated."
status: "draft skeleton"
---

# Context Dynamic Algebra, Verified at Runtime: Intention Space as the Execution Model CDA Was Waiting For

*Draft skeleton — structural outline with load-bearing claims marked. Sections to be expanded into full prose.*

## Abstract (to draft last)

State the thesis directly: CDA (Pal, 2020) formalized requirement as a closed dynamical algebra of Attention Phrases, but was explicit that it did not — and structurally could not, from within its own scope — specify how that algebra unfolds during execution. This paper argues Intention Space / CPUX is that missing execution model: a category-theoretic runtime whose objects (execution loci, human and machine) and morphisms (CPUX paths) give CDA's equilibrium/non-equilibrium dynamics an actual place to happen. We show the correspondence is not merely translational — several CDA operators (φ, {}, δ/Δ, μ, Λ, σ, τ, ρ) map onto specific IS structures with checkable, non-trivial properties — and that the mapping surfaces a genuine addition CDA's original one-directional model did not anticipate: execution-time loop-back from machine locus to human locus.

---

## 1. CDA's Own Stance: A Specification Waiting to Be Unfolded

- Open with CDA's explicit self-limitation, quoted directly: *"the paper does not cover the technical implementation details, nor does it go to the detail treatment of operators in their execution steps."*
- Establish that this was a **principled exclusion**, not an oversight — CDA's stated goal was requirement as "a system... independent of variety of implementation characteristics, at the code, language, and hardware platform."
- Frame the central historical fact: CDA modeled its own dynamics on equilibrium/non-equilibrium (Δ/δ), borrowing the general Wikipedia definition of a dynamical system (state evolving through time via an evolution rule) — but never built or committed to that evolution rule itself. It predicted the *shape* of execution without specifying the *mechanism*.
- State the paper's core methodological move: rather than treat this gap as something to patch informally, treat CDA as making implicit, checkable predictions about what any valid execution model of it must look like — then test those predictions against Intention Space.

## 2. Intention Space / CPUX as the Verifying Runtime

- Introduce the CPUX stack (Perception → Pulse → Signal → Field → FieldBoard → CPUX) at the level needed for this paper, not the full framework.
- Introduce **locus of execution** as the missing base structure identified in the course of this alignment work — split explicitly into **human locus** and **machine locus**, with different structural properties (machine: addressable, persistent, deterministic; human: transient, embodied, inferred rather than queried).
- State the resolved answer on directionality: **loop-back is real** — human locus does not only precede machine locus; machine-locus execution can generate new human-locus attention (e.g., a system output creating new human intention). This is stated as a design commitment, not left open.
- Introduce CPUX formally as a **category**: objects = loci (human and machine), morphisms = CPUX paths, composition = the `+` operator (CPUX1 + CPUX2 = CPUX3), defined only when endpoints match (partial composition), associative, with local identity morphisms (zero-duration CPUX at a locus), and **no general inverses** — chronological sequence does not reverse.
- Note explicitly what this is *not*: not a group, not a total monoid. Name the correct classification (category, specifically resembling a path category over a directed graph of loci) and state why getting this classification right matters for anything built on top of it later (proof obligations, tooling, composition guarantees).

## 3. Operator Correspondences, Reframed as Predictions

Present the mapping not as a dictionary but as: *"CDA's operator X, if genuinely unfolding at runtime, predicts IS structure Y should exist and behave like Z."* Each entry gets a prediction, a check, and a verdict.

| CDA Operator | Prediction | IS Structure Checked Against | Verdict |
|---|---|---|---|
| φ (pointer) | requirement-time context sequencing, including retraction (`−` mode) | Pulse formation at specification time vs. DN at execution time | **Resolved via layer split** — φ is specification-time (reversible, editable); DN is execution-time (irreversible). Not the same operator observed twice; a specification/runtime pair. |
| {} (knot) | grouping of Attention Phrases into a bounded unit | Intention | Direct correspondence; Cue (CDA's output of {}) = one Intention instance |
| δ/Δ (equilibrium/non-equilibrium) | tension-and-resolution dynamic, one resolvable point per domain time unit | Pulse trivalent state (Y/N/Unknown), Field/FieldBoard | Direct correspondence |
| μ (measure) | value attachment to a Cue member | Response payload | Direct correspondence |
| Λ (transit) | the *only* operator invoking external computation | DN, realized specifically at machine locus | Central hinge — see §4 |
| σ (scope) | binding a Cue to a Context | Signal (the scope that travels along a CPUX) | Direct correspondence |
| τ (ancestry) | reverse traversal by count, enabling reuse across contexts (CDA's stated polymorphism) | path-history / position, recoverable from CPUX = m1+m2+m3+... decomposition | Strong correspondence; needs one worked numerical example in the full paper to fully close |
| ρ (relate: s, i, j, x, d) | set-algebra over Scopes | RM (Reflection Matrix), per reflector object, operating on whole Signals | **Fully resolved** — see §5 |

## 4. Λ: The Central Hinge

- State old and new definitions side by side:
  - *2020:* "Λ is the only operator that maps to a computation facility... which shall make that resultant context available in the domain."
  - *Revised:* "Λ is a morphism realized at a machine locus, composed via CPUX `+`, whose output may re-enter the requirement space as a new Context — potentially at a **different** locus than it began, including a human locus."
- This is the paper's actual new contribution, not a restatement: CDA's 2020 model has Λ's output returning to *the same* domain it started in. The loop-back finding means Λ's output can cross from machine-locus execution back to human-locus attention — something the original one-directional formulation structurally could not express.
- Concrete example to develop: a machine-locus Λ resolves a non-equilibrium point (e.g., a system computation completes) and its output becomes a new human-locus non-equilibrium point (e.g., a notification that redirects human attention) — closing the loop CDA's original text did not model.

## 5. RM = ρ: A Fully Resolved Correspondence

Document the resolution process itself, since it demonstrates the paper's method (prediction → check → refine) concretely:

1. Initial hypothesis: ρ (set-algebra on Scopes) ↔ RM (per-pair reflection matrix)
2. Apparent conflict: a single-Pulse relabeling example initially suggested RM might instead correspond to φ (name substitution within one context)
3. Resolution: RM's true domain is a whole Signal (Scope), not a single Pulse — confirming ρ, not φ
4. Full characterization reached: **RM, for a given reflector object, may invoke any of ρ's five modes (selection, insertion, join, intersection, subtraction) over the Pulses in a Signal, under one invariant — the Response instance [R] carried by each Pulse is never mutated by any mode.**
5. State why this invariant matters structurally: it is what makes RM/ρ a coherent family across all five modes rather than five unrelated behaviors — restructuring of *which* Pulses are present, and how their labels/TVs combine, is permitted; mutation of the Response itself is not, under any mode.

## 6. Domain as Constrained Path-Space

- State the resolved definition: **a CDA Domain is the set of all CPUX paths (locus sequences) that are admissible under the requirement's own constraints** — a subcategory (or constrained path-space) of the full CPUX category, not identical to a single locus and not competing with the locus concept.
- Note what this buys the paper: Domain becomes a falsifiable claim — "this requirement permits these execution paths and not others" — checkable against actual CPUX traces, which is precisely the "verification" the paper's title promises, not merely an analogy.

## 7. What Remains Open (state honestly, do not overclaim)

- τ's correspondence needs a worked numerical example from an actual CPUX trace before being presented as fully closed, not just structurally plausible.
- The human-locus formalization itself (transient, embodied, non-addressable) is asserted here rather than fully specified — a rigorous account of what a human locus *is*, formally, is future work this paper should flag rather than resolve.
- Whether every RM mode (join, intersection, subtraction) has been observed in an actual reflector object, or only reasoned about structurally, should be stated plainly.

## 8. Conclusion (to draft last)

Restate the thesis with the loop-back finding as the headline result: CDA predicted a shape of execution it could not itself specify; Intention Space specifies that execution and, in doing so, reveals that CDA's original one-directional model of Λ was incomplete in a way only visible once a genuine runtime was built to test it against.

## References

- Pal, P. "The Context Dynamical Algebra: A Pragmatic Model of Computation." April 2020.
- [Intention Space / CPUX foundational references — to be added]
