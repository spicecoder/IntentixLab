# The Perceptive Machine: How CPUX Runs on Your Device

*A complete architecture for applications that treat human perception — not data processing — as the origin of computation.*

---

## What Makes an App "Perceptive"?

Every application you use today follows the same hidden assumption: the computer is the centre of the action, and the human is a source of data to be processed. You type into a text field; the field silently parses, validates, reformats, and stores your input before you see what happened. The logic is buried in code. The human is peripheral.

A **Perceptive App** inverts this. The human is not a data source — the human is the primary computational agent. The application exists to *perceive* what the human intends, carry that intention faithfully, and reflect the result back for the human to perceive in turn. No hidden transformations. No silent rewrites. Every piece of logic is declared as data, visible and auditable.

This article describes how that idea becomes a working machine on any client device — starting from the moment a human decides to connect to an application, through to a running app with full perception mode support.

---

## 1. Perception as the Foundation

**Perception**, as used in this framework, does not mean sensory input or statistical detection. It means the continuous, context-sensitive engagement through which an agent identifies relevance in its environment as a precursor to intention and action.

In Intention Space, perceptions are represented through **Pulses** — the smallest unit of meaningful data: `<phrase, trivalence, response>`. The **trivalence** (Y / N / UN) describes the *perceptual status* of the data. Y means the human has authority. N means the system has fixed it. UN means the question is still open.

---

## 2. The Human as a Design Node

In Intention Space, three kinds of entities interact: **Intentions** (channels), **Objects** (reflectors that carry without modifying), and **Design Nodes** (blackbox computation). The human follows the DN pattern exactly: absorb Signal (perceive) → compute (decide) → emit Signal (act). UI components are Objects — they reflect signals without modifying them.

| | Generic Computation | Perceptive Computation |
|---|---|---|
| **Where** | Design Nodes (including humans) | Objects (including UI components) |
| **What** | Creates new data, transforms values | Carries existing data, changes only the Intention label |

---

## 3. The Bare GridLookout — Before Any App Exists

On any client device, there is a permanently resident component: the **Native GridLookout**. It is the device's perceptual surface — the layer that knows how to render cells and capture human input. It is always present, even when no application is running.

In its bare state, the Native GridLookout is like a web browser with nothing but an address bar. No pages loaded, no content rendered — just a single input field and the ability to connect.

```
+------------------------------------------+
|           NATIVE GRIDLOOKOUT             |
|         (bare state -- no app)           |
|                                          |
|  +------------------------------------+  |
|  |  Connect to Intention Space:       |  |
|  |  +-------------------------+       |  |
|  |  | wss://shop.example.com  | [Go]  |  |
|  |  +-------------------------+       |  |
|  +------------------------------------+  |
|                                          |
|  No scene loaded. No CPUX running.       |
|  Awaiting human intention.               |
+------------------------------------------+
```

This input field is itself a cell — bound to the Pulse `<"connect_address", UN, []>`. The "Go" button is a cell with `<"initiate_contact", UN, []>`. These are the only two cells in the bare GridLookout. They exist before any application, before any backend, before any CPUX engine.

The human **perceives the need to connect** — perhaps they know an address, perhaps they select from a history. They type the address and press Go. This is a perceptual act — an intention emitted as a Signal. The GridLookout sends it as an IPTP Signal to the backend.

This is **First Contact**.

---

## 4. First Contact — The Human Initiates Connection

First Contact transforms a bare GridLookout into a running Perceptive App. It follows the same perceptual pattern as everything else in Intention Space.

```
HUMAN                     NATIVE GRIDLOOKOUT            BACKEND SERVER
-----                     ------------------            --------------
Perceives need
to connect
      |
      +-- types address -->  Input cell captures
      |                      the address
      +-- presses Go ----->  Emits IPTP Signal ----------> Receives
      |                      to backend                    First Contact
      |                                                        |
      |                                                    Builds response:
      |                                                    App Manifest
      |                                                    (scene + CPUX config)
      |                                                        |
      |                      Receives IPTP response <----------+
      |                      with app manifest
      |                          |
      |                      Fires onFirstContact()
      |                          |
      |                      App Bootstrap (callback):
      |                        1. Parse manifest
      |                        2. Extract scene --> render cells
      |                        3. Extract CPUX config
      |                        4. Instantiate CPUX engine
      |                        5. Connect IS Bridge
      |                        6. Send gl:init-cpux (manifest)
      |                        7. Send gl:register-cells
      |                          |
Sees the app <------------  Cells render from scene
rendered                    CPUX running
      |
      +-- clicks button -->  Normal perceptual loop begins
```

