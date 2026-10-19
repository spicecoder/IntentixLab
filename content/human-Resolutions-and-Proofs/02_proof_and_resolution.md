# Proof and Resolution: Two Different Forms of Establishment

## Abstract

Proof and requirement satisfaction are often spoken about as though they were points on the same scale of certainty. They are not.

A proof establishes that a proposition follows under an accepted formal structure: axioms, definitions, inference rules, contracts, or trusted premises. A human requirement, however, may exist at a different granularity from the proof and may depend on heterogeneous evidence that does not belong to one formal calculus.

This note introduces **Resolution** as distinct from Proof.

> **Proof establishes that a proposition holds relative to accepted premises. Resolution establishes that an observer can accept a requirement as satisfactorily addressed within an explicitly bounded Situational Reality.**

Proof can be an exceptionally strong contributor to Resolution. It is not, by itself, identical to Resolution.

---

## 1. Two questions that are often collapsed

Consider:

```text
Question 1:
Has proposition P been established?

Question 2:
Has requirement R been satisfactorily addressed?
```

Question 1 can often be formalised.

Question 2 frequently includes context, interpretation, trust, evidence, purpose, and human judgement.

The mistake is to assume that because both questions use words such as “established”, “verified”, or “satisfied”, they describe the same epistemic operation.

This note separates them.

---

## 2. Proof

A simplified proof relation can be written:

\[
A \vdash P
\]

where:

- \(A\) denotes accepted axioms, premises, definitions, or rules;
- \(P\) denotes the proposition;
- \(\vdash\) denotes derivability in the selected formal system.

The proof is meaningful relative to the accepted formal environment.

Even highly rigorous formal proof therefore has a boundary.

The proof establishes:

> given this system and these accepted premises, the proposition follows.

This is not a weakness. It is precisely what gives proof its strength. The boundary is explicit.

---

## 3. Proof also has granularity

A proof does not eliminate abstraction.

A theorem may depend on:

- earlier theorems;
- definitions;
- imported libraries;
- axioms;
- a formal kernel;
- a compiler;
- hardware.

At the granularity of ordinary mathematical work, many of those are not reopened. They act as trust points.

Thus proof occurs inside a Situational Reality whose granularity has already determined which objects are being treated as primitive or trusted for the inquiry.

We may therefore write more explicitly:

\[
A_G \vdash P
\]

to emphasize the role of granularity \(G\).

---

## 4. Requirement

A **Requirement** is the condition or desired state whose satisfactory treatment motivates the inquiry.

Examples:

```text
Determine whether theorem T is formally valid.

Understand why theorem T is true.

Select a suitable hospital location.

Confirm that an order can be fulfilled.

Allow a user to maintain a Todo list.

Determine whether an AI-generated proof can enter mathematical practice.
```

A requirement need not itself be a formal proposition.

It can be expressed at human, organisational, engineering, scientific, or social granularity.

This matters because the evidence used to address it may be heterogeneous.

---

## 5. Resolution

Let:

- \(R\) denote a requirement;
- \(O\) denote the observer or requirement holder;
- \(SR_{O,R}^{G,T}\) denote the observer's Situational Reality under accepted granularity \(G\) and trust relation \(T\).

We introduce a Resolution relation:

\[
SR_{O,R}^{G,T}\overset{R}{\leadsto}\checkmark
\]

meaning:

> the observer accepts that the currently established Situational Reality satisfactorily addresses requirement \(R\).

The symbol is deliberately not ordinary logical implication.

Resolution is not another proof rule. It is an acceptance relation between:

```text
requirement
and
accepted situational state
```

---

## 6. Proof and Resolution differ in direction

Proof proceeds from accepted premises toward a proposition.

```text
accepted premises
      ↓
formal derivation
      ↓
proposition established
```

Resolution begins with a requirement and asks whether the accepted reality has reached a satisfactory state with respect to it.

```text
requirement
      ↓
relevant situational evidence
      ↓
reconciliation
      ↓
acceptance / rejection / unresolved
```

Thus:

> **Proof is primarily proposition-directed. Resolution is requirement-directed.**

---

## 7. Resolution can consume proofs

The distinction does not reduce the importance of proof.

A proof may create an exceptionally strong trust point inside Situational Reality.

Suppose:

\[
A \vdash P
\]

has been formally established.

Then Situational Reality may include:

```text
P is formally established under A.
```

This can contribute to resolving a larger requirement.

For example:

```text
Requirement:
May this safety controller be deployed?

Evidence:
- invariant formally proved;
- hardware certified;
- integration tested;
- operating environment inspected;
- operator training confirmed.
```

The formal proof is a strong part of the Resolution. It does not replace every other part.

---

## 8. Heterogeneous evidence

Real requirements often span evidence of different kinds:

```text
formal theorem
measurement
simulation
human observation
legal authority
contract
test result
software computation
institutional decision
provenance record
```

Forcing all evidence into a single proof calculus is often impossible or unnecessary.

Resolution instead makes the heterogeneity explicit by requiring the trust boundaries to be declared.

This yields:

```text
Trust Point A — formally proved
Trust Point B — experimentally measured
Trust Point C — contractually guaranteed
Trust Point D — human confirmed
```

The requirement holder can then judge whether that bounded reality is sufficient.

---

## 9. Resolution is not arbitrary satisfaction

Resolution must not be reduced to:

```text
someone feels satisfied
```

