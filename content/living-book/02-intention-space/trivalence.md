---
title: Trivalence
order: 3
description: Trivalence as the Y, N, and UN perceptual status carried by Pulses.
---

# Trivalence

Trivalence is the three-valued status used by Pulses:

```text
Y | N | UN
```

It lets a CPUX system represent more than ordinary yes-or-no state.

Human situations often contain uncertainty, partial relevance, and unresolved conditions. Trivalence gives that uncertainty a simple formal place.

---

## Y

`Y` means the Pulse is affirmed within the current situation.

Examples:

```text
<"username entered", Y, ["alice"]>
<"submit clicked", Y, []>
<"human confirmed", Y, ["commit"]>
```

This does not always mean globally true. It means affirmed inside the relevant situational field.

---

## N

`N` means the Pulse is negated, fixed as unavailable, or system-determined as not holding within the situation.

Examples:

```text
<"credentials valid", N, ["false"]>
<"payment authorised", N, ["declined"]>
<"door locked", N, ["open"]>
```

The exact meaning depends on the phrase and Intention.

---

## UN

`UN` means unresolved.

Examples:

```text
<"credentials valid", UN, []>
<"shipping address confirmed", UN, []>
<"human ready to commit", UN, []>
```

`UN` is important because software often forces unresolved situations into premature boolean states. CPUX gives uncertainty a legitimate place in execution.

---

## Trivalence And Stabilisation

Stabilisation does not require every Pulse to become `Y`.

It requires the situation to become coherent enough for the next action.

For one Design Node, this may mean:

```text
"username entered" = Y
"password entered" = Y
"credentials valid" = UN
```

For another, it may mean:

```text
"credentials valid" = N
"retry allowed" = Y
```

Trivalence helps the Field express where the situation stands without hiding uncertainty.

---

## Developer Rule

Do not treat `UN` as an error by default.

Sometimes `UN` is exactly the right representation of the current human or system situation.

