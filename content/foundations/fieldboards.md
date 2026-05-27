# FieldBoards

A FieldBoard is the runtime container that holds and manages CPUX Fields for a user, device, or session.

A CPUX creates a Field when it starts. That Field lives inside a FieldBoard.

The FieldBoard is wider than one CPUX. It allows multiple CPUX instances to exist, interact, and terminate under the same user/session runtime.

---

# FieldBoard, Field, and CPUX

In simple terms:

```text
FieldBoard = container of CPUX Fields
Field      = runtime context of one CPUX
CPUX       = Common Path of Understanding and Execution
```

A Field is local to one CPUX.

A FieldBoard manages the larger runtime environment in which CPUX Fields are created, activated, released, archived, or destroyed.

---

# Why FieldBoard Exists

Without FieldBoard, each CPUX Field would appear isolated.

But real perceptive applications often need one CPUX to lead into another.

Example:

```text
Login CPUX
  ↓ releases signal
Profile CPUX
  ↓ releases signal
Learning CPUX
```

The FieldBoard receives release Signals and decides whether they should trigger another CPUX.

---

# Core Responsibility

A FieldBoard is responsible for:

- holding active CPUX Fields,
- receiving release Signals from CPUX Fields,
- checking configured trigger rules,
- creating a new CPUX Field when a trigger matches,
- keeping active CPUX Fields available to the runtime,
- archiving or destroying completed CPUX Fields,
- and coordinating the hierarchy of runtime contexts.

---

# Trigger and Release Relationship

A CPUX may release a Signal.

That release Signal is absorbed by the surrounding FieldBoard.

The FieldBoard checks whether the released Signal matches a configured CPUX trigger.

If it matches, the FieldBoard creates a new CPUX instance and its Field.

```text
CPUX Field releases Signal
        ↓
FieldBoard receives Signal
        ↓
Trigger registry is checked
        ↓
Matching CPUX is created
        ↓
New Field is added to FieldBoard
```

---

# FieldBoard as User Runtime

In a client-side Perceptive App, the FieldBoard may be associated with:

- one user,
- one device,
- one app session,
- or one active perceptive surface.

The FieldBoard becomes the runtime place where the user’s active CPUX Fields live.

---

# Relation to GridLookout

GridLookout is the perceptual surface.

FieldBoard is the runtime container behind that surface.

GridLookout cells may send Signals into CPUX Intention Containers.

CPUX Fields may release Signals back into the FieldBoard.

The FieldBoard may then activate other CPUX paths.

---

# Important Distinction

A Field is not global.

A Field belongs to one CPUX.

The FieldBoard is the higher-level runtime structure that manages many Fields.

This distinction helps preserve deterministic CPUX execution while still allowing dynamic application behavior.

---

# Summary

```text
Signal triggers CPUX
CPUX creates Field
Field lives in FieldBoard
Field releases Signal
FieldBoard may trigger another CPUX
```

A FieldBoard therefore gives Intention Space a disciplined way to create and destroy contextual execution paths without making the runtime uncontrolled.
