---
title: CPUX Authoring Tool
order: 12
description: Static CPUX authoring console for moving from scenario phrases to CPUX design, verification, and export
---

# CPUX Authoring Tool

The CPUX Authoring Tool helps an architect move from **Situational Reality** to an executable **Intention Space design seed**.

The workflow starts with a scenario expressed in ordinary language. From there, phrases are discovered, reviewed, mapped into Intention Space roles, grouped into CPUX interaction containers, checked against architectural invariants, and exported as JSON or Markdown.

This version is intentionally lightweight. It is designed to run as a static component inside this site, while optionally connecting to the WordPress-hosted ISC Phrase API introduced in the Phrase Collector console. That API provides phrase collections with fields such as `isc_role`, `sr_type`, and `execution_potential`.

---

## Five-stage Workflow

| Stage | Tab | Purpose |
|---|---|---|
| S1 | Scenario | Enter or load a scenario and discover candidate phrases |
| S2 | Phrases | Review phrases, assign SR type, execution potential, IS role, and trivalence |
| S3 | CPUX Design | Group phrases into IC slots: O_holder, DN, O_reflector, signals |
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
    <button class="active" onclick="cpuxShowTab('scenario')">S1 Scenario</button>
    <button onclick="cpuxShowTab('phrases')">S2 Phrases</button>
    <button onclick="cpuxShowTab('design')">S3 CPUX Design</button>
    <button onclick="cpuxShowTab('verify')">S4 Verification</button>
    <button onclick="cpuxShowTab('export')">S5 Export</button>
  </div>

  <section id="tab-scenario" class="cpux-panel active">
    <h3>S1 — Scenario Input</h3>
    <p class="cpux-hint">Start with ordinary field language. The goal is not final architecture yet, but phrase discovery.</p>

    <label>Project name</label>
    <input id="projectName" value="Cloud Architecture CPUX Draft" oninput="cpuxAutosave()" />

    <label>Scenario</label>
    <textarea id="scenarioText" oninput="cpuxAutosave()">A learner wants to deploy a small containerized web app for users in India and Australia. The app should be low cost when idle, survive a zone failure if possible, and avoid unexpected network or load balancer cost.</textarea>

    <div class="cpux-row">
      <button onclick="cpuxLoadExample('cloud')">Load Cloud Example</button>
      <button onclick="cpuxLoadExample('login')">Load Login Example</button>
      <button onclick="cpuxDiscoverPhrases()">Discover Phrases</button>
      <button onclick="cpuxShowTab('phrases')">Next: Phrases</button>
    </div>

    <pre id="scenarioOut"></pre>
  </section>

  <section id="tab-phrases" class="cpux-panel">
    <h3>S2 — Phrase Review</h3>
    <p class="cpux-hint">Review discovered phrases. You can also import phrases from the WordPress ISC Phrase API.</p>

    <div class="cpux-card">
      <h4>WordPress ISC Phrase API Import</h4>
      <label>Phrase API endpoint</label>
      <input id="phraseApiEndpoint" value="https://keybytesystems.com/wp-json/isc/v1/phrases" />
      <label>Optional space_uid</label>
      <input id="phraseApiSpaceUid" placeholder="gcp_architect_field_language_001" />
      <button onclick="cpuxImportPhrases()">Import from API</button>
      <pre id="phraseImportOut"></pre>
    </div>

    <div class="cpux-card">
      <h4>Add phrase manually</h4>
      <label>Phrase</label>
      <input id="newPhraseText" placeholder="Example: reduce idle cost" />

      <div class="cpux-grid">
        <div><label>SR Type</label><select id="newSrType"></select></div>
        <div><label>Execution Potential</label><select id="newExecutionPotential"></select></div>
        <div><label>IS Role</label><select id="newIsRole"></select></div>
        <div><label>TV</label><select id="newTv"><option value="Y">Y</option><option value="U">U</option><option value="N">N</option></select></div>
      </div>

      <button onclick="cpuxAddPhrase()">Add Phrase</button>
    </div>

    <div id="phraseTable"></div>

    <div class="cpux-row">
      <button onclick="cpuxShowTab('scenario')">Back</button>
      <button onclick="cpuxShowTab('design')">Next: CPUX Design</button>
    </div>
  </section>

  <section id="tab-design" class="cpux-panel">
    <h3>S3 — CPUX Design</h3>
    <p class="cpux-hint">A simple IC design groups selected phrases into holder object, design node, reflector object, incoming signal, and emitted signal slots.</p>

    <div class="cpux-grid">
      <div><label>IC ID</label><input id="icId" value="IC_cloud_architecture_resolution" oninput="cpuxAutosave()" /></div>
      <div><label>CPUX ID</label><input id="cpuxId" value="CPUX_architecture_resolution_001" oninput="cpuxAutosave()" /></div>
    </div>

    <div class="cpux-grid">
      <div class="cpux-slot"><h4>Incoming Signal</h4><textarea id="incomingSignal" oninput="cpuxAutosave()">analyze_architecture_situation</textarea></div>
      <div class="cpux-slot"><h4>O_holder</h4><textarea id="holderObject" oninput="cpuxAutosave()">O_situation_holder</textarea></div>
      <div class="cpux-slot"><h4>DN</h4><textarea id="designNode" oninput="cpuxAutosave()">DN_architecture_reasoner</textarea></div>
      <div class="cpux-slot"><h4>O_reflector</h4><textarea id="reflectorObject" oninput="cpuxAutosave()">O_decision_reflector</textarea></div>
      <div class="cpux-slot"><h4>Emitted Signal</h4><textarea id="emittedSignal" oninput="cpuxAutosave()">emit_architecture_recommendation</textarea></div>
    </div>

    <div class="cpux-card">
      <h4>Generate simple CPUX from phrases</h4>
      <p class="cpux-hint">This lightweight generator does not call an LLM. It uses current phrase roles to populate a draft CPUX structure.</p>
      <button onclick="cpuxGenerateDesign()">Generate Draft Design</button>
      <pre id="designOut"></pre>
    </div>

    <div class="cpux-row">
      <button onclick="cpuxShowTab('phrases')">Back</button>
      <button onclick="cpuxShowTab('verify')">Next: Verification</button>
    </div>
  </section>

  <section id="tab-verify" class="cpux-panel">
    <h3>S4 — Verification</h3>
    <p class="cpux-hint">These checks are not formal proof. They are lightweight architecture discipline checks before deeper LLM or runtime validation.</p>
    <button onclick="cpuxVerify()">Run Verification</button>
    <div id="verifyList"></div>
    <div class="cpux-row"><button onclick="cpuxShowTab('design')">Back</button><button onclick="cpuxShowTab('export')">Next: Export</button></div>
  </section>

  <section id="tab-export" class="cpux-panel">
    <h3>S5 — Export</h3>
    <p class="cpux-hint">Export the current draft as JSON or Markdown documentation.</p>
    <div class="cpux-row">
      <button onclick="cpuxBuildExport()">Build Export</button>
      <button onclick="cpuxDownloadJson()">Download JSON</button>
      <button onclick="cpuxDownloadMarkdown()">Download Markdown</button>
      <button onclick="cpuxClearDraft()">Clear Local Draft</button>
    </div>
    <pre id="exportOut"></pre>
    <div class="cpux-row"><button onclick="cpuxShowTab('verify')">Back</button></div>
  </section>
