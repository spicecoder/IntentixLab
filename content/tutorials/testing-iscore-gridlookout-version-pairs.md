---
title: Testing IS-Core and GridLookout Version Pairs
subtitle: A practical test loop for Go ISCore, React GridLookout, and Android GridLookout
description: "How to test a shared CPUX manifest across the Go ISCore server, React GridLookout, and Android GridLookout bridge contract without letting platform copies drift."
order: 3
---

# Testing IS-Core and GridLookout Version Pairs

This page extends the React perceptive app workflow with a tighter test loop for the reference platform:

```text
shared manifest
  -> Go ISCore server
  -> React GridLookout
  -> Android GridLookout bridge contract
```

The aim is not merely to check that a UI builds. The aim is to prove that the same CPUX manifest can be loaded, served, acted on, reflected, and reused across platform surfaces.

## Repository Shape

The reference platform keeps one manifest as the source of truth:

```text
platform/shared/cpux-app-manifest.json
```

Platform copies are generated from it:

```text
react-pulse-cpux-app-v0_3/public/cpux-app-manifest.json
android/todo-shared-manifest.json
```

The sync script is:

```bash
scripts/sync-shared-manifest.sh to-platforms
```

This avoids a common failure mode: React and Android appearing to work while they are actually testing different manifest versions.

## Test Commands

From:

```bash
cd /Users/pronabpal/QuickLab/pilliar-action-site/X-PLATFORM-CPUX_abacus/iscore-cpux-platform-reference
```

Run the Go runtime unit tests:

```bash
scripts/dev-loop.sh test-iscore
```

Run only the CPUX server contract:

```bash
scripts/dev-loop.sh test-server
```

Run the React GridLookout contract:

```bash
scripts/dev-loop.sh test-react-gridlookout
```

Run the Android GridLookout bridge contract, without a device:

```bash
scripts/dev-loop.sh test-android-bridge-contract
```

Run the Android GridLookout APK build test:

```bash
scripts/dev-loop.sh test-android-gridlookout
```

By default this packages an `android/arm64` ISCore runtime binary, which is right for most physical Android devices.

On an Intel Mac using an x86 Android emulator, build the APK with an x86 Android runtime instead:

```bash
ANDROID_TARGET=android/amd64 scripts/dev-loop.sh test-android-gridlookout
```

Install the built APK on a connected emulator/device:

```bash
INSTALL_APK=1 scripts/dev-loop.sh test-android-gridlookout
```

Run the current version pair as a single suite:

```bash
scripts/dev-loop.sh test-all
```

## What Each Test Proves

### ISCore Server

```bash
scripts/test-version-pair.sh server
```

This starts `cmd/iscore-server`, serves the shared manifest, initializes CPUX, registers cells, and verifies the server contract.

Expected proof:

```text
CPUX server contract test passed
```

### React GridLookout Test

```bash
scripts/test-version-pair.sh react-gridlookout
```

This syncs the shared manifest into React, builds the React app, starts the Go server with the React `dist` directory, registers cells, and performs a representative `/cell-action`.

Expected proof:

```text
React GridLookout test passed
```

### Android GridLookout Bridge Contract Test

```bash
scripts/test-version-pair.sh android-bridge-contract
```

This syncs the shared manifest into the Android manifest copy, starts the Go server, and verifies the Android bridge contract against the same `/cell-action` API.

This does not require an Android device. It proves the manifest/server/action contract the Android app must use.

Expected proof:

```text
Android GridLookout bridge contract test passed
```

### Android GridLookout Test

```bash
scripts/test-version-pair.sh android-gridlookout
```

This generates the Android host project, builds the debug APK, and verifies that an APK is produced.

It does not install by default. To install:

```bash
INSTALL_APK=1 scripts/test-version-pair.sh android-gridlookout
```

For an Intel Mac x86 emulator:

```bash
ANDROID_TARGET=android/amd64 INSTALL_APK=1 scripts/test-version-pair.sh android-gridlookout
```

Expected proof:

```text
Android GridLookout APK build passed
```

## Version Pair Discipline

Treat the following as one version pair:

- shared manifest version,
- Go ISCore runtime version,
- React GridLookout renderer version,
- Android GridLookout bridge version.

When one changes, run:

```bash
scripts/dev-loop.sh test-all
```

If only the Go runtime changes, start with:

```bash
scripts/dev-loop.sh test-iscore
scripts/dev-loop.sh test-server
```

If a platform renderer changes, run that platform test and then the full pair:

```bash
scripts/dev-loop.sh test-react-gridlookout
scripts/dev-loop.sh test-all
```

or:

```bash
scripts/dev-loop.sh test-android-bridge-contract
scripts/dev-loop.sh test-android-gridlookout
scripts/dev-loop.sh test-all
```

## Why This Matters

IS-Core development can fail in subtle places:

- a DN emits a different Signal shape than the designated release Signal,
- a reflector pickup reaches the Field but a platform does not subscribe correctly,
- a React or Android manifest copy drifts from the shared manifest,
- a platform action targets the wrong receptor IC,
- a server route works directly but not through GridLookout cell action shape.

The version-pair test loop catches these while adding runtime functionality, such as reflector error Pulses for emitted/release Signal mismatch.

## O_reflector Error Contract

ISCore can now configure an IC-level O_reflector error pulse contract:

```json
"reflectorError": {
  "enabled": true,
  "intentionId": "I_reflector_error",
  "pulsePhrase": "reflector_error",
  "includeDetails": true
}
```

When enabled, the pickup path remains unchanged:

```text
DN emits pickup result Signal
Visitor moves pickup result to O_reflector
O_reflector compares it to the designated release/result Signal
O_reflector emits normal release Signal or reflector_error Signal
Field absorbs the reflected Signal through pickup
```

The Go runtime tests now cover the mismatch case directly: a DN result with the wrong `intentionId` produces `reflector_error`, and the runner proves that the Field absorbs the error through the same pickup mechanism used by successful releases.
