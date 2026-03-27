---
title: CPUX Entity Extractor
order: 10
description: Interactive tool to extract intentions, pulses, and action contexts from scenario descriptions using AI
---

# CPUX Entity Extractor

Extract CPUX entities (Intentions, Pulses, Action Contexts) from scenario descriptions using Claude or ChatGPT.

<div style="width: 100%; height: 90vh; border: none; margin-top: 20px;">
  <iframe 
    src="https://cpux-extractor.vercel.app" 
    style="width: 100%; height: 100%; border: 1px solid #3E92CC; border-radius: 8px;"
    title="CPUX Entity Extractor">
  </iframe>
</div>

## How to Use

1. **Choose Provider**: Select Claude (Anthropic) or ChatGPT (OpenAI)
2. **Enter API Key**: Your key stays in your browser - never sent to our servers
3. **Load Template**: Try E-Commerce, DevOps, Healthcare, or Login examples
4. **Extract**: Click to analyze your scenario
5. **Export**: Copy JSON, download JSON, or download as Markdown

## What You Get

### Intentions
Actions that participants take (verb phrases):
- `proceed_to_checkout`
- `validate_address`
- `process_payment`

### Pulses
Perceptions with Y/U/N trivalence (state descriptions):
- `cart_populated` - Y: Has items, U: Loading, N: Empty
- `payment_authorized` - Y: Approved, U: Pending, N: Declined

### Action Contexts
Pulse sets that enable specific actions (become Gatekeepers):
- When `{cart_populated:Y, items_in_stock:Y}` → enables `proceed_to_checkout`

### Missing Perceptions
Suggested pulses you might have overlooked based on common patterns

## Getting API Keys

### Anthropic Claude
1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Sign up or login
3. Navigate to API Keys
4. Create new key
5. Copy and paste into tool

**Cost**: ~$0.01-0.10 per extraction

### OpenAI ChatGPT
1. Visit [platform.openai.com](https://platform.openai.com)
2. Sign up or login
3. Navigate to API Keys
4. Create new key
5. Copy and paste into tool

**Cost**: ~$0.005-0.05 per extraction

## Privacy

Your API key is stored only in your browser's memory and is never sent to our servers. All API calls go directly from your browser to Anthropic/OpenAI. We do not collect, store, or have access to your API keys or data.

## Next Steps

After extraction:
1. Review the entities for accuracy
2. Add missing perceptions suggested by the LLM
3. Design your DN/Object architecture
4. Map action contexts to Gatekeepers
5. Implement in your CPUX system

## Open in New Tab

[Launch CPUX Extractor in full screen →](https://cpux-extractor.vercel.app)
