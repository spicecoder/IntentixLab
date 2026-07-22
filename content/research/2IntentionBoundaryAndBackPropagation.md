---
title: "The Two-Intention Semantics of a Design Node"
subtitle: "Why Intention-Space computation is not merely function application"
author: "Pronab Pal"
organisation: "IntentixLab"
date: "2026-07-22"
status: "Research Note"
slug: "two-intention-semantics-of-a-design-node"
keywords:
  - Intention Space
  - Design Node
  - CPUX
  - Signal
  - Pulse
  - function semantics
  - backpropagation
  - bidirectional computation
  - BDI
  - formal methods
  - LLM orchestration
---

# The Two-Intention Semantics of a Design Node

## Abstract

Traditional functions are described as mappings from input values to output values. Even rich function contracts normally specify accepted parameters, preconditions, return types, postconditions, and failure forms. Intention Space proposes a different computational boundary. A Design Node does not merely receive data and return data. It participates between two explicit intentions.

The input intention situates the node within a presently recognised computational context. The output intention gives the node a forward direction: a state it is expected to attempt to realise. Input and output Signals carry Pulses that make the relevant recognised conditions and realisation status explicit. A Design Node therefore performs a bounded, intention-directed transition rather than an unlabelled value transformation.

A further structural property distinguishes the Design Node from conventional function application. Like a neural-network gate during backpropagation, a DN is responsive to signals arriving from both directions: the input Signal grounds the node in a recognised situation, while the output intention (and any gradient-like signal from downstream) directs how the node should adjust its behaviour. This bidirectional responsiveness is not an afterthought; it is intrinsic to the node's architectural identity.

This note develops that distinction, explains why the output intention is not equivalent to a return type or postcondition, draws the structural parallel with backpropagation's bidirectional gate semantics, and outlines a formal direction for intention-mediated computation.

---

## 1. The problem

Conventional computation is highly effective at representing values, operations, types, control flow, contracts, exceptions, and agent goals. What is usually not preserved as a uniform runtime structure is the intentional relation between a recognised present situation and the future state toward which a bounded computation is acting.

A programmer may encode that relation in a function name, comments, schemas, prompts, workflow definitions, or application-specific state. However, it normally has no independent computational identity outside the implementation.

Intention Space asks whether this relation should become explicit.

> Conventional programming can encode intention as data or internal control logic, but it does not normally assign input and output intentions a uniform architectural and runtime role around every bounded computational agency.

---

## 2. Function semantics

A pure function is conventionally represented as:

```text
f : X -> Y
```

Given an input value `x` in domain `X`, the function produces a value `y` in domain `Y`:

```text
y = f(x)
```

Its defining property is extensional. Two pure functions are equivalent when they produce the same output for every input:

```text
for every x: f(x) = g(x)
```

A richer software function may also have preconditions, parameters, return values, postconditions, and failure cases. These answer:

> Given these values, what result is computed?

They do not inherently answer:

> Why is this computation active in the currently recognised situation, and what forward intention is it commissioned to realise?

---

## 3. A Design Node stands between two intentions

```text
Input Intention
    carries an Input Signal
            |
            v
       Design Node
            |
            v
Output Intention
    carries an Output Signal
```

The two intentions are not symmetric parameter labels.

### 3.1 Input intention

The input intention identifies the meaning under which the present Signal is offered to the node.

Its Signal communicates recognised situational conditions through Pulses and may carry associated response values.

The input side answers:

> What situation is currently recognised, and under what intention is this node being engaged?

### 3.2 Output intention

The output intention identifies the forward state the node is expected to attempt to establish.

Its Signal does not merely hold a return value. It communicates whether and how that forward intention was realised.

The output side answers:

> What intended state must this node attempt to bring into recognised existence?

The resulting dynamic is:

```text
recognised present situation
            +
declared forward intention
            |
            v
bounded attempt at realisation
            |
            v
explicit report of realised, not-realised,
or unresolved state
```

---

## 4. Context and direction

Human action is not normally guided by context alone. A person recognises a situation and acts toward something not yet realised:

```text
present situation + forward intention -> action
```

