---
title: Entity Extractor
order: 2
description: Extract CPUX entities from scenarios using AI - supports Claude and ChatGPT
---

# CPUX Entity Extractor

<div class="tool-notice" style="background: rgba(251, 139, 36, 0.1); border-left: 4px solid #FB8B24; padding: 16px; margin: 20px 0; border-radius: 4px;">
  <strong>💡 Interactive Tool</strong><br>
  This page contains an embedded application. For the best experience, <a href="https://cpux-extractor.vercel.app" target="_blank">open in a new tab</a>.
</div>

<div style="width: 100%; height: 85vh; margin-top: 20px;">
  <iframe 
    src="https://cpux-extractor.vercel.app" 
    style="width: 100%; height: 100%; border: 2px solid #3E92CC; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
    title="CPUX Entity Extractor"
    allow="clipboard-write">
  </iframe>
</div>

---

## Quick Guide

### 1. Configure API
- **Choose Provider**: Claude (better quality) or ChatGPT (faster/cheaper)
- **Enter API Key**: Stored only in your browser, never on our servers
- **Select Model**: Balance between quality and cost

### 2. Describe Scenario
- Use provided templates or write your own
- Include: participants, actions, decision points
- Natural language is fine - the LLM understands

### 3. Extract Entities
Click "Extract Intentions & Pulses" and wait 10-30 seconds

### 4. Review Output
You'll get structured JSON with:
- **Intentions**: Actions to be taken
- **Pulses**: Perceptions with Y/U/N trivalence
- **Action Contexts**: Prerequisites that enable actions
- **Missing Perceptions**: Suggested additions

### 5. Export
- Copy JSON for use in code
- Download JSON for archiving
- Download Markdown for documentation

---

## Understanding the Output

### Intentions
**What they are**: Actions that participants want to take

**Example**:
```json
{
  "name": "validate_credentials",
  "description": "System checks username and password",
  "triggered_by": "User submits login form"
}
```

**Maps to**: Intention carriers in CPUX (signal identifiers)

---

### Pulses
**What they are**: Normalized perceptions with trivalent states

**Example**:
```json
{
  "name": "credentials_valid",
  "description": "Username and password match database",
  "trivalence": {
    "Y": "Credentials match",
    "U": "Validation in progress",
    "N": "Invalid credentials"
  }
}
```

**Maps to**: Pulse namespace in CPUX

---

### Action Contexts
**What they are**: Pulse sets that enable specific actions

**Example**:
```json
{
  "name": "can_create_session",
  "pulse_set": {
    "credentials_valid": "Y",
    "account_active": "Y"
  },
  "enables": "create_session",
  "rationale": "Session requires authenticated active user"
}
```

**Maps to**: Gatekeepers in Design Nodes

---

### Missing Perceptions
**What they are**: LLM-suggested pulses you may have overlooked

**Example**:
```json
{
  "name": "mfa_required",
  "reason": "Multi-factor authentication check for security"
}
```

**Use**: Review and add to your design if relevant

---

## Getting API Keys

### Anthropic Claude

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create account or sign in
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy the key (starts with `sk-ant-`)

**Pricing**:
- Claude Haiku 3.5: ~$0.01/extraction
- Claude Sonnet 3.5: ~$0.05/extraction
- Claude Sonnet 4.5: ~$0.10/extraction

**Free tier**: $5 credit for new accounts

---

### OpenAI ChatGPT

1. Visit [platform.openai.com](https://platform.openai.com)
2. Create account or sign in
3. Navigate to **API Keys**
4. Click **Create new secret key**
5. Copy the key (starts with `sk-proj-`)

**Pricing**:
- GPT-4o Mini: ~$0.005/extraction
- GPT-4o: ~$0.05/extraction
- GPT-4 Turbo: ~$0.08/extraction

**Free tier**: $5 credit for new accounts

---

## Privacy & Security

### Your Data is Safe

**API keys**:
- Stored only in browser memory (not cookies, not localStorage)
- Never sent to our servers
- Cleared when you close the tab

**Scenarios & results**:
- Sent directly from your browser to Anthropic/OpenAI
- We never see your data
- No logging, no tracking, no storage

**Source code**:
- Fully open source
- Deployed on Vercel (edge functions)
- No backend database
- [View code on GitHub →](#)

---

## Tips for Best Results

### Write Clear Scenarios

**Good**:
```
User clicks "Checkout". System verifies cart has items and 
checks inventory. If available, user enters shipping address. 
System validates address. User adds payment method. System 
shows order summary. User confirms. System processes payment.
```

**Not ideal**:
```
Do the checkout thing
```

---

### Include Decision Points

Explicitly mention:
- "If X, then Y"
- "When A is true, B becomes possible"
- "System checks whether..."
- "User can proceed if..."

The LLM uses these to extract action contexts.

---

### Mention Participants

Be clear about who/what is involved:
- Users
- Systems
- External services
- Background processes

This helps identify intention boundaries.

---

### Use Domain Vocabulary

Use the actual terms from your domain:
- "shopping cart" not "basket"
- "payment gateway" not "payment thing"
- "session token" not "login info"

The LLM will preserve your vocabulary in pulse names.

---

## Workflow Integration

### 1. Scenario Design Phase
- Write situational reality narrative
- Use extractor to get initial entity list
- Review and refine

### 2. Architecture Design Phase
- Map intentions to Design Nodes
- Map action contexts to Gatekeepers
- Define pulse namespace

### 3. Implementation Phase
- Use JSON output as specification
- Generate code from entities
- Build Grid Lookout with extracted pulses

### 4. Validation Phase
- Use "missing perceptions" as checklist
- Verify all action contexts make sense
- Test edge cases

---

## Example Templates

### E-Commerce Checkout
Complete purchase flow with cart, payment, and fulfillment

### DevOps Deployment
Kubernetes deployment with staging validation and rollback

### Healthcare Scheduling
Patient appointment booking with insurance verification

### User Login
Authentication flow with credentials, MFA, and session creation

---

## Troubleshooting

### "API Key Invalid"
- Check you copied the entire key
- Verify key has correct permissions
- Confirm account has remaining credits

### "Extraction Too Slow"
- Try smaller model (Haiku or GPT-4o Mini)
- Shorten your scenario
- Check internet connection

### "Poor Quality Results"
- Use larger model (Sonnet 4 or GPT-4o)
- Add more detail to scenario
- Include explicit decision points

### "Missing Entities"
- Be more explicit about conditions
- Mention all participants
- Include failure cases

---

## Need Help?

- [Read the full CPUX documentation](../foundations/overview.html)
- [Learn about Situational Reality design](../design/situational-reality.html)
- [Understand action contexts](../design/action-contexts.html)
- [Contact support](#)

---

## Open Full Screen

For the best experience, especially on mobile:

[**Launch in New Tab →**](https://cpux-extractor.vercel.app)
