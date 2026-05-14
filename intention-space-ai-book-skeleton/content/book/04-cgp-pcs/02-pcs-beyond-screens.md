---
title: PCS Beyond Screens
order: 2
description: How Perceptual Coordinate Space extends CGP beyond display layout into music, gesture, and other domains.
---

# PCS Beyond Screens

Perceptual Coordinate Space extends the CGP idea beyond screens.

CGP uses rows and columns to place a Pulse in a visual viewport. PCS asks whether other domains also need normalized perceptual coordinates.

## Music example

A musical note may be represented not only by frequency and duration, but also by instrument-relative gesture:

```json
{
  "instrument": "piano",
  "hz": 7,
  "vz": 2,
  "t": "0.5 beat"
}
```

Here:

- `instrument` identifies the physical playing context
- `hz` is a horizontal zone
- `vz` is a vertical zone
- `t` is the time span

The same perceptual movement may map differently on piano, flute, or guitar. PCS gives a way to discuss the relation without reducing it only to frequency.

## The broader idea

PCS is a domain-relative coordinate language for perception.

It may apply to:

- screen layout
- music gesture
- geometry diagrams
- body movement
- robotics
- investigative reasoning

The common idea is that perception needs placement before action becomes meaningful.
