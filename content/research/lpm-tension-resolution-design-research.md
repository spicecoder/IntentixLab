---
title: "Designing the Large Perceptive Model: Multi-Path Tension Resolution as an Alternative to Token-by-Token Generation"
date: 2026-08-09
category: "Foundations"
tags: ["LPM", "CDA", "Intention Space", "Domain Neuron", "tension", "LLM ensemble", "design"]
summary: "A design document comparing LPM's tension-resolution architecture against standard autoregressive LLM generation, and specifying three concrete pieces: the internal multi-path perception process, the external fetch (Channel 2) protocol, and how tension and resolution are measured."
status: "design document — architecture proposal, not a validated result"
---

# Designing the Large Perceptive Model: Multi-Path Tension Resolution as an Alternative to Token-by-Token Generation

*Status note: this document specifies an architecture. The Channel 2 addressing/matching split described in Section 3 has a small working implementation and a passing negative control (see `dn_channel2_protocol.py`, Intentix Lab, August 2026). The multi-path internal process in Section 2 and the LLM-boundary cooperation in Section 3.3 are proposed here for the first time and are not yet implemented or tested. This distinction is kept explicit throughout rather than blended into a single claim of readiness.*

## 1. LPM Against Token-by-Token Generation

A standard LLM generates by repeatedly sampling the next token conditioned on everything so far: one linear sequence, one pass, no structural commitment to "what is this input actually asking" separate from the sequence of tokens itself. Four consequences follow directly from that design, each with a corresponding LPM design decision:

| Property | Standard LLM | LPM (proposed) |
|---|---|---|
| Unit of operation | Token | A perception path — a full candidate structural reading of the input (Context + Cue + Scope) |
| Handling of uncertainty | Softmax over vocabulary; no structural "I don't know" | Trivalent Y/U/N per path; U is a first-class outcome that triggers refinement, not a forced guess |
| Grounding | Not built in — bolted on via retrieval or tool-use as an auxiliary step | Structurally mandatory — a path cannot resolve without a Channel 2 match; there is no path to an answer that skips external verification |
| Termination | Length limit or a sampled end-of-sequence token | Tension reaching (near) zero for a surviving path, or an explicit unresolved/timeout state |
| Parallelism | Sequential token sampling (beam search operates at the token level) | Several candidate *interpretations* held and evaluated concurrently, competing on tension rather than token likelihood |
| Error signal available at inference time | None directly — confidence is a token probability, not a groundedness measure | Tension is an explicit, inspectable quantity: how far a candidate is from satisfying an external criterion |

The central reframing: an LLM answers the question "what token is statistically likely next." LPM, as designed here, answers a different question: "which of several candidate structured readings of this input can be brought into equilibrium with the external world, and how far is each one from that." These are not competing answers to the same question — Section 3.3 returns to why that makes them complementary rather than substitutable.

## 2. Internal Process: Multiple Perception Paths and Path Tension

### 2.1 From one sequence to several candidate paths

Where an LLM commits to one token at a time, LPM's internal process is designed to hold several candidate structural readings of the same input piece simultaneously, and let external resolution — not internal likelihood — decide which one survives.

**Step 1 — Candidate pointing.** The input piece (equivalent to a prompt) is parsed via φ into N candidate Context sequences, C₁ ... Cₙ — not N samples of the same left-to-right process, but N distinct structural segmentations or orderings of the same underlying attention phrases. This is closer to a parser proposing several candidate parse trees than to a language model sampling several continuations.

**Step 2 — Candidate encompassing.** Each Cᵢ is grouped via {} into a candidate Cue, then bound via σ into a candidate Scope, Sᵢ. This is where each path acquires whatever internal coherence it is going to have, prior to any contact with the external world.

**Step 3 — Internal tension.** Each Sᵢ receives an internal tension score, T_int(Sᵢ) — a self-consistency measure (do the grouped elements plausibly belong together) computed entirely inside the network, with no external call yet. This is a cheap, first-pass filter, not a claim of correctness.

**Step 4 — Pruning to a working set.** Paths are ranked by T_int and reduced to a top-K working set (K small — a handful, not a beam-search-scale hundreds), the same way a beam search prunes candidates, but the ranking criterion here is structural coherence, not token log-probability.

**Step 5 — External resolution attempt.** Each surviving path performs an addressing act (Section 3) against Channel 2 and receives a trivalent outcome.

**Step 6 — Path disposition.**
- **Y**: the path is confirmed. Its tension is at (or near) zero. If exactly one path reaches Y, that is the system's answer.
- **N**: the path is pruned outright — this is a genuine rejection grounded in the external world, not a low-probability token being disfavoured.
- **U**: the path is not discarded but refined — the partial signal from Channel 2 (Section 3.2) is used to re-run Steps 1–2 for that path specifically, narrowing the candidate before re-querying. This is the "keep polling gateway" behaviour named in the original Domain Neuron sketch, now given a specific place in the loop.

