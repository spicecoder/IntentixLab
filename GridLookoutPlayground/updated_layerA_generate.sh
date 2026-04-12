#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="${1:-gridlookout-layer-a}"
mkdir -p "$PROJECT_DIR"/scenes "$PROJECT_DIR"/schemas

cat > "$PROJECT_DIR/index.html" <<'HTML'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GridLookout Layer A Playground</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="page">
    <header class="toolbar">
      <div class="title-wrap">
        <h1>GridLookout Layer A Playground</h1>
        <div class="subtitle">Edit scene JSON and render Pulse / PulseField CGP directly in the browser.</div>
      </div>
      <div class="controls">
        <label>
          Scene
          <select id="sceneSelect">
            <option value="example_bank_account_form.json">Bank form</option>
            <option value="example_notification_preferences.json">Notification preferences</option>
            <option value="example_order_actions.json">Order actions</option>
          </select>
        </label>
        <button id="loadBtn">Load Example</button>
        <button id="renderBtn">Render JSON</button>
        <button id="resetBtn">Reset</button>
      </div>
    </header>

    <main class="workspace">
      <section class="panel">
        <h2>Scene JSON</h2>
        <textarea id="jsonEditor" spellcheck="false"></textarea>
      </section>

      <section class="panel">
        <h2>Rendered View</h2>
        <div id="renderPane" class="render-pane"></div>
      </section>
    </main>

    <section class="panel debug-panel">
      <h2>Debug</h2>
      <pre id="debugPane">Ready.</pre>
    </section>
  </div>

  <script src="gridlookout-engine.js"></script>
  <script src="gridlookout-renderer.js"></script>
  <script src="app.js"></script>
</body>
</html>
HTML

cat > "$PROJECT_DIR/styles.css" <<'CSS'
* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f7fb;
  color: #102027;
}

.page {
  max-width: 1460px;
  margin: 0 auto;
  padding: 16px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.title-wrap h1 {
  margin: 0 0 4px;
  font-size: 24px;
}

.subtitle {
  color: #546e7a;
  font-size: 14px;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: flex-end;
  flex-wrap: wrap;
}

.controls label {
  display: grid;
  gap: 4px;
  font-size: 13px;
}

select, button {
  height: 36px;
  border-radius: 8px;
  border: 1px solid #b7c6d1;
  padding: 0 10px;
  font-size: 14px;
  background: white;
}

button {
  cursor: pointer;
}

.workspace {
  display: grid;
  grid-template-columns: 1.35fr 1.65fr;
  gap: 16px;
  margin-bottom: 16px;
}

.panel {
  background: white;
  border: 1px solid #d8e1e8;
  border-radius: 12px;
  padding: 12px;
}

.panel h2 {
  margin: 0 0 10px;
  font-size: 16px;
}

#jsonEditor {
  width: 100%;
  min-height: 620px;
  resize: vertical;
  border: 1px solid #d8e1e8;
  border-radius: 8px;
  padding: 10px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 13px;
  line-height: 1.45;
  background: #fbfdff;
}

.render-pane {
  min-height: 620px;
  border: 1px solid #d8e1e8;
  border-radius: 8px;
  background: #ffffff;
  overflow: auto;
  padding: 8px;
}

.debug-panel pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  color: #34515e;
}

.gl-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 520px;
  border: 2px solid #90a4ae;
  background: white;
  overflow: hidden;
}

.gl-pulse {
  position: absolute;
  border: 2px solid #455a64;
  background: rgba(33, 150, 243, 0.10);
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
}

.gl-pulse-head {
  font-weight: 700;
  font-size: 13px;
  padding: 8px 10px;
  border-bottom: 1px solid #cfd8dc;
  background: rgba(255,255,255,0.85);
}

.gl-pulse-body {
  position: relative;
  width: 100%;
  height: calc(100% - 34px);
  overflow: hidden;
}

.gl-field {
  position: absolute;
  border: 1px dashed #78909c;
  background: rgba(255,255,255,0.82);
  padding: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
}

