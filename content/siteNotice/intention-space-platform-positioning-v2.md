# Intention Space: Platform-First Positioning

*A directional note from Intentix Lab — revised August 2026*

## A change in emphasis

Intentix Lab is moving the next phase of Intention Space toward a live, inspectable platform rather than making academic publication the primary route by which the work is introduced or validated.

This is not a move away from theory. It is a decision to let the theory become visible through operation.

The 2024 Human Intention Space work introduced CPUX, Intentions, Objects and software design units as an identifiable structure for inter-component execution. The PnR Computing work then presented computation as transformation over prompt-response state and argued that the model is Turing-complete by mapping Turing-machine state transitions into PnR transformations. The current Context Dynamic Algebra (CDA) work strengthens the requirement side by modelling attention through Point, Encompass and Resolve while deliberately keeping execution semantics outside the algebra.

The platform is now intended to bring these strands together as an observable computational system.

## CPUX: from Common to Cognitive

From September 2026, CPUX will be expanded as:

**Cognitive Path of Understanding and Execution**

The earlier phrase, **Common Path of Understanding and Execution**, can be read as implying that participating machines share an understanding of the material being processed.

That is not required.

In Intention Space, CPUX identifies a bounded path through which cognition can recognise what is active, what purpose is being pursued, what situational conditions are present, and how execution progresses toward a response.

The word **cognitive** is therefore used in a precise computational sense defined by Intention Space.

## Cognition as a computational primitive

Intention Space does not need to borrow a definition of cognition from psychology or neuroscience.

For this computational model:

> **Cognition is the recognition and progression of a purpose-bearing communication within a context.**

A cognitive act is represented by a **Signal**.

A Signal has two principal parts:

**Signal = Intention + Pulses**

where:

- **Intention** identifies the purpose of the communication.
- **Pulses** represent the situational conditions, observations, values or state relevant to that purpose.
- A Pulse may carry a trivalent state such as **Y / N / UN**.
- A **Response** carries the result produced or preserved through the interaction.

This gives Intention Space a vocabulary in which purpose, context, state and response are explicit computational elements rather than assumptions hidden inside code.

## Two categories of computational entity

Computation in Intention Space is communication between two different categories of entity: **Design Nodes (DNs)** and **Objects**.

### Design Node — DN

A DN is an active transformation entity.

A DN may:

- receive a Signal,
- recognise its Intention and Pulses,
- transform Pulses,
- produce or update a Response,
- emit a resulting Signal.

In this sense a DN performs the active transformation step of cognition.

### Object

An Object has a different role.

An Object may:

- receive a Signal,
- retain Pulses transiently,
- reflect or transform the Signal,
- contribute situational continuity between DNs.

An Object does **not** mutate the Response carried by the cognition path.

This asymmetry is deliberate.

A DN performs response-producing transformation. An Object participates in context, reflection, routing and temporary state without becoming another hidden computational responder.

## Cognition is more than message passing

A conventional message-passing system can be described as:

**message → receiver**

Intention Space requires more structure:

**purpose + context + state → recognition → transformation/reflection → response**

A communication becomes cognitive in this model because the receiving entity acts with respect to an explicit Intention, explicit Pulses, their current state, and a Response space.

The result is a bounded relation between:

**what is intended → what is currently recognised → what happens next**

## Relation to PnR Computing

PnR Computing established the earlier state-based foundation for this direction.

A PnR associates a unique phrase with a value and a trivalent meta-state such as **Y**, **N** or **UN**. Computation proceeds by transformations of these states through Intention Space operators.

The 2024 PnR Computing paper presents a mapping from Turing-machine states and transitions into PnR transformations and therefore positions PnR Computing as a Turing-complete computational model.

The present Signal formulation is a refinement of that operational language:

- **PnR state** provides the earlier computational state representation.
- **Pulses** provide explicit situational state carried in cognition.
- **Intention** makes the purpose of the interaction first-class.
- **Signal** binds Intention and Pulses into the unit of cognitive communication.
- **Response** makes the outcome of transformation explicit.

