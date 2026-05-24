---
title: Runnable Samples And SDK Boundary
order: 2
description: How readers can run and modify CPUX samples using the iscore-cpux-platform-reference package while keeping CPUX engine internals proprietary.
---

# Runnable Samples And SDK Boundary

The runnable samples should be based on the tested reference package:

```text
X-PLATFORM-CPUX_abacus/iscore-cpux-platform-reference
```

This package contains the public platform reference for:

- CPUX runtime binary builds
- browser interaction harness
- React GridLookout sample
- Android GridLookout surface module
- shared CPUX manifest
- smoke tests for CPUX/UI conventions

The book can document how to run and modify these samples without exposing proprietary CPUX engine internals.

---

## Download Boundary

When the reference package is published, replace this placeholder with the real download link:

```text
SDK/runtime download: ISCORE_CPUX_PLATFORM_REFERENCE_DOWNLOAD_URL
```

The published package should include:

- public SDK/bridge code
- runnable React sample
- Android GridLookout surface package or module
- shared sample manifests
- CPUX runtime binary or binary builder
- harness and smoke-test scripts

It should not expose private CPUX engine source beyond what is intentionally shipped in the reference package.

---

## Local Reference Layout

The tested local reference currently has this shape:

```text
iscore-cpux-platform-reference/
  README.md
  runtime/iscore-runner/
  dist/iscore-cpux-server/
  harness/
  react-pulse-cpux-app-v0_3/
  android/
  platform/shared/cpux-app-manifest.json
  scripts/
```

Important public surfaces:

```text
harness/                         browser/test harness
react-pulse-cpux-app-v0_3/        React GridLookout sample
android/                          Android GridLookout material
platform/shared/cpux-app-manifest.json
scripts/03-smoke-test.sh          semantic smoke test
```

---

## Build Runtime Binaries

From the reference package root:

```bash
./scripts/01-build-runtimes.sh
```

For faster local testing on one platform:

```bash
TARGETS=darwin/arm64 ./scripts/01-build-runtimes.sh
```

The runtime binary is written under:

```text
dist/iscore-cpux-server/<version>/<platform>/iscore-cpux-server
```

The binary is the runtime boundary for readers. They can run samples against it without needing to understand or modify the proprietary engine internals.

---

## Run The Browser Harness

The harness makes CPUX interaction timing visible.

From the reference package root:

```bash
./scripts/02-run-harness.sh
```

Open:

```text
http://127.0.0.1:5177
```

The harness demonstrates:

- runtime/session setup
- Signal in from UI
- same-request/direct IC result
- Field absorption
- Visitor pass
- reflected pulse updates
- cross-IC subscription
- polling delivery checks

---

## Run The Semantic Smoke Test

From the reference package root:

```bash
./scripts/03-smoke-test.sh
```

The smoke test checks CPUX conventions, not just server startup.

It verifies:

- `/health`
- `/manifest`
- `/init-cpux`
- `/register-cells`
- `/cell-action`
- `cpux:action-result`
- direct IC reflector feedback
- `/poll-updates`
- same-IC and cross-IC reflected pulse updates

This is the public confidence boundary for the runtime behaviour.

---

## Run The React GridLookout Sample

The React sample lives at:

```text
react-pulse-cpux-app-v0_3/
```

Bundled mode lets IS-Core serve both React static files and CPUX API endpoints:

```bash
cd react-pulse-cpux-app-v0_3
./build_for_iscore.sh
ISCORE_BIN=/path/to/iscore-cpux-server ./start_iscore_bundled.sh
```

Open:

```text
http://127.0.0.1:3000
```

Dev mode uses Vite plus IS-Core:

```bash
./start_iscore_dev.sh
```

In another terminal:

```bash
npm install
npm run dev
```

Open the Vite URL, usually:

```text
http://localhost:5173
```

---

## Android GridLookout Reference

The Android material lives under:

```text
android/
```

The Android surface module and manifests demonstrate how a native GridLookout platform can use the same CPUX contract.

The shared manifest source of truth is:

```text
platform/shared/cpux-app-manifest.json
```

Platform copies include:

```text
react-pulse-cpux-app-v0_3/public/cpux-app-manifest.json
android/todo-shared-manifest.json
```

The Android GridLookout implementation should remain native while obeying CPUX/UI conventions:

- Cell identity
- Pulse binding
- receptor IC binding
- action Signal construction
- `_perception_mode`
- direct result handling
- subscription filtering
- lifecycle flush hooks
- native rendering responsibilities

---

## How Readers Can Modify Samples

Readers should modify:

- `platform/shared/cpux-app-manifest.json`
- React GridLookout components
- Android GridLookout surface behaviour
- manifest-declared DN adapter entries
- sample Pulse phrases
- sample Intention IDs
- response-level tests

Readers should not need to modify:

- private Visitor internals
- private FieldBoard runtime internals
- private Field absorption internals
- CPUX scheduling/concurrency implementation

The reference package should keep this boundary clear.

---

## Development Loop

The platform reference already supports a cross-platform development loop:

```bash
scripts/dev-loop.sh test-iscore
scripts/dev-loop.sh test-react
scripts/dev-loop.sh test-android
```

When modifying the shared manifest:

```bash
scripts/dev-loop.sh sync
scripts/dev-loop.sh test-android
scripts/dev-loop.sh test-react
```

This expresses the key CPUX platform idea:

> the same manifest and Signal contract can drive multiple native GridLookout surfaces.

