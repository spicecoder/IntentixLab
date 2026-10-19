# Machine Proof and Human Mathematical Resolution

## Abstract

AI systems are beginning to generate mathematical proofs whose formal correctness can be checked mechanically. This changes the scale of proof production and raises a question that cannot be answered merely by increasing verification capacity:

> **What exactly must a mathematician accept when the proof was produced by a machine?**

This note applies the distinction between **Proof** and **Resolution** to machine-generated mathematics. A proof assistant can establish that a formal expression follows from declared assumptions. A mathematician may still need to resolve whether the expression corresponds to the intended problem, whether the assumptions and verification boundary are acceptable, whether provenance is sufficient, and whether the requirement is truth, explanation, discovery, understanding, or some combination of these.

The proposal is not that human judgement should replace formal verification, nor that formal verification should replace mathematics. It is that machine proof requires an explicit **Resolution Boundary** appropriate to the mathematical requirement.

---

## 1. The contemporary change

Mathematics has long used computation.

What is changing is the degree to which machines can now:

- translate informal problems into formal statements;
- search large proof spaces;
- construct formal proof terms;
- use reinforcement learning or language models to discover proof strategies;
- verify the final result mechanically.

AlphaProof is an important contemporary example. It operates in a Lean-based environment and subjects generated proofs to independent Lean verification.

The same work also highlights a crucial distinction: auto-formalized statements can be useful formal training problems regardless of how faithfully they preserve the original natural-language problem.

That observation exposes two different questions:

```text
Q1:
Was the formal statement proved?

Q2:
Was the intended mathematical requirement resolved?
```

The first can be answered by formal verification.

The second requires a broader boundary.

---

## 2. A machine-proof pipeline

A typical AI-assisted formal pipeline can be represented as:

```text
natural mathematical problem C
          ↓
auto-formalisation
          ↓
formal statement F
          ↓
AI proof search
          ↓
proof object P
          ↓
formal verifier
          ↓
Verified(F)
```

If the verifier is sound relative to its declared foundation, the final stage can give strong evidence that:

\[
A \vdash F
\]

where \(A\) is the accepted formal environment.

But the original mathematical requirement may have been:

```text
Establish conjecture C.
```

There remains a semantic relationship:

\[
C \stackrel{?}{\longleftrightarrow} F
\]

Formal verification of \(F\) does not automatically establish that \(F\) is the intended formalisation of \(C\).

---

## 3. Formal proof is one Resolution component

A mathematician can therefore treat the verified proof as an exceptionally strong trust point:

```text
Trust Point:
F has a formally verified proof under assumptions A.
```

That trust point can enter a wider Situational Reality containing:

```text
the natural statement C
the formal statement F
the mapping from C to F
declared definitions
declared axioms
proof-verifier boundary
provenance
human or community interpretation
```

The mathematical requirement can then be assessed against that Situational Reality.

---

## 4. A Resolution Boundary for machine proof

For the requirement:

```text
Is conjecture C formally established?
```

a candidate Resolution Boundary may include:

1. **Statement correspondence**  
   The formal statement \(F\) is accepted as a faithful representation of \(C\).

2. **Definition correspondence**  
   The formal definitions capture the intended mathematical objects.

3. **Assumption visibility**  
   The axioms, imported assumptions, and exceptional trust mechanisms are known.

4. **Proof verification**  
   The generated proof is accepted by an independently trusted checker.

5. **Verification boundary**  
   The proof assistant kernel and relevant foundational mechanisms are accepted at the chosen granularity.

6. **Provenance**  
   The origin of the formalisation, proof, dependencies, and machine contribution is sufficiently known.

If those conditions are accepted, the mathematician may resolve:

```text
C is formally established under the declared Resolution Boundary.
```

This statement is stronger and more precise than either:

```text
AI proved it.
```

or:

```text
I did not read the proof, therefore it is not mathematics.
```

---

## 5. Human traversal is not identical to proof validity

An AI-generated proof may eventually contain millions of low-level steps.

A human may be unable to reconstruct every step.

That does not necessarily invalidate the formal proof.

Modern mathematics already accepts many forms of trusted compression:

