(function (global) {
  function rectFromCGP(viewportRows, viewportCols, startCell, span, pxWidth, pxHeight) {
    const cellW = pxWidth / viewportCols;
    const cellH = pxHeight / viewportRows;
    return {
      x: (startCell[1] - 1) * cellW,
      y: (startCell[0] - 1) * cellH,
      width: span[1] * cellW,
      height: span[0] * cellH,
      cellW,
      cellH
    };
  }

  function parseResponse(pulse) {
    const response = pulse.response || [];
    const mode = pulse.responseConvention && pulse.responseConvention.mode;
    if (mode === 'structured' && Array.isArray(response[0]) && response[0][0] === 'META') {
      const fields = response[0].slice(1);
      const firstRow = Array.isArray(response[1]) ? response[1] : [];
      const map = {};
      fields.forEach((name, idx) => { map[name] = firstRow[idx] ?? ''; });
      return map;
    }
    if (Array.isArray(response) && response.length === 1 && typeof response[0] === 'string') {
      return { _value: response[0] };
    }
    return { _value: JSON.stringify(response) };
  }

  function applyStyle(el, style) {
    if (!style) return;
    if (style.background) el.style.background = style.background;
    if (style.foreground) el.style.color = style.foreground;
    if (style.border && style.border !== 'none') el.style.borderStyle = style.border;
    if (typeof style.padding === 'number') el.style.padding = style.padding + 'px';
    if (typeof style.fontScale === 'number') el.style.fontSize = (14 * style.fontScale) + 'px';
  }

  function createStage(showGuides, mode) {
    const stage = document.createElement('div');
    stage.className = 'gl-stage' + (mode === 'pickup' ? ' pickup-mode' : '');
    if (showGuides) {
      const guides = document.createElement('div');
      guides.className = 'gl-grid-guides';
      stage.appendChild(guides);
      stage._guides = guides;
    }
    return stage;
  }

  function drawGuides(stage, rows, cols) {
    const guides = stage._guides;
    if (!guides) return;
    guides.innerHTML = '';
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    if (!width || !height || !rows || !cols) return;
    for (let c = 1; c < cols; c += 1) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.left = (width * c / cols) + 'px';
      line.style.top = '0';
      line.style.width = '1px';
      line.style.height = '100%';
      guides.appendChild(line);
    }
    for (let r = 1; r < rows; r += 1) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.top = (height * r / rows) + 'px';
      line.style.left = '0';
      line.style.height = '1px';
      line.style.width = '100%';
      guides.appendChild(line);
    }
  }

  function createOverlay(contentNode) {
    const overlay = document.createElement('div');
    overlay.className = 'gl-overlay';
    const card = document.createElement('div');
    card.className = 'gl-overlay-card';
    const close = document.createElement('button');
    close.className = 'gl-overlay-close';
    close.textContent = 'Close';
    close.addEventListener('click', () => overlay.remove());
    card.appendChild(close);
    card.appendChild(contentNode);
    overlay.appendChild(card);
    overlay.addEventListener('click', () => overlay.remove());
    card.addEventListener('click', (e) => e.stopPropagation());
    return overlay;
  }

  function widgetLabel(fieldName, spec) {
    return (spec && spec.label) || fieldName;
  }

  function renderPulseField(body, pulse, fieldName, spec, value) {
    const field = document.createElement('div');
    field.className = 'gl-field';
    const actKind = spec.actKind || 'button';
    const labelText = widgetLabel(fieldName, spec);
    const showLabel = !(spec.type === 'act' && (actKind === 'button' || actKind === 'option'));

    if (showLabel) {
      const label = document.createElement('div');
      label.className = 'gl-field-label';
      label.textContent = labelText;
      field.appendChild(label);
    }

    if (spec.type === 'show') {
      const val = document.createElement('div');
      val.className = 'gl-field-value';
      val.textContent = value;
      field.appendChild(val);
    } else if (spec.type === 'input') {
      const input = document.createElement('input');
      input.className = 'gl-input';
      input.value = value;
      input.placeholder = labelText;
      input.addEventListener('change', () => {
        global.GridLookoutEngine.emitAction({ kind: 'PulseFieldInput', pulseId: pulse.cellId, fieldName, value: input.value });
      });
      field.appendChild(input);
    } else if (spec.type === 'act') {
      if (actKind === 'button') {
        const btn = document.createElement('button');
        btn.className = 'gl-button';
        btn.textContent = labelText;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          global.GridLookoutEngine.emitAction({ kind: 'PulseFieldAction', actKind, pulseId: pulse.cellId, fieldName, actionIntentionId: spec.binding && spec.binding.actionIntentionId });
        });
        field.appendChild(btn);
      } else if (actKind === 'select') {
        const select = document.createElement('select');
        select.className = 'gl-select';
        ['Choose...', value || labelText, 'Option A', 'Option B'].forEach((text) => {
          const opt = document.createElement('option');
          opt.textContent = text;
          opt.value = text;
          select.appendChild(opt);
        });
        select.addEventListener('change', () => {
          global.GridLookoutEngine.emitAction({ kind: 'PulseFieldAction', actKind, pulseId: pulse.cellId, fieldName, value: select.value, actionIntentionId: spec.binding && spec.binding.actionIntentionId });
        });
        field.appendChild(select);
      } else if (actKind === 'radio') {
        const row = document.createElement('div');
        row.className = 'gl-radio';
        row.innerHTML = '<span class="gl-dot"></span><span>' + labelText + '</span>';
        field.appendChild(row);
      } else if (actKind === 'toggle') {
        const row = document.createElement('div');
        row.className = 'gl-toggle';
        row.innerHTML = '<span class="gl-check"></span><span>' + labelText + '</span>';
        field.appendChild(row);
      } else {
        const row = document.createElement('div');
        row.className = 'gl-option';
        row.textContent = labelText;
        field.appendChild(row);
      }
    }

    const updateFieldRect = () => {
      const width = body.clientWidth;
      const height = body.clientHeight;
      if (!width || !height) return;
      const rect = rectFromCGP(
        pulse.PulseFieldViewport.rows,
        pulse.PulseFieldViewport.columns,
        spec.position.startCell,
        spec.position.span,
        width,
        height
      );
      field.style.left = rect.x + 'px';
      field.style.top = rect.y + 'px';
      field.style.width = rect.width + 'px';
      field.style.height = rect.height + 'px';
    };

    body.appendChild(field);
    return updateFieldRect;
  }

  function buildExpandedPulse(pulse) {
    const wrap = document.createElement('div');
    wrap.className = 'gl-expanded-wrap';
    const title = document.createElement('div');
    title.className = 'gl-expanded-title';
    title.textContent = pulse.render && pulse.render.headMode === 'explicit' ? (pulse.render.headText || pulse.pulsePhrase) : pulse.pulsePhrase;
    const body = document.createElement('div');
    body.className = 'gl-expanded-body';
    wrap.appendChild(title);
    wrap.appendChild(body);

    const pseudoSurface = document.createElement('div');
    pseudoSurface.style.position = 'relative';
    pseudoSurface.style.width = '100%';
    pseudoSurface.style.height = '100%';
    body.appendChild(pseudoSurface);

    setTimeout(() => {
      const data = parseResponse(pulse);
      if (pulse.PulseFieldViewport && pulse.PulseFieldRender) {
        const updates = [];
        Object.entries(pulse.PulseFieldRender).forEach(([fieldName, spec]) => {
          updates.push(renderPulseField(pseudoSurface, pulse, fieldName, spec, data[fieldName] ?? ''));
        });
        updates.forEach((fn) => fn());
      } else {
        const fallback = document.createElement('div');
        fallback.style.padding = '12px';
        fallback.textContent = data._value ?? '';
        pseudoSurface.appendChild(fallback);
      }
    }, 0);

    return wrap;
  }

  function renderPulse(stage, pulse, options) {
    const pulseEl = document.createElement('div');
    pulseEl.className = 'gl-pulse';
    if (options.selectedPulseId === pulse.cellId) pulseEl.classList.add('is-selected');
    pulseEl.style.zIndex = String(pulse.visual.layer || 1);
    applyStyle(pulseEl, pulse.style);

    const head = document.createElement('div');
    head.className = 'gl-pulse-head';
    head.textContent = pulse.render && pulse.render.headMode === 'explicit' ? (pulse.render.headText || pulse.pulsePhrase) : pulse.pulsePhrase;
    const body = document.createElement('div');
    body.className = 'gl-pulse-body';
    pulseEl.appendChild(head);
    pulseEl.appendChild(body);
    stage.appendChild(pulseEl);

    const data = parseResponse(pulse);
    const fieldUpdaters = [];
    if (pulse.PulseFieldViewport && pulse.PulseFieldRender) {
      Object.entries(pulse.PulseFieldRender).forEach(([fieldName, spec]) => {
        fieldUpdaters.push(renderPulseField(body, pulse, fieldName, spec, data[fieldName] ?? ''));
      });
    } else {
      const fallback = document.createElement('div');
      fallback.style.padding = '10px';
      fallback.textContent = data._value ?? '';
      body.appendChild(fallback);
    }

    let lastW = 0;
    let lastH = 0;
    const updateGeometry = (width, height) => {
      if (!width || !height) return;
      const rect = rectFromCGP(
        pulse.visual.viewport.rows,
        pulse.visual.viewport.columns,
        pulse.visual.position.startCell,
        pulse.visual.position.span,
        width,
        height
      );
      pulseEl.style.left = rect.x + 'px';
      pulseEl.style.top = rect.y + 'px';
      pulseEl.style.width = rect.width + 'px';
      pulseEl.style.height = rect.height + 'px';
      fieldUpdaters.forEach((fn) => fn());
    };

    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const width = Math.floor(entry.contentRect.width);
        const height = Math.floor(entry.contentRect.height);
        if (!width || !height) return;
        if (width === lastW && height === lastH) return;
        lastW = width; lastH = height;
        updateGeometry(width, height);
      });
    });
    observer.observe(stage);

    pulseEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (options.onSelect) options.onSelect(pulse.cellId, options.mode);
      if (options.onFocus && !e.target.closest('.gl-field')) {
        stage.appendChild(createOverlay(buildExpandedPulse(pulse)));
      }
    });

    pulseEl._dispose = () => observer.disconnect();
    return pulseEl;
  }

  function clearStage(container) {
    const existing = container.querySelectorAll('.gl-pulse');
    existing.forEach((el) => { if (el._dispose) el._dispose(); });
    container.innerHTML = '';
  }

  const Renderer = {
    renderSurface(containerId, scene, options) {
      const container = document.getElementById(containerId);
      clearStage(container);
      const stage = createStage(options.showGuides, options.mode);
      container.appendChild(stage);

      const cells = options.cells || (scene && scene.cells) || [];
      const sortedCells = cells.slice().sort((a, b) => (a.visual.layer || 1) - (b.visual.layer || 1));
      const maxRows = Math.max(1, ...sortedCells.map((cell) => cell.visual.viewport.rows || 1));
      const maxCols = Math.max(1, ...sortedCells.map((cell) => cell.visual.viewport.columns || 1));

      const repaintGuides = () => drawGuides(stage, maxRows, maxCols);
      const guideObserver = new ResizeObserver(repaintGuides);
      guideObserver.observe(stage);
      stage._dispose = () => guideObserver.disconnect();
      repaintGuides();

      sortedCells.forEach((cell) => {
        renderPulse(stage, cell, options);
      });
    }
  };

  global.GridLookoutRenderer = Renderer;
})(window);
