---
title: Social Awareness Contact
subtitle: Participate in the Healthy Internet and Social Awareness initiative
description: A civic contact and newsletter subscription page for people interested in respectful digital culture, conversation, privacy, media awareness, and healthy social engagement.
order: 20
---

# Social Awareness Contact

**Participate in the Healthy Internet and Social Awareness initiative**

This page is for people who are interested in building healthier forms of digital and social life — not only through technology, but through conversation, reflection, education, and mutual regard.

You do not need to be a developer or researcher to participate.

The Social Awareness pillar is concerned with questions such as:

- How can online interaction become more respectful, consent-based, and less intrusive?
- How can media reduce unnecessary social tension rather than amplify it?
- How can historical, political, and cultural labels be handled carefully, without forcing ordinary people into inherited conflict frames?
- How can communities encourage *anti-hatred in every form*, rather than reducing care to one group, label, or ideology?
- How can conversation itself become a healing, clarifying, and sometimes therapeutic process?
- How can silence, privacy, and gradual human growth be respected in digital environments?

The aim is not to create another argumentative platform. The aim is to support spaces where intention is declared, engagement is respectful, and people can grow without constant pressure, exposure, or misrepresentation.

---

## Why Subscribe or Make Contact?

From time to time, IntentixLab may share reflections on:

- healthy internet behaviour
- consent-based communication
- media tension and social anxiety
- digital dignity and privacy
- respectful introduction before engagement
- conversation as a process of understanding
- educational and community uses of technology
- the changing nature of conflict in a world of cheap drones, instant media, and algorithmic amplification
- ways to move beyond inherited “anti-this” or “anti-that” labels toward a more universal rejection of hatred, humiliation, and dehumanisation

These reflections will be exploratory and civic in tone. They are not intended as political campaigning, religious positioning, or ideological alignment.

The guiding principle is simple:

> Human beings should not be pushed into hostile historical scripts when ordinary life needs dignity, safety, conversation, and mutual regard.

---

## Contact or Subscribe

Use this form to express interest, suggest collaboration, join occasional updates, or participate in future Social Awareness discussions.

<div class="intentix-contact-form"><div class="intentix-form-card"><label for="intentixName">Name *</label><input id="intentixName" placeholder="Your name"><label for="intentixEmail">Email *</label><input id="intentixEmail" type="email" placeholder="you@example.com"><label for="intentixOrg">Community / Organization / Interest Area</label><input id="intentixOrg" placeholder="School, community group, research area, local group, or personal interest"><label for="intentixInterest">Participation Interest</label><select id="intentixInterest"><option>Newsletter subscription only</option><option>Healthy Internet awareness</option><option>Consent-based communication</option><option>Media and social tension reflection</option><option>Conversation circles / community dialogue</option><option>Education / students / parenting</option><option>Digital privacy and dignity</option><option>Ethical technology and AI</option><option>Volunteer / collaboration interest</option><option>General social awareness discussion</option></select><label class="intentix-checkbox-row"><input id="intentixNewsletter" type="checkbox"> I would like to receive occasional Social Awareness reflections and updates.</label>
<label class="intentix-checkbox-row"><input id="intentixConsent" type="checkbox"> I understand this is a respectful civic discussion space, not a place for abuse, propaganda, or hostile targeting.</label>

<label for="intentixMessage">Message *</label><textarea id="intentixMessage" placeholder="Tell us what you are interested in, or what kind of social awareness conversation you would like to support."></textarea><input id="intentixWebsite" class="intentix-hidden" autocomplete="off" tabindex="-1"><button id="intentixSubmit" type="button">Send Social Awareness Message</button><pre id="intentixStatus"></pre></div></div>