Three things to notice:

**The human is the initiator.** No app pushes itself onto the device. The human perceives relevance and acts. This preserves human agency at the very first moment of the application lifecycle.

**GridLookout is a receiver, not an orchestrator.** It fires the `onFirstContact` callback with the raw Signal. It does not parse the manifest, does not instantiate the CPUX engine. The callback does all of that.

**The manifest is a standard IS Signal.** The backend's response is an IPTP Signal with Pulses — the same wire format used for every other communication in Intention Space.

### GridLookout's Role Boundary

GridLookout DOES: render the bare input cell, capture the address, send the First Contact Signal, fire onFirstContact with the raw response.

GridLookout does NOT: parse the manifest, instantiate CPUX or ICs, know which bridge transport to use, manage sessions.

### Platform-Specific First Contact Channels

| Platform | First Contact Channel |
|---|---|
| Browser | WebSocket to backend URL |
| Android | Intent broadcast or bound Service |
| iOS | URL scheme, Universal Link, or push notification |
| Desktop | Named pipe, local socket, or IPC |
| Embedded | Serial/UART (IPTP-Pipe) or TCP socket |

---

## 5. The App Manifest — One File, Complete Definition

The app manifest is a single JSON document sent by the backend during First Contact. It has two sections:

**`scene`** — GridLookout's domain. Describes what the human sees: sections, cells, types, pulse bindings, receptor ICs, subscriptions, theme.

**`cpux`** — The CPUX engine's domain. Describes computation structure: signal templates, IC sequence, trigger signal, DN references, business data.

DN implementations are code, registered in the engine's DN registry by name. The manifest references them as strings (`"dn": "DN_cart"`); the engine looks up the implementation. **Structure is data. Computation is code.**

---

## 6. The Client-Side Architecture

With First Contact complete, the client device has three running layers connected by the IS Bridge:

```
+----------------------------------------------------------+
|                     Client Device                         |
|                                                           |
|   Native GridLookout (always resident)                    |
|   Cells bound to Pulses | Captures input | Emits Signals  |
|                          |                                |
|              Intention Space Bridge (WS / HTTP / Mock)    |
|                          |                                |
|   CPUX Engine (built from manifest, client-local)         |
|   FieldBoard --> Fields --> ICs --> Visitor                |
|                          |                                |
|   DN Runtime Hosts (WASM | Go | Rust | Python | JS)      |
+----------------------------------------------------------+
         |                                       |
         |  First Contact (IPTP)                 |  Ongoing IPTP
         v                                       |  (optional)
+----------------------+                         |
|  Backend Server      | <-----------------------+
|  (remote)            |
+----------------------+
```

**Native GridLookout** — permanently resident. Renders cells, captures input. Initiated First Contact. Knows nothing about Fields, Visitors, or DNs.

**CPUX Engine** — client-local. Built from the manifest received via First Contact. Manages FieldBoard, Fields, ICs, Visitor. Knows nothing about pixels.

**Backend Server** — remote. Sent the app manifest. May continue participating via IPTP.

---

## 7. Inside the Intention Container

The IC anatomy is a quintuple: `O_holder -> DN -> S1 -> O_reflector -> S2`.

**O_holder** accumulates perceptions across activations. Response arrays grow bottom (oldest) to top (newest). Never computes.

**DN** is a stateless blackbox: `perform(Signal) -> Signal`. All context arrives via O_holder.

**O_reflector** reflects outward. Checks DAS match, applies optional RTM, emits `ic:pickup`.

---

## 8. The Visitor and Golden Pass

The Visitor walks the IC sequence, synctesting each IC against the Field. Backend mode: Golden Pass terminates. Frontend mode: Golden Pass sleeps, wakes when Field changes from human input.

---

## 9. Two Paths and the IC Direct Queue

**Direct UI path:** Cell sends Signal directly to receptor IC. No synctest. The human's perception is the authority.

**Visitor path:** Synctest against Field. Ordered cross-IC causality. Skips when IC is not Ready (retry on next pass).

When the human clicks rapidly, the IC handles the direct path differently from the Visitor path — because a human perception must never be silently dropped:

```
Ready   --> activate immediately
Pickup  --> DN done, ic:pickup already fired. Self-confirm, activate immediately.
Busy    --> queue internally (FIFO). Drain on reaching Pickup.
Stopped --> reject
```

The queue is transient, owned by the IC. Queued actions chain within the activate() promise so awaitPending() covers the full sequence. O_holder's persistence captures every processed action — the queue itself needs no persistence.

---

## 10. Perception Modes

