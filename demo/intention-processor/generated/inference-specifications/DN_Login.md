# Inference Specification: DN_Login

You are composing a Design Node for Intention Space.

A Design Node is a bounded computational agency. It receives exactly one Signal and emits exactly one Signal.

The inference boundary is determined entirely by the designated incoming Signal and designated outgoing Signal.

You are not permitted to invent additional semantic interfaces.

Your responsibility is to infer only the algorithm that transforms one bounded situational reality into the other.

## Target Runtime

Node.js, ES module.

## Required Export

Return only JavaScript source code. Do not include markdown fences.

The module must export:

async function perform(signal) { ... }

## Scenario

Generate a Node.js Design Node that authenticates a demo user.

Rules:
- Accept username and password from the incoming Signal Pulses.
- If username is `pronab` and password is `intentix`, emit authenticated = true.
- Otherwise emit authenticated = false.
- Always emit a user_message Pulse.
- Return exactly the designated outgoing Signal shape.

## Designated Incoming Signal

```json
{
  "signalId": "S_login_attempt",
  "intentionId": "I_authenticate_user",
  "pulses": [
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "responses": [
        "act"
      ]
    },
    {
      "phrase": "username",
      "tv": "Y",
      "responses": [
        "pronab"
      ]
    },
    {
      "phrase": "password",
      "tv": "Y",
      "responses": [
        "intentix"
      ]
    }
  ]
}
```

## Designated Outgoing Signal

```json
{
  "signalId": "S_user_authenticated",
  "intentionId": "I_user_authenticated",
  "pulses": [
    {
      "phrase": "authenticated",
      "tv": "N",
      "responses": []
    },
    {
      "phrase": "user_id",
      "tv": "N",
      "responses": []
    },
    {
      "phrase": "user_message",
      "tv": "N",
      "responses": []
    }
  ]
}
```

## Hard Requirements

1. Export exactly an async function named perform.
2. Accept one argument named signal.
3. Return a Signal object.
4. Return signalId: S_user_authenticated
5. Return intentionId: I_user_authenticated
6. Include all required outgoing pulses.
7. Do not import external npm packages.
8. Keep code deterministic and small.