Intention Space gives a Design Node an analogous computational structure without claiming that ordinary software possesses human consciousness.

```text
Input Signal     -> recognised computational context
Output Intention -> declared forward direction
Design Node      -> bounded realising agency
Output Signal    -> reported realisation state
```

A function receives arguments. A Design Node is enabled within a recognised situation and directed toward an explicitly represented future condition.

---

## 5. The output intention is not a return type

A return type defines a domain of permissible values:

```typescript
type AuthenticationResult = {
  authenticated: boolean;
  message: string;
};
```

An output intention defines what those values are intended to count as accomplishing:

```text
I_authentication_resolved
```

### Two-intention interpretation

```text
Input Intention:
I_authentication_requested

Input Signal Pulses:
credentials_supplied = Y
session_active = N

Output Intention:
I_authentication_resolved

Possible Output Signal A:
authenticated = Y
identity_verified = Y

Possible Output Signal B:
authenticated = N
identity_verified = N

Possible Output Signal C:
authenticated = UN
identity_provider_available = N
```

All three output Signals remain within the same output intention.

The node does not silently replace `I_authentication_resolved` with `I_return_error` when it cannot authenticate the user. Instead, it reports the realisation status of the declared forward intention.

This makes failure semantically different from an exception. An exception reports a computational disruption. An output Signal can report the relationship between the intended state and the state actually reached.

---

## 6. Pulses as realisation evidence

A Pulse has a name and a trivalent truth value:

```text
Y  = recognised as affirmed
N  = recognised as negated
UN = unresolved or not presently known
```

For an output intention, Pulses serve as explicit evidence of realisation.

```text
Output Intention:
I_histogram_available

Output Signal:
histogram_generated = Y
input_validated = Y
```

or:

```text
Output Intention:
I_histogram_available

Output Signal:
histogram_generated = N
dataset_valid = N
```

or:

```text
Output Intention:
I_histogram_available

Output Signal:
histogram_generated = UN
required_information_complete = N
```

Associated Responses may carry the generated histogram, validation details, explanations, missing information, provenance, or diagnostics.

Responses carry values. Pulses communicate the recognised state relevant to gating and realisation.

---

## 7. Why the input Signal is not merely a parameter object

A parameter object can contain context, but supplying it does not by itself give it shared runtime significance.

In Intention Space, a Design Node becomes eligible only when the required intention and Pulse conditions are recognised in the Field.

```text
Enabled(DN, F)
    iff
I_in is recognised in F
and
P(S_in) is contained in P(F)
```

Thus:

```text
parameters happen to exist
```

is not equivalent to:

```text
the situation under which this DN may act is recognised
```

The input Signal possesses situational force.

---

## 8. Why the output intention is not merely a postcondition

A postcondition states what must be true after successful execution.

An output intention has a broader operational role. It:

1. gives the node a forward computational direction;
2. defines which output Signal family is legitimate;
3. remains identifiable when realisation fails;
4. provides the semantic entry point for the next CPUX position;
5. allows the runtime to reject emissions outside the designated output intention;
6. carries the continuing meaning of the computation beyond the node implementation.

A postcondition can describe correctness.

An output intention describes what the transition is for, and its output Signal communicates the realisation status of that purpose.

---

## 9. Bidirectional responsiveness: the backpropagation parallel

A conventional function is unidirectional. Data flows in, a result flows out. The function itself has no mechanism to respond to what happens to its output downstream. If the output is used incorrectly, the function is not informed; the error is handled elsewhere, if at all.

Neural-network gates during backpropagation behave differently. Each gate participates in two distinct flows:

```text
Forward pass:
    inputs -> gate computation -> output

Backward pass:
    gradient from above -> local Jacobian -> gradients to inputs
```

The gate is not merely a function `f(a,b)`. It is a bounded agency that:
- computes its output during forward propagation, and
- translates downstream feedback into adjustments for its inputs during backward propagation.

Karpathy describes this as a "tug" or "force" that propagates backward through the circuit. The gate receives a signal from above — the gradient of the final loss with respect to its output — and uses its local Jacobian to compute what that signal means for each of its inputs.

```text
Gate with local Jacobian J = [∂f/∂a, ∂f/∂b]

Receives gradient from above: df

Passes to inputs:
    da = (∂f/∂a) × df
    db = (∂f/∂b) × df
```

The gate is **responsive in both directions**. Forward, it transforms inputs to output. Backward, it transforms a downstream signal into guidance for its inputs.

### 9.1 The Design Node as bidirectionally responsive

A Design Node exhibits the same structural property, generalised from numerical gradients to intentional Signals.

```text
Forward direction (intention realisation):
    Input Signal -> DN perform() -> Output Signal

Backward direction (intention guidance):
    Output Intention / downstream Signal -> DN -> adjusted Input understanding
```

The DN's `perform(Signal_in) -> Signal_out` contract is the forward pass. But the DN is also defined by how it responds to the output intention — and, in a broader CPUX pipeline, to the Signals that arrive from downstream positions.

In backpropagation, the gate's local Jacobian defines how a downstream gradient maps to input adjustments. In Intention Space, the DN's **intention transfer function** defines how an output intention (and any downstream Pulses) map back to what the node should recognise, attempt, or reconsider.

```text
Backprop gate:
    J_local : gradient_above -> (gradient_a, gradient_b)

Design Node:
    T_intention : output_intention × downstream_Signal -> adjusted_input_Pulses
```

The DN does not merely emit an output and terminate. Its identity includes how it would respond if the output intention is not realised, if downstream nodes reject its Signal, or if the Field changes in ways that invalidate its forward conclusion.

### 9.2 Why this is not merely a callback

A callback is an external function invoked after completion. It does not change the internal structure of the node.

Bidirectional responsiveness is intrinsic. The same DN implementation that computes forward also defines how it should respond to backward guidance. The output intention is not an afterthought; it is part of the node's architectural boundary.

```text
Callback model:
    f(x) -> y, then call g(y)
    f knows nothing about g

Bidirectional model:
    DN receives input intention and Signal
    DN attempts output intention
    DN's structure also defines how output-side conditions
        propagate back to its input-side understanding
```

### 9.3 The parallel in tabular form

| Aspect | Neural-network gate | Design Node |
|---|---|---|
| Forward computation | `output = f(inputs)` | `Signal_out = perform(Signal_in)` |
| Forward information | Input values | Input intention + Input Signal Pulses |
| Backward signal source | Gradient from loss / upstream gate | Output intention + downstream Field state |
| Local transformation | Jacobian: ∂output/∂inputs | Intention transfer: how output conditions map to input reconsideration |
| What flows backward | Numerical gradients | Intentional Signals with Y/N/UN Pulses |
| Node's knowledge of full circuit | None — only local Jacobian | None — only local intention transfer function |
| Composition mechanism | Chain rule | CPUX reflection and Field update |
| Identity | Activation function + parameters | Input intention + output intention + perform contract + CPUX position |

### 9.4 Implications for the DN contract

This parallel suggests that a complete DN specification should include not only:

```text
perform : Input_Signal -> Output_Signal
```

but also an explicit account of:

```text
respond : Output_Intention × Downstream_Signal -> Input_Reconsideration
```

where `respond` defines how the DN should adjust its internal state or its understanding of the input situation when the output intention is not realised, is rejected, or is superseded by downstream conditions.

In practice, this may be realised through:
- **CPUX reflection**: the output Signal is reflected into the Field, where it may enable or disable other DNs;
- **Perception mode handling**: the DN's `_perception_mode` Pulse determines whether it accumulates context, queries an LLM, or awaits external validation;
- **RTM output mapping**: the DN's response data is routed to the appropriate CPUX position for continued processing;
- **Golden pass / visitor pattern**: the DN participates in a traversal where its output becomes input for the next position, and the overall visitor state may loop back.

The key insight is that **the DN is not a dead-end function call**. It is a living boundary in a circuit of intentions, responsive to conditions arriving from both the input side (situation recognition) and the output side (forward direction and downstream feedback).

---

## 10. Function equivalence and Design Node identity

Two functions may be extensionally equivalent:

```text
for every x: f(x) = g(x)
```

Yet the same implementation may participate as different Design Nodes.

```text
DN-A:
I_customer_history_available
    ->
I_discount_estimate_available

DN-B:
I_transaction_pattern_available
    ->
I_fraud_risk_available
```

Both implementations might produce the numeric value `0.72`, but the computational meanings differ.

```text
same value
 does not imply
same Signal

same Signal structure
 does not imply
same Intention

same internal implementation
 does not imply
same Design Node instance
```

The input and output intentions contribute to the external identity of the node.

---

## 11. A Design Node as an intention-labelled transition

A pure function may be modelled as:

```text
f : X -> Y
```

A Design Node is better approximated as:

```text
DN:
(Field, Input Intention, Input Signal)
    ->
(Output Intention, Output Signal)
```

subject to:

```text
the input intention is recognised;
the required Pulses match the Field;
the DN is executable;
the emitted Signal belongs to the designated output intention.
```

The output is not immediately identical to a new shared state. It is emitted into the CPUX pickup and must pass through its designated reflective structure before being recognised by the Field.

Thus a DN is not simply:

```text
input -> implementation -> output
```

It is:

```text
recognised context
    ->
bounded intention-directed computation
    ->
declared output intention
    ->
explicit realisation account
    ->
validated reflection into shared state
```

And, with bidirectional responsiveness:

```text
[downstream conditions may propagate back
 to adjust the DN's understanding
 of its input situation and its own realisation status]
```

---

## 12. The significance for LLM-backed Design Nodes

An LLM is often prompted with context and asked to produce a response:

```text
context -> prompt -> generated answer
```

Even when an output schema is supplied, the schema mainly constrains structure.

A two-intention DN constrains the LLM along three dimensions:

```text
Input Signal:
What situation is recognised?

Output Intention:
What forward state may the node attempt to realise?

Output Signal:
What claims may be made about whether that state was realised?
```

An LLM-backed DN must not invent a substitute goal merely because the declared output intention cannot be realised. It should instead emit a Signal with `N` or `UN`, together with relevant Pulses and Responses.

An output schema says:

> Produce data of this shape.

An output intention says:

> Attempt only this forward realisation, and explicitly report the relation between the intended and achieved states.

With bidirectional responsiveness, the LLM-backed DN also gains:

> If your output is rejected or superseded downstream, reconsider your understanding of the input situation and emit an adjusted Signal.

This is not fine-tuning or reinforcement learning in the conventional sense. It is **architectural**: the DN's contract includes both forward generation and backward adjustment, mediated through the same Signal/Pulse structure.

---

## 13. Traditional software can simulate this

A conventional type system can represent a similar structure:

```typescript
type Realisation<T> =
  | { status: "realised"; value: T }
  | { status: "not-realised"; reason: string }
  | { status: "unresolved"; missing: string[] };
```

A workflow engine can add context, and a contract system can add preconditions and postconditions.

Therefore the proposed distinction is not based on expressive impossibility.

> Intention Space moves these concerns from application-specific convention into a uniform runtime ontology governing eligibility, direction, emission, reflection, composition, and traceability.

The question is not whether traditional code can encode this. It can.

The question is:

> What becomes possible when the intentional relation itself is made persistent, inspectable, transferable, and operational across independently implemented computational agencies?

---

## 14. Relation to nearby approaches

### 14.1 Pure functions

Pure functions provide strong reasoning through referential transparency and freedom from hidden state. A DN may contain a pure function internally.

```text
pure function:
value mapping

Design Node:
intention-labelled runtime participation
```

### 14.2 Hoare-style contracts

Hoare logic relates a precondition, command, and postcondition:

```text
{P} C {Q}
```

This is close in shape, but different in role.

- `P` is a logical assertion before execution.
- `Q` is a logical assertion after execution.
- the input intention identifies why the recognised situation engages this node;
- the output intention identifies the forward state the node is commissioned to attempt;
- output Pulses explicitly communicate realisation, non-realisation, or unresolved status;
- the resulting Signal can become a shared runtime condition for subsequent CPUX participation.

A research task is to determine which parts are reducible to labelled Hoare triples and which require a distinct operational model.

### 14.3 Backpropagation and automatic differentiation

Backpropagation computes gradients through a computational graph by applying the chain rule locally at each gate. Each gate:
- computes forward: `output = f(inputs)`
- computes backward: `input_gradients = J_local × output_gradient`

The Design Node generalises this structure:
- computes forward: `Signal_out = perform(Signal_in)` under output intention
- computes backward: `adjusted_input = respond(output_intention, downstream_Signal)`

The parallel is structural, not mathematical. Backpropagation uses real-valued gradients and differentiable functions. Intention Space uses trivalent Pulses and semantic intention transfer. But the **architectural pattern** — bounded local agencies responsive to signals from both directions — is the same.

### 14.4 BDI agents

BDI architectures represent intention as part of an agent's practical reasoning state.

Intention Space differs by placing intentions at the communication and runtime-composition boundary between bounded agencies.

The emphasis is not only:

```text
what does this agent intend?
```

but also:

```text
under which input intention may this bounded agency act,
and which output intention may it place into continued computation?
```

### 14.5 Goal-oriented requirements

Goal-oriented methods preserve stakeholder goals during design and refinement.

Intention Space asks that the intentional boundary remain present during runtime execution and inter-component composition.

### 14.6 Intention abstraction middleware

Recent work on intention abstraction layers proposes persistent runtime intention objects, ontology-based conflict detection, and intention lifecycle management above industrial execution systems.

Intention Space is compatible with that direction but goes further by making intentions participate in the gating and continuation of bounded computation.

---

## 15. Compact comparison

| Property | Traditional function | Contracted function | Neural-network gate | Design Node |
|---|---|---|---|---|
| Primary meaning | Value mapping | Value mapping under assertions | Differentiable transformation | Situated attempt at forward realisation |
| Input | Parameter values | Parameters satisfying preconditions | Input tensor values | Input intention and recognised Signal |
| Output | Return value | Return value satisfying postconditions | Output tensor values | Output intention and realisation Signal |
| Forward trigger | Program control flow | Program control flow plus checks | Data flow in graph | Field recognition plus CPUX visitation |
| Backward signal | None | None | Gradient from loss | Downstream intention / Field state |
| Local sensitivity | None | None | Jacobian ∂output/∂inputs | Intention transfer function |
| Failure | Exception, error, result variant | Contract violation or failure variant | Gradient magnitude | `Y`, `N`, or `UN` within designated output intention |
| Identity | Function definition | Function plus contract | Activation + parameters + position in graph | Intentions, Signal contracts, CPUX position, implementation |
| Composition | Calls or function composition | Contract-compatible calls | Chain rule through graph | Signal reflection through CPUX |
| Shared runtime meaning | Normally external | Partly explicit | Implicit in gradient flow | First-class and persistent |
| LLM constraint | Prompt and schema | Prompt, schema, validators | Not applicable | Context, forward intention, Signal contract, non-realisation, bidirectional responsiveness |

---

## 16. Proposed semantic principle

> A Design Node is a bounded computational agency positioned between an input intention and an output intention. The input Signal represents a recognised situational context. The output intention represents the forward state the node is commissioned to attempt to realise. The emitted output Signal records whether and how that intended state was realised, while remaining within the declared output intention even when realisation is negative or unresolved. Furthermore, the node is bidirectionally responsive: it can receive guidance from the output side — through the output intention, downstream Signals, or Field changes — and translate that guidance into adjusted understanding of its input situation, analogous to how a neural-network gate uses its local Jacobian to propagate gradients backward through a computational graph.

```text
Input Intention
    grounds action

Output Intention
    directs action

Design Node
    performs bounded action
    and
    responds to downstream guidance

Output Pulses
    report the relationship
    between intended and achieved state
```

---

## 17. Research questions

### RQ1 — Reducibility

Can two-intention DN semantics be reduced without loss to typed functions, algebraic effects, Hoare triples, labelled transition systems, BDI intentions, process calculi, or workflow contracts?

### RQ2 — Operational semantics

Can a complete operational semantics be defined for:

