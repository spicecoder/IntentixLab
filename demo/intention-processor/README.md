# Intention Processor Demo

This demo accompanies **Episode 1: Introduction to Intention Space**.

It shows a small Intention Processor workflow:

```text
Incoming Signal + Outgoing Signal + common specification
        ↓
Intention Processor
        ↓
LLM or deterministic fallback
        ↓
Generated Design Node
        ↓
Intention Container runtime
```

The central idea is simple: **bound the intention first**. The LLM is not asked to invent the whole application. It is given a designated input Signal, a designated output Signal, and a common inference specification. Its freedom is limited to generating the internal algorithm of one Design Node.

## What Is Included

- `specs/login` - Signal pair and specification for a login Design Node.
- `specs/histogram` - Signal pair and specification for a histogram Design Node.
- `src/IntentionProcessor.js` - design-time generator for DNs.
- `src/IntentionContainer.js` - runtime host that invokes a DN with Signals.
- `src/llm.js` - provider adapter for local Ollama or OpenAI.
- `src/fallback-dns.js` - deterministic human-authored fallback DNs.
- `generated/dns` - sample generated DNs used by the runtime demo.

## Requirements

- Node.js 20 or later.
- Optional local Ollama if you want local LLM generation.
- Optional OpenAI API key if you want cloud LLM generation.

No npm dependencies are required for the core demo.

## Quick Start

```bash
cd demo/intention-processor
npm run generate:login
npm run test:login
npm run generate:histogram
npm run test:histogram
npm run compose:authenticated-histogram
```

By default the demo tries local Ollama:

```bash
ollama pull gemma4
npm run generate:login
```

If Ollama is unavailable or slow, generation falls back to deterministic DN source so the demo can still run.

## Try With OpenAI

```bash
cp .env.example .env
```

Edit `.env`:

```text
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
```

Then run:

```bash
npm run generate:login
npm run test:login
```

The API key is read locally from `.env`, which is ignored by Git.

## Run Without Any LLM

The fallback path is included deliberately:

```bash
npm run generate:login:offline
npm run test:login
npm run generate:histogram:offline
npm run test:histogram
```

The fallback is **not required** for the Intention Processor concept. It is included to show that the role can be fulfilled by either a human-authored implementation or an LLM-generated implementation. In both cases, the bounded Signal pair and common specification define the Design Node boundary.

## Demo Commands

```bash
npm run check:ollama
npm run generate:login
npm run test:login
npm run generate:histogram
npm run test:histogram
npm run compose:authenticated-histogram
npm run demo:recording
```

## Expected Flow

### Login

```text
S_login_attempt → DN_Login → S_user_authenticated
```

The login DN reads `username` and `password` pulses, then emits an authenticated user Signal.

### Histogram

```text
S_generate_histogram → DN_Histogram → S_histogram_generated
```

The histogram DN reads numeric data pulses and emits an SVG histogram plus a summary pulse.

### Composition

```text
DN_Login
  ↓
S_user_authenticated
  +
S_generate_histogram
  ↓
DN_Histogram
  ↓
S_histogram_generated
```

Composition happens through Signals, not by coupling the two DNs directly.

## Public Repo Note

This directory is intended to be safe for a public GitHub repository:

- no real API keys are included;
- `.env` is ignored;
- sample credentials are demo data only;
- generated DNs are small examples, not production security code.

For a real application, replace the sample Signals and validation rules with your own bounded Signal contracts.