**Step 7 — Convergence or explicit non-resolution.** The process halts when a single path reaches Y, or when an iteration budget is exhausted with paths still at U or N. The second outcome is a legitimate, informative result — the system reporting it does not have a grounded answer — which has no direct structural counterpart in standard LLM decoding, where some token sequence is always eventually emitted regardless of whether anything grounded it.

### 2.2 Multi-path tension as an aggregate signal

Beyond individual path tension, the *distribution* of tension across the live working set is itself informative and should be tracked explicitly, not only each path's own value:

- **Concentrated tension** (one path's tension collapsing toward zero while others stay high) indicates the system converging on a single grounded reading.
- **Persistently spread tension** (several paths remaining live and un-resolved after multiple iterations) is a structural signal of genuine ambiguity in the input — a distinct, surfaceable state an LLM has no equivalent mechanism for reporting, since it must commit to *some* continuation regardless of underlying ambiguity.

This aggregate view is proposed here as a design requirement, not yet implemented: it would need an explicit definition (e.g., entropy over normalized inverse-tension across the working set) and a threshold policy for when spread tension should be surfaced to a caller rather than resolved by forcing a pick.

## 3. External Fetch Process: The Channel 2 Protocol

### 3.1 Addressing and matching, kept structurally separate

The working implementation (`dn_channel2_protocol.py`) already establishes the core split this design depends on:

- **Addressing** — deciding *which* external record a path's query concerns — is learned, supervised, differentiable. It is an act of naming, not a guess at the answer.
- **Matching** — whether the query actually satisfies that record's real content, within a threshold — is external, non-differentiable, and outside the network's control. The `ExternalWorld` object holding real records is never an `nn.Parameter` and never receives a gradient; this is the concrete, testable form of the paper's claim that Λ is realized outside the algebraic space.

The negative control already run — deliberately mis-addressing a query and confirming Channel 2 refuses to match (N in 100% of cases, at ~9x the distance of a correct address) — is the evidence this separation actually holds under test, not just in the wiring.

### 3.2 Trivalent response and the JSON wire format

For a real (non-toy) deployment, both the addressing act and Channel 2's response need a concrete, structured format rather than a class index. Proposed shape:

```json
// Path -> Channel 2 (the addressing + query act)
{
  "address": "member_verification_record",
  "query": {
    "purpose": "mentor_match",
    "constraints": {"consent_given": true, "verified": true}
  }
}
```

```json
// Channel 2 -> Path (the external, non-differentiable response)
{
  "label": "Y",
  "distance": 0.31,
  "payload": {"mentor_id": "M-2291", "match_score": 0.94},
  "hint": null
}
```

`label` is the only field Channel 2 is permitted to determine unilaterally; `payload` is only meaningful (and should only be trusted downstream) when `label` is `"Y"`. On `"U"`, `hint` carries whatever partial disambiguating information the external world can offer without a full match — the input to Step 6's refinement loop in Section 2.

### 3.3 Cooperation with an LLM: perception as a JSON boundary

This is the most speculative piece of this document, offered as a concrete proposal rather than a settled design.

An LLM is already extensively trained on exactly the task of turning free natural language into structured, schematized output — this is a well-established capability, distinct from its more famous (and less reliable) capability of generating free-form continuations. The proposal: **use an LLM specifically for the boundary step of Section 2's Step 1 — converting raw natural-language input into one or more candidate structured perception objects (candidate Contexts/Cues) — and use LPM specifically for what comes after: resolving those candidates against real external ground truth.**

Concretely, the LLM's role is bounded to producing something like:

```json
{
  "candidate_paths": [
    {"context": ["cart", "item", "checkout"], "llm_confidence": 0.82},
    {"context": ["checkout", "item", "cart"], "llm_confidence": 0.11}
  ]
}
```

LPM then takes over from Section 2, Step 2 onward, using these as the candidate set rather than generating candidates itself from scratch. This creates a natural division of labour: **the LLM proposes** (using its broad linguistic competence to generate plausible structural readings, including handling open vocabulary and paraphrase the toy tokenizer in this project cannot), **and LPM disposes** (accepting a candidate only when it is independently grounded against Channel 2, regardless of how confident the LLM's own `llm_confidence` was). This is a generate-then-verify ensemble in spirit — related to existing retrieval-augmented and tool-use architectures — but here the verification step has an explicit algebraic account (closure, determinism, the autonomous/non-autonomous asymmetry from the CDA paper's Section 5) rather than being an ad hoc pipeline stage.

A genuinely useful byproduct, not yet built: comparing `llm_confidence` against the eventual Y/N outcome from Channel 2 gives a direct, real calibration signal for the LLM's own confidence — a dataset of (LLM confidence, ground-truth grounded outcome) pairs that could in principle be used to recalibrate or fine-tune the LLM boundary model over time, closing a loop between the two systems that neither has access to alone.

## 4. Measuring Tension and Resolution

Two tension quantities need to be kept distinct, since they are computed differently and mean different things:

- **Internal tension** (Section 2.1, Step 3): a pre-Channel-2, self-consistency measure computed entirely inside the network. Cheap, fast, but not a claim about groundedness — a path can have low internal tension and still fail external matching entirely (this is, in fact, the interesting case: internally coherent but factually wrong).
- **External tension** (Section 3.1): the distance from a path's query to its addressed record, as computed by the external, non-differentiable `ExternalWorld`. This is the quantity that actually determines Y/U/N, and the only one that should be trusted as a groundedness signal.

**Metrics to track, none of which the current toy experiments yet report at this system level:**

- **Path tension trajectory**: for a resolving path, external tension should be monotonically non-increasing across refinement iterations (Section 2, Step 6's U-loop); a path whose tension *increases* under refinement is a direct, actionable signal that the addressing act — not just the query content — was wrong, and should trigger re-addressing rather than continued query refinement.
- **Iterations to convergence**: how many U-refinement loops a resolving path needs before reaching Y — an efficiency measure, and a candidate early-stopping criterion (a path stuck at U past some iteration budget should be reclassified as effectively N rather than looped indefinitely).
- **Groundedness rate**: fraction of input pieces where at least one path reaches Y within budget, versus pieces where the system correctly reports non-resolution. This is the metric most directly comparable to, and most directly favourable against, an LLM's inability to report non-resolution at all.
- **Multi-path tension entropy** (Section 2.2): tracked per input piece, to distinguish "converged to one grounded answer" from "genuinely ambiguous, multiple paths remain live."
- **LLM-boundary calibration** (Section 3.3): correlation between `llm_confidence` and eventual Channel 2 outcome, if the LLM-cooperation design is implemented.

## 5. What This Document Does Not Yet Establish

Stated plainly, in the same register as the rest of this project's work: the multi-path internal process (Section 2) and the LLM-boundary cooperation (Section 3.3) are proposed architecture, not tested results. Only the addressing/matching split (Section 3.1) has a working implementation with a passing negative control, at toy scale (4 records, 8-word vocabulary). Before any claim of scalability or of genuine advantage over retrieval-augmented LLM pipelines is made, the following need actual experiments, in roughly this order: (1) the multi-path pruning and U-refinement loop of Section 2, on the same toy scale already validated for addressing/matching; (2) tension trajectory monotonicity as a real measured property rather than a design intention; (3) the LLM-boundary handoff, starting with a frozen off-the-shelf model producing the candidate-path JSON and LPM consuming it, before any joint training or calibration is attempted.

## 6. Research Roadmap

The phases below are ordered so that each one only depends on what the previous phase has actually validated, rather than stacking unproven pieces on top of each other. Skipping ahead risks exactly the failure mode this project has already caught once (Section 5): confident surrounding narrative outrunning what the code underneath actually demonstrates.

**Phase 1 — Multi-path pruning and U-refinement loop.** Implement Section 2's Steps 4–7 directly on top of the already-working addressing/matching split (`dn_channel2_protocol.py`'s `ExternalWorld`), rather than introducing new infrastructure at the same time as testing a new mechanism. *Success criteria*: tension trajectory is monotonically non-increasing across U-refinement iterations for paths that eventually resolve; a deliberately constructed ambiguous input (two candidates placed in the r_inner–r_outer band) actually exercises U rather than collapsing straight to Y/N as in the current experiment.

**Phase 2 — Instrumentation, before scaling anything.** Build the Section 4 metrics (path tension trajectories, iterations-to-convergence, groundedness rate, multi-path tension entropy) as reusable tooling. This must precede Phase 3: without it, a scaling failure is invisible in aggregate (accuracy drops) without revealing whether addressing, matching, or the U-loop broke.

**Phase 3 — Scale stress test.** Increase vocabulary and record count by an order of magnitude at a time (8→80 words, 4→40 records), using Phase 2's instrumentation to locate where behaviour actually degrades. *Success criteria*: identification of the specific bottleneck (embedding dimension vs. vocabulary size vs. record count), not a single pass/fail number — this is the direct, evidence-based answer to the "is this scalable" question raised earlier, which currently has none.

**Phase 4 — LLM boundary cooperation, minimal version.** Only after Phases 1–3 give a working, instrumented core: connect a frozen, off-the-shelf LLM producing the candidate-path JSON of Section 3.3 into the validated LPM engine. The LLM stays frozen (no joint training) so any behavioural change is attributable to the handoff itself, not confounded with retraining. *Success criteria*: measure whether `llm_confidence` actually predicts the eventual Channel 2 Y/N outcome — the calibration signal named in Section 3.3.

**Phase 5 — Real external records.** Replace the synthetic orthogonal-vector `ExternalWorld` with real embedded records (actual text or structured data through a frozen embedder), to test whether threshold matching survives realistic embedding noise — something the current clean synthetic vectors do not stress at all.

**Phase 6 — Feed results back into the papers.** Once Phases 1–3 produce measured behaviour rather than design intentions, that becomes the evidence base for the execution-model follow-up paper, including the σ-as-communication-act reframing and the Intention↔Scope correction currently flagged as open. Phases 4–5 results are what would justify any claim about LLM/LPM ensemble viability, which at present is architecture on paper only, not a demonstrated advantage.
