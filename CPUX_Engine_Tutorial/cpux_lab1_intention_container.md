# Lab 1 — One Intention Container Only

## Mastering CPUX from the smallest executable unit

This lab introduces the smallest working unit of CPUX:

```text
Signal → O_holder → DN → O_reflector → Pickup
```

For this first lab, we deliberately ignore the full CPUX sequence, Visitor, Field synctest, and Golden Pass.

The goal is simple:

> Understand how one Intention Container receives a Signal, accumulates perception, runs a DN, validates the DN output, and places the certified result in Pickup.

---

## 1. Why start with one Intention Container?

Students often meet CPUX as a full runtime system:

```text
FieldBoard → CPUX → Field → Visitor → IC sequence → Pickup queue → GridLookout
```

That is too much at once.

The Intention Container is the right starting point because it contains the core operational idea:

```text
incoming perception
    ↓
held by O_holder
    ↓
processed by DN
    ↓
certified by O_reflector
    ↓
offered as Pickup
```

The IC is where a single act becomes a certified contribution to Intention Space.

---

## 2. The four parts of an IC

### 2.1 Signal

A Signal is an Intention carrying Pulses.

Example:

```json
{
  "intentionId": "I_cart_action",
  "pulses": [
    {
      "phrase": "cart_command",
      "tv": "Y",
      "responses": ["add:P001"]
    },
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "responses": ["act"]
    }
  ]
}
```

This says:

```text
The intention is cart action.
The perceived command is add:P001.
The mode is act.
```

The Signal is not just data. It is identified communication.

---

### 2.2 O_holder

O_holder is the accumulator.

It receives the incoming Signal and updates the perception history.

For this lab, we support only one perception mode:

```text
act
```

So O_holder appends the incoming Pulse responses.

Example:

```text
Input 1: cart_command = add:P001
Input 2: cart_command = add:P002

O_holder accumulated state:
cart_command = [add:P001, add:P002]
```

Important rule:

```text
O_holder does not compute.
O_holder only accumulates.
```

It does not calculate cart totals. It does not validate products. It only preserves the history of perception.

---

### 2.3 DN

DN means Design Node.

The DN is the blackbox computation unit.

It receives the enriched Signal from O_holder and emits a result Signal.

Example:

```text
input:
cart_command = [add:P001, add:P002]

DN emits:
cart_count = 2
cart_items = P001,P002
```

Important rule:

```text
DN is stateless.
All context must arrive through the enriched Signal.
```

This rule is essential. It makes the DN portable across frontend, backend, native, server, and test environments.

---

### 2.4 O_reflector

O_reflector receives the DN result.

It does **not** blindly write to Field.

It first checks whether the DN emitted the signal the designer expected.

This is the runtime conformance check.

```text
Actual DN output matches designated output?
```

If yes:

```text
certify result
place in Pickup
```

If no:

```text
do not release to Field
create error signal
release error toward FieldBoard/system handling
```

This is a subtle but powerful CPUX idea.

The DN is blackbox. Therefore the reflector is the design boundary.

```text
DN emits candidate signal.
O_reflector certifies signal.
Only certified signal may become Pickup.
```

---

## 3. What is Pickup?

Pickup is the completed output of an IC.

It is not yet Field state.

It is a handover point.

```text
DN completed.
O_reflector certified.
Signal is ready for the outside world.
```

In full CPUX, the Field pickup queue later absorbs this pickup into FIS/FPS in a controlled order.

In this lab, we simply print the pickup.

---

## 4. Why not write directly into Field?

Even in Lab 1, students should learn the invariant:

```text
DN never writes to Field.
O_reflector never directly mutates Field.
```

There are two reasons.

### Reason 1 — ordering

In a full CPUX, many ICs may finish around the same time.

The Field must serialize pickup absorption.

```text
IC_A pickup
IC_B pickup
IC_C pickup
```

Field decides the ordered absorption.