Four modes carried as a distinguished Pulse `_perception_mode`:

**Act** — append to O_holder. DN receives accumulated state plus new action.

**Resume** — replay O_holder from persistence. DN receives prior state. Used after page refresh, app backgrounding, crash recovery.

**Reset** — purge O_holder. DN receives empty state. Used for "clear cart", "cancel form".

**Commit** — freeze O_holder. DN receives frozen state. Used for "place order". No further appends until reset.

---

## 11. GridLookout Contract

GridLookout is a rendering contract, not a library. Every piece of UI is a **Cell** bound to a Pulse. Three-level subscription filtering (IC id, Intention id, Pulse phrase) ensures cells react only to relevant updates. The IS Bridge connects GridLookout to the CPUX Engine via pluggable transport.

---

## 12. Cross-Platform Portability

The same app manifest runs on any platform. GridLookout is native to each. The IS Bridge wire format is identical everywhere. Replace any layer without touching the others.

---

## 13. The Complete Lifecycle

```
Phase 1 -- Bare GridLookout (always resident)
  |  Human types backend address, presses Go
  v
Phase 2 -- First Contact
  |  GridLookout sends IPTP Signal to backend
  |  Backend responds with combined app manifest
  |  GridLookout fires onFirstContact(signal)
  v
Phase 3 -- App Bootstrap (callback, not GridLookout)
  |  Parse manifest --> scene + cpux config
  |  SceneRenderer loads scene --> cells registered
  |  CPUX engine instantiated from manifest
  |  Bridge connected --> gl:init-cpux --> gl:register-cells
  v
Phase 4 -- Running App
  |  CPUX starts --> Visitor runs --> Golden Pass --> sleeps
  |  Human perceives --> acts --> cell action --> bridge
  |  --> IC activates (queues if busy) --> DN computes
  |  --> O_reflector reflects --> ic:pickup
  |  --> cells update + Field absorbs
  |  --> Visitor wakes --> cross-IC causality --> Golden Pass
  v
Phase 5 -- Perception Lifecycle
  |  Page refresh  --> resume (O_holder replays)
  |  Clear cart    --> reset (O_holder purges)
  |  Place order   --> commit (O_holder freezes)
  |  Platform exit --> IC.awaitPending() flushes all
```

---

## 14. Architectural Invariants

| Invariant | Enforcement |
|---|---|
| DN is language-agnostic | `execute(Signal) -> Signal` contract only |
| DN is stateless | All context via O_holder; DN never holds accumulated state |
| IC dual-Object anatomy | O_holder + DN + O_reflector; two separate persistence streams |
| O_holder accumulates only | Bottom to top; never computes, never transforms |
| O_reflector reflects only | Resets after pickup confirmation |
| No DN-to-DN direct call | All coordination through Field / ICC / Visitor |
| No GridLookout-to-DN direct call | All routing through ICC receptor designation |
| Direct UI bypasses synctest | Human perception IS the authority |
| Direct UI never drops perception | Ready: activate; Pickup: self-confirm + activate; Busy: queue internally |
| IC owns its direct queue | FIFO, transient, chained within activate() promise |
| Pickup enables immediate reuse | IC self-confirms without waiting for Field's confirmPickup() |
| ic:pickup has dual consumers | Cells and Field consume independently; neither blocks the other |
| Perception mode is universal | Standard Pulse; applies to UI, backend, and cross-system Signals |
| Commit orthogonal to Release | Commit freezes O_holder; Release propagates to parent Field |
| GridLookout is receiver only | Fires onFirstContact; does not parse manifest or instantiate CPUX |
| Human initiates First Contact | Bare GridLookout's input cell is the first perceptual act |
| Manifest is a standard Signal | IPTP Signal with Pulses; same wire format as all other communication |
| Structure is data, computation is code | Manifest defines signals, ICs, trigger; DN implementations are registered code |

---

## 15. The UI as Mirror

In a traditional application, the UI is a co-processor — it validates, reformats, fetches, and caches behind the human's back.

In a Perceptive App, the UI is a **mirror**. It shows what the human sees. It records what the human does. It emits what the human intends. It changes only in ways visible to the human.

And it begins with the simplest possible perceptual act: a human typing an address into a bare input field, expressing the intention to connect. From that single perception, the entire application comes into being — scene rendered, CPUX running, Visitor walking, Objects reflecting, Fields accumulating. All from a Signal.

The human remains the author of every intention — including the first one.

---

*Intention Space Framework — Keybyte Systems, Melbourne*
*Research Lead: Pronab Pal — AusIndustry Grant IR2405165*
