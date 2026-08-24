---
title: "Context Dynamic Algebra: A Closed Algebraic Model of Software Requirement — Through Three Faculties of Attention: Point, Encompass & Resolve"
author: "Pronab Pal"
organisation: "Keybyte Systems / Intentix Lab"
location: "Melbourne, Victoria, Australia"
year: 2026
status: "Current manuscript"
---

# Context Dynamic Algebra: A Closed Algebraic Model of Software Requirement — Through Three Faculties of Attention: Point, Encompass & Resolve

Pronab Pala,*

a Keybyte Systems / Intentix Lab, Melbourne, Victoria, Australia

* Corresponding author. Email: [author to supply]

Present address: as above.

## Abstract

For four decades, requirement specification and code have been treated as separate artefacts, with no open, formal representation linking the two. This paper presents the Context Dynamic Algebra (CDA), an algebraic model in which software requirement is expressed as a closed dynamical system of “Attention Phrases” combined through seven operators that build context, group it into scope, attach value, and mark points of resolvable tension. The algebra is motivated by three intrinsic faculties of attention — the power to point, the power to encompass, and the power to resolve — and demonstrated against a single running example, a shopping-cart application, carried through the paper. Further, the algebra's base operands remain ordinary-language phrases rather than symbolic tokens purpose-built for computation, which opens the possibility of training or aligning an AI system in this algebra independent of the specific natural language spoken. We give closure, determinism, and well-definedness properties for the core operators, and position CDA against relational algebra as a comparable closed, compositional, execution-agnostic model. We argue CDA was deliberately scoped to exclude execution semantics, and that the industry's current movement toward explicit, addressable execution models is the development this algebra has been waiting for.

## Keywords

Algebra; Requirement; Specification; Context; Attention; Dynamical-systems

## 1. Introduction: The Urgency of a Formal Requirement Algebra

The dream that computation can resolve social problems of scale — connecting people, distributing services, closing gaps of access — rests on an assumption the software industry rarely examines: that requirement, the statement of what a system should do, is itself well-formed enough to bear that weight. It is not. For as long as software engineering has existed as a discipline, requirement specification has been produced as free-format text, disconnected from the code it is meant to govern, and re-derived by hand every time a system changes.

The cost of this gap is not cosmetic. It is the reason a well-engineered, horizontally scalable system can still fail to adapt when a genuinely new requirement arrives — an airline that must support open-ended destination tickets, a health system that must match patients to newly credentialed specialists, a bank that must let customers hold balances in an arbitrary currency. In each case, the missing piece is not compute capacity; it is a code-neutral representation of what the system currently does, and a formal mechanism for stating how that representation must change.

This paper's motivating claim is that requirement is not merely under-documented; it is under-modelled. Just as Codd's relational algebra [1] gave data management a formal object independent of any particular storage engine, software requirement needs an algebra independent of any particular implementation language or platform.

The algebra presented here was first made available by the author as a technical note on a personal GitHub page in April 2020 [11]. The present paper substantially revises that original presentation: it reorganises the operator set around a single worked example (Sections 3–4), adds the closure, determinism, and well-definedness properties of Section 5, and gives a direct comparison with relational algebra absent from the original note. In the years since, the author has designed and begun implementing a prototype execution-side platform built around the ideas sketched in Section 6; that ongoing implementation work is what motivates this revised presentation now. Having seen a first execution model take shape around this algebra, the author is more confident than in 2020 that a requirement-side algebra of this kind is a practically viable basis for a software platform, not only a modelling exercise — and it is with that outlook that this revised account is offered to a wider software-engineering readership than the original note reached.

Section 2 positions this claim against related work. Sections 3–4 develop the algebra and its running example. Section 5 gives formal properties. Section 6 discusses execution semantics as a deliberate exclusion. Section 7 concludes.

## 2. Related Work and Positioning

CDA's closest structural precedent is Codd's relational algebra [1]: both propose that a domain long treated as free-form documentation — data schemas in Codd's case, requirement narratives in ours — in fact has algebraic structure that can be made explicit, closed, and independent of implementation technology. CDA differs in its object: where relational algebra operates on tuples and relations, CDA operates on Attention Phrases, Contexts, and Scopes, built from the situational language people actually use when interacting with a designed facility. Section 5.4 gives a direct property-by-property comparison.