<style>
.intentix-contact-form{margin:28px 0;border:1px solid #ddd4c2;border-radius:18px;padding:12px;background:linear-gradient(135deg,rgba(216,137,0,.10),rgba(255,255,255,.95)),#fff;box-shadow:0 10px 24px rgba(0,0,0,.08)}
.intentix-form-card{border-radius:14px;background:#fff;padding:22px}
.intentix-form-card label{display:block;font-weight:700;margin-top:14px;color:#35240d}
.intentix-form-card input,.intentix-form-card select,.intentix-form-card textarea{width:100%;box-sizing:border-box;padding:12px;margin-top:7px;border:1px solid #d7c7a8;border-radius:10px;font-size:16px}
.intentix-form-card textarea{min-height:170px}
.intentix-form-card button{margin-top:18px;background:linear-gradient(135deg,#d88900,#ffb347);color:#211304;border:1px solid #f0bf68;border-radius:10px;padding:12px 16px;font-weight:800;cursor:pointer}
.intentix-form-card button:disabled{opacity:.65;cursor:not-allowed}
.intentix-form-card pre{white-space:pre-wrap;word-break:break-word;margin-top:16px;background:#111827;color:#e5e7eb;border-radius:10px;padding:12px;min-height:40px}
.intentix-hidden{position:absolute!important;left:-9999px!important;opacity:0!important}
.intentix-checkbox-row{display:flex!important;gap:10px;align-items:flex-start;font-weight:600!important;line-height:1.45;margin-top:16px!important;color:#3f2c11!important}
.intentix-checkbox-row input{width:auto!important;margin-top:4px!important}
.intentix-help{margin:7px 0 0 0;color:#5b4630;font-size:14px;line-height:1.45}
</style>

<script>
(function(){
  const CONTACT_API = "https://keybytesystems.com/wp-json/intentix/v1/contact";
  function byId(id){ return document.getElementById(id); }
  function showStatus(value){
    byId("intentixStatus").textContent =
      typeof value === "string" ? value : JSON.stringify(value, null, 2);
  }
  async function submitIntentixContact(){
    const newsletter = byId("intentixNewsletter").checked;
    const consent = byId("intentixConsent").checked;
    const humanPriority = byId("intentixPriority").value.trim();
    const payload = {
      name: byId("intentixName").value.trim(),
      email: byId("intentixEmail").value.trim(),
      organization: byId("intentixOrg").value.trim(),
      interest: byId("intentixInterest").value,
      newsletter: newsletter ? "yes" : "no",
      human_priority: humanPriority,
      message: byId("intentixMessage").value.trim(),
      source_url: window.location.href,
      website: byId("intentixWebsite").value.trim()
    };
    if(!payload.name || !payload.email || !payload.message){
      showStatus("Please enter name, email, and message.");
      return;
    }
    if(!consent){
      showStatus("Please confirm that you understand the respectful civic purpose of this contact space.");
      return;
    }
    if(humanPriority !== "1"){
      showStatus("Please complete the human intent check. The highest priority is respectful conversation.");
      return;
    }
    byId("intentixSubmit").disabled = true;
    showStatus("Sending...");
    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
      });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch(e) { data = {raw:text}; }
      if(!res.ok){
        showStatus(data);
        return;
      }
      showStatus(newsletter ? "Thank you. Your message has been received and your newsletter interest has been noted." : "Thank you. Your message has been received.");
      byId("intentixName").value = "";
      byId("intentixEmail").value = "";
      byId("intentixOrg").value = "";
      byId("intentixMessage").value = "";
      byId("intentixPriority").value = "";
      byId("intentixNewsletter").checked = false;
      byId("intentixConsent").checked = false;
    } catch(e) {
      showStatus("Could not send message. Please try again later.");
    } finally {
      byId("intentixSubmit").disabled = false;
    }
  }
  document.addEventListener("DOMContentLoaded", function(){
    const btn = byId("intentixSubmit");
    if(btn){ btn.addEventListener("click", submitIntentixContact); }
  });
})();
</script>

---

## Participation Notes

Please use this contact path for respectful civic discussion only.

This initiative welcomes disagreement when it is sincere, careful, and humanising. It does not welcome abuse, targeted hostility, dehumanisation, or attempts to turn inherited conflicts into personal attacks.

The deeper aim is to encourage a healthier internet culture where:

- people introduce their intentions before demanding attention
- conversation can clarify rather than inflame
- privacy and silence are respected
- media narratives are examined carefully
- human beings are not reduced to slogans, labels, or inherited divisions

## Privacy and Use

The form posts to the IntentixLab Contact API hosted in the existing WordPress/SiteGround environment. Messages are intended for Social Awareness communication and occasional newsletter follow-up where requested.


