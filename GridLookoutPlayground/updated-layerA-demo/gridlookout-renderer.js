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
  const pulseEl = document.createElement("div");
  pulseEl.className = "gl-pulse";
  pulseEl.style.position = "absolute";
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

  const data = parseResponse(pulse);

  const renderBody = () => {
    body.innerHTML = "";

    if (pulse.PulseFieldViewport && pulse.PulseFieldRender) {
      Object.entries(pulse.PulseFieldRender).forEach(([fieldName, spec]) => {
        this.renderPulseField(
          body,
          pulse,
          fieldName,
          spec,
          data[fieldName] ?? "",
          stage
        );
      });
    } else {
      const fallback = document.createElement("div");
      fallback.style.padding = "10px";
      fallback.textContent = data._value ?? "";
      body.appendChild(fallback);
    }
  };

  const renderGeometry = (stageWidth, stageHeight) => {
    const viewport = pulse.visual.viewport;

    const rect = rectFromCGP(
      viewport.rows,
      viewport.columns,
      pulse.visual.position.startCell,
      pulse.visual.position.span,
      stageWidth,
      stageHeight
    );

    pulseEl.style.left = rect.x + "px";
    pulseEl.style.top = rect.y + "px";
    pulseEl.style.width = rect.width + "px";
    pulseEl.style.height = rect.height + "px";
  };

  let lastWidth = 0;
  let lastHeight = 0;

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = Math.floor(entry.contentRect.width);
      const height = Math.floor(entry.contentRect.height);

      if (!width || !height) return;

      if (width === lastWidth && height === lastHeight) return;

      lastWidth = width;
      lastHeight = height;

      renderGeometry(width, height);
      renderBody();
    }
  });

  observer.observe(stage);

  pulseEl.addEventListener("click", (e) => {
    if (e.target.closest(".gl-field")) return;
    const expanded = this.buildExpandedPulse(pulse);
    stage.appendChild(createOverlay(expanded));
  });

  // Optional: store cleanup hook on the element
  pulseEl._dispose = () => observer.disconnect();

  return pulseEl;
}
    
//  renderPulse(stage, pulse) {
//   requestAnimationFrame(() => {
//     const stageWidth = stage.clientWidth || 800;
//     const stageHeight = stage.clientHeight || 450;
//     const viewport = pulse.visual.viewport;

//     const rect = rectFromCGP(
//       viewport.rows,
//       viewport.columns,
//       pulse.visual.position.startCell,
//       pulse.visual.position.span,
//       stageWidth,
//       stageHeight
//     );

//     const pulseEl = document.createElement("div");
//     pulseEl.className = "gl-pulse";
//     pulseEl.style.left = rect.x + "px";
//     pulseEl.style.top = rect.y + "px";
//     pulseEl.style.width = rect.width + "px";
//     pulseEl.style.height = rect.height + "px";
//     pulseEl.style.zIndex = String(pulse.visual.layer || 1);
//     applyStyle(pulseEl, pulse.style);

//     const head = document.createElement("div");
//     head.className = "gl-pulse-head";
//     head.textContent =
//       pulse.render && pulse.render.headMode === "explicit"
//         ? (pulse.render.headText || pulse.pulsePhrase)
//         : pulse.pulsePhrase;

//     const body = document.createElement("div");
//     body.className = "gl-pulse-body";

//     pulseEl.appendChild(head);
//     pulseEl.appendChild(body);
//     stage.appendChild(pulseEl);

//     const data = parseResponse(pulse);

//     if (pulse.PulseFieldViewport && pulse.PulseFieldRender) {
//       Object.entries(pulse.PulseFieldRender).forEach(([fieldName, spec]) => {
//         this.renderPulseField(
//           body,
//           pulse,
//           fieldName,
//           spec,
//           data[fieldName] ?? "",
//           stage
//         );
//       });
//     } else {
//       const fallback = document.createElement("div");
//       fallback.style.padding = "10px";
//       fallback.textContent = data._value ?? "";
//       body.appendChild(fallback);
//     }

//     pulseEl.addEventListener("click", (e) => {
//       if (e.target.closest(".gl-field")) return;
//       const expanded = this.buildExpandedPulse(pulse);
//       stage.appendChild(createOverlay(expanded));
//     });
//   });
// }
    ,

    // renderPulse(stage, pulse) {
    //   const stageWidth = stage.clientWidth || 800;
    //   const stageHeight = stage.clientHeight || 450;
    //   const viewport = pulse.visual.viewport;

    //   const rect = rectFromCGP(
    //     viewport.rows,
    //     viewport.columns,
    //     pulse.visual.position.startCell,
    //     pulse.visual.position.span,
    //     stageWidth,
    //     stageHeight
    //   );

    //   const pulseEl = document.createElement("div");
    //   pulseEl.className = "gl-pulse";
    //   pulseEl.style.left = rect.x + "px";
    //   pulseEl.style.top = rect.y + "px";
    //   pulseEl.style.width = rect.width + "px";
    //   pulseEl.style.height = rect.height + "px";
    //   pulseEl.style.zIndex = String(pulse.visual.layer || 1);
    //   applyStyle(pulseEl, pulse.style);

    //   const head = document.createElement("div");
    //   head.className = "gl-pulse-head";
    //   head.textContent =
    //     pulse.render && pulse.render.headMode === "explicit"
    //       ? (pulse.render.headText || pulse.pulsePhrase)
    //       : pulse.pulsePhrase;

    //   const body = document.createElement("div");
    //   body.className = "gl-pulse-body";

    //   pulseEl.appendChild(head);
    //   pulseEl.appendChild(body);
    //   stage.appendChild(pulseEl);

    //   requestAnimationFrame(() => {
    //     const data = parseResponse(pulse);

    //     if (pulse.PulseFieldViewport && pulse.PulseFieldRender) {
    //       Object.entries(pulse.PulseFieldRender).forEach(([fieldName, spec]) => {
    //         this.renderPulseField(body, pulse, fieldName, spec, data[fieldName] ?? "", stage);
    //       });
    //     } else {
    //       const fallback = document.createElement("div");
    //       fallback.style.padding = "10px";
    //       fallback.textContent = data._value ?? "";
    //       body.appendChild(fallback);
    //     }
    //   });

    //   pulseEl.addEventListener("click", (e) => {
    //     if (e.target.closest(".gl-field")) return;
    //     const expanded = this.buildExpandedPulse(pulse);
    //     stage.appendChild(createOverlay(expanded));
    //   });
    // },

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