CDA also engages, more informally, with two further lines of thought. The pattern-language movement in software architecture, following Alexander [4,7], aspired to let ordinary participants co-construct systems suited to their own situation; CDA's Attention Phrase vocabulary is offered as a step toward that goal, expressed algebraically rather than through a pattern catalogue. Separately, neuroscientific findings on the temporal precedence of intention over voluntary action [3] motivate treating intention — not the eventual object or behaviour — as the primary driver of requirement, in contrast to the object-oriented tradition, which begins from the object and ascribes properties and behaviour to it from within.

CDA deliberately excludes one thing that is often bundled into requirement formalisms: execution semantics. Section 6 returns to this exclusion and argues it was the correct scope decision at the time the algebra was first proposed.

## 3. The Context Dynamic Algebra

CDA is built from three intrinsic faculties of attention. The first is the act of pointing — directing focus toward a single object or step, in sequence. The second is the act of encompassing — gathering several objects of attention together as a bounded group. The third is the act of resolving — arising when a gathered group of attentions reaches a state that calls for action, creating and then discharging tension. These three faculties — point, encompass, resolve — are formalised below as seven operators acting over six sorts.

Throughout this section we develop a single running example: a customer using a shopping-cart application to select and purchase an item. Each operator is introduced with its general definition and then applied to the next step of this scenario, so that by the end of Section 3 the full algebra has been exercised on a single, continuous case.

### 3.1 Operands

CDA is a many-sorted (heterogeneous) algebra: it is built from a fixed, finite collection of six sorts, Σ = {A, C, V, Cue, S, D}, and every operator (Table 2) is a typed function from a product of these sorts to a sort within the same collection — no operator introduces anything outside Σ. Non-equilibrium and equilibrium points, written Δ and δ, are not a seventh sort: they are a state predicate partitioning S into two disjoint subsets, S(Δ) and S(δ), marking whether a Scope still requires resolution. Table 1 lists all six sorts together with the Δ/δ state predicate on S, the faculty (Point, Encompass, or Resolve) each sort's construction primarily draws on, and each one's role in the running example.

| Symbol | Name | Definition | Primary faculty | Role in the running example |
| --- | --- | --- | --- | --- |
| A | Base Attention Phrases | Atomic, identifiable phrases drawn from a fixed pool; the raw vocabulary from which all other operands are built. | Pre-faculty substrate — the raw material all three faculties act on | “Shopping site”, “shopping cart”, “selected item” |
| C | Contexts | Sequences built from A via the pointer operator φ; each element is a dotted path. | Point (φ) | “shopping site.shopping cart.selected item” |
| V | Values | Strings attached to a context via the measure operator μ. | Resolve (prepares tension for Λ) | “item 2” |
| Cue | Cues | A grouping of Contexts formed by the knot operator {}. | Encompass ({}) | { “cart.item1”, “cart.item2” } |
| S | Scopes | A Cue attached to a Context via the scope operator σ. | Point + Encompass, jointly (σ binds a Cue to a Context) | “shopping cart.{item1, item2}” |
| D | Domains | A set of related Contexts, each with an intrinsic domain time unit. | Encompass, at the Context level | the “shopping cart” domain, distinct from the “item pricing” domain |
| S(Δ) / S(δ) | Non-equilibrium / equilibrium (state predicate on S) | A Scope carrying values that requires (Δ) or has received (δ) resolution; Δ and δ partition S, not a separate sort; at most one Δ per domain time unit. | Resolve | selecting an item = S(Δ); cart updated = S(δ) |

### 3.2 Operators

Table 2 summarises the seven operators, in the order they are typically applied when a requirement is framed.

| Symbol | Name | Signature (informal) | What it does | Running-example instance |
| --- | --- | --- | --- | --- |
| φ | Pointer | A × C → C | Extends a phrase into a context, or (mode −) truncates a matched prefix; the only operator that builds sequence. | “shopping site” φ “shopping cart” = “shopping site.shopping cart” |
| {} | Knot | C × C → Cue | Groups contexts into an unordered collection. | {cart.item1} {} {cart.item2} = {cart.item1, cart.item2} |
| μ | Measure | Cue × V → Cue | Attaches a value string to a Cue member. | selected item μ “item 2” = selected item:item 2 |
| σ | Scope | C × Cue → S | Binds a Cue to a Context, producing an addressable Scope. | cart σ {item1, item2} = cart.{item1, item2} |
| Λ | Transit | S(Δ) → S(δ) | The sole operator invoking an external responder function; resolves a non-equilibrium Scope and returns the result to the algebra. | selecting item 2 (Δ) → cart updated (δ) via Λ |
| τ | Ancestry | C × ℕ → C | Reverse-traverses a context by a stated order, enabling one responder function to be reused polymorphically across different upstream contexts. | (cart.left.item)τ0 = item; (cart.left.item)τ1 = left.item |
| ρ | Relate | S × S → S, modes {s,i,j,x,d} | Set algebra over Scopes: selection, insertion, join, intersection, subtraction. | cart ρi {item3} adds item3 to the cart Scope |