A useful Resolution discipline requires:

1. a stated Requirement;
2. an explicit Situational Reality;
3. an explicit or inspectable Granularity;
4. identifiable Trust Points;
5. evidence relevant to the Requirement;
6. a recognisable acceptance event or criterion.

Resolution can therefore be audited and challenged.

Another observer may say:

```text
I do not accept Trust Point T.
```

or:

```text
the granularity is too coarse for this Requirement.
```

or:

```text
the presented evidence does not address part of R.
```

The disagreement becomes structurally visible.

---

## 10. Resolution states

For many requirements, a binary resolved/unresolved state is too crude.

A useful conceptual model is:

```text
Y — sufficient conditions for acceptance are present
U — insufficient information; resolution remains open
N — established conditions contradict or reject the required state
```

This mirrors the Intention Space use of Pulse states while remaining conceptually general.

The important point is that `U` is a legitimate epistemic state. The framework need not fabricate certainty merely because a process must continue.

---

## 11. Resolution Boundary

The Resolution Boundary determines which internal structures are accepted without reopening them.

For example:

```text
Requirement:
Is theorem T established?

Resolution Boundary:
- formal statement accepted as faithful;
- declared axioms accepted;
- proof assistant kernel accepted;
- proof checks successfully.

Possible Resolution:
Yes, T is formally established under those conditions.
```

But for a different requirement:

```text
Requirement:
What new mathematical idea explains T?
```

the same boundary is insufficient. The proof must be opened further.

This demonstrates:

> **A Resolution Boundary is valid only relative to the Requirement.**

---

## 12. Proof does not imply every Resolution

Suppose:

\[
A \vdash P
\]

is valid.

It does not follow that every requirement involving \(P\) has been resolved.

Examples:

```text
P has been proved.

But:

Was P the intended statement?
Are the assumptions acceptable?
Does P answer the original question?
Is the result useful in the intended domain?
Does the human need an explanation rather than a certificate?
```

The proof closes one relation. The Requirement may still remain open.

---

## 13. Resolution can occur without a single total proof

Conversely, a requirement may be responsibly resolved without one monolithic formal proof.

An engineering decision may depend on:

- verified software properties;
- empirical measurements;
- component certifications;
- operational constraints;
- human inspection.

No single derivation necessarily contains all of these.

Yet the decision can still have an explicit, disciplined Resolution Boundary.

Thus:

```text
no total proof
```

does not imply:

```text
no rational resolution
```

The quality of Resolution depends on whether its accepted trust structure is appropriate and visible.

---

## 14. Proof and Resolution in software

Software engineering routinely mixes the two.

A unit test may establish a local behavioural observation. A formal verification may establish an invariant. A component contract may establish an accepted interface. An end-to-end application requirement may nevertheless depend on the cooperation of many such elements.

The application requirement is therefore not identical to any one proof. It is resolved through an accepted composition of trusted elements.

This becomes especially visible in systems built from independently developed services, AI models, humans, sensors, and formal components.

---

## 15. Proof and Resolution in mathematics

Mathematics is often used as the strongest example of proof-centred knowledge.

Yet mathematical practice also contains requirements beyond derivability:

```text
Has the intended theorem been formalised?

Is the proof intelligible?

Does it reveal a new method?

Are the assumptions interesting?

Does the result connect to existing theory?

Is the provenance acceptable?

Should the community treat the result as established?
```

These are not criticisms of formal proof. They demonstrate that mathematical practice contains Resolution questions as well as Proof questions.

---

## 16. A compact distinction

> **Proof asks whether a proposition follows from accepted premises. Resolution asks whether an accepted situational state satisfactorily addresses a requirement.**

Or more technically:

> **Proof preserves truth within a selected formal granularity; Resolution reconciles a requirement with a heterogeneous but explicitly bounded set of trusted realities.**

---

## 17. Why the distinction matters now

AI is rapidly increasing the amount of computation whose internal path may be inaccessible or impractical for humans to reconstruct.

This is particularly striking when AI:

- proposes scientific hypotheses;
- generates software;
- produces formal mathematics;
- performs large searches;
- participates in engineering decisions.

The response:

```text
A human must inspect everything.
```

does not scale.

The opposite response:

```text
The machine said it, therefore accept it.
```

is equally inadequate.

The missing question is:

```text
What Resolution Boundary is appropriate
for this Requirement?
```

That question allows proof, verification, trust, provenance, explanation, and human judgement to have distinct roles.

---

## 18. Central proposition

> **Proof and Resolution are complementary rather than competing forms of establishment. Proof can transform a proposition into a high-confidence trust point. Resolution determines whether the resulting bounded Situational Reality is sufficient for the Requirement that motivated the inquiry.**

The distinction becomes especially useful in mathematics when machine-generated formal proofs become too numerous, too large, or too alien for traditional line-by-line human reconstruction.

That case is developed in the next note.

---

## References and context

- DeepMind et al., “Olympiad-level formal mathematical reasoning with reinforcement learning,” *Nature* (2025). https://doi.org/10.1038/s41586-025-09833-y
- “Mathematicians are developing rules for AI use — other fields should follow,” *Nature* (2026). https://doi.org/10.1038/d41586-026-01881-2
- “Solutions, challenges and rising tensions in AI and mathematics,” *Nature Machine Intelligence* (2026). https://doi.org/10.1038/s42256-026-01269-x
