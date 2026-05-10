---
title: Contact IntentixLab
subtitle: Collaborate on GridLookout, Perceptive Apps, and CPUX-based Intention Space Computing
description: API-backed contact form for open-source GridLookout collaboration, Perceptive Apps development, CPUX implementation enquiries, and research discussion.
order: 13
---

# Contact IntentixLab

**Collaborate on GridLookout, Perceptive Apps, and CPUX**

IntentixLab is developing a practical architecture for perceptive software: systems where intentions, pulses, design nodes, objects, and CPUX flows can be made explicit, inspectable, and repeatable.

This contact page is for people who want to collaborate, test, build, or discuss:

- **Open-source GridLookout**
- **Perceptive Apps**
- **CPUX / Intention Space implementation**
- **Research and writing**

---

## Collaboration Form

<div class="intentix-contact-form">
  <div class="intentix-form-card">
    <label>Name *</label>
    <input id="intentixName" placeholder="Your name" />

    <label>Email *</label>
    <input id="intentixEmail" type="email" placeholder="you@example.com" />

    <label>Organization / GitHub</label>
    <input id="intentixOrg" placeholder="University, company, GitHub profile, or project" />

    <label>Collaboration Interest</label>
    <select id="intentixInterest">
      <option>Open-source GridLookout</option>
      <option>Perceptive Apps development</option>
      <option>CPUX / Intention Space implementation</option>
      <option>Research / writing</option>
      <option>Beta testing</option>
      <option>General collaboration</option>
    </select>

    <label>Message *</label>
    <textarea id="intentixMessage" placeholder="Tell us what you would like to collaborate on."></textarea>

    <input id="intentixWebsite" class="intentix-hidden" autocomplete="off" tabindex="-1" />

    <button id="intentixSubmit" type="button">Send Collaboration Message</button>

    <pre id="intentixStatus"></pre>
  </div>
</div>

<style>
  .intentix-contact-form {
    margin: 28px 0;
    border: 1px solid #ddd4c2;
    border-radius: 18px;
    padding: 12px;
    background: linear-gradient(135deg, rgba(216,137,0,.10), rgba(255,255,255,.95)), #ffffff;
    box-shadow: 0 10px 24px rgba(0,0,0,.08);
  }

  .intentix-form-card {
    border-radius: 14px;
    background: #fff;
    padding: 22px;
  }

  .intentix-form-card label {
    display: block;
    font-weight: 700;
    margin-top: 14px;
    color: #35240d;
  }

  .intentix-form-card input,
  .intentix-form-card select,
  .intentix-form-card textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    margin-top: 7px;
    border: 1px solid #d7c7a8;
    border-radius: 10px;
    font-size: 16px;
  }

  .intentix-form-card textarea {
    min-height: 160px;
  }

  .intentix-form-card button {
    margin-top: 18px;
    background: linear-gradient(135deg, #d88900, #ffb347);
    color: #211304;
    border: 1px solid #f0bf68;
    border-radius: 10px;
    padding: 12px 16px;
    font-weight: 800;
    cursor: pointer;
  }

  .intentix-form-card pre {
    white-space: pre-wrap;
    word-break: break-word;
    margin-top: 16px;
    background: #111827;
    color: #e5e7eb;
    border-radius: 10px;
    padding: 12px;
    min-height: 40px;
  }

  .intentix-hidden {
    position: absolute !important;
    left: -9999px !important;
    opacity: 0 !important;
  }
</style>

<script>
(function () {
  "use strict";

  const CONTACT_API = "https://keybytesystems.com/wp-json/intentix/v1/contact";

  function byId(id) {
    return document.getElementById(id);
  }

  function showStatus(value) {
    byId("intentixStatus").textContent =
      typeof value === "string" ? value : JSON.stringify(value, null, 2);
  }

  async function submitIntentixContact() {
    const payload = {
      name: byId("intentixName").value.trim(),
      email: byId("intentixEmail").value.trim(),
      organization: byId("intentixOrg").value.trim(),
      interest: byId("intentixInterest").value,
      message: byId("intentixMessage").value.trim(),
      source_url: window.location.href,
      website: byId("intentixWebsite").value.trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      showStatus("Please enter name, email, and message.");
      return;
    }

    byId("intentixSubmit").disabled = true;
    showStatus("Sending...");

    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

      if (!res.ok) {
        showStatus(data);
        return;
      }

      showStatus("Thank you. Your message has been received.");
      byId("intentixName").value = "";
      byId("intentixEmail").value = "";
      byId("intentixOrg").value = "";
      byId("intentixMessage").value = "";
    } catch (e) {
      showStatus("Could not send message. Please try again later.");
    } finally {
      byId("intentixSubmit").disabled = false;
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    byId("intentixSubmit").addEventListener("click", submitIntentixContact);
  });
})();
</script>

---

## Privacy and Use

The form posts to the IntentixLab Contact API hosted in the existing WordPress/SiteGround environment. Messages are stored in a dedicated contact table before email notification is attempted, so submissions are not lost if email delivery fails.