- prior theorems;
- libraries;
- symbolic calculations;
- numerical computations;
- computer-assisted searches;
- proof assistants.

The relevant question becomes:

> **Which structures must the mathematician reopen for the present requirement?**

If the requirement is formal correctness, a trusted checker may permit a relatively coarse human Resolution Boundary.

If the requirement is explanation, discovery, pedagogy, or conceptual insight, the same boundary may be inadequate.

---

## 6. Different mathematical requirements imply different granularity

Consider four requirements.

### Requirement A — Correctness

```text
Is F formally derivable from A?
```

The proof assistant may resolve this at a formal granularity.

### Requirement B — Correspondence

```text
Does F faithfully represent C?
```

The formalisation must be inspected or independently justified.

### Requirement C — Explanation

```text
Why is C true?
```

A huge verified proof object may be insufficient. The human needs a new representation at a more conceptual granularity.

### Requirement D — Discovery

```text
What new mathematical structure or technique does this result expose?
```

The proof must be interpreted in relation to mathematical practice.

Thus:

> **There is no single thing called “accepting an AI proof.” There are different mathematical requirements, each demanding an appropriate Resolution Boundary.**

---

## 7. Proof can be closed while Resolution remains open

Suppose Lean confirms:

\[
A \vdash F
\]

Then the formal proof question may be closed.

But any of the following can remain open:

```text
Does F represent the intended conjecture?

Are the assumptions mathematically acceptable?

Was an unintended stronger premise introduced?

Does the theorem have the intended scope?

Is the proof novel?

Who contributed the key ideas?

Does the proof expose useful mathematics?

Is the result independently reproducible?
```

This is not a defect in formal verification.

It is a consequence of asking questions at different granularity.

---

## 8. Auto-formalisation makes the distinction unavoidable

AI-assisted formalisation is especially important.

If a natural-language problem is translated automatically into a formal language, two validations are needed:

```text
formal validity
and
semantic correspondence
```

A formal theorem can be perfectly well-formed and perfectly proved while failing to express the original problem.

This is one reason machine-generated proof pipelines benefit from an explicit separation:

```text
Formal Proof:
    checker validates F.

Mathematical Resolution:
    mathematician accepts that F, its assumptions,
    proof boundary, provenance, and interpretation
    satisfactorily address C.
```

---

## 9. The role of explanation

One concern about AI mathematics is that formal proof could become detached from human mathematical understanding.

The Resolution framework avoids treating explanation as universally mandatory while giving it a precise place.

If the Requirement is:

```text
Is this theorem formally true?
```

then explanation may not be part of the required Resolution Boundary.

If the Requirement is:

```text
Teach this theorem.
Understand the mechanism.
Generalise the method.
Integrate the result into mathematical theory.
```

then explanation is essential.

Thus explanation is not confused with proof validity. It becomes requirement-relative Resolution evidence.

---

## 10. The role of provenance and attribution

Mathematics is not only a system of propositions. It is also a human research practice.

Recent debate around AI mathematics has emphasized transparency, attribution, independent verification, and research integrity.

Those considerations can be represented as additional trust conditions.

For example:

```text
P_ProofVerified = Y
P_FormalisationReviewed = Y
P_ProvenanceKnown = Y
P_AttributionAdequate = Y
```

A community may require all four for publication Resolution even when only the first is necessary for formal derivability.

This illustrates again that:

```text
proof requirement
≠
publication requirement
≠
understanding requirement
```

---

## 11. Human judgement is not a substitute for verification

The framework should not be interpreted as granting human intuition authority over formal correctness.

If a machine-generated proof fails verification, human acceptance does not turn it into a valid formal proof.

Likewise, if a proof verifies, human discomfort does not make the derivation false within the stated formal system.

The two relations must remain distinct:

```text
Proof:
formal relation.

Resolution:
requirement-relative acceptance relation.
```

Maintaining the separation protects both mathematical rigour and human agency.

---

## 12. A possible mathematical Resolution protocol

For AI-generated formal results, a practical protocol could ask:

### A. Requirement

What is being claimed?