### Reason 2 — certification

O_reflector must first check whether the DN emitted the correct designated Signal.

Bad output must not contaminate the Field.

```text
wrong intention
missing pulse
wrong pulse TV
unexpected result shape
```

These should become error Signals, not Field state.

---

## 5. Lab goal

We will build a small Go program where:

1. A Signal enters an IC.
2. O_holder accumulates it.
3. A DN goroutine computes a result.
4. O_reflector validates the result.
5. The result is placed into a Pickup channel.
6. The main routine receives and prints the pickup.

This lab uses goroutines because a DN may be asynchronous in real CPUX.

---

## 6. Create the lab folder

From any workspace:

```bash
mkdir -p cpux-lab1
cd cpux-lab1
go mod init cpux-lab1
touch main.go
```

---

## 7. Full Go code

Paste this into `main.go`.

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"
)

type TV string

const (
	Y  TV = "Y"
	N  TV = "N"
	UN TV = "UN"
)

type Pulse struct {
	Phrase    string
	TV        TV
	Responses []string
}

type Signal struct {
	IntentionID string
	Pulses      []Pulse
}

func (s Signal) GetPulse(phrase string) (Pulse, bool) {
	for _, p := range s.Pulses {
		if p.Phrase == phrase {
			return p, true
		}
	}
	return Pulse{}, false
}

func (s Signal) HasPulseShape(phrase string, tv TV) bool {
	p, ok := s.GetPulse(phrase)
	return ok && p.TV == tv
}

func printSignal(label string, s Signal) {
	fmt.Println(label)
	fmt.Println("  intention:", s.IntentionID)
	for _, p := range s.Pulses {
		fmt.Printf("  pulse: %-18s tv=%s responses=%v\n", p.Phrase, p.TV, p.Responses)
	}
}

type Holder struct {
	accumulated map[string]Pulse
}

func NewHolder() *Holder {
	return &Holder{accumulated: map[string]Pulse{}}
}

func (h *Holder) Append(input Signal) {
	for _, p := range input.Pulses {
		if p.Phrase == "_perception_mode" {
			continue
		}

		existing, ok := h.accumulated[p.Phrase]
		if !ok {
			h.accumulated[p.Phrase] = p
			continue
		}

		existing.Responses = append(existing.Responses, p.Responses...)
		existing.TV = p.TV
		h.accumulated[p.Phrase] = existing
	}
}

func (h *Holder) BuildAccumulatedSignal(intentionID string, current Signal) Signal {
	pulses := make([]Pulse, 0, len(h.accumulated)+1)

	for _, p := range h.accumulated {
		pulses = append(pulses, p)
	}

	if mode, ok := current.GetPulse("_perception_mode"); ok {
		pulses = append(pulses, mode)
	} else {
		pulses = append(pulses, Pulse{Phrase: "_perception_mode", TV: Y, Responses: []string{"act"}})
	}

	return Signal{IntentionID: intentionID, Pulses: pulses}
}

type DN interface {
	Execute(ctx context.Context, input Signal) (Signal, error)
}

type CartDN struct{}

func (d CartDN) Execute(ctx context.Context, input Signal) (Signal, error) {
	select {
	case <-time.After(150 * time.Millisecond):
	case <-ctx.Done():
		return Signal{}, ctx.Err()
	}

	commandPulse, ok := input.GetPulse("cart_command")
	if !ok {
		return Signal{}, errors.New("missing cart_command")
	}

	items := []string{}
	for _, command := range commandPulse.Responses {
		if strings.HasPrefix(command, "add:") {
			items = append(items, strings.TrimPrefix(command, "add:"))
		}
	}

	return Signal{
		IntentionID: "I_cart_computed",
		Pulses: []Pulse{
			{Phrase: "cart_count", TV: N, Responses: []string{fmt.Sprintf("%d", len(items))}},
			{Phrase: "cart_items", TV: UN, Responses: []string{strings.Join(items, ",")}},
		},
	}, nil
}