### 3.3 Natural-Language Operands and Implications for Language Models

A property of CDA worth making explicit, because it is easy to overlook once the algebra is formalised in symbolic notation: the base sort A is not a purpose-built symbolic vocabulary invented for computation, in the way a programming language's token set or a logic's constant symbols are. A is drawn directly from ordinary spoken and written language — the situational phrases people already use when interacting with a facility (“next stop please,” “selected item,” “buyer details”). Every higher sort in Σ (C, V, Cue, S, D) is built from A purely by the algebra's own operators; nothing in Sections 3.1–3.2 requires A itself to be anything other than natural language.

This has a direct consequence for how CDA could be operationalised with current AI systems. Large language models are trained overwhelmingly on natural language and already encode rich statistical structure over exactly the kind of situational phrases that populate A. Because CDA's operators (φ, {}, μ, σ, Λ, τ, ρ) act on that same substrate rather than replacing it with an artificial symbol set, applying CDA to a domain does not require retraining a language model on a new vocabulary; it requires recognising, within language a model already understands, which phrases play the role of A and applying the algebra's operators to structure them. In principle, this positions CDA as a candidate intermediate representation between free-form natural-language requirement text and a formally closed algebraic object — a pattern a language-trained model could be prompted or fine-tuned to recognise and produce, in any language the model has been trained on, since the algebra's operators are defined independently of which natural language populates A.

We state this as a plausible implication of CDA's design, not as a demonstrated result: no experiment reported in this paper trains or evaluates a language model against CDA's operators, and doing so — for instance, testing whether a model can reliably identify φ, {}, or Λ boundaries in free-form requirement text across multiple languages — is left as a direction for future work.

## 4. Running Example, Worked in Full

This section threads the shopping-cart scenario through a complete equilibrium/non-equilibrium cycle, using the operators from Section 3 in sequence.

Step 1 — Building context with φ.

“shopping site” φ “shopping cart” = “shopping site.shopping cart”

Step 2 — Grouping with {}.

“cart.item1” {} “cart.item2” = { “cart.item1”, “cart.item2” }

Step 3 — Scoping with σ.

“shopping site.shopping cart” σ { item1, item2 } = “shopping site.shopping cart.{item1, item2}”

Step 4 — A non-equilibrium point, via μ.

“shopping site.shopping cart.selected item:{item selected: “item 2”}”Δ

Step 5 — Resolution via Λ.

“shopping site.customer:{customer:1}.items in cart:{item1, item2}”δ

Step 6 — Reuse via τ, across a second context (“wishlist”) structurally identical to the cart.

(“cart.selected item:{item2}”)τ0 = “selected item:{item2}” = (“wishlist.selected item:{item2}”)τ0

Step 7 — Combination via ρ.

cart ρi { item3 } = “shopping site.shopping cart.{item1, item2, item3}”

This derivation — seven operators, one scenario, no step requiring reference to how the underlying system is coded — is the concrete demonstration of CDA's central claim: that requirement, expressed this way, is a self-contained algebraic object that nonetheless fully determines what any correct implementation must do at each point of non-equilibrium.

## 5. Theory and Calculation: Formal Properties

This section states, and gives evidence for, four structural properties the algebra of Sections 3–4 satisfies, together with a direct comparison against relational algebra. The evidence given is at the level appropriate to a methodology-track contribution: it establishes that each property holds by construction, given the operator signatures of Table 2, rather than offering a full model-theoretic proof.

### 5.1 Closure

CDA is a many-sorted algebra over the fixed sort collection Σ = {A, C, V, Cue, S, D} (§3.1). Each operator's codomain is one of these six sorts — φ: A×C→C, {}: C×C→Cue, μ: Cue×V→Cue, σ: C×Cue→S, Λ: S(Δ)→S(δ), τ: C×ℕ→C, and ρ: S×S→S (Table 2) — and every operator's domain is likewise drawn from Σ, or from a subset of a sort in Σ, as with Λ's domain S(Δ)⊆S. Because Σ is fixed and no operator's codomain lies outside it, arbitrary well-typed compositions of operators remain within Σ: no operator generates a new sort, only new elements of an already-declared one. This is the direct evidence for the paper's central claim that requirement expressed in CDA is a closed object, in the standard many-sorted-algebra sense of closure.

