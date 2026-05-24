---
title: IScore Across Languages
order: 8
description: Use IScore CPUX core from JavaScript, Kotlin, Java, and Go with a two-DN currency conversion demo.
---

# IScore Across Languages

IScore is the CPUX core from IntentixLab. The Go package is the native runtime, and `iscore-server` is the public boundary for JavaScript, Kotlin, Java, and other languages.

The shortest way to think about it:

```text
client app in any language
  -> JSON Signal
  -> iscore-server
  -> CPUX Field, Visitor, ICs, O_holder, DN, O_reflector
  -> reflected JSON Signal
  -> client app renders the result
```

## Why Use The Server Boundary?

Go applications can import `github.com/spicecoder/iscore` directly. Other languages should usually talk to the `iscore-server` binary over HTTP or WebSocket.

That keeps the CPUX execution contract stable:

- every language sends the same `Signal` JSON
- every Design Node receives and emits the same pulse shape
- clients stay thin and render reflected pulses
- host functions, files, simulator calls, model lookup, and logs remain inside the Go runtime

## Currency Conversion CPUX Demo

This demo uses two Design Nodes:

1. `DN_currency_input` receives `input_currency` and `amount`, validates them, and emits `source_currency` plus `source_amount`.
2. `DN_highest_interest_convert` creates simulated interest rates, picks the target currency with the highest simulated rate, and converts the source amount to that target currency.

Run it:

```bash
git clone https://github.com/spicecoder/iscore.git
cd iscore
go test ./...
go run ./cmd/iscore-harness testdata/sample-currency-conversion.cpux.json testdata/sample-dn-empty-scenario.json
```

Example trigger:

```json
{
  "intentionId": "I_currency_input",
  "pulses": [
    {
      "phrase": "_perception_mode",
      "tv": "Y",
      "responses": ["act"]
    },
    {
      "phrase": "input_currency",
      "tv": "Y",
      "responses": ["AUD"]
    },
    {
      "phrase": "amount",
      "tv": "Y",
      "responses": ["1000"]
    }
  ]
}
```

Expected reflected result in the sample run:

```json
{
  "target_currency": "BRL",
  "target_amount": "3473.68",
  "target_interest_rate": "9.80%"
}
```

The rates are simulated for demonstration and regression testing. This is not financial advice and not live market data.

## JavaScript / TypeScript

```ts
type Pulse = {
  phrase: string;
  tv: "Y" | "N" | "UN";
  responses?: string[];
};

type Signal = {
  intentionId: string;
  pulses: Pulse[];
};

async function convertCurrency(inputCurrency: string, amount: number) {
  const signal: Signal = {
    intentionId: "I_currency_input",
    pulses: [
      { phrase: "_perception_mode", tv: "Y", responses: ["act"] },
      { phrase: "input_currency", tv: "Y", responses: [inputCurrency] },
      { phrase: "amount", tv: "Y", responses: [String(amount)] }
    ]
  };

  const res = await fetch("http://localhost:3000/cell-action", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "cell-action",
      receptorICId: "IC_currency_input",
      intentionId: signal.intentionId,
      signal
    })
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

## Kotlin

```kotlin
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

val body = """
{
  "type": "cell-action",
  "receptorICId": "IC_currency_input",
  "intentionId": "I_currency_input",
  "signal": {
    "intentionId": "I_currency_input",
    "pulses": [
      {"phrase":"_perception_mode","tv":"Y","responses":["act"]},
      {"phrase":"input_currency","tv":"Y","responses":["AUD"]},
      {"phrase":"amount","tv":"Y","responses":["1000"]}
    ]
  }
}
""".trimIndent()

val request = HttpRequest.newBuilder()
  .uri(URI.create("http://localhost:3000/cell-action"))
  .header("Content-Type", "application/json")
  .POST(HttpRequest.BodyPublishers.ofString(body))
  .build()

val response = HttpClient.newHttpClient()
  .send(request, HttpResponse.BodyHandlers.ofString())

println(response.body())
```

## Java

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class IScoreCurrencyClient {
  public static void main(String[] args) throws Exception {
    String json = """
      {
        "type": "cell-action",
        "receptorICId": "IC_currency_input",
        "intentionId": "I_currency_input",
        "signal": {
          "intentionId": "I_currency_input",
          "pulses": [
            {"phrase":"_perception_mode","tv":"Y","responses":["act"]},
            {"phrase":"input_currency","tv":"Y","responses":["AUD"]},
            {"phrase":"amount","tv":"Y","responses":["1000"]}
          ]
        }
      }
      """;

    HttpRequest request = HttpRequest.newBuilder()
      .uri(URI.create("http://localhost:3000/cell-action"))
      .header("Content-Type", "application/json")
      .POST(HttpRequest.BodyPublishers.ofString(json))
      .build();

    HttpResponse<String> response = HttpClient.newHttpClient()
      .send(request, HttpResponse.BodyHandlers.ofString());

    System.out.println(response.body());
  }
}
```

## Go

```go
package main

import (
	"context"
	"encoding/json"
	"os"

	intentixlab "github.com/spicecoder/iscore"
)

func main() {
	data, _ := os.ReadFile("testdata/sample-currency-conversion.cpux.json")
	var mf intentixlab.Manifest
	_ = json.Unmarshal(data, &mf)

	runner, _ := intentixlab.BuildRunner(
		mf.CPUX,
		intentixlab.SampleDNRegistry(),
		intentixlab.NewMemoryPersistence(),
		intentixlab.NewEventBus(),
	)
	runner.Start(context.Background())
}
```

## CPUX Contract

The portable contract is small:

```json
{
  "intentionId": "I_example",
  "pulses": [
    {
      "phrase": "some_phrase",
      "tv": "Y",
      "responses": ["some response"]
    }
  ]
}
```

Everything else is runtime topology:

- a Field absorbs Signals
- an Intention Container matches a designated input Signal
- an `O_holder` accumulates perception
- a DN transforms the holder state
- an `O_reflector` emits the designated release Signal
- the Visitor repeats until golden pass

That is why the same CPUX can be driven from JavaScript, Kotlin, Java, Go, or any client capable of JSON over HTTP/WebSocket.
