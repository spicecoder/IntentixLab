---
title: Response Array
order: 4
description: Response arrays as the value and history area of Pulses, especially within O_holder accumulation.
---

# Response Array

The Response area of a Pulse carries associated values.

In many examples it appears as an array:

```text
<phrase, TV, ["value1", "value2"]>
```

This array form is useful because a Perceptive App often needs to preserve not only the latest value, but also the history of perception.

---

## Simple Response

A simple Pulse may carry one value:

```text
<"username", Y, ["alice"]>
```

The Response tells the system what value belongs to the represented perception.

---

## Accumulated Response

When O_holder accumulates perceptions across activations, a Pulse may gather multiple values:

```text
<"cart item selected", Y, ["P001", "P003", "P007"]>
```

The order matters.

The response array can preserve the temporal shape of human action:

```text
oldest -> newest
```

This allows a Design Node to receive context without maintaining hidden state inside itself.

---

## Response Is Not Secret Computation

The Response should not become a place where hidden logic is smuggled into the system.

Objects should not arbitrarily compute new response values. UI components should not silently rewrite human-entered values. If a value must be transformed, a Design Node should do it explicitly and emit a new Signal.

This keeps the path of understanding visible.

---

## Human Meaning

The Response area is where lived action often becomes concrete:

- a typed name
- a selected item
- a pressed command
- a sensor reading
- a confirmation value
- a returned system result

It carries the material trace of perception.

---

## Developer Rule

Use Response arrays to preserve meaningful sequence, not to hide unstructured state.

If the Response starts carrying too many unrelated meanings, define clearer Pulses.

