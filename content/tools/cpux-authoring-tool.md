---
title: CPUX Authoring Tool
order: 12
description: Static CPUX authoring console for moving from scenario phrases to CPUX design, verification, and export
---

# CPUX Authoring Tool

The CPUX Authoring Tool helps an architect move from **Situational Reality** to an executable **Intention Space design seed**.

The workflow starts with a scenario expressed in ordinary language. From there, phrases are discovered, reviewed, mapped into Intention Space roles, grouped into CPUX interaction containers, checked against architectural invariants, and exported as JSON or Markdown.

This version is intentionally lightweight. It is designed to run as a static component inside this site, while optionally connecting to the WordPress-hosted ISC Phrase API introduced in the Phrase Collector console.

---

## Five-stage Workflow

| Stage | Tab | Purpose |
|---|---|---|
| S1 | Scenario | Enter or load a scenario and discover candidate phrases |
| S2 | Phrases | Review phrases, assign SR type, execution potential, IS role, and trivalence |
| S3 | CPUX Design | Visual IC designer: O_holder, DN, O_reflector, signals |
| S4 | Verification | Check against core CPUX architectural invariants |
| S5 | Export | Export JSON or Markdown documentation |

---

## CPUX Author Console

<div id="cpux-author" class="cpux-author">
  <div class="cpux-topbar">
    <div>
      <div class="cpux-kicker">CPUX Authoring Tool</div>
      <h2>Scenario → Phrases → CPUX → Verification → Export</h2>
    </div>
    <div class="cpux-badge" id="saveStatus">local draft</div>
  </div>

  <div class="cpux-tabs">
    <button id="tabBtnScenario" class="active" type="button">S1 Scenario</button>
    <button id="tabBtnPhrases" type="button">S2 Phrases</button>
    <button id="tabBtnDesign" type="button">S3 CPUX Design</button>
    <button id="tabBtnVerify" type="button">S4 Verification</button>
    <button id="tabBtnExport" type="button">S5 Export</button>
  </div>

  <section id="tab-scenario" class="cpux-panel active">
    <h3>S1 — Scenario Input</h3>
    <p class="cpux-hint">
      Start with ordinary field language. The goal is not final architecture yet, but phrase discovery.
    </p>

    <label>Project name</label>
    <input id="projectName" value="Cloud Architecture CPUX Draft" />

    <label>Scenario</label>
    <textarea id="scenarioText">A learner wants to deploy a small containerized web app for users in India and Australia. The app should be low cost when idle, survive a zone failure if possible, and avoid unexpected network or load balancer cost.</textarea>

    <div class="cpux-row">
      <button id="loadCloudExample" type="button">Load Cloud Example</button>
      <button id="loadLoginExample" type="button">Load Login Example</button>
      <button id="discoverPhrasesBtn" type="button">Discover Phrases</button>
      <button id="nextToPhrasesBtn" type="button">Next: Phrases</button>
    </div>

    <pre id="scenarioOut"></pre>
  </section>

  <section id="tab-phrases" class="cpux-panel">
    <h3>S2 — Phrase Review</h3>
    <p class="cpux-hint">
      Review discovered phrases. You can also import phrases from the WordPress ISC Phrase API.
    </p>

    <div class="cpux-card">
      <h4>WordPress ISC Phrase API Import</h4>

      <label>Phrase API endpoint</label>
      <input id="phraseApiEndpoint" value="https://keybytesystems.com/wp-json/isc/v1/phrases" />

      <label>Optional space_uid</label>
      <input id="phraseApiSpaceUid" placeholder="gcp_architect_field_language_001" />

      <button id="importPhrasesBtn" type="button">Import from API</button>

      <pre id="phraseImportOut"></pre>
    </div>

    <div class="cpux-card">
      <h4>Add phrase manually</h4>

      <label>Phrase</label>
      <input id="newPhraseText" placeholder="Example: reduce idle cost" />

      <div class="cpux-grid">
        <div>
          <label>SR Type</label>
          <select id="newSrType"></select>
        </div>
        <div>
          <label>Execution Potential</label>
          <select id="newExecutionPotential"></select>
        </div>
        <div>
          <label>IS Role</label>
          <select id="newIsRole"></select>
        </div>
        <div>
          <label>TV</label>
          <select id="newTv">
            <option value="Y">Y</option>
            <option value="U">U</option>
            <option value="N">N</option>
          </select>
        </div>
      </div>

      <button id="addPhraseBtn" type="button">Add Phrase</button>
    </div>

    <div id="phraseTable"></div>

    <div class="cpux-row">
      <button id="backToScenarioBtn" type="button">Back</button>
      <button id="nextToDesignBtn" type="button">Next: CPUX Design</button>
    </div>
  </section>

  <section id="tab-design" class="cpux-panel">
    <h3>S3 — CPUX Design</h3>
    <p class="cpux-hint">
      A simple IC design groups selected phrases into holder object, design node, reflector object, incoming signal, and emitted signal slots.
    </p>

    <div class="cpux-grid">
      <div>
        <label>IC ID</label>
        <input id="icId" value="IC_cloud_architecture_resolution" />
      </div>
      <div>
        <label>CPUX ID</label>
        <input id="cpuxId" value="CPUX_architecture_resolution_001" />
      </div>
    </div>

    <div class="cpux-grid">
      <div class="cpux-slot">
        <h4>Incoming Signal</h4>
        <textarea id="incomingSignal">analyze_architecture_situation</textarea>
      </div>
      <div class="cpux-slot">
        <h4>O_holder</h4>
        <textarea id="holderObject">O_situation_holder</textarea>
      </div>
      <div class="cpux-slot">
        <h4>DN</h4>
        <textarea id="designNode">DN_architecture_reasoner</textarea>
      </div>
      <div class="cpux-slot">
        <h4>O_reflector</h4>
        <textarea id="reflectorObject">O_decision_reflector</textarea>
      </div>
      <div class="cpux-slot">
        <h4>Emitted Signal</h4>
        <textarea id="emittedSignal">emit_architecture_recommendation</textarea>
      </div>
    </div>

    <div class="cpux-card">
      <h4>Generate simple CPUX from phrases</h4>
      <p class="cpux-hint">
        This lightweight generator does not call an LLM. It uses current phrase roles to populate a draft CPUX structure.
      </p>
      <button id="generateDesignBtn" type="button">Generate Draft Design</button>
      <pre id="designOut"></pre>
    </div>

    <div class="cpux-row">
      <button id="backToPhrasesBtn" type="button">Back</button>
      <button id="nextToVerifyBtn" type="button">Next: Verification</button>
    </div>
  </section>

  <section id="tab-verify" class="cpux-panel">
    <h3>S4 — Verification</h3>
    <p class="cpux-hint">
      These checks are not formal proof. They are lightweight architecture discipline checks before deeper LLM or runtime validation.
    </p>

    <button id="runVerifyBtn" type="button">Run Verification</button>

    <div id="verifyList"></div>

    <div class="cpux-row">
      <button id="backToDesignBtn" type="button">Back</button>
      <button id="nextToExportBtn" type="button">Next: Export</button>
    </div>
  </section>

  <section id="tab-export" class="cpux-panel">
    <h3>S5 — Export</h3>
    <p class="cpux-hint">
      Export the current draft as JSON or Markdown documentation.
    </p>

    <div class="cpux-row">
      <button id="buildExportBtn" type="button">Build Export</button>
      <button id="downloadJsonBtn" type="button">Download JSON</button>
      <button id="downloadMarkdownBtn" type="button">Download Markdown</button>
      <button id="clearDraftBtn" type="button">Clear Local Draft</button>
    </div>

    <pre id="exportOut"></pre>

    <div class="cpux-row">
      <button id="backToVerifyBtn" type="button">Back</button>
    </div>
  </section>