type Reflector struct {
	DesignatedOutput Signal
}

func (r Reflector) Certify(actual Signal) error {
	if actual.IntentionID != r.DesignatedOutput.IntentionID {
		return fmt.Errorf("intention mismatch: expected %s got %s", r.DesignatedOutput.IntentionID, actual.IntentionID)
	}

	for _, expected := range r.DesignatedOutput.Pulses {
		if !actual.HasPulseShape(expected.Phrase, expected.TV) {
			return fmt.Errorf("pulse mismatch: expected phrase=%s tv=%s", expected.Phrase, expected.TV)
		}
	}

	return nil
}

func (r Reflector) Reflect(actual Signal) (Signal, error) {
	if err := r.Certify(actual); err != nil {
		return Signal{
			IntentionID: "I_system_error",
			Pulses: []Pulse{
				{Phrase: "dn_output_mismatch", TV: Y, Responses: []string{err.Error()}},
			},
		}, err
	}

	return actual, nil
}

type Pickup struct {
	ICID   string
	Signal Signal
	Error  error
}

type IntentionContainer struct {
	ID        string
	Holder    *Holder
	DN        DN
	Reflector Reflector
	PickupCh  chan Pickup
}

func (ic *IntentionContainer) Activate(ctx context.Context, input Signal) {
	go func() {
		fmt.Println("\nIC activated:", ic.ID)
		printSignal("incoming signal", input)

		ic.Holder.Append(input)

		enriched := ic.Holder.BuildAccumulatedSignal(input.IntentionID, input)
		printSignal("enriched signal to DN", enriched)

		actual, err := ic.DN.Execute(ctx, enriched)
		if err != nil {
			ic.PickupCh <- Pickup{
				ICID: ic.ID,
				Signal: Signal{
					IntentionID: "I_system_error",
					Pulses: []Pulse{{Phrase: "dn_execution_error", TV: Y, Responses: []string{err.Error()}}},
				},
				Error: err,
			}
			return
		}

		printSignal("actual DN output", actual)

		released, reflectErr := ic.Reflector.Reflect(actual)
		if reflectErr != nil {
			fmt.Println("reflector rejected DN output:", reflectErr)
		} else {
			fmt.Println("reflector certified DN output")
		}

		ic.PickupCh <- Pickup{ICID: ic.ID, Signal: released, Error: reflectErr}
	}()
}

func main() {
	ctx := context.Background()

	designatedOutput := Signal{
		IntentionID: "I_cart_computed",
		Pulses: []Pulse{
			{Phrase: "cart_count", TV: N},
			{Phrase: "cart_items", TV: UN},
		},
	}

	pickupCh := make(chan Pickup, 1)

	ic := &IntentionContainer{
		ID:     "IC_cart",
		Holder: NewHolder(),
		DN:     CartDN{},
		Reflector: Reflector{
			DesignatedOutput: designatedOutput,
		},
		PickupCh: pickupCh,
	}

	input := Signal{
		IntentionID: "I_cart_action",
		Pulses: []Pulse{
			{Phrase: "cart_command", TV: Y, Responses: []string{"add:P001"}},
			{Phrase: "_perception_mode", TV: Y, Responses: []string{"act"}},
		},
	}

	ic.Activate(ctx, input)

	pickup := <-pickupCh

	fmt.Println("\n--- PICKUP RECEIVED ---")
	fmt.Println("from IC:", pickup.ICID)
	if pickup.Error != nil {
		fmt.Println("pickup kind: ERROR")
	} else {
		fmt.Println("pickup kind: CERTIFIED")
	}
	printSignal("pickup signal", pickup.Signal)
}
```

---

## 8. Run the lab

```bash
go run .
```

Expected shape of output:

```text
IC activated: IC_cart
incoming signal
  intention: I_cart_action
  pulse: cart_command       tv=Y responses=[add:P001]
  pulse: _perception_mode   tv=Y responses=[act]

