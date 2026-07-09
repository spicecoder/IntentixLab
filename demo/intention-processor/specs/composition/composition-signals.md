# Composition Signal Boundary

This composition does not generate a new monolithic Design Node.
It demonstrates that two generated runtime agencies can be orchestrated through explicit Signals.

```text
S_login_attempt
  ↓
DN_Login
  ↓
S_user_authenticated

S_user_authenticated + S_generate_histogram
  ↓
DN_Histogram
  ↓
S_histogram_generated
```

The composition is possible because both generated Design Nodes expose explicit incoming and outgoing Signal boundaries.