```text
formal correctness?
solution of an informal conjecture?
new mathematical insight?
publication-worthy discovery?
```

### B. Formal object

What exact statement was proved?

### C. Correspondence

How was the relationship between informal requirement and formal statement established?

### D. Assumptions

Which axioms, definitions, libraries, and trusted mechanisms are involved?

### E. Verification

Was the full proof independently checked?

### F. Provenance

What human and machine contributions led to the result?

### G. Interpretation

What does the result mean at the mathematical granularity relevant to the requirement?

### H. Acceptance

Which parts are accepted as trust points, and by whom?

The outcome is not merely:

```text
valid / invalid
```

but a documented Resolution Boundary.

---

## 13. The mathematician's changing role

If machine proof generation scales dramatically, mathematicians may spend less time manually producing every low-level derivation and more time on:

```text
choosing important requirements
defining meaningful formalisation
setting appropriate granularity
inspecting assumptions
establishing correspondence
interpreting results
discovering abstractions
determining significance
communicating understanding
```

This need not diminish mathematics. It may shift the locus of mathematical judgement.

The framework therefore suggests:

> **The mathematician need not necessarily reproduce the machine's proof process. The mathematician must establish an adequate Resolution Boundary for the mathematical requirement.**

That is a different and potentially more scalable responsibility.

---

## 14. A worked conceptual example

Suppose an AI produces a Lean proof for a conjecture \(C\).

### Step 1 — Formal verification

```text
Lean:
proof accepted
```

This establishes:

```text
P_ProofVerified = Y
```

### Step 2 — Formalisation review

A mathematician or independent process checks the relationship between \(C\) and \(F\) to the accepted level of semantic correspondence.

```text
P_FormalisationAccepted = Y
```

### Step 3 — Assumption review

The imported axioms and definitions are inspected.

```text
P_AssumptionsAccepted = Y
```

### Step 4 — Provenance review

Relevant machine and human contributions are recorded.

```text
P_ProvenanceAcceptable = Y
```

### Step 5 — Requirement-specific interpretation

If the requirement was:

```text
Is C formally established?
```

the available Situational Reality may now be sufficient.

If the requirement was:

```text
What new idea proves C?
```

Resolution remains:

```text
U — unresolved
```

until an explanatory abstraction is produced.

The same proof therefore supports different Resolution outcomes for different requirements.

---

## 15. Why this can clarify the current debate

Contemporary debate sometimes appears polarised between:

```text
machine-verified proof should simply be accepted
```

and:

```text
mathematics must remain fully human-readable
```

The Resolution framework suggests that the dispute partly conflates requirements.

Formal correctness and human mathematical understanding are both legitimate requirements. They simply require different Resolution Boundaries.

A machine can close one requirement while leaving another open.

That is not contradiction. It is explicit granularity.

---

## 16. Central proposition

> **When AI produces a formally verified proof, the formal proof question can be closed at one granularity while mathematical Resolution remains open at another. The mathematician's task is therefore to determine and establish the Resolution Boundary appropriate to the requirement: correspondence, assumptions, verification, provenance, interpretation, and understanding to the extent demanded by that requirement.**

This provides a way to welcome machine proof without surrendering human mathematical judgement.

It also provides a concrete contemporary test for the broader distinction between Proof and Resolution.

The next note asks how such Resolution structures can be represented computationally.

---

## References

1. DeepMind et al., “Olympiad-level formal mathematical reasoning with reinforcement learning,” *Nature* (2025). https://doi.org/10.1038/s41586-025-09833-y
2. “Mathematicians are developing rules for AI use — other fields should follow,” *Nature* (2026). https://doi.org/10.1038/d41586-026-01881-2
3. “Solutions, challenges and rising tensions in AI and mathematics,” *Nature Machine Intelligence* (2026). https://doi.org/10.1038/s42256-026-01269-x
4. “How to prevent AI from harming mathematics,” *Nature* (2026). https://doi.org/10.1038/d41586-026-02309-7
5. “Responsible and transparent use of AI in scientific publishing,” *Nature Computational Science* (2026). https://doi.org/10.1038/s43588-026-01043-4