enriched signal to DN
  intention: I_cart_action
  pulse: cart_command       tv=Y responses=[add:P001]
  pulse: _perception_mode   tv=Y responses=[act]

actual DN output
  intention: I_cart_computed
  pulse: cart_count         tv=N responses=[1]
  pulse: cart_items         tv=UN responses=[P001]

reflector certified DN output

--- PICKUP RECEIVED ---
from IC: IC_cart
pickup kind: CERTIFIED
pickup signal
  intention: I_cart_computed
  pulse: cart_count         tv=N responses=[1]
  pulse: cart_items         tv=UN responses=[P001]
```

---

## 9. Student exercise 1 — prove O_holder accumulation

Change `main()` to activate twice.

After receiving the first pickup, send a second input:

```go
secondInput := Signal{
	IntentionID: "I_cart_action",
	Pulses: []Pulse{
		{Phrase: "cart_command", TV: Y, Responses: []string{"add:P002"}},
		{Phrase: "_perception_mode", TV: Y, Responses: []string{"act"}},
	},
}

ic.Activate(ctx, secondInput)
pickup = <-pickupCh
printSignal("second pickup", pickup.Signal)
```

Expected second result:

```text
cart_count = 2
cart_items = P001,P002
```

This proves:

```text
DN did not remember P001.
O_holder remembered P001.
DN received P001 and P002 through enriched input.
```

---

## 10. Student exercise 2 — force a reflector mismatch

Change the DN output intention from:

```go
IntentionID: "I_cart_computed",
```

to:

```go
IntentionID: "I_wrong_output",
```

Run again.

Expected result:

```text
reflector rejected DN output
pickup kind: ERROR
pickup signal intention: I_system_error
pulse: dn_output_mismatch
```

This proves:

```text
O_reflector certifies DN output.
Wrong DN output does not become normal pickup.
```

---

## 11. Student exercise 3 — force a missing pulse

Remove this pulse from `CartDN.Execute()`:

```go
{Phrase: "cart_items", TV: UN, Responses: []string{strings.Join(items, ",")}},
```

Run again.

Expected result:

```text
pulse mismatch: expected phrase=cart_items tv=UN
```

This proves:

```text
Designated output is not only about intention.
It also includes required pulse shape.
```

---

## 12. Student exercise 4 — observe goroutine behavior

Increase the DN delay:

```go
time.After(2 * time.Second)
```

Add this immediately after `ic.Activate(ctx, input)`:

```go
fmt.Println("main is free while DN runs...")
```

Expected behavior:

```text
main is free while DN runs...
```

then later:

```text
actual DN output
reflector certified DN output
```

This proves:

```text
DN execution can be asynchronous.
Pickup is the point where async result becomes available.
```

---

## 13. What this lab does not yet include

This lab intentionally does not include:

```text
Field
FIS/FPS
Visitor
Synctest
Pull/copy extraction
Golden Pass
Direct UI queue
FieldBoard release rules
```

Those are introduced later.

For Lab 1, the only mastery target is:

```text
Signal enters IC.
O_holder accumulates.
DN computes.
O_reflector certifies.
Pickup is produced.
```

---

## 14. Key memory sentence

Students should memorize this:

```text
A DN emits only a candidate result; O_reflector certifies it; Pickup is the certified handover point.
```

This is the first CPUX mastery step.

---

## 15. Checkpoint questions

1. Why should DN not write directly into Field?
2. What does O_holder do that DN must not do?
3. Why is the DN called stateless?
4. What does O_reflector check?
5. What happens when DN emits the wrong intention?
6. Why is Pickup not the same as Field state?
7. Why do we use a goroutine in this lab?
8. Which part of this lab becomes the Field pickup queue in full CPUX?

A student who can answer these questions is ready for Lab 2.