.gl-field-label {
  font-size: 11px;
  color: #546e7a;
  line-height: 1.1;
  margin: 0;
}

.gl-field-value {
  font-size: 14px;
  line-height: 1.25;
}

.gl-input, .gl-select {
  width: 100%;
  min-height: 32px;
  padding: 4px 8px;
  border: 1px solid #b0bec5;
  border-radius: 6px;
  background: white;
  font-size: 14px;
}

.gl-button {
  width: 100%;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #1565c0;
  background: #1565c0;
  color: white;
  cursor: pointer;
  font-size: 13px;
}

.gl-radio, .gl-option, .gl-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 6px 4px;
}

.gl-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid #607d8b;
  flex: 0 0 auto;
}

.gl-check {
  width: 16px;
  height: 16px;
  border: 2px solid #607d8b;
  border-radius: 4px;
  flex: 0 0 auto;
}

@media (max-width: 1100px) {
  .workspace {
    grid-template-columns: 1fr;
  }
  #jsonEditor, .render-pane {
    min-height: 420px;
  }
}
CSS

cat > "$PROJECT_DIR/gridlookout-engine.js" <<'JS'
(function (global) {
  function GridLookoutEngine() {
    this.currentScene = null;
    this.actionHandler = null;
  }

  GridLookoutEngine.prototype.loadScene = function (scene) {
    this.currentScene = scene;
  };

  GridLookoutEngine.prototype.onAction = function (handler) {
    this.actionHandler = handler;
  };

  GridLookoutEngine.prototype.emitAction = function (payload) {
    if (typeof this.actionHandler === "function") {
      this.actionHandler(payload);
    }
  };

  global.GridLookoutEngine = new GridLookoutEngine();
})(window);
JS

