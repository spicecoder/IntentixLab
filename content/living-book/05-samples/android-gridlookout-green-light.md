---
title: Android GridLookout Green Light
order: 4
description: An Android-facing sample showing native GridLookout Signal construction without exposing CPUX engine internals.
---

# Android GridLookout Green Light

This sample mirrors the React Green Light example from a native Android perspective.

It keeps the CPUX engine proprietary and shows only the app-facing contract.

For runnable Android reference instructions, use [Runnable Samples And SDK Boundary](/living-book/05-samples/runnable-samples-sdk-boundary.html). The tested Android material lives in:

```text
iscore-cpux-platform-reference/android
```

---

## Cell Model Sketch

An Android GridLookout Cell can be represented as a native model:

```kotlin
data class GridCellConfig(
    val cellId: String,
    val pulsePhrase: String,
    val cpuxId: String,
    val receptorIcId: String,
    val actionIntentionId: String
)
```

Example:

```kotlin
val lightCell = GridCellConfig(
    cellId = "light_control",
    pulsePhrase = "current light",
    cpuxId = "CPUX_green_light",
    receptorIcId = "IC_move_if_allowed",
    actionIntentionId = "I_move_if_allowed"
)
```

---

## Signal Construction

```kotlin
val signal = Signal(
    intention = Intention(id = "I_move_if_allowed"),
    pulses = listOf(
        Pulse("current light", "Y", listOf("green")),
        Pulse("current position", "Y", listOf(currentPosition.toString())),
        Pulse("_perception_mode", "Y", listOf("act"))
    )
)
```

These classes are illustrative public models. A production Android SDK may provide its own exact types.

---

## Sending To CPUX

```kotlin
val result = cpuxClient.sendCellAction(
    cpuxId = "CPUX_green_light",
    icId = "IC_move_if_allowed",
    signal = signal
)

val reflectedPosition = result.directResult
    .pulse("current position")
    ?.response
    ?.firstOrNull()
```

The app receives the direct result from the receptor IC.

The Field and Visitor continue their own runtime behaviour behind this human-facing response.

---

## Android Lifecycle

Because frontend CPUX is a client-side runtime engine, Android lifecycle matters.

On pause or stop, the app should allow pending IC writes to flush through the public runtime boundary:

```kotlin
override fun onPause() {
    super.onPause()
    cpuxClient.awaitPending()
}
```

The exact implementation belongs to the CPUX runtime or SDK.

The app-facing principle is stable:

```text
before client teardown, await pending IC/Object persistence
```

---

## Developer Rule

Android GridLookout should remain native.

The CPUX Signal contract should remain platform-neutral.
