---
title: Phrase Collector API Console
order: 11
description: API-first phrase collection console for building Intention Space instances from cloud architecture language
---

# Phrase Collector API Console

Cloud architects do not begin with resources. They begin with phrases:

- “deploy my container”
- “expose this service publicly”
- “reduce idle cost”
- “move this workload closer to users”
- “make it survive a zone failure”

In Intention Space terms, these phrases are the earliest visible form of **Situational Reality**.  
A collection of such phrases becomes an **Intention Space instance**. After collection, each phrase can be normalized and classified as an Intention, Design Node, Object, Pulse, Signal, CPUX, Constraint, Service, Resource, or Decision phrase.

This page talks directly to the WordPress-hosted Phrase API.

---

## API Console

<div id="isc-console" class="isc-console">
  <div class="isc-card">
    <h2>Connection</h2>

    <label>API Base URL</label>
    <input id="apiBase" value="https://keybytesystems.com/wp-json/isc/v1" />

    <div class="isc-row">
      <button onclick="iscCheckHealth()">Check API</button>
      <button onclick="iscCheckMe()">Check Login</button>
      <button onclick="iscOpenLogin()">Login via WordPress</button>
    </div>

    <p class="isc-hint">
      Cookie login works when the browser accepts the WordPress login cookie.
      For admin normalization, use a WordPress Application Password.
    </p>

    <pre id="connectionOut"></pre>
  </div>

  <div class="isc-card">
    <h2>Optional API Authentication</h2>

    <label>WordPress username</label>
    <input id="apiUser" placeholder="username or email" />

    <label>Application password</label>
    <input id="apiPassword" type="password" placeholder="xxxx xxxx xxxx xxxx xxxx xxxx" />

    <p class="isc-hint">
      Leave blank to use browser cookie login. Fill these fields to use Basic Auth for create/update APIs.
    </p>
  </div>

  <div class="isc-grid">
    <div class="isc-card">
      <h2>Create Intention Space</h2>

      <label>Space UID</label>
      <input id="spaceUid" value="gcp_architect_field_language_001" />

      <label>Title</label>
      <input id="spaceTitle" value="GCP Architect Field Language" />

      <label>Description</label>
      <textarea id="spaceDescription">Phrases used by cloud architects and learners while describing Google Cloud deployment situations.</textarea>

      <button onclick="iscCreateSpace()">Create Space</button>
      <button onclick="iscLoadSpaces()">Refresh Spaces</button>

      <pre id="spaceOut"></pre>
    </div>

    <div class="isc-card">
      <h2>Spaces</h2>
      <select id="spaceSelect" onchange="iscSpaceChanged()"></select>
      <button onclick="iscLoadPhrases()">Load Phrases</button>
      <button onclick="iscExportSpace()">Export Space JSON</button>
      <pre id="exportOut"></pre>
    </div>
  </div>

  <div class="isc-card">
    <h2>Submit Phrase</h2>

    <label>Phrase</label>
    <textarea id="phraseText" placeholder="Example: deploy my container"></textarea>

    <label>Context</label>
    <textarea id="phraseContext" placeholder="Example: learner wants to package and run a small web app"></textarea>

    <label>Source</label>
    <input id="phraseSource" value="intentixlab-static-site" />

    <label>Initial IS Role</label>
    <select id="phraseRole">
      <option value="unclassified">Unclassified</option>
      <option value="intention">I - Intention</option>
      <option value="design_node">DN - Design Node</option>
      <option value="object">O - Object</option>
      <option value="pulse">Pulse</option>
      <option value="signal">Signal</option>
      <option value="cpux">CPUX</option>
      <option value="constraint">Constraint</option>
      <option value="service">Service</option>
      <option value="resource">Resource</option>
      <option value="decision_phrase">Decision phrase</option>
    </select>

    <button onclick="iscCreatePhrase()">Submit Phrase</button>

    <pre id="phraseOut"></pre>
  </div>

  <div class="isc-card">
    <h2>Phrase List</h2>
    <div id="phraseList" class="isc-list"></div>
  </div>

  <div class="isc-card">
    <h2>Admin Normalization</h2>

    <p class="isc-hint">
      Requires a WordPress admin account. Select a phrase from the list or enter its ID manually.
    </p>

    <label>Phrase ID</label>
    <input id="adminPhraseId" placeholder="Example: 12" />

    <label>IS Role</label>
    <select id="adminRole">
      <option value="unclassified">Unclassified</option>
      <option value="intention">I - Intention</option>
      <option value="design_node">DN - Design Node</option>
      <option value="object">O - Object</option>
      <option value="pulse">Pulse</option>
      <option value="signal">Signal</option>
      <option value="cpux">CPUX</option>
      <option value="constraint">Constraint</option>
      <option value="service">Service</option>
      <option value="resource">Resource</option>
      <option value="decision_phrase">Decision phrase</option>
    </select>

    <label>Normalized ID</label>
    <input id="normalizedId" placeholder="deploy_container" />

    <label>Normalized phrase</label>
    <input id="normalizedPhrase" placeholder="deploy a container" />

    <label>Cluster description</label>
    <textarea id="clusterDescription" placeholder="What this phrase cluster means architecturally"></textarea>

    <label>Status</label>
    <select id="adminStatus">
      <option value="new">new</option>
      <option value="needs_review">needs_review</option>
      <option value="normalized">normalized</option>
      <option value="rejected">rejected</option>
    </select>

    <label>Admin note</label>
    <textarea id="adminNote"></textarea>

    <button onclick="iscUpdatePhrase()">Save Normalization</button>

    <pre id="adminOut"></pre>
  </div>