### 5.2 Determinism of Λ

For a given Scope in S(Δ), Λ invokes exactly one responder function. This follows from the definition of the state predicate: at most one element of S(Δ) is active per domain time unit (Table 1), and each such Scope is itself fully measured — a specific Context bound to a specific valued Cue. Because the responder function is selected by matching on this fully-instantiated Scope, and no two distinct elements of S(Δ) can be simultaneously active within one domain, Λ's invocation is unambiguous: one Scope in S(Δ) yields one responder invocation and one resulting Scope in S(δ).

### 5.3 Well-definedness of τ

τ's reuse claim requires that τ_k applied to two different upstream contexts yields comparable residual contexts a single responder can act on. In the running example, (“cart.selected item:{item2}”)τ0 and (“wishlist.selected item:{item2}”)τ0 both reduce to the identical residual context “selected item:{item2}”. This holds generally whenever two contexts share the same suffix of length k+1: τ_k discards only the differing prefix, so any responder defined over the residual context is applicable to both, independent of how the two contexts diverge above order k. This is the structural basis for the polymorphic reuse described in Section 3.2.

### 5.4 Comparison with Relational Algebra

Table 3 positions CDA against Codd's relational algebra [1] on three properties central to both models' claims to formal status.

| Property | Relational Algebra (Codd, 1970) | CDA (this paper) |
| --- | --- | --- |
| Closed under composition | Yes — operators map relations to relations | Yes — each operator's output type is itself an operand type (Table 2); see §5.1 |
| Compositional | Yes — query expressions built from sub-expressions | Yes — Contexts, Cues and Scopes compose via φ, {}, σ, ρ |
| Explicit execution semantics | No — evaluation strategy left to the DBMS | No — deliberately excluded; Λ names an external responder without specifying it (§6) |
| Primary object | The tuple / relation | The Attention Phrase / Context |

### 5.5 Asymmetric Autonomy of the S(Δ)/S(δ) Cycle

A Scope resolved to S(δ) can later re-enter S(Δ): a fresh attention phrase or value attached via μ, φ, {} or σ can create new tension around an already-resolved Scope, restarting the cycle. This re-triggering transition, S(δ)→S(Δ), is not performed by Λ — Λ's signature is strictly S(Δ)→S(δ) (§5.2) and has no defined action in the other direction. The two halves of the cycle are therefore not symmetric in origin. Borrowing the standard distinction from dynamical systems theory between autonomous systems, whose evolution rule depends only on the system's own current state, and non-autonomous systems, which require an external, time-varying forcing term: CDA's generation of non-equilibrium is autonomous — μ, φ, {} and σ can create a new S(Δ) using only the algebra's own operators and existing state, with no appeal to anything outside Σ — while its resolution of non-equilibrium is non-autonomous, strictly dependent on Λ's external responder function.

This is by-construction evidence, in the same sense as §5.1: it follows directly from the operator signatures of Table 2, not from a separate derivation. Each of μ: Cue×V→Cue, φ: A×C→C, {}: C×C→Cue and σ: C×Cue→S has both its domain and its codomain entirely within Σ — none takes a responder function, an external value, or anything outside the algebra as an argument. A new S(Δ) is, by Table 1's own definition, simply a Scope carrying values that has not yet been passed through Λ; since μ, φ, {} and σ can jointly construct any such Scope from base phrases already in A, reaching a new element of S(Δ) requires nothing beyond composing these four operators. Λ, by contrast, is the only operator in Table 2 whose definition names an external responder function at all (§3.2); it is therefore the only operator whose invocation cannot be reduced to composition within Σ. This asymmetry — four operators sufficient on their own to reach S(Δ), one operator structurally incapable of avoiding an external call to reach S(δ) — is the construction-level evidence for the autonomous/non-autonomous distinction drawn above.

This asymmetry sharpens the paper's central closure claim. CDA does not merely tolerate an external execution step; it is structurally self-sufficient at the one thing a requirement specification must do on its own — express what tension exists — while being exactly as dependent on an external mechanism as the 2020 formulation always intended for the one thing it explicitly declined to specify: how tension is resolved. Section 6 returns to this asymmetry as direct evidence that CDA's exclusion of execution semantics was a principled boundary rather than an incidental gap: the algebra is autonomous exactly up to the boundary it always claimed, and no further.