cat > "$PROJECT_DIR/gridlookout-renderer.js" <<'JS'
(function (global) {
  function rectFromCGP(viewportRows, viewportCols, startCell, span, pxWidth, pxHeight) {
    const cellW = pxWidth / viewportCols;
    const cellH = pxHeight / viewportRows;
    return {
      x: (startCell[1] - 1) * cellW,
      y: (startCell[0] - 1) * cellH,
      width: span[1] * cellW,
      height: span[0] * cellH
    };
  }

  function parseResponse(pulse) {
    const response = pulse.response || [];
    const mode = pulse.responseConvention && pulse.responseConvention.mode;

    if (mode === "structured" && Array.isArray(response[0]) && response[0][0] === "META") {
      const fields = response[0].slice(1);
      const firstRow = Array.isArray(response[1]) ? response[1] : [];
      const map = {};
      fields.forEach((name, idx) => {
        map[name] = firstRow[idx] ?? "";
      });
      return map;
    }

    if (Array.isArray(response) && response.length === 1 && typeof response[0] === "string") {
      return { _value: response[0] };
    }

    return { _value: JSON.stringify(response) };
  }

  function applyStyle(el, style) {
    if (!style) return;
    if (style.background) el.style.background = style.background;
    if (style.foreground) el.style.color = style.foreground;
    if (style.border && style.border !== "none") {
      el.style.borderStyle = style.border;
    }
    if (typeof style.padding === "number") {
      el.style.padding = style.padding + "px";
    }
    if (typeof style.fontScale === "number") {
      el.style.fontSize = (14 * style.fontScale) + "px";
    }
  }

  function ensureOverlayStyles() {
    if (document.getElementById("gl-overlay-styles")) return;

    const style = document.createElement("style");
    style.id = "gl-overlay-styles";
    style.textContent = `
      .gl-overlay {
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0.96);
        z-index: 999;
        display: flex;
        align-items: stretch;
        justify-content: stretch;
        padding: 12px;
      }

      .gl-overlay-card {
        position: relative;
        width: 100%;
        height: 100%;
        background: white;
        border: 2px solid #455a64;
        border-radius: 10px;
        overflow: hidden;
        box-sizing: border-box;
      }

      .gl-overlay-close {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 2;
        border: 1px solid #90a4ae;
        background: white;
        border-radius: 6px;
        padding: 6px 10px;
        cursor: pointer;
      }

      .gl-expanded-pulse,
      .gl-expanded-field {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: white;
      }

      .gl-expanded-title {
        padding: 14px 16px;
        font-weight: 700;
        font-size: 20px;
        border-bottom: 1px solid #cfd8dc;
        background: #f8fbff;
      }

      .gl-expanded-body {
        flex: 1;
        position: relative;
        overflow: auto;
        padding: 12px;
        box-sizing: border-box;
      }

      .gl-expanded-field-content {
        max-width: 720px;
        display: grid;
        gap: 10px;
      }
    `;
    document.head.appendChild(style);
  }

  function createOverlay(contentNode) {
    ensureOverlayStyles();

    const overlay = document.createElement("div");
    overlay.className = "gl-overlay";

    const card = document.createElement("div");
    card.className = "gl-overlay-card";

    const close = document.createElement("button");
    close.className = "gl-overlay-close";
    close.textContent = "Close";
    close.addEventListener("click", () => overlay.remove());

    card.appendChild(close);
    card.appendChild(contentNode);
    overlay.appendChild(card);

    overlay.addEventListener("click", () => overlay.remove());
    card.addEventListener("click", (e) => e.stopPropagation());

    return overlay;
  }

  function widgetLabel(fieldName, spec) {
    return (spec && spec.label) || fieldName;
  }

  const Renderer = {
    renderFromObject(containerId, scene) {
      const container = document.getElementById(containerId);
      container.innerHTML = "";

      const stage = document.createElement("div");
      stage.className = "gl-stage";

      const cells = (scene.cells || []).slice().sort((a, b) => {
        return (a.visual.layer || 1) - (b.visual.layer || 1);
      });

      cells.forEach(cell => {
        this.renderPulse(stage, cell);
      });

      container.appendChild(stage);
    },

    renderPulse(stage, pulse) {
      const stageWidth = stage.clientWidth || 800;
      const stageHeight = stage.clientHeight || 450;
      const viewport = pulse.visual.viewport;

      const rect = rectFromCGP(
        viewport.rows,
        viewport.columns,
        pulse.visual.position.startCell,
        pulse.visual.position.span,
        stageWidth,
        stageHeight
      );

      const pulseEl = document.createElement("div");
      pulseEl.className = "gl-pulse";
      pulseEl.style.left = rect.x + "px";
      pulseEl.style.top = rect.y + "px";
      pulseEl.style.width = rect.width + "px";
      pulseEl.style.height = rect.height + "px";
      pulseEl.style.zIndex = String(pulse.visual.layer || 1);
      applyStyle(pulseEl, pulse.style);

      const head = document.createElement("div");
      head.className = "gl-pulse-head";
      head.textContent =
        pulse.render && pulse.render.headMode === "explicit"
          ? (pulse.render.headText || pulse.pulsePhrase)
          : pulse.pulsePhrase;

      const body = document.createElement("div");
      body.className = "gl-pulse-body";

      pulseEl.appendChild(head);
      pulseEl.appendChild(body);
      stage.appendChild(pulseEl);

      requestAnimationFrame(() => {
        const data = parseResponse(pulse);

        if (pulse.PulseFieldViewport && pulse.PulseFieldRender) {
          Object.entries(pulse.PulseFieldRender).forEach(([fieldName, spec]) => {
            this.renderPulseField(body, pulse, fieldName, spec, data[fieldName] ?? "", stage);
          });
        } else {
          const fallback = document.createElement("div");
          fallback.style.padding = "10px";
          fallback.textContent = data._value ?? "";
          body.appendChild(fallback);
        }
      });

      pulseEl.addEventListener("click", (e) => {
        if (e.target.closest(".gl-field")) return;
        const expanded = this.buildExpandedPulse(pulse);
        stage.appendChild(createOverlay(expanded));
      });
    },

    renderPulseField(body, pulse, fieldName, spec, value, stage) {
      const w = body.clientWidth;
      const h = body.clientHeight;

      const rect = rectFromCGP(
        pulse.PulseFieldViewport.rows,
        pulse.PulseFieldViewport.columns,
        spec.position.startCell,
        spec.position.span,
        w,
        h
      );

      const field = document.createElement("div");
      field.className = "gl-field";
      field.style.left = rect.x + "px";
      field.style.top = rect.y + "px";
      field.style.width = rect.width + "px";
      field.style.height = rect.height + "px";
      applyStyle(field, spec.style);

      const actKind = spec.actKind || "button";
      const labelText = widgetLabel(fieldName, spec);
      const showLabel = !(spec.type === "act" && (actKind === "button" || actKind === "option"));

      if (showLabel) {
        const label = document.createElement("div");
        label.className = "gl-field-label";
        label.textContent = labelText;
        field.appendChild(label);
      }

      if (spec.type === "show") {
        const val = document.createElement("div");
        val.className = "gl-field-value";
        val.textContent = value;
        field.appendChild(val);
      } else if (spec.type === "input") {
        const input = document.createElement("input");
        input.className = "gl-input";
        input.value = value;
        input.placeholder = labelText;
        input.addEventListener("click", (e) => e.stopPropagation());
        input.addEventListener("change", () => {
          global.GridLookoutEngine.emitAction({
            kind: "PulseFieldInput",
            pulseId: pulse.cellId,
            fieldName,
            value: input.value
          });
        });
        field.appendChild(input);
      } else if (spec.type === "act") {
        if (actKind === "button") {
          const btn = document.createElement("button");
          btn.className = "gl-button";
          btn.textContent = labelText;
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            global.GridLookoutEngine.emitAction({
              kind: "PulseFieldAction",
              actKind,
              pulseId: pulse.cellId,
              fieldName,
              actionIntentionId: spec.binding && spec.binding.actionIntentionId
            });
          });
          field.appendChild(btn);
        } else if (actKind === "select") {
          const select = document.createElement("select");
          select.className = "gl-select";
          ["Choose...", value || labelText, "Option A", "Option B"].forEach(optText => {
            const opt = document.createElement("option");
            opt.textContent = optText;
            opt.value = optText;
            select.appendChild(opt);
          });
          select.addEventListener("click", (e) => e.stopPropagation());
          select.addEventListener("change", () => {
            global.GridLookoutEngine.emitAction({
              kind: "PulseFieldAction",
              actKind,
              pulseId: pulse.cellId,
              fieldName,
              value: select.value,
              actionIntentionId: spec.binding && spec.binding.actionIntentionId
            });
          });
          field.appendChild(select);
        } else if (actKind === "radio") {
          const row = document.createElement("div");
          row.className = "gl-radio";
          row.innerHTML = '<span class="gl-dot"></span><span>' + labelText + '</span>';
          row.style.cursor = "pointer";
          row.addEventListener("click", (e) => {
            e.stopPropagation();
            global.GridLookoutEngine.emitAction({
              kind: "PulseFieldAction",
              actKind,
              pulseId: pulse.cellId,
              fieldName,
              actionIntentionId: spec.binding && spec.binding.actionIntentionId
            });
          });
          field.appendChild(row);
        } else if (actKind === "option") {
          const row = document.createElement("div");
          row.className = "gl-option";
          row.textContent = labelText;
          row.style.border = "1px solid #90a4ae";
          row.style.borderRadius = "6px";
          row.style.cursor = "pointer";
          row.style.padding = "8px 10px";
          row.addEventListener("click", (e) => {
            e.stopPropagation();
            global.GridLookoutEngine.emitAction({
              kind: "PulseFieldAction",
              actKind,
              pulseId: pulse.cellId,
              fieldName,
              actionIntentionId: spec.binding && spec.binding.actionIntentionId
            });
          });
          field.appendChild(row);
        } else if (actKind === "toggle") {
          const row = document.createElement("div");
          row.className = "gl-toggle";
          row.innerHTML = '<span class="gl-check"></span><span>' + labelText + '</span>';
          row.style.cursor = "pointer";
          row.addEventListener("click", (e) => {
            e.stopPropagation();
            global.GridLookoutEngine.emitAction({
              kind: "PulseFieldAction",
              actKind,
              pulseId: pulse.cellId,
              fieldName,
              actionIntentionId: spec.binding && spec.binding.actionIntentionId
            });
          });
          field.appendChild(row);
        }
      }

      field.addEventListener("click", (e) => {
        e.stopPropagation();
        const expanded = this.buildExpandedPulseField(pulse, fieldName, spec, value);
        stage.appendChild(createOverlay(expanded));
      });

      body.appendChild(field);
    },

    buildExpandedPulse(pulse) {
      const wrap = document.createElement("div");
      wrap.className = "gl-expanded-pulse";

      const title = document.createElement("div");
      title.className = "gl-expanded-title";
      title.textContent =
        pulse.render && pulse.render.headMode === "explicit"
          ? (pulse.render.headText || pulse.pulsePhrase)
          : pulse.pulsePhrase;

      const body = document.createElement("div");
      body.className = "gl-expanded-body";

      wrap.appendChild(title);
      wrap.appendChild(body);

      requestAnimationFrame(() => {
        const data = parseResponse(pulse);

        if (pulse.PulseFieldViewport && pulse.PulseFieldRender) {
          Object.entries(pulse.PulseFieldRender).forEach(([fieldName, spec]) => {
            this.renderExpandedPulseField(body, pulse, fieldName, spec, data[fieldName] ?? "");
          });
        } else {
          const fallback = document.createElement("div");
          fallback.style.padding = "12px";
          fallback.textContent = data._value ?? "";
          body.appendChild(fallback);
        }
      });

      return wrap;
    },

    renderExpandedPulseField(body, pulse, fieldName, spec, value) {
      const rect = rectFromCGP(
        pulse.PulseFieldViewport.rows,
        pulse.PulseFieldViewport.columns,
        spec.position.startCell,
        spec.position.span,
        body.clientWidth || 900,
        body.clientHeight || 520
      );

      const field = document.createElement("div");
      field.className = "gl-field";
      field.style.left = rect.x + "px";
      field.style.top = rect.y + "px";
      field.style.width = rect.width + "px";
      field.style.height = rect.height + "px";
      field.style.padding = "8px";
      field.style.gap = "6px";

      const label = document.createElement("div");
      label.className = "gl-field-label";
      label.textContent = widgetLabel(fieldName, spec);
      label.style.fontSize = "14px";
      field.appendChild(label);

      const actKind = spec.actKind || "button";

      if (spec.type === "show") {
        const val = document.createElement("div");
        val.className = "gl-field-value";
        val.style.fontSize = "20px";
        val.textContent = value;
        field.appendChild(val);
      } else if (spec.type === "input") {
        const input = document.createElement("input");
        input.className = "gl-input";
        input.style.minHeight = "42px";
        input.style.fontSize = "18px";
        input.value = value;
        field.appendChild(input);
      } else if (spec.type === "act") {
        if (actKind === "button") {
          const btn = document.createElement("button");
          btn.className = "gl-button";
          btn.style.fontSize = "18px";
          btn.style.padding = "10px 14px";
          btn.textContent = widgetLabel(fieldName, spec);
          field.appendChild(btn);
        } else if (actKind === "select") {
          const select = document.createElement("select");
          select.className = "gl-select";
          select.style.minHeight = "44px";
          select.style.fontSize = "18px";
          ["Choose...", value || widgetLabel(fieldName, spec), "Option A", "Option B"].forEach(optText => {
            const opt = document.createElement("option");
            opt.textContent = optText;
            opt.value = optText;
            select.appendChild(opt);
          });
          field.appendChild(select);
        } else if (actKind === "radio") {
          const row = document.createElement("div");
          row.className = "gl-radio";
          row.style.fontSize = "18px";
          row.innerHTML = '<span class="gl-dot"></span><span>' + widgetLabel(fieldName, spec) + '</span>';
          field.appendChild(row);
        } else if (actKind === "option") {
          const row = document.createElement("div");
          row.className = "gl-option";
          row.style.fontSize = "18px";
          row.style.padding = "10px 12px";
          row.style.border = "1px solid #90a4ae";
          row.style.borderRadius = "8px";
          row.textContent = widgetLabel(fieldName, spec);
          field.appendChild(row);
        } else if (actKind === "toggle") {
          const row = document.createElement("div");
          row.className = "gl-toggle";
          row.style.fontSize = "18px";
          row.innerHTML = '<span class="gl-check"></span><span>' + widgetLabel(fieldName, spec) + '</span>';
          field.appendChild(row);
        }
      }

      body.appendChild(field);
    },

    buildExpandedPulseField(pulse, fieldName, spec, value) {
      const wrap = document.createElement("div");
      wrap.className = "gl-expanded-field";

      const title = document.createElement("div");
      title.className = "gl-expanded-title";
      title.textContent = widgetLabel(fieldName, spec) + " — " + pulse.pulsePhrase;

      const body = document.createElement("div");
      body.className = "gl-expanded-body";

      const inner = document.createElement("div");
      inner.className = "gl-expanded-field-content";

      wrap.appendChild(title);
      wrap.appendChild(body);
      body.appendChild(inner);

      const actKind = spec.actKind || "button";

      if (spec.type === "show") {
        const val = document.createElement("div");
        val.className = "gl-field-value";
        val.style.fontSize = "22px";
        val.textContent = value;
        inner.appendChild(val);
      } else if (spec.type === "input") {
        const input = document.createElement("input");
        input.className = "gl-input";
        input.style.fontSize = "20px";
        input.style.minHeight = "44px";
        input.value = value;
        inner.appendChild(input);
      } else if (spec.type === "act") {
        if (actKind === "button") {
          const btn = document.createElement("button");
          btn.className = "gl-button";
          btn.style.fontSize = "18px";
          btn.style.padding = "12px 16px";
          btn.textContent = widgetLabel(fieldName, spec);
          inner.appendChild(btn);
        } else if (actKind === "select") {
          const select = document.createElement("select");
          select.className = "gl-select";
          select.style.fontSize = "18px";
          select.style.minHeight = "44px";
          ["Choose...", value || widgetLabel(fieldName, spec), "Option A", "Option B"].forEach(optText => {
            const opt = document.createElement("option");
            opt.textContent = optText;
            opt.value = optText;
            select.appendChild(opt);
          });
          inner.appendChild(select);
        } else if (actKind === "radio") {
          const row = document.createElement("div");
          row.className = "gl-radio";
          row.style.fontSize = "20px";
          row.innerHTML = '<span class="gl-dot"></span><span>' + widgetLabel(fieldName, spec) + '</span>';
          inner.appendChild(row);
        } else if (actKind === "option") {
          const row = document.createElement("div");
          row.className = "gl-option";
          row.style.fontSize = "20px";
          row.style.padding = "12px 14px";
          row.style.border = "1px solid #90a4ae";
          row.style.borderRadius = "8px";
          row.textContent = widgetLabel(fieldName, spec);
          inner.appendChild(row);
        } else if (actKind === "toggle") {
          const row = document.createElement("div");
          row.className = "gl-toggle";
          row.style.fontSize = "20px";
          row.innerHTML = '<span class="gl-check"></span><span>' + widgetLabel(fieldName, spec) + '</span>';
          inner.appendChild(row);
        }
      }

      return wrap;
    }
  };

  global.GridLookoutRenderer = Renderer;
})(window);
JS

