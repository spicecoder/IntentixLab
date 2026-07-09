Generate a Node.js Design Node that authenticates a demo user.

Rules:
- Accept username and password from the incoming Signal Pulses.
- If username is `pronab` and password is `intentix`, emit authenticated = true.
- Otherwise emit authenticated = false.
- Always emit a user_message Pulse.
- Return exactly the designated outgoing Signal shape.