## 6. Discussion: Toward an Execution Model

CDA, as presented above, is deliberately silent on one question: what actually happens, mechanically, when Λ invokes a responder function. This silence was a scope decision, not an omission — and §5.5 gives it precise shape: the algebra is autonomous exactly where a requirement specification must be (generating tension) and non-autonomous exactly where it always declined to commit (resolving it). The algebra's value depends on requirement remaining representable independent of the code, language, and hardware platform used to implement it — and any commitment to a specific execution mechanism would have compromised that independence at the moment it was most important to preserve it.

Three years on, that scope decision looks increasingly well-judged, because the industry context it anticipated has begun to materialise. What CDA lacked was not an oversight to be patched retroactively, but a genuine gap in the surrounding ecosystem: no widely available platform yet formalised execution itself — as a first-class, addressable, verifiable structure — in a way that could be plugged into a requirement algebra like CDA without forcing CDA to abandon its own neutrality.

Frameworks now emerging that treat execution state, intention, and context as explicit, addressable, and formally composable objects are the first credible candidates for that missing role. Where such a platform exists, CDA's Λ operator gains a concrete, checkable destination: the requirement algebra predicts a certain shape of execution, and the platform either confirms that shape holds at runtime or reveals precisely where it does not. We regard this convergence as the central open opportunity this paper is written to invite; the formal mapping between CDA and such an execution platform is left for future work, so that the execution-side mapping has, in this paper, a stable and formally-grounded object to be mapped onto.

## 7. Conclusion

We have presented the Context Dynamic Algebra, a closed algebraic model of software requirement built from two ordinary faculties of human attention, and demonstrated its full operator set, end to end, against a single running example, together with closure, determinism, and well-definedness properties for its core operators. CDA was built, deliberately, without an execution model. We have argued that this was the correct decision at the time, and that the emergence of platforms capable of representing execution as an explicit, addressable, verifiable structure now makes closing that gap both possible and worthwhile.

## CRediT Author Statement

Pronab Pal: Conceptualization, Methodology, Formal analysis, Writing – original draft, Writing – review & editing.

## Declaration of Competing Interest

The author declares that he has no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.

## Prior Publication

An earlier, substantially different version of this algebra was made available by the author as a technical note on a personal GitHub-hosted page in April 2020 [11]. That note was not peer-reviewed, was not submitted to any journal or conference with published proceedings, and has not been formally published. The present paper is a revised and extended treatment, as described in Section 1.

## Funding

This research did not receive any specific grant from funding agencies in the public, commercial, or not-for-profit sectors.

## Data Statement

No data was used for the research described in this article.

## Declaration of Generative AI and AI-assisted Technologies in the Manuscript Preparation Process

During the preparation of this work, the author used a large language model (Claude, Anthropic) to assist with restructuring, prose editing, and formatting of an earlier draft of this paper against journal submission requirements. After using this tool, the author reviewed and edited the content as needed and takes full responsibility for the content of the published article.

## References

[1] E.F. Codd, A relational model of data for large shared data banks, Commun. ACM 13 (6) (1970) 377–387. https://doi.org/10.1145/362384.362685.

[2] Logic and abstraction as capabilities of mind, academia.edu (accessed 8 August 2026).

[3] I. Fried, R. Mukamel, G. Kreiman, Internally generated preactivation of single neurons in human medial frontal cortex predicts volition, Neuron 69 (3) (2011) 548–562.

[4] The pattern technology of Christopher Alexander, Metropolis Magazine (accessed 8 August 2026).

[5] P. Pal, Let the application flow organize your objects, Developer.com (accessed 8 August 2026).

[6] Separation of concerns, Wikipedia (accessed 8 August 2026).

[7] C. Alexander, The Nature of Order, Book 1, Chapter 5, Center for Environmental Structure, Berkeley, CA, 2002.

[8] Why JSX, React documentation, reactjs.org (accessed 8 August 2026).

[9] The cognitive appeal of the clean and the new, DZone (accessed 8 August 2026).

[10] F. Chimero, The Shape of Design, self-published, 2012.

[11] P. Pal, The Context Dynamical Algebra: A Pragmatic Model of Computation, Keybyte Systems / Intentix Lab technical report, April 2020.