cat > "$PROJECT_DIR/app.js" <<'JS'
(function () {
  const editor = document.getElementById("jsonEditor");
  const debugPane = document.getElementById("debugPane");
  const sceneSelect = document.getElementById("sceneSelect");
  const loadBtn = document.getElementById("loadBtn");
  const renderBtn = document.getElementById("renderBtn");
  const resetBtn = document.getElementById("resetBtn");

  let lastLoadedJson = "";

  function setDebug(msg) {
    debugPane.textContent = msg;
  }

  async function loadExample(filename) {
    try {
      const res = await fetch("scenes/" + filename);
      if (!res.ok) throw new Error("Failed to fetch " + filename + " (" + res.status + ")");
      const scene = await res.json();
      lastLoadedJson = JSON.stringify(scene, null, 2);
      editor.value = lastLoadedJson;
      renderSceneFromEditor();
    } catch (err) {
      setDebug("Load error: " + err.message);
    }
  }

  function validateBasicScene(scene) {
    if (!scene || scene.schemaName !== "GridLookout") {
      throw new Error('schemaName must be "GridLookout"');
    }
    if (!Array.isArray(scene.cells)) {
      throw new Error("cells must be an array");
    }
  }

  function renderSceneFromEditor() {
    try {
      const scene = JSON.parse(editor.value);
      validateBasicScene(scene);
      window.GridLookoutEngine.loadScene(scene);
      window.GridLookoutEngine.onAction((payload) => {
        setDebug("Rendered OK.\n\nLast action:\n" + JSON.stringify(payload, null, 2));
      });
      window.GridLookoutRenderer.renderFromObject("renderPane", scene);
      setDebug("Rendered OK.\n\nPulse count: " + (scene.cells ? scene.cells.length : 0) + "\nScene version: " + (scene.schemaVersion || "unknown"));
    } catch (err) {
      setDebug("Render error: " + err.message);
    }
  }

  loadBtn.addEventListener("click", () => loadExample(sceneSelect.value));
  renderBtn.addEventListener("click", renderSceneFromEditor);
  resetBtn.addEventListener("click", () => {
    editor.value = lastLoadedJson;
    renderSceneFromEditor();
  });

  loadExample(sceneSelect.value);
})();
JS