</div>

<style>
  .cpux-author{margin-top:24px;border:1px solid #253b61;border-radius:14px;overflow:hidden;background:#0f2343;color:#e8eefc;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.cpux-topbar{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px;background:linear-gradient(135deg,#102b57,#163b72);border-bottom:1px solid #36527c}.cpux-topbar h2{margin:4px 0 0;color:#fff;font-size:24px}.cpux-kicker{color:#ffb357;font-weight:800;letter-spacing:.08em;text-transform:uppercase;font-size:13px}.cpux-badge{border:1px solid #6a86b5;background:#132a4f;color:#d7e4ff;border-radius:999px;padding:8px 12px;white-space:nowrap;font-size:13px}.cpux-tabs{display:flex;flex-wrap:wrap;gap:6px;padding:12px;background:#0b1930;border-bottom:1px solid #36527c}.cpux-tabs button,.cpux-author button{background:#1c3d70;border:1px solid #3c5f93;color:#f4f7ff;border-radius:8px;padding:10px 12px;cursor:pointer;font-weight:700}.cpux-tabs button.active{background:#ff8f1f;border-color:#ffb357;color:#1b1208}.cpux-author button:hover{opacity:.92}.cpux-panel{display:none;padding:22px}.cpux-panel.active{display:block}.cpux-panel h3{color:#fff;margin-top:0}.cpux-card,.cpux-slot{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:16px;margin:14px 0}.cpux-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.cpux-row{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}.cpux-author label{display:block;font-weight:700;margin-top:12px;color:#cbd7f4}.cpux-author input,.cpux-author textarea,.cpux-author select{width:100%;box-sizing:border-box;margin-top:6px;padding:10px;border-radius:8px;border:1px solid #4e6c9e;background:#0c1b33;color:#fff;font-size:15px}.cpux-author textarea{min-height:120px}.cpux-author pre{white-space:pre-wrap;word-break:break-word;background:#081122;color:#d9e6ff;border:1px solid #263d63;border-radius:10px;padding:12px;min-height:40px;overflow:auto}.cpux-hint{color:#aebfe4}.phrase-row{display:grid;grid-template-columns:1.4fr .9fr .9fr .8fr .35fr .35fr;gap:8px;align-items:start;padding:10px;border-bottom:1px solid rgba(255,255,255,.1)}.phrase-row.header{font-weight:800;color:#ffcf91}.phrase-row button{padding:8px}.verify-item{padding:12px;margin:8px 0;border-radius:10px;border:1px solid rgba(255,255,255,.14)}.verify-ok{background:rgba(22,163,74,.18)}.verify-warn{background:rgba(245,158,11,.18)}@media(max-width:900px){.cpux-grid,.phrase-row{grid-template-columns:1fr}.cpux-topbar{align-items:flex-start;flex-direction:column}}
</style>

<script>
const cpuxStoreKey="intentix.cpux.author.v1";const cpuxSchema={sr_types:["unclassified","action_phrase","constraint_phrase","resource_phrase","service_phrase","decision_phrase","actor_phrase","state_phrase","risk_phrase","cost_phrase","location_phrase","network_phrase","data_phrase","observability_phrase"],execution_potentials:["unknown","active","passive","interpretive","external_capability","field_condition"],isc_roles:["unclassified","intention","design_node","object","pulse","signal","cpux","constraint","service","resource","decision_phrase"]};let cpuxPhrases=[];let cpuxExport=null;
function cpuxShowTab(name){document.querySelectorAll(".cpux-tabs button").forEach(b=>b.classList.remove("active"));document.querySelectorAll(".cpux-panel").forEach(p=>p.classList.remove("active"));const m={scenario:0,phrases:1,design:2,verify:3,export:4};document.querySelectorAll(".cpux-tabs button")[m[name]].classList.add("active");document.getElementById("tab-"+name).classList.add("active")}
function cpuxFillSelect(id,values,selected){const s=document.getElementById(id);s.innerHTML="";values.forEach(v=>{const o=document.createElement("option");o.value=v;o.textContent=v;if(v===selected)o.selected=true;s.appendChild(o)})}
function cpuxInitSelects(){cpuxFillSelect("newSrType",cpuxSchema.sr_types,"action_phrase");cpuxFillSelect("newExecutionPotential",cpuxSchema.execution_potentials,"unknown");cpuxFillSelect("newIsRole",cpuxSchema.isc_roles,"unclassified")}
function cpuxLoadExample(type){if(type==="login"){document.getElementById("scenarioText").value="A user opens a login screen, enters email and password, submits credentials, receives either an authenticated session or a failure message. The UI must mirror the authentication state and avoid storing sensitive information in the client.";document.getElementById("projectName").value="Login CPUX Draft"}else{document.getElementById("scenarioText").value="A learner wants to deploy a small containerized web app for users in India and Australia. The app should be low cost when idle, survive a zone failure if possible, and avoid unexpected network or load balancer cost.";document.getElementById("projectName").value="Cloud Architecture CPUX Draft"}cpuxAutosave()}
function cpuxDiscoverPhrases(){const text=document.getElementById("scenarioText").value.toLowerCase();const patterns=[["deploy","deploy workload","action_phrase","active","intention","Y"],["container","containerized workload","resource_phrase","passive","resource","Y"],["users","users exist","actor_phrase","interpretive","design_node","Y"],["low cost","reduce idle cost","constraint_phrase","field_condition","constraint","Y"],["idle","idle usage expected","state_phrase","field_condition","pulse","Y"],["zone failure","survive zone failure","constraint_phrase","field_condition","constraint","Y"],["network","network cost risk","risk_phrase","field_condition","pulse","U"],["load balancer","load balancer cost risk","risk_phrase","field_condition","pulse","U"],["login","login requested","action_phrase","active","intention","Y"],["credentials","credentials submitted","state_phrase","field_condition","pulse","Y"],["authenticated","authentication state","state_phrase","field_condition","pulse","U"],["ui","ui mirrors state","constraint_phrase","field_condition","constraint","Y"]];patterns.forEach(([needle,phrase,srType,potential,role,tv])=>{if(text.includes(needle)&&!cpuxPhrases.some(p=>p.phrase===phrase)){cpuxPhrases.push({id:cpuxId(),phrase,sr_type:srType,execution_potential:potential,isc_role:role,tv})}});cpuxRenderPhrases();cpuxAutosave();document.getElementById("scenarioOut").textContent="Discovered "+cpuxPhrases.length+" candidate phrases. Review them in S2."}
async function cpuxImportPhrases(){const endpointBase=document.getElementById("phraseApiEndpoint").value.trim();const spaceUid=document.getElementById("phraseApiSpaceUid").value.trim();const endpoint=spaceUid?endpointBase+"?space_uid="+encodeURIComponent(spaceUid):endpointBase;try{const res=await fetch(endpoint);const data=await res.json();const imported=data.phrases||[];imported.forEach(p=>{const phrase=p.phrase||p.normalized_phrase||"";if(phrase&&!cpuxPhrases.some(e=>e.phrase===phrase)){cpuxPhrases.push({id:cpuxId(),phrase,sr_type:p.sr_type||"unclassified",execution_potential:p.execution_potential||"unknown",isc_role:p.isc_role||"unclassified",tv:"U"})}});cpuxRenderPhrases();cpuxAutosave();document.getElementById("phraseImportOut").textContent=JSON.stringify({imported:imported.length,total:cpuxPhrases.length},null,2)}catch(e){document.getElementById("phraseImportOut").textContent=JSON.stringify({error:String(e)},null,2)}}
function cpuxAddPhrase(){const phrase=document.getElementById("newPhraseText").value.trim();if(!phrase)return;cpuxPhrases.push({id:cpuxId(),phrase,sr_type:document.getElementById("newSrType").value,execution_potential:document.getElementById("newExecutionPotential").value,isc_role:document.getElementById("newIsRole").value,tv:document.getElementById("newTv").value});document.getElementById("newPhraseText").value="";cpuxRenderPhrases();cpuxAutosave()}
function cpuxRenderPhrases(){const root=document.getElementById("phraseTable");root.innerHTML="";const header=document.createElement("div");header.className="phrase-row header";header.innerHTML="<div>Phrase</div><div>SR Type</div><div>Potential</div><div>IS Role</div><div>TV</div><div></div>";root.appendChild(header);cpuxPhrases.forEach((p,index)=>{const row=document.createElement("div");row.className="phrase-row";row.innerHTML=`<input value="${escapeAttr(p.phrase)}" onchange="cpuxUpdatePhrase(${index}, 'phrase', this.value)" /><select onchange="cpuxUpdatePhrase(${index}, 'sr_type', this.value)">${cpuxOptions(cpuxSchema.sr_types,p.sr_type)}</select><select onchange="cpuxUpdatePhrase(${index}, 'execution_potential', this.value)">${cpuxOptions(cpuxSchema.execution_potentials,p.execution_potential)}</select><select onchange="cpuxUpdatePhrase(${index}, 'isc_role', this.value)">${cpuxOptions(cpuxSchema.isc_roles,p.isc_role)}</select><select onchange="cpuxUpdatePhrase(${index}, 'tv', this.value)">${cpuxOptions(["Y","U","N"],p.tv)}</select><button onclick="cpuxRemovePhrase(${index})">×</button>`;root.appendChild(row)})}
function cpuxOptions(values,selected){return values.map(v=>`<option value="${escapeAttr(v)}" ${v===selected?"selected":""}>${escapeHtml(v)}</option>`).join("")}
function cpuxUpdatePhrase(index,key,value){cpuxPhrases[index][key]=value;cpuxAutosave()}function cpuxRemovePhrase(index){cpuxPhrases.splice(index,1);cpuxRenderPhrases();cpuxAutosave()}
function cpuxGenerateDesign(){const intentions=cpuxPhrases.filter(p=>p.isc_role==="intention").map(p=>p.phrase);const pulses=cpuxPhrases.filter(p=>p.isc_role==="pulse").map(p=>p.phrase+":"+p.tv);const dns=cpuxPhrases.filter(p=>p.isc_role==="design_node").map(p=>p.phrase);const constraints=cpuxPhrases.filter(p=>p.isc_role==="constraint").map(p=>p.phrase);if(intentions[0])document.getElementById("incomingSignal").value=intentions[0];if(dns[0])document.getElementById("designNode").value="DN_"+slug(dns[0]);if(constraints[0])document.getElementById("emittedSignal").value="resolve_"+slug(constraints[0]);const draft=cpuxCurrentState();draft.design_summary={intentions,pulses,dns,constraints};document.getElementById("designOut").textContent=JSON.stringify(draft.design_summary,null,2);cpuxAutosave()}
function cpuxVerify(){const checks=[{name:"Has scenario",ok:document.getElementById("scenarioText").value.trim().length>20,hint:"Scenario should describe a real situation."},{name:"Has phrases",ok:cpuxPhrases.length>0,hint:"Phrase discovery or import should produce phrases."},{name:"Has at least one Intention",ok:cpuxPhrases.some(p=>p.isc_role==="intention"),hint:"A CPUX needs an intention to orient execution."},{name:"Has at least one Pulse",ok:cpuxPhrases.some(p=>p.isc_role==="pulse"),hint:"Pulses represent perceived state and gatekeeping."},{name:"Has candidate DN",ok:cpuxPhrases.some(p=>p.isc_role==="design_node")||document.getElementById("designNode").value.trim().length>0,hint:"A DN may be machine, human, art, model, or service if it absorbs/emits intention."},{name:"Has holder object",ok:document.getElementById("holderObject").value.trim().length>0,hint:"Holder object supports pulse accumulation."},{name:"Has reflector object",ok:document.getElementById("reflectorObject").value.trim().length>0,hint:"Reflector object supports handoff / mapping."},{name:"UI as mirror discipline",ok:!document.getElementById("scenarioText").value.toLowerCase().includes("ui computes"),hint:"UI should mirror field state; computation belongs in DNs."}];const root=document.getElementById("verifyList");root.innerHTML="";checks.forEach(c=>{const div=document.createElement("div");div.className="verify-item "+(c.ok?"verify-ok":"verify-warn");div.innerHTML=`<strong>${c.ok?"✓":"⚠"} ${escapeHtml(c.name)}</strong><br/>${escapeHtml(c.hint)}`;root.appendChild(div)})}
function cpuxBuildExport(){cpuxExport=cpuxCurrentState();document.getElementById("exportOut").textContent=JSON.stringify(cpuxExport,null,2);return cpuxExport}
function cpuxCurrentState(){return{schema:"intentix.cpux.author.static.v1",project:{name:document.getElementById("projectName").value,saved_at:new Date().toISOString()},scenario:document.getElementById("scenarioText").value,phrases:cpuxPhrases,cpux_design:{cpux_id:document.getElementById("cpuxId").value,ic_id:document.getElementById("icId").value,incoming_signal:document.getElementById("incomingSignal").value,holder_object:document.getElementById("holderObject").value,design_node:document.getElementById("designNode").value,reflector_object:document.getElementById("reflectorObject").value,emitted_signal:document.getElementById("emittedSignal").value}}}
function cpuxDownloadJson(){const data=cpuxBuildExport();cpuxDownload("cpux-author-export.json",JSON.stringify(data,null,2),"application/json")}function cpuxDownloadMarkdown(){const data=cpuxBuildExport();const lines=[];lines.push("# "+data.project.name,"","## Scenario",data.scenario,"","## Phrases");data.phrases.forEach(p=>{lines.push("- `"+p.tv+"` **"+p.phrase+"** — SR: `"+p.sr_type+"`, Potential: `"+p.execution_potential+"`, IS: `"+p.isc_role+"`")});lines.push("","## CPUX Design","```json",JSON.stringify(data.cpux_design,null,2),"```");cpuxDownload("cpux-author-export.md",lines.join("\n"),"text/markdown")}
function cpuxDownload(filename,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.click();URL.revokeObjectURL(url)}function cpuxAutosave(){localStorage.setItem(cpuxStoreKey,JSON.stringify(cpuxCurrentState()));document.getElementById("saveStatus").textContent="saved locally"}
function cpuxLoadDraft(){const raw=localStorage.getItem(cpuxStoreKey);if(!raw)return;try{const data=JSON.parse(raw);document.getElementById("projectName").value=data.project?.name||"Cloud Architecture CPUX Draft";document.getElementById("scenarioText").value=data.scenario||"";cpuxPhrases=data.phrases||[];const d=data.cpux_design||{};document.getElementById("cpuxId").value=d.cpux_id||"CPUX_architecture_resolution_001";document.getElementById("icId").value=d.ic_id||"IC_cloud_architecture_resolution";document.getElementById("incomingSignal").value=d.incoming_signal||"analyze_architecture_situation";document.getElementById("holderObject").value=d.holder_object||"O_situation_holder";document.getElementById("designNode").value=d.design_node||"DN_architecture_reasoner";document.getElementById("reflectorObject").value=d.reflector_object||"O_decision_reflector";document.getElementById("emittedSignal").value=d.emitted_signal||"emit_architecture_recommendation";cpuxRenderPhrases()}catch(e){console.warn(e)}}function cpuxClearDraft(){localStorage.removeItem(cpuxStoreKey);location.reload()}function cpuxId(){return"p_"+Math.random().toString(36).slice(2,10)}function slug(s){return String(s).toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")}function escapeHtml(s){return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function escapeAttr(s){return escapeHtml(s).replaceAll("\n"," ")}document.addEventListener("DOMContentLoaded",()=>{cpuxInitSelects();cpuxLoadDraft();cpuxRenderPhrases()});
</script>

---

## Simplification Notes

This static component intentionally avoids a heavy backend dependency.

- Authentication is delegated to the WordPress ISC Phrase API when importing or saving phrase collections.
- Phrase discovery is rule-assisted in this page; the LLM step can be added later.
- CPUX synthesis is draft-oriented, not final runtime generation.
- Verification checks are lightweight invariants, suitable for early authoring discipline.
- Export produces a portable seed that can later feed a full CPUX engine.

## Suggested Next Step

Use the Phrase Collector API first to build phrase spaces. Then use this CPUX Authoring Tool to pull a phrase space into a design session and shape it into an IC / CPUX draft.