The aim is not to create a metaphor of cognition around computation. It is to define cognition using computational terms already available within Intention Space.

## CDA, cognition and Situational Cognition

This gives a clearer progression across the current work.

### Context Dynamic Algebra — CDA

CDA provides a formal structure for recognising and expressing requirement through the faculties of:

**Point → Encompass → Resolve**

It describes how a bounded requirement can reach a point of non-equilibrium requiring resolution while remaining independent of any particular execution mechanism.

### Cognition

Cognition provides the computational act through which purpose-bearing communication is recognised and progressed.

### Situational Cognition

Situational Cognition extends that act into surroundings where Objects may represent ordinary entities of reality as well as computational entities.

The surrounding world does not need to be reduced to software objects with hidden behaviour. An Object can participate simply by being part of the recognised situation, retaining or reflecting relevant Pulses and Signals.

### Intention Space

Intention Space provides the runtime environment in which these cognitive interactions can be configured, executed and inspected.

### CPUX

A CPUX is then:

> **A bounded Cognitive Path through which Signals are recognised, reflected and transformed until the active Intention reaches an appropriate Response or resolution condition.**

## What the live platform should make visible

The immediate goal is to make these definitions operational and observable.

A public Intention Space runtime should allow a person to:

- define or load several DNs,
- define Signals as Intention + Pulses,
- configure CPUX paths at runtime,
- observe Pulse and Field conditions,
- see when a DN becomes eligible to execute,
- observe Objects reflecting Signals without mutating Responses,
- inspect the Response produced by each DN,
- change the runtime configuration without rewriting the participating DNs.

Most importantly, the same DNs should be able to participate in different CPUX configurations and produce different valid resolution paths.

That demonstrates a central Intention Space proposition:

> **The operational relationship between computational entities can itself be a first-class, configurable and cognitively inspectable artefact rather than an accidental consequence of code references and framework wiring.**

## Platform first, publication follows

The working direction is now:

**platform → observable phenomenon → formalisation → publication**

rather than:

**formalisation → publication → hoped-for recognition → platform**

Future papers can describe behaviour that researchers and practitioners can reproduce, inspect, challenge and extend directly.

Academic and professional communities do not need to accept Intention Space in advance. They can follow the platform, run it and evaluate what it makes possible.

## A broader computational purpose

Conventional computation is exceptionally successful at manipulating symbolic state.

The unresolved issue arises when computation participates in situations involving purpose, interpretation, responsibility and consequence while those elements remain outside the computational representation itself.

Intention Space approaches this by making purpose and situational state explicit:

**Intention + Pulses + Response**

and by constraining their progression through identifiable DNs, Objects and CPUX paths.

The goal is therefore not to claim that a machine understands in the psychological sense.

The goal is to define a precise computational meaning of cognition and build a platform where that cognition can interact with software, AI, humans and ordinary reality within explicit, bounded paths.

## Current positioning

The present working hierarchy is:

**CDA**  
formal structure of attention and requirement

↓

**Cognition**  
purpose-bearing communication in context

↓

**Situational Cognition**  
cognition interacting with surrounding Objects and conditions

↓

**Intention Space**  
runtime environment for configurable cognitive computation

↓

**CPUX**  
bounded Cognitive Path of Understanding and Execution

This is the direction the live Intention Space platform will now make concrete.

## References

- Pronab Pal, “Human Intention Space - Natural Language Phrase Driven Approach to Place Social Computing Interaction in a Designed Space,” *International Journal on Natural Language Computing*, Vol. 13, No. 3, June 2024. DOI: 10.5121/ijnlc.2024.13302.
- Pronab Pal, “PnR Computing: A Turing-Complete Model In A Social Setting,” 2024.
- Pronab Pal, “Context Dynamic Algebra: A Closed Algebraic Model of Software Requirement — Through Three Faculties of Attention: Point, Encompass & Resolve,” current manuscript, 2026.

---

Intentix Lab, Melbourne, Australia  
https://intentixlab.com