cat > "$PROJECT_DIR/schemas/gridlookout-1_2_schema.json" <<'JSON'
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://intentixlab.com/schemas/gridlookout-1.2.schema.json",
  "title": "GridLookout v1.2",
  "type": "object",
  "required": ["schemaName", "schemaVersion", "cells"],
  "properties": {
    "schemaName": { "type": "string", "const": "GridLookout" },
    "schemaVersion": { "type": "string", "const": "1.2" },
    "cells": { "type": "array" }
  }
}
JSON

cat > "$PROJECT_DIR/scenes/example_bank_account_form.json" <<'JSON'
{
  "schemaName": "GridLookout",
  "schemaVersion": "1.2",
  "cells": [
    {
      "cellId": "cell_bank_account",
      "pulsePhrase": "bank_account_details",
      "tv": "UN",
      "responseConvention": { "version": "1.1", "mode": "structured" },
      "response": [
        ["META", "bank_name", "account_number", "account_type"],
        ["ABC Bank", "12345678999", "Savings"]
      ],
      "visual": {
        "viewport": { "rows": 8, "columns": 12 },
        "layer": 1,
        "position": { "startCell": [1, 8], "span": [3, 5] },
        "inputMethod": "display"
      },
      "render": {
        "headMode": "pulsePhrase",
        "bodyMode": "responsePulseFields"
      },
      "PulseFieldViewport": { "rows": 8, "columns": 6 },
      "PulseFieldRender": {
        "bank_name": {
          "type": "show",
          "position": { "startCell": [1, 1], "span": [2, 6] }
        },
        "account_number": {
          "type": "input",
          "position": { "startCell": [3, 1], "span": [2, 6] }
        },
        "account_type": {
          "type": "act",
          "actKind": "select",
          "label": "Choose account type",
          "position": { "startCell": [5, 1], "span": [2, 6] },
          "binding": { "actionIntentionId": "I_select_account_type" }
        }
      }
    }
  ]
}
JSON