</div>

<style>
  .isc-console {
    margin-top: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .isc-card {
    border: 1px solid #d6d6d6;
    border-radius: 12px;
    padding: 18px;
    margin: 18px 0;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,.06);
  }

  .isc-card h2 {
    margin-top: 0;
    color: #3b004f;
  }

  .isc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .isc-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 14px;
  }

  .isc-console label {
    display: block;
    font-weight: 650;
    margin-top: 12px;
  }

  .isc-console input,
  .isc-console textarea,
  .isc-console select {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    margin-top: 6px;
    border: 1px solid #cfcfcf;
    border-radius: 8px;
    font-size: 15px;
  }

  .isc-console textarea {
    min-height: 88px;
  }

  .isc-console button {
    background: #d88900;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 14px;
    margin-top: 14px;
    cursor: pointer;
    font-weight: 700;
  }

  .isc-console button:hover {
    opacity: .9;
  }

  .isc-console pre {
    white-space: pre-wrap;
    word-break: break-word;
    background: #111827;
    color: #e5e7eb;
    border-radius: 8px;
    padding: 12px;
    min-height: 42px;
    overflow: auto;
  }

  .isc-hint {
    color: #666;
    font-size: 14px;
  }

  .isc-list-item {
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    padding: 12px;
    margin: 10px 0;
    background: #fafafa;
  }

  .isc-list-item strong {
    color: #111827;
  }

  .isc-pill {
    display: inline-block;
    padding: 3px 8px;
    border-radius: 999px;
    background: #eee;
    margin: 4px 4px 4px 0;
    font-size: 12px;
  }

  @media (max-width: 900px) {
    .isc-grid {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
  function iscApiBase() {
    return document.getElementById("apiBase").value.replace(/\/$/, "");
  }

  function iscAuthHeaders() {
    const user = document.getElementById("apiUser").value.trim();
    const pass = document.getElementById("apiPassword").value.trim();
    const headers = { "Content-Type": "application/json" };

    if (user && pass) {
      headers["Authorization"] = "Basic " + btoa(user + ":" + pass);
    }

    return headers;
  }

  async function iscRequest(path, options = {}) {
    const method = options.method || "GET";
    const fetchOptions = {
      method,
      credentials: "include",
      headers: options.headers || iscAuthHeaders()
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const res = await fetch(iscApiBase() + path, fetchOptions);
    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { raw: text };
    }

    if (!res.ok) {
      throw { status: res.status, data };
    }

    return data;
  }

  function iscShow(id, value) {
    document.getElementById(id).textContent =
      typeof value === "string" ? value : JSON.stringify(value, null, 2);
  }

  async function iscCheckHealth() {
    try {
      const data = await iscRequest("/health", { headers: {} });
      iscShow("connectionOut", data);
    } catch (e) {
      iscShow("connectionOut", e);
    }
  }

  async function iscCheckMe() {
    try {
      const data = await iscRequest("/me", { headers: {} });
      iscShow("connectionOut", data);
    } catch (e) {
      iscShow("connectionOut", e);
    }
  }

  function iscOpenLogin() {
    const wpBase = iscApiBase().replace("/wp-json/isc/v1", "");
    const redirect = encodeURIComponent(window.location.href);
    window.open(wpBase + "/wp-login.php?redirect_to=" + redirect, "_blank");
  }

  async function iscLoadSpaces() {
    try {
      const data = await iscRequest("/spaces", { headers: {} });
      const select = document.getElementById("spaceSelect");
      select.innerHTML = "";

      (data.spaces || []).forEach(space => {
        const opt = document.createElement("option");
        opt.value = space.space_uid;
        opt.textContent = space.title + " [" + space.space_uid + "]";
        select.appendChild(opt);
      });

      iscShow("spaceOut", data);
    } catch (e) {
      iscShow("spaceOut", e);
    }
  }

  function iscSpaceChanged() {
    iscLoadPhrases();
  }

  async function iscCreateSpace() {
    try {
      const body = {
        space_uid: document.getElementById("spaceUid").value.trim(),
        title: document.getElementById("spaceTitle").value.trim(),
        description: document.getElementById("spaceDescription").value.trim()
      };

      const data = await iscRequest("/spaces", {
        method: "POST",
        body
      });

      iscShow("spaceOut", data);
      await iscLoadSpaces();
    } catch (e) {
      iscShow("spaceOut", e);
    }
  }

  async function iscCreatePhrase() {
    try {
      const spaceUid = document.getElementById("spaceSelect").value || document.getElementById("spaceUid").value.trim();

      const body = {
        space_uid: spaceUid,
        phrase: document.getElementById("phraseText").value.trim(),
        context: document.getElementById("phraseContext").value.trim(),
        source: document.getElementById("phraseSource").value.trim(),
        isc_role: document.getElementById("phraseRole").value
      };

      const data = await iscRequest("/phrases", {
        method: "POST",
        body
      });

      iscShow("phraseOut", data);
      document.getElementById("phraseText").value = "";
      document.getElementById("phraseContext").value = "";
      await iscLoadPhrases();
    } catch (e) {
      iscShow("phraseOut", e);
    }
  }

  async function iscLoadPhrases() {
    try {
      const spaceUid = document.getElementById("spaceSelect").value;
      const path = spaceUid ? "/phrases?space_uid=" + encodeURIComponent(spaceUid) : "/phrases";
      const data = await iscRequest(path, { headers: {} });

      const list = document.getElementById("phraseList");
      list.innerHTML = "";

      (data.phrases || []).forEach(p => {
        const div = document.createElement("div");
        div.className = "isc-list-item";
        div.innerHTML = `
          <strong>#${p.id}: ${escapeHtml(p.phrase || "")}</strong>
          <div>
            <span class="isc-pill">${escapeHtml(p.isc_role || "unclassified")}</span>
            <span class="isc-pill">${escapeHtml(p.status || "new")}</span>
            <span class="isc-pill">${escapeHtml(p.space_uid || "")}</span>
          </div>
          <div>${escapeHtml(p.context || "")}</div>
          <div><em>${escapeHtml(p.normalized_id || "")}</em> ${escapeHtml(p.normalized_phrase || "")}</div>
          <button onclick="iscPickPhrase(${p.id}, '${escapeAttr(p.isc_role || "unclassified")}', '${escapeAttr(p.normalized_id || "")}', '${escapeAttr(p.normalized_phrase || "")}')">Pick for admin</button>
        `;
        list.appendChild(div);
      });
    } catch (e) {
      document.getElementById("phraseList").textContent = JSON.stringify(e, null, 2);
    }
  }

  function iscPickPhrase(id, role, normalizedId, normalizedPhrase) {
    document.getElementById("adminPhraseId").value = id;
    document.getElementById("adminRole").value = role;
    document.getElementById("normalizedId").value = normalizedId;
    document.getElementById("normalizedPhrase").value = normalizedPhrase;
    window.location.hash = "admin-normalization";
  }

  async function iscUpdatePhrase() {
    try {
      const id = document.getElementById("adminPhraseId").value.trim();

      const body = {
        isc_role: document.getElementById("adminRole").value,
        normalized_id: document.getElementById("normalizedId").value.trim(),
        normalized_phrase: document.getElementById("normalizedPhrase").value.trim(),
        cluster_description: document.getElementById("clusterDescription").value.trim(),
        status: document.getElementById("adminStatus").value,
        admin_note: document.getElementById("adminNote").value.trim()
      };

      const data = await iscRequest("/phrases/" + encodeURIComponent(id), {
        method: "PUT",
        body
      });

      iscShow("adminOut", data);
      await iscLoadPhrases();
    } catch (e) {
      iscShow("adminOut", e);
    }
  }

  async function iscExportSpace() {
    try {
      const spaceUid = document.getElementById("spaceSelect").value;
      const data = await iscRequest("/export-space?space_uid=" + encodeURIComponent(spaceUid), { headers: {} });
      iscShow("exportOut", data);
    } catch (e) {
      iscShow("exportOut", e);
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replaceAll("\n", " ");
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await iscCheckHealth();
    await iscLoadSpaces();
    await iscLoadPhrases();
  });
</script>

---

## API Flow

```text
Create Intention Space
        ↓
Submit phrases into that space
        ↓
Admin normalizes phrase clusters
        ↓
Admin classifies phrases as I / DN / O / Pulse / Signal / CPUX
        ↓
Export space JSON
        ↓
Use as seed for CPUX design
```

## Notes

- User login is handled by WordPress.
- Public read APIs can load spaces and phrases.
- Create/update APIs require authentication.
- Admin normalization requires a WordPress admin account or Application Password.
- The exported JSON is intentionally shaped as an Intention Space seed rather than a plain phrase list.