```text
Input Intention
-> Input Signal
-> Field gating
-> DN execution
-> Output Intention
-> Output Signal
-> reflection
-> updated Field
-> [downstream guidance propagation]
```

### RQ3 — Equivalence

When are two Design Nodes behaviourally equivalent? Is equality of emitted values sufficient, or must equivalence preserve intention identity, Pulse truth values, failure and unresolved states, response provenance, bidirectional responsiveness, and CPUX-visible behaviour?

### RQ4 — Compositionality

Under what conditions can the output intention and Signal of one bounded computation safely establish context for another?

### RQ5 — Determinism

How should deterministic CPUX execution be distinguished from non-deterministic internal agencies such as LLMs?

### RQ6 — Intention preservation

Can the identity of an intention be preserved across:

```text
human expression
-> formal compilation
-> DN implementation
-> runtime execution
-> output reflection
-> human observation
```

### RQ7 — Non-realisation

Does representing `N` and `UN` within the designated output intention provide stronger traceability than conventional exceptions and result types?

### RQ8 — Bidirectional responsiveness

Can the DN's backward responsiveness be formalised as a generalisation of backpropagation, where the "local Jacobian" is replaced by an "intention transfer function" operating on trivalent Pulses rather than real-valued gradients?

---

## 18. Implications

If the distinction is formally sustained:

- software components become intention-addressable;
- failure remains inside meaning;
- LLM execution becomes semantically bounded;
- runtime traces become explanations;
- reuse becomes intention-conscious;
- nodes become responsive to downstream conditions without external orchestration.

A CPUX trace can show:

```text
what situation was recognised;
which forward intention was active;
which DN acted;
what was emitted;
whether the intended state was realised;
how downstream conditions propagated back;
how that state entered continued computation.
```

---

## 19. Conclusion

A traditional function transforms values. A neural-network gate transforms values and, through backpropagation, translates downstream gradients into input adjustments via its local Jacobian. A Design Node participates in a recognised situation, acts toward a declared future intention, and is responsive to signals arriving from both the input side (situation recognition) and the output side (forward direction and downstream guidance).

The difference is not that Intention Space can express something conventional software could never encode. The difference is that Intention Space proposes to make the intentional relation itself — and its bidirectional responsiveness — foundational and operational.

The input intention provides situated grounding.

The output intention provides forward direction.

The Design Node performs a bounded attempt at realisation.

The output Signal reports the relationship between what was intended and what was achieved.

The node's bidirectional responsiveness ensures that downstream conditions can propagate back to adjust its understanding, just as gradients propagate back through a neural network.

This creates a computational structure in which intention does not disappear into parameters, function names, prompts, or implementation details. It remains explicit before, during, and after bounded computation, and it can continue through a Common Path of Understanding and Execution.

---

## References and conceptual neighbours

1. Hoare, C. A. R. "An Axiomatic Basis for Computer Programming." *Communications of the ACM*, 12(10), 1969.
2. Rao, A. S., and Georgeff, M. P. "BDI Agents: From Theory to Practice." *Proceedings of the First International Conference on Multi-Agent Systems*, 1995.
3. Bratman, M. E. *Faces of Intention: Selected Essays on Intention and Agency*. Cambridge University Press, 1999.
4. Stanford Encyclopedia of Philosophy. "Collective Intentionality."
5. Markaj, A., Hofer, R., and Gehlhoff, F. "Towards an Intention Abstraction Layer for Autonomous Industrial Systems." arXiv:2607.14553, 2026.
6. Karpathy, A. "Hacker's Guide to Neural Networks." *karpathy.github.io*, 2015.
7. Pal, P. "Human Intention Space." *International Journal of Natural Language Computing*, 13(3), 2024.
8. Pal, P. "PnR Computing: A Turing-Complete Model in a Social Setting." 2024.
9. Pal, P. "CPUX: Semantic Field-Gated Orchestration." 2025.
10. Pal, P. "Intention Pulse Transfer Protocol." 2025.

---

## Suggested citation

```text
Pal, Pronab. "The Two-Intention Semantics of a Design Node:
Why Intention-Space Computation Is Not Merely Function Application."
IntentixLab Research Note, 2026.
```