cat > "$PROJECT_DIR/scenes/example_notification_preferences.json" <<'JSON'
{
  "schemaName": "GridLookout",
  "schemaVersion": "1.2",
  "cells": [
    {
      "cellId": "cell_notification_pref",
      "pulsePhrase": "notification_preferences",
      "tv": "UN",
      "responseConvention": { "version": "1.1", "mode": "structured" },
      "response": [
        ["META", "email_alerts", "sms_alerts", "push_alerts"],
        ["true", "false", "true"]
      ],
      "visual": {
        "viewport": { "rows": 10, "columns": 12 },
        "layer": 1,
        "position": { "startCell": [2, 2], "span": [4, 5] },
        "inputMethod": "display"
      },
      "render": {
        "headMode": "explicit",
        "headText": "Notification Preferences",
        "bodyMode": "responsePulseFields"
      },
      "PulseFieldViewport": { "rows": 6, "columns": 6 },
      "PulseFieldRender": {
        "email_alerts": {
          "type": "act",
          "actKind": "radio",
          "label": "Email alerts",
          "position": { "startCell": [1, 1], "span": [1, 6] },
          "binding": { "actionIntentionId": "I_toggle_email_alerts" }
        },
        "sms_alerts": {
          "type": "act",
          "actKind": "radio",
          "label": "SMS alerts",
          "position": { "startCell": [2, 1], "span": [1, 6] },
          "binding": { "actionIntentionId": "I_toggle_sms_alerts" }
        },
        "push_alerts": {
          "type": "act",
          "actKind": "toggle",
          "label": "Push alerts",
          "position": { "startCell": [3, 1], "span": [1, 6] },
          "binding": { "actionIntentionId": "I_toggle_push_alerts" }
        }
      }
    }
  ]
}
JSON