</div>

<style>
  .cpux-author {
    margin-top: 24px;
    border: 1px solid #253b61;
    border-radius: 14px;
    overflow: hidden;
    background: #0f2343;
    color: #e8eefc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .cpux-topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 22px;
    background: linear-gradient(135deg, #102b57, #163b72);
    border-bottom: 1px solid #36527c;
  }

  .cpux-topbar h2 {
    margin: 4px 0 0 0;
    color: #fff;
    font-size: 24px;
  }

  .cpux-kicker {
    color: #ffb357;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
    font-size: 13px;
  }

  .cpux-badge {
    border: 1px solid #6a86b5;
    background: #132a4f;
    color: #d7e4ff;
    border-radius: 999px;
    padding: 8px 12px;
    white-space: nowrap;
    font-size: 13px;
  }

  .cpux-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 12px;
    background: #0b1930;
    border-bottom: 1px solid #36527c;
  }

  .cpux-tabs button,
  .cpux-author button {
    background: #1c3d70;
    border: 1px solid #3c5f93;
    color: #f4f7ff;
    border-radius: 8px;
    padding: 10px 12px;
    cursor: pointer;
    font-weight: 700;
  }

  .cpux-tabs button.active {
    background: #ff8f1f;
    border-color: #ffb357;
    color: #1b1208;
  }

  .cpux-author button:hover {
    opacity: .92;
  }

  .cpux-panel {
    display: none;
    padding: 22px;
  }

  .cpux-panel.active {
    display: block;
  }

  .cpux-panel h3 {
    color: #fff;
    margin-top: 0;
  }

  .cpux-card,
  .cpux-slot {
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 12px;
    padding: 16px;
    margin: 14px 0;
  }

  .cpux-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .cpux-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 14px 0;
  }

  .cpux-author label {
    display: block;
    font-weight: 700;
    margin-top: 12px;
    color: #cbd7f4;
  }

  .cpux-author input,
  .cpux-author textarea,
  .cpux-author select {
    width: 100%;
    box-sizing: border-box;
    margin-top: 6px;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #4e6c9e;
    background: #0c1b33;
    color: #ffffff;
    font-size: 15px;
  }

  .cpux-author textarea {
    min-height: 120px;
  }

  .cpux-author pre {
    white-space: pre-wrap;
    word-break: break-word;
    background: #081122;
    color: #d9e6ff;
    border: 1px solid #263d63;
    border-radius: 10px;
    padding: 12px;
    min-height: 40px;
    overflow: auto;
  }

  .cpux-hint {
    color: #aebfe4;
  }

  .phrase-row {
    display: grid;
    grid-template-columns: 1.4fr .9fr .9fr .8fr .35fr .35fr;
    gap: 8px;
    align-items: start;
    padding: 10px;
    border-bottom: 1px solid rgba(255,255,255,.1);
  }

  .phrase-row.header {
    font-weight: 800;
    color: #ffcf91;
  }

  .phrase-row button {
    padding: 8px;
  }

  .verify-item {
    padding: 12px;
    margin: 8px 0;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,.14);
  }

  .verify-ok {
    background: rgba(22, 163, 74, .18);
  }

  .verify-warn {
    background: rgba(245, 158, 11, .18);
  }

  @media (max-width: 900px) {
    .cpux-grid,
    .phrase-row {
      grid-template-columns: 1fr;
    }

    .cpux-topbar {
      align-items: flex-start;
      flex-direction: column;
    }
  }
</style>

<script>
(function () {
  "use strict";

  const storeKey = "intentix.cpux.author.v2";

  const schema = {
    sr_types: [
      "unclassified",
      "action_phrase",
      "constraint_phrase",
      "resource_phrase",
      "service_phrase",
      "decision_phrase",
      "actor_phrase",
      "state_phrase",
      "risk_phrase",
      "cost_phrase",
      "location_phrase",
      "network_phrase",
      "data_phrase",
      "observability_phrase"
    ],
    execution_potentials: [
      "unknown",
      "active",
      "passive",
      "interpretive",
      "external_capability",
      "field_condition"
    ],
    isc_roles: [
      "unclassified",
      "intention",
      "design_node",
      "object",
      "pulse",
      "signal",
      "cpux",
      "constraint",
      "service",
      "resource",
      "decision_phrase"
    ]
  };

  let phrases = [];
  let exportData = null;

  function byId(id) {
    return document.getElementById(id);
  }

  function showTab(name) {
    const tabNames = ["scenario", "phrases", "design", "verify", "export"];
    tabNames.forEach(tab => {
      byId("tab-" + tab).classList.toggle("active", tab === name);
    });

    const buttonMap = {
      scenario: "tabBtnScenario",
      phrases: "tabBtnPhrases",
      design: "tabBtnDesign",
      verify: "tabBtnVerify",
      export: "tabBtnExport"
    };

    Object.keys(buttonMap).forEach(tab => {
      byId(buttonMap[tab]).classList.toggle("active", tab === name);
    });
  }

  function fillSelect(id, values, selected) {
    const select = byId(id);
    select.innerHTML = "";
    values.forEach(value => {
      const opt = document.createElement("option");
      opt.value = value;
      opt.textContent = value;
      if (value === selected) opt.selected = true;
      select.appendChild(opt);
    });
  }

  function initSelects() {
    fillSelect("newSrType", schema.sr_types, "action_phrase");
    fillSelect("newExecutionPotential", schema.execution_potentials, "unknown");
    fillSelect("newIsRole", schema.isc_roles, "unclassified");
  }

  function loadExample(type) {
    if (type === "login") {
      byId("scenarioText").value =
        "A user opens a login screen, enters email and password, submits credentials, receives either an authenticated session or a failure message. The UI must mirror the authentication state and avoid storing sensitive information in the client.";
      byId("projectName").value = "Login CPUX Draft";
    } else {
      byId("scenarioText").value =
        "A learner wants to deploy a small containerized web app for users in India and Australia. The app should be low cost when idle, survive a zone failure if possible, and avoid unexpected network or load balancer cost.";
      byId("projectName").value = "Cloud Architecture CPUX Draft";
    }
    autosave();
  }

  function discoverPhrases() {
    const text = byId("scenarioText").value.toLowerCase();

    const patterns = [
      ["deploy", "deploy workload", "action_phrase", "active", "intention", "Y"],
      ["container", "containerized workload", "resource_phrase", "passive", "resource", "Y"],
      ["users", "users exist", "actor_phrase", "interpretive", "design_node", "Y"],
      ["low cost", "reduce idle cost", "constraint_phrase", "field_condition", "constraint", "Y"],
      ["idle", "idle usage expected", "state_phrase", "field_condition", "pulse", "Y"],
      ["zone failure", "survive zone failure", "constraint_phrase", "field_condition", "constraint", "Y"],
      ["network", "network cost risk", "risk_phrase", "field_condition", "pulse", "U"],
      ["load balancer", "load balancer cost risk", "risk_phrase", "field_condition", "pulse", "U"],
      ["login", "login requested", "action_phrase", "active", "intention", "Y"],
      ["credentials", "credentials submitted", "state_phrase", "field_condition", "pulse", "Y"],
      ["authenticated", "authentication state", "state_phrase", "field_condition", "pulse", "U"],
      ["ui", "ui mirrors state", "constraint_phrase", "field_condition", "constraint", "Y"]
    ];

    patterns.forEach(item => {
      const needle = item[0];
      const phrase = item[1];
      if (text.includes(needle) && !phrases.some(p => p.phrase === phrase)) {
        phrases.push({
          id: makeId(),
          phrase: phrase,
          sr_type: item[2],
          execution_potential: item[3],
          isc_role: item[4],
          tv: item[5]
        });
      }
    });

    renderPhrases();
    autosave();
    byId("scenarioOut").textContent =
      "Discovered " + phrases.length + " candidate phrases. Review them in S2.";
  }

  async function importPhrases() {
    const endpointBase = byId("phraseApiEndpoint").value.trim();
    const spaceUid = byId("phraseApiSpaceUid").value.trim();
    const endpoint = spaceUid
      ? endpointBase + "?space_uid=" + encodeURIComponent(spaceUid)
      : endpointBase;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      const imported = data.phrases || [];

      imported.forEach(p => {
        const phrase = p.phrase || p.normalized_phrase || "";
        if (phrase && !phrases.some(existing => existing.phrase === phrase)) {
          phrases.push({
            id: makeId(),
            phrase: phrase,
            sr_type: p.sr_type || "unclassified",
            execution_potential: p.execution_potential || "unknown",
            isc_role: p.isc_role || "unclassified",
            tv: "U"
          });
        }
      });

      renderPhrases();
      autosave();
      byId("phraseImportOut").textContent =
        JSON.stringify({ imported: imported.length, total: phrases.length }, null, 2);
    } catch (e) {
      byId("phraseImportOut").textContent =
        JSON.stringify({ error: String(e) }, null, 2);
    }
  }

  function addPhrase() {
    const phrase = byId("newPhraseText").value.trim();
    if (!phrase) return;

    phrases.push({
      id: makeId(),
      phrase: phrase,
      sr_type: byId("newSrType").value,
      execution_potential: byId("newExecutionPotential").value,
      isc_role: byId("newIsRole").value,
      tv: byId("newTv").value
    });

    byId("newPhraseText").value = "";
    renderPhrases();
    autosave();
  }

  function renderPhrases() {
    const root = byId("phraseTable");
    root.innerHTML = "";

    const header = document.createElement("div");
    header.className = "phrase-row header";
    ["Phrase", "SR Type", "Potential", "IS Role", "TV", ""].forEach(label => {
      const cell = document.createElement("div");
      cell.textContent = label;
      header.appendChild(cell);
    });
    root.appendChild(header);

    phrases.forEach((p, index) => {
      const row = document.createElement("div");
      row.className = "phrase-row";

      const phraseInput = document.createElement("input");
      phraseInput.value = p.phrase || "";
      phraseInput.addEventListener("change", () => updatePhrase(index, "phrase", phraseInput.value));

      const srSelect = buildSelect(schema.sr_types, p.sr_type);
      srSelect.addEventListener("change", () => updatePhrase(index, "sr_type", srSelect.value));

      const potentialSelect = buildSelect(schema.execution_potentials, p.execution_potential);
      potentialSelect.addEventListener("change", () => updatePhrase(index, "execution_potential", potentialSelect.value));

      const roleSelect = buildSelect(schema.isc_roles, p.isc_role);
      roleSelect.addEventListener("change", () => updatePhrase(index, "isc_role", roleSelect.value));

      const tvSelect = buildSelect(["Y", "U", "N"], p.tv);
      tvSelect.addEventListener("change", () => updatePhrase(index, "tv", tvSelect.value));

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", () => removePhrase(index));

      row.appendChild(phraseInput);
      row.appendChild(srSelect);
      row.appendChild(potentialSelect);
      row.appendChild(roleSelect);
      row.appendChild(tvSelect);
      row.appendChild(removeBtn);
      root.appendChild(row);
    });
  }

  function buildSelect(values, selected) {
    const select = document.createElement("select");
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      if (value === selected) option.selected = true;
      select.appendChild(option);
    });
    return select;
  }

  function updatePhrase(index, key, value) {
    phrases[index][key] = value;
    autosave();
  }

  function removePhrase(index) {
    phrases.splice(index, 1);
    renderPhrases();
    autosave();
  }

  function generateDesign() {
    const intentions = phrases.filter(p => p.isc_role === "intention").map(p => p.phrase);
    const pulseTexts = phrases.filter(p => p.isc_role === "pulse").map(p => p.phrase + ":" + p.tv);
    const dns = phrases.filter(p => p.isc_role === "design_node").map(p => p.phrase);
    const constraints = phrases.filter(p => p.isc_role === "constraint").map(p => p.phrase);

    if (intentions[0]) byId("incomingSignal").value = intentions[0];
    if (dns[0]) byId("designNode").value = "DN_" + slug(dns[0]);
    if (constraints[0]) byId("emittedSignal").value = "resolve_" + slug(constraints[0]);

    const draft = currentState();
    draft.design_summary = {
      intentions: intentions,
      pulses: pulseTexts,
      dns: dns,
      constraints: constraints
    };

    byId("designOut").textContent = JSON.stringify(draft.design_summary, null, 2);
    autosave();
  }

  function verify() {
    const checks = [
      {
        name: "Has scenario",
        ok: byId("scenarioText").value.trim().length > 20,
        hint: "Scenario should describe a real situation."
      },
      {
        name: "Has phrases",
        ok: phrases.length > 0,
        hint: "Phrase discovery or import should produce phrases."
      },
      {
        name: "Has at least one Intention",
        ok: phrases.some(p => p.isc_role === "intention"),
        hint: "A CPUX needs an intention to orient execution."
      },
      {
        name: "Has at least one Pulse",
        ok: phrases.some(p => p.isc_role === "pulse"),
        hint: "Pulses represent perceived state and gatekeeping."
      },
      {
        name: "Has candidate DN",
        ok: phrases.some(p => p.isc_role === "design_node") || byId("designNode").value.trim().length > 0,
        hint: "A DN may be machine, human, art, model, or service if it absorbs/emits intention."
      },
      {
        name: "Has holder object",
        ok: byId("holderObject").value.trim().length > 0,
        hint: "Holder object supports pulse accumulation."
      },
      {
        name: "Has reflector object",
        ok: byId("reflectorObject").value.trim().length > 0,
        hint: "Reflector object supports handoff / mapping."
      },
      {
        name: "UI as mirror discipline",
        ok: !byId("scenarioText").value.toLowerCase().includes("ui computes"),
        hint: "UI should mirror field state; computation belongs in DNs."
      }
    ];

    const root = byId("verifyList");
    root.innerHTML = "";

    checks.forEach(c => {
      const div = document.createElement("div");
      div.className = "verify-item " + (c.ok ? "verify-ok" : "verify-warn");
      const title = document.createElement("strong");
      title.textContent = (c.ok ? "✓ " : "⚠ ") + c.name;
      const br = document.createElement("br");
      const hint = document.createElement("span");
      hint.textContent = c.hint;
      div.appendChild(title);
      div.appendChild(br);
      div.appendChild(hint);
      root.appendChild(div);
    });
  }

  function buildExport() {
    exportData = currentState();
    byId("exportOut").textContent = JSON.stringify(exportData, null, 2);
    return exportData;
  }

  function currentState() {
    return {
      schema: "intentix.cpux.author.static.v2",
      project: {
        name: byId("projectName").value,
        saved_at: new Date().toISOString()
      },
      scenario: byId("scenarioText").value,
      phrases: phrases,
      cpux_design: {
        cpux_id: byId("cpuxId").value,
        ic_id: byId("icId").value,
        incoming_signal: byId("incomingSignal").value,
        holder_object: byId("holderObject").value,
        design_node: byId("designNode").value,
        reflector_object: byId("reflectorObject").value,
        emitted_signal: byId("emittedSignal").value
      }
    };
  }

  function downloadJson() {
    const data = buildExport();
    download("cpux-author-export.json", JSON.stringify(data, null, 2), "application/json");
  }

  function downloadMarkdown() {
    const data = buildExport();
    const lines = [];
    lines.push("# " + data.project.name);
    lines.push("");
    lines.push("## Scenario");
    lines.push(data.scenario);
    lines.push("");
    lines.push("## Phrases");
    data.phrases.forEach(p => {
      lines.push("- `" + p.tv + "` **" + p.phrase + "** — SR: `" + p.sr_type + "`, Potential: `" + p.execution_potential + "`, IS: `" + p.isc_role + "`");
    });
    lines.push("");
    lines.push("## CPUX Design");
    lines.push("```" + "json");
    lines.push(JSON.stringify(data.cpux_design, null, 2));
    lines.push("```" + "");

    download("cpux-author-export.md", lines.join("\n"), "text/markdown");
  }

  function download(filename, content, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function autosave() {
    try {
      localStorage.setItem(storeKey, JSON.stringify(currentState()));
      byId("saveStatus").textContent = "saved locally";
    } catch (e) {
      byId("saveStatus").textContent = "save unavailable";
    }
  }

  function loadDraft() {
    const raw = localStorage.getItem(storeKey);
    if (!raw) return;

    try {
      const data = JSON.parse(raw);
      byId("projectName").value = data.project?.name || "Cloud Architecture CPUX Draft";
      byId("scenarioText").value = data.scenario || "";
      phrases = data.phrases || [];

      const d = data.cpux_design || {};
      byId("cpuxId").value = d.cpux_id || "CPUX_architecture_resolution_001";
      byId("icId").value = d.ic_id || "IC_cloud_architecture_resolution";
      byId("incomingSignal").value = d.incoming_signal || "analyze_architecture_situation";
      byId("holderObject").value = d.holder_object || "O_situation_holder";
      byId("designNode").value = d.design_node || "DN_architecture_reasoner";
      byId("reflectorObject").value = d.reflector_object || "O_decision_reflector";
      byId("emittedSignal").value = d.emitted_signal || "emit_architecture_recommendation";
    } catch (e) {
      console.warn(e);
    }
  }

  function clearDraft() {
    localStorage.removeItem(storeKey);
    location.reload();
  }

  function makeId() {
    return "p_" + Math.random().toString(36).slice(2, 10);
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function bindEvents() {
    byId("tabBtnScenario").addEventListener("click", () => showTab("scenario"));
    byId("tabBtnPhrases").addEventListener("click", () => showTab("phrases"));
    byId("tabBtnDesign").addEventListener("click", () => showTab("design"));
    byId("tabBtnVerify").addEventListener("click", () => showTab("verify"));
    byId("tabBtnExport").addEventListener("click", () => showTab("export"));

    byId("loadCloudExample").addEventListener("click", () => loadExample("cloud"));
    byId("loadLoginExample").addEventListener("click", () => loadExample("login"));
    byId("discoverPhrasesBtn").addEventListener("click", discoverPhrases);
    byId("nextToPhrasesBtn").addEventListener("click", () => showTab("phrases"));

    byId("importPhrasesBtn").addEventListener("click", importPhrases);
    byId("addPhraseBtn").addEventListener("click", addPhrase);
    byId("backToScenarioBtn").addEventListener("click", () => showTab("scenario"));
    byId("nextToDesignBtn").addEventListener("click", () => showTab("design"));

    byId("generateDesignBtn").addEventListener("click", generateDesign);
    byId("backToPhrasesBtn").addEventListener("click", () => showTab("phrases"));
    byId("nextToVerifyBtn").addEventListener("click", () => showTab("verify"));

    byId("runVerifyBtn").addEventListener("click", verify);
    byId("backToDesignBtn").addEventListener("click", () => showTab("design"));
    byId("nextToExportBtn").addEventListener("click", () => showTab("export"));

    byId("buildExportBtn").addEventListener("click", buildExport);
    byId("downloadJsonBtn").addEventListener("click", downloadJson);
    byId("downloadMarkdownBtn").addEventListener("click", downloadMarkdown);
    byId("clearDraftBtn").addEventListener("click", clearDraft);
    byId("backToVerifyBtn").addEventListener("click", () => showTab("verify"));

    [
      "projectName", "scenarioText", "icId", "cpuxId",
      "incomingSignal", "holderObject", "designNode",
      "reflectorObject", "emittedSignal"
    ].forEach(id => byId(id).addEventListener("input", autosave));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSelects();
    loadDraft();
    renderPhrases();
    bindEvents();
  });
})();
</script>

---

## Simplification Notes

This static component intentionally avoids a heavy backend dependency.

- Authentication is delegated to the WordPress ISC Phrase API when importing phrase collections.
- Phrase discovery is rule-assisted in this page; the LLM step can be added later.
- CPUX synthesis is draft-oriented, not final runtime generation.
- Verification checks are lightweight invariants, suitable for early authoring discipline.
- Export produces a portable seed that can later feed a full CPUX engine.

## Suggested Next Step

Use the Phrase Collector API first to build phrase spaces. Then use this CPUX Authoring Tool to pull a phrase space into a design session and shape it into an IC / CPUX draft.