cat > "$PROJECT_DIR/scenes/example_order_actions.json" <<'JSON'
{
  "schemaName": "GridLookout",
  "schemaVersion": "1.2",
  "cells": [
    {
      "cellId": "cell_order_toolbar",
      "pulsePhrase": "order_actions",
      "tv": "UN",
      "responseConvention": { "version": "1.1", "mode": "structured" },
      "response": [
        ["META", "save", "submit", "cancel"],
        ["save", "submit", "cancel"]
      ],
      "visual": {
        "viewport": { "rows": 8, "columns": 12 },
        "layer": 1,
        "position": { "startCell": [6, 2], "span": [2, 8] },
        "inputMethod": "display"
      },
      "render": {
        "headMode": "explicit",
        "headText": "Order Actions",
        "bodyMode": "responsePulseFields"
      },
      "PulseFieldViewport": { "rows": 2, "columns": 12 },
      "PulseFieldRender": {
        "save": {
          "type": "act",
          "actKind": "button",
          "label": "Save Draft",
          "position": { "startCell": [1, 1], "span": [1, 4] },
          "binding": { "actionIntentionId": "I_save_order" }
        },
        "submit": {
          "type": "act",
          "actKind": "button",
          "label": "Submit Order",
          "position": { "startCell": [1, 5], "span": [1, 4] },
          "binding": { "actionIntentionId": "I_submit_order" }
        },
        "cancel": {
          "type": "act",
          "actKind": "option",
          "label": "Cancel",
          "position": { "startCell": [1, 9], "span": [1, 4] },
          "binding": { "actionIntentionId": "I_cancel_order" }
        }
      }
    }
  ]
}
JSON

cat > "$PROJECT_DIR/README.md" <<'MD'
# GridLookout Layer A Playground

A static, GitHub-Pages-friendly playground for:

- loading example GridLookout v1.2 scenes
- editing JSON in the browser
- rendering Pulse and PulseField CGP directly
- testing simple widget mappings without CPUX or backend
- native tap-expand for Pulse and PulseField focus

## Run locally

```bash
python3 -m http.server 8000