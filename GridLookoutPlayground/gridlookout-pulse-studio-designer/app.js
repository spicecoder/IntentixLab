(function () {
  const editor = document.getElementById('jsonEditor');
  const inspectorPane = document.getElementById('inspectorPane');
  const logPane = document.getElementById('eventLog');
  const sceneSelect = document.getElementById('sceneSelect');
  const loadExampleBtn = document.getElementById('loadExampleBtn');
  const renderBtn = document.getElementById('renderBtn');
  const formatJsonBtn = document.getElementById('formatJsonBtn');
  const toggleGuidesBtn = document.getElementById('toggleGuidesBtn');
  const tabs = Array.from(document.querySelectorAll('.mode-tab'));
  const panes = Array.from(document.querySelectorAll('.workspace-pane'));
  const jsonColumn = document.getElementById('jsonColumn');
  const jsonTabMount = document.getElementById('jsonTabMount');
  const sceneSurface = document.getElementById('sceneSurface');
  const pickupSurface = document.getElementById('pickupSurface');
  const pickupPulseSelect = document.getElementById('pickupPulseSelect');
  const pfPulseSelect = document.getElementById('pfPulseSelect');

  const pc = {
    previewWidth: document.getElementById('pcPreviewWidth'),
    previewHeight: document.getElementById('pcPreviewHeight'),
    rows: document.getElementById('pcRows'),
    cols: document.getElementById('pcCols'),
    phrase: document.getElementById('pcPhrase'),
    cellId: document.getElementById('pcCellId'),
    layer: document.getElementById('pcLayer'),
    headMode: document.getElementById('pcHeadMode'),
    headText: document.getElementById('pcHeadText'),
    responseMode: document.getElementById('pcResponseMode'),
    applyGridBtn: document.getElementById('pcApplyGridBtn'),
    clearSelectionBtn: document.getElementById('pcClearSelectionBtn'),
    saveCellBtn: document.getElementById('pcSaveCellBtn'),
    addPickupBtn: document.getElementById('pcAddPickupBtn'),
    summary: document.getElementById('pcSelectionSummary'),
    host: document.getElementById('pcGridHost')
  };

  const pf = {
    rows: document.getElementById('pfRows'),
    cols: document.getElementById('pfCols'),
    name: document.getElementById('pfName'),
    label: document.getElementById('pfLabel'),
    type: document.getElementById('pfType'),
    actKind: document.getElementById('pfActKind'),
    actionIntention: document.getElementById('pfActionIntention'),
    applyGridBtn: document.getElementById('pfApplyGridBtn'),
    clearSelectionBtn: document.getElementById('pfClearSelectionBtn'),
    saveFieldBtn: document.getElementById('pfSaveFieldBtn'),
    summary: document.getElementById('pfSelectionSummary'),
    host: document.getElementById('pfGridHost')
  };

  let activeTabId = 'designerTab';
  let suppressEditorSync = false;

  function isNarrow() {
    return window.matchMedia('(max-width: 1100px)').matches;
  }

  function log(message, obj) {
    const stamp = new Date().toLocaleTimeString();
    const text = `[${stamp}] ${message}` + (obj ? `\n${JSON.stringify(obj, null, 2)}` : '');
    logPane.textContent = text + '\n\n' + logPane.textContent;
  }

  function safeJsonParse(text) {
    return JSON.parse(text);
  }

  function syncEditorFromScene() {
    suppressEditorSync = true;
    editor.value = JSON.stringify(globalThis.GridLookoutEngine.exportScene(), null, 2);
    suppressEditorSync = false;
  }

  function mountJsonEditor() {
    if (isNarrow()) {
      const section = jsonTabMount;
      if (!section.contains(editor)) {
        section.innerHTML = '';
        const titleRow = document.createElement('div');
        titleRow.className = 'panel-title-row';
        const h2 = document.createElement('h2');
        h2.textContent = 'Scene JSON';
        const btn = document.createElement('button');
        btn.textContent = 'Format';
        btn.addEventListener('click', formatEditor);
        titleRow.appendChild(h2);
        titleRow.appendChild(btn);
        section.appendChild(titleRow);
        section.appendChild(editor);
      }
      jsonColumn.classList.add('is-hidden');
    } else {
      const section = jsonColumn.querySelector('.panel-section');
      if (!section.contains(editor)) section.appendChild(editor);
      jsonColumn.classList.remove('is-hidden');
    }
  }

  function formatEditor() {
    try {
      editor.value = JSON.stringify(safeJsonParse(editor.value), null, 2);
    } catch (err) {
      log('Format error', { message: err.message });
    }
  }

  function validateScene(scene) {
    if (!scene || scene.schemaName !== 'GridLookout') throw new Error('schemaName must be GridLookout');
    if (!Array.isArray(scene.cells)) throw new Error('cells must be an array');
    scene.cells.forEach((cell) => {
      if (!cell.visual || !cell.visual.viewport || !cell.visual.position) throw new Error(`visual block missing in ${cell.cellId}`);
      const rows = Number(cell.visual.viewport.rows);
      const cols = Number(cell.visual.viewport.columns);
      const [startRow, startCol] = cell.visual.position.startCell.map(Number);
      const [spanRows, spanCols] = cell.visual.position.span.map(Number);
      if (startRow < 1 || startCol < 1) throw new Error(`startCell must start from 1 in ${cell.cellId}`);
      if (spanRows < 1 || spanCols < 1) throw new Error(`span must be positive in ${cell.cellId}`);
      if (startRow + spanRows - 1 > rows || startCol + spanCols - 1 > cols) throw new Error(`PulseCell exceeds viewport bounds in ${cell.cellId}`);
      if (cell.PulseFieldViewport && cell.PulseFieldRender) {
        Object.keys(cell.PulseFieldRender).forEach((fieldName) => {
          const spec = cell.PulseFieldRender[fieldName];
          const [fRow, fCol] = spec.position.startCell.map(Number);
          const [fSpanR, fSpanC] = spec.position.span.map(Number);
          if (fRow + fSpanR - 1 > cell.PulseFieldViewport.rows || fCol + fSpanC - 1 > cell.PulseFieldViewport.columns) {
            throw new Error(`PulseField ${fieldName} exceeds field viewport in ${cell.cellId}`);
          }
        });
      }
    });
  }

  function renderSceneFromEditor() {
    const scene = safeJsonParse(editor.value);
    validateScene(scene);
    globalThis.GridLookoutEngine.loadScene(scene);
    log('Scene loaded from JSON', { pulseCount: scene.cells.length });
  }

  function createGridSelector(host, config) {
    let anchor = null;
    let current = null;
    let cells = [];
    let viewportEl = null;
    let selectionBox = null;
    let coordsBadge = null;

    function values() {
      return config.getValues();
    }

    function rectSelection() {
      if (!anchor || !current) return null;
      const startRow = Math.min(anchor.row, current.row);
      const endRow = Math.max(anchor.row, current.row);
      const startCol = Math.min(anchor.col, current.col);
      const endCol = Math.max(anchor.col, current.col);
      return {
        startRow, startCol, endRow, endCol,
        heightRows: endRow - startRow + 1,
        widthCols: endCol - startCol + 1
      };
    }

    function paintSelection() {
      const rect = rectSelection();
      cells.forEach((cell) => {
        const r = Number(cell.dataset.row);
        const c = Number(cell.dataset.col);
        cell.classList.remove('selected', 'anchor');
        if (!rect) return;
        if (r >= rect.startRow && r <= rect.endRow && c >= rect.startCol && c <= rect.endCol) cell.classList.add('selected');
        if (anchor && r === anchor.row && c === anchor.col) cell.classList.add('anchor');
      });
      if (!rect) {
        selectionBox.style.display = 'none';
        coordsBadge.textContent = 'No selection';
      } else {
        const { previewWidth, previewHeight, rows, cols } = values();
        const cellW = previewWidth / cols;
        const cellH = previewHeight / rows;
        selectionBox.style.display = 'block';
        selectionBox.style.left = ((rect.startCol - 1) * cellW) + 'px';
        selectionBox.style.top = ((rect.startRow - 1) * cellH) + 'px';
        selectionBox.style.width = (rect.widthCols * cellW) + 'px';
        selectionBox.style.height = (rect.heightRows * cellH) + 'px';
        coordsBadge.innerHTML = `<strong>Selection</strong><br>start <code>${rect.startRow}, ${rect.startCol}</code><br>span <code>${rect.heightRows}, ${rect.widthCols}</code>`;
      }
      config.onChange(rect);
    }

    function handleCellClick(row, col, event) {
      if (event.shiftKey && anchor) current = { row, col };
      else {
        anchor = { row, col };
        current = { row, col };
      }
      paintSelection();
    }

    function build() {
      const { previewWidth, previewHeight, rows, cols } = values();
      host.innerHTML = '';
      viewportEl = document.createElement('div');
      viewportEl.className = 'designer-viewport';
      viewportEl.style.width = previewWidth + 'px';
      viewportEl.style.height = previewHeight + 'px';
      selectionBox = document.createElement('div');
      selectionBox.className = 'selection-box';
      coordsBadge = document.createElement('div');
      coordsBadge.className = 'coords-badge';
      coordsBadge.textContent = 'No selection';
      cells = [];
      anchor = null;
      current = null;
      const cellW = previewWidth / cols;
      const cellH = previewHeight / rows;
      for (let r = 1; r <= rows; r += 1) {
        for (let c = 1; c <= cols; c += 1) {
          const div = document.createElement('div');
          div.className = 'grid-cell';
          div.style.left = ((c - 1) * cellW) + 'px';
          div.style.top = ((r - 1) * cellH) + 'px';
          div.style.width = cellW + 'px';
          div.style.height = cellH + 'px';
          div.dataset.row = String(r);
          div.dataset.col = String(c);
          div.textContent = `${r},${c}`;
          div.addEventListener('click', (event) => handleCellClick(r, c, event));
          viewportEl.appendChild(div);
          cells.push(div);
        }
      }
      viewportEl.appendChild(selectionBox);
      viewportEl.appendChild(coordsBadge);
      host.appendChild(viewportEl);
      config.onChange(null);
    }

    function clear() {
      anchor = null;
      current = null;
      paintSelection();
    }

    function setSelection(startRow, startCol, spanRows, spanCols) {
      if (!startRow || !startCol || !spanRows || !spanCols) {
        clear();
        return;
      }
      anchor = { row: startRow, col: startCol };
      current = { row: startRow + spanRows - 1, col: startCol + spanCols - 1 };
      paintSelection();
    }

    return {
      build,
      clear,
      setSelection,
      getRect: rectSelection
    };
  }

  const pulseCellGrid = createGridSelector(pc.host, {
    getValues() {
      return {
        previewWidth: Math.max(120, Number(pc.previewWidth.value) || 720),
        previewHeight: Math.max(120, Number(pc.previewHeight.value) || 480),
        rows: Math.max(1, Number(pc.rows.value) || 8),
        cols: Math.max(1, Number(pc.cols.value) || 12)
      };
    },
    onChange(rect) {
      if (!rect) {
        pc.summary.textContent = 'No PulseCell selection yet.';
        return;
      }
      pc.summary.innerHTML = `startCell <code>[${rect.startRow}, ${rect.startCol}]</code> · span <code>[${rect.heightRows}, ${rect.widthCols}]</code>`;
    }
  });

  const pulseFieldGrid = createGridSelector(pf.host, {
    getValues() {
      return {
        previewWidth: 720,
        previewHeight: 420,
        rows: Math.max(1, Number(pf.rows.value) || 8),
        cols: Math.max(1, Number(pf.cols.value) || 6)
      };
    },
    onChange(rect) {
      if (!rect) {
        pf.summary.textContent = 'Select a PulseCell first, then mark a PulseField rectangle.';
        return;
      }
      pf.summary.innerHTML = `field startCell <code>[${rect.startRow}, ${rect.startCol}]</code> · span <code>[${rect.heightRows}, ${rect.widthCols}]</code>`;
    }
  });

  function buildPulseCellFromDesigner() {
    const rect = pulseCellGrid.getRect();
    if (!rect) throw new Error('Select a PulseCell rectangle first');
    const phrase = (pc.phrase.value || '').trim() || 'pulse_phrase';
    const cellId = (pc.cellId.value || '').trim() || `cell_${phrase.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`;
    const headMode = pc.headMode.value;
    const headText = pc.headText.value.trim();
    const responseMode = pc.responseMode.value;
    return {
      cellId,
      pulsePhrase: phrase,
      tv: 'UN',
      responseConvention: { version: '1.1', mode: responseMode },
      response: responseMode === 'structured' ? [['META', 'value'], ['']] : [''],
      visual: {
        viewport: { rows: Number(pc.rows.value), columns: Number(pc.cols.value) },
        layer: Number(pc.layer.value) || 1,
        position: { startCell: [rect.startRow, rect.startCol], span: [rect.heightRows, rect.widthCols] },
        inputMethod: 'display'
      },
      render: headMode === 'explicit'
        ? { headMode: 'explicit', headText: headText || phrase, bodyMode: 'responsePulseFields' }
        : { headMode: 'pulsePhrase', bodyMode: 'responsePulseFields' }
    };
  }

  function updatePulseSelectors(state) {
    const currentPf = pfPulseSelect.value;
    const currentPickup = pickupPulseSelect.value;
    pfPulseSelect.innerHTML = '';
    pickupPulseSelect.innerHTML = '';

    state.scene.cells.forEach((cell) => {
      const opt1 = document.createElement('option');
      opt1.value = cell.cellId;
      opt1.textContent = `${cell.cellId} — ${cell.pulsePhrase}`;
      pfPulseSelect.appendChild(opt1);
    });

    state.pickupPulseIds.forEach((pulseId) => {
      const pulse = globalThis.GridLookoutEngine.findPulse(pulseId);
      if (!pulse) return;
      const opt2 = document.createElement('option');
      opt2.value = pulseId;
      opt2.textContent = `${pulseId} — ${pulse.pulsePhrase}`;
      pickupPulseSelect.appendChild(opt2);
    });

    if (currentPf && globalThis.GridLookoutEngine.findPulse(currentPf)) pfPulseSelect.value = currentPf;
    else if (state.selectedPulseId) pfPulseSelect.value = state.selectedPulseId;

    if (currentPickup && state.pickupPulseIds.includes(currentPickup)) pickupPulseSelect.value = currentPickup;
    else if (state.pickupPulseIds[0]) pickupPulseSelect.value = state.pickupPulseIds[0];
  }

  function renderInspector(state) {
    const pulse = state.selectedPulseId ? globalThis.GridLookoutEngine.findPulse(state.selectedPulseId) : null;
    if (!pulse) {
      inspectorPane.className = 'inspector-empty';
      inspectorPane.textContent = 'Select a PulseCell from Scene or Pickup.';
      return;
    }
    inspectorPane.className = 'inspector-card';
    inspectorPane.innerHTML = `
      <div><strong>${pulse.pulsePhrase}</strong></div>
      <div class="inspector-grid">
        <div><div class="label">cellId</div><div class="value">${pulse.cellId}</div></div>
        <div><div class="label">layer</div><div class="value">${pulse.visual.layer || 1}</div></div>
        <div><div class="label">viewport</div><div class="value">${pulse.visual.viewport.rows} × ${pulse.visual.viewport.columns}</div></div>
        <div><div class="label">startCell</div><div class="value">[${pulse.visual.position.startCell.join(', ')}]</div></div>
        <div><div class="label">span</div><div class="value">[${pulse.visual.position.span.join(', ')}]</div></div>
        <div><div class="label">pickup</div><div class="value">${state.pickupPulseIds.includes(pulse.cellId) ? 'present' : 'not yet added'}</div></div>
      </div>
      <div><strong>PulseFieldViewport</strong></div>
      <pre>${JSON.stringify(pulse.PulseFieldViewport || {}, null, 2)}</pre>
      <div><strong>PulseFieldRender</strong></div>
      <pre>${JSON.stringify(pulse.PulseFieldRender || {}, null, 2)}</pre>
    `;
  }

  function renderAll(state) {
    syncEditorFromScene();
    updatePulseSelectors(state);
    renderInspector(state);
    globalThis.GridLookoutRenderer.renderSurface('sceneSurface', state.scene, {
      mode: 'scene',
      showGuides: state.showGuides,
      selectedPulseId: state.selectedPulseId,
      onSelect: (pulseId, mode) => {
        globalThis.GridLookoutEngine.selectPulse(pulseId);
        loadSelectedPulseIntoDesigners(pulseId);
        log(`Selected pulse in ${mode}`, { pulseId });
      },
      onFocus: true
    });
    const pickupCells = state.pickupPulseIds.map((id) => globalThis.GridLookoutEngine.findPulse(id)).filter(Boolean);
    globalThis.GridLookoutRenderer.renderSurface('pickupSurface', state.scene, {
      mode: 'pickup',
      showGuides: state.showGuides,
      selectedPulseId: state.selectedPulseId,
      cells: pickupCells,
      onSelect: (pulseId, mode) => {
        globalThis.GridLookoutEngine.selectPulse(pulseId);
        pickupPulseSelect.value = pulseId;
        loadSelectedPulseIntoDesigners(pulseId);
        log(`Selected pulse in ${mode}`, { pulseId });
      },
      onFocus: true
    });
  }

  function refreshVisibleSurface() {
    const state = globalThis.GridLookoutEngine.getState();
    if (!state.scene) return;
    if (['sceneTab', 'pickupTab', 'inspectorTab', 'designerTab', 'fieldDesignerTab'].includes(activeTabId)) {
      requestAnimationFrame(() => renderAll(state));
    }
  }

  function activateTab(tabId) {
    activeTabId = tabId;
    tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.tab === tabId));
    panes.forEach((pane) => pane.classList.toggle('is-active', pane.id === tabId));
    mountJsonEditor();
    refreshVisibleSurface();
  }

  function loadSelectedPulseIntoDesigners(pulseId) {
    const pulse = globalThis.GridLookoutEngine.findPulse(pulseId);
    if (!pulse) return;
    pc.rows.value = pulse.visual.viewport.rows;
    pc.cols.value = pulse.visual.viewport.columns;
    pc.phrase.value = pulse.pulsePhrase;
    pc.cellId.value = pulse.cellId;
    pc.layer.value = pulse.visual.layer || 1;
    pc.headMode.value = pulse.render && pulse.render.headMode === 'explicit' ? 'explicit' : 'pulsePhrase';
    pc.headText.value = pulse.render && pulse.render.headText ? pulse.render.headText : '';
    pc.responseMode.value = pulse.responseConvention && pulse.responseConvention.mode ? pulse.responseConvention.mode : 'simple';
    pulseCellGrid.build();
    pulseCellGrid.setSelection(pulse.visual.position.startCell[0], pulse.visual.position.startCell[1], pulse.visual.position.span[0], pulse.visual.position.span[1]);

    pfPulseSelect.value = pulse.cellId;
    if (pulse.PulseFieldViewport) {
      pf.rows.value = pulse.PulseFieldViewport.rows;
      pf.cols.value = pulse.PulseFieldViewport.columns;
    }
    pulseFieldGrid.build();
  }

  async function loadExample(filename) {
    const response = await fetch(filename);
    if (!response.ok) throw new Error(`Could not load ${filename}`);
    const scene = await response.json();
    validateScene(scene);
    globalThis.GridLookoutEngine.loadScene(scene);
    syncEditorFromScene();
    if (scene.cells[0]) loadSelectedPulseIntoDesigners(scene.cells[0].cellId);
    log('Example loaded', { pulseCount: scene.cells.length });
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));

  loadExampleBtn.addEventListener('click', async () => {
    try { await loadExample(sceneSelect.value); } catch (err) { log('Load error', { message: err.message }); }
  });

  renderBtn.addEventListener('click', () => {
    try { renderSceneFromEditor(); } catch (err) { log('Render error', { message: err.message }); }
  });

  formatJsonBtn.addEventListener('click', formatEditor);
  toggleGuidesBtn.addEventListener('click', () => { globalThis.GridLookoutEngine.toggleGuides(); log('Guide visibility toggled'); });

  pc.applyGridBtn.addEventListener('click', () => pulseCellGrid.build());
  pc.clearSelectionBtn.addEventListener('click', () => pulseCellGrid.clear());
  pc.saveCellBtn.addEventListener('click', () => {
    try {
      const pulse = buildPulseCellFromDesigner();
      globalThis.GridLookoutEngine.upsertPulse(pulse);
      loadSelectedPulseIntoDesigners(pulse.cellId);
      log('PulseCell saved', { cellId: pulse.cellId, pulsePhrase: pulse.pulsePhrase });
    } catch (err) {
      log('PulseCell save error', { message: err.message });
    }
  });
  pc.addPickupBtn.addEventListener('click', () => {
    try {
      const pulse = buildPulseCellFromDesigner();
      globalThis.GridLookoutEngine.upsertPulse(pulse);
      globalThis.GridLookoutEngine.addSelectedToPickup();
      log('PulseCell added to pickup', { cellId: pulse.cellId });
    } catch (err) {
      log('Pickup add error', { message: err.message });
    }
  });

  pf.applyGridBtn.addEventListener('click', () => pulseFieldGrid.build());
  pf.clearSelectionBtn.addEventListener('click', () => pulseFieldGrid.clear());
  pfPulseSelect.addEventListener('change', () => {
    const pulse = globalThis.GridLookoutEngine.findPulse(pfPulseSelect.value);
    if (!pulse) return;
    globalThis.GridLookoutEngine.selectPulse(pulse.cellId);
    if (pulse.PulseFieldViewport) {
      pf.rows.value = pulse.PulseFieldViewport.rows;
      pf.cols.value = pulse.PulseFieldViewport.columns;
    }
    pulseFieldGrid.build();
    const fieldNames = Object.keys(pulse.PulseFieldRender || {});
    if (fieldNames[0]) {
      const spec = pulse.PulseFieldRender[fieldNames[0]];
      pulseFieldGrid.setSelection(spec.position.startCell[0], spec.position.startCell[1], spec.position.span[0], spec.position.span[1]);
      pf.name.value = fieldNames[0];
      pf.label.value = spec.label || '';
      pf.type.value = spec.type || 'show';
      pf.actKind.value = spec.actKind || 'button';
      pf.actionIntention.value = spec.binding && spec.binding.actionIntentionId ? spec.binding.actionIntentionId : '';
    }
  });
  pf.saveFieldBtn.addEventListener('click', () => {
    try {
      const rect = pulseFieldGrid.getRect();
      const pulseId = pfPulseSelect.value;
      if (!pulseId) throw new Error('Choose a target PulseCell first');
      if (!rect) throw new Error('Select a PulseField rectangle first');
      const fieldName = (pf.name.value || '').trim();
      if (!fieldName) throw new Error('Field name is required');
      const spec = {
        type: pf.type.value,
        position: { startCell: [rect.startRow, rect.startCol], span: [rect.heightRows, rect.widthCols] }
      };
      const label = pf.label.value.trim();
      if (label) spec.label = label;
      if (pf.type.value === 'act') {
        spec.actKind = pf.actKind.value;
        const actionIntentionId = pf.actionIntention.value.trim();
        if (actionIntentionId) spec.binding = { actionIntentionId };
      }
      globalThis.GridLookoutEngine.upsertPulseField(
        pulseId,
        { rows: Number(pf.rows.value), columns: Number(pf.cols.value) },
        fieldName,
        spec
      );
      log('PulseField saved', { pulseId, fieldName });
    } catch (err) {
      log('PulseField save error', { message: err.message });
    }
  });

  document.getElementById('pickupUpBtn').addEventListener('click', () => { if (pickupPulseSelect.value) globalThis.GridLookoutEngine.movePulse(pickupPulseSelect.value, -1, 0); });
  document.getElementById('pickupDownBtn').addEventListener('click', () => { if (pickupPulseSelect.value) globalThis.GridLookoutEngine.movePulse(pickupPulseSelect.value, 1, 0); });
  document.getElementById('pickupLeftBtn').addEventListener('click', () => { if (pickupPulseSelect.value) globalThis.GridLookoutEngine.movePulse(pickupPulseSelect.value, 0, -1); });
  document.getElementById('pickupRightBtn').addEventListener('click', () => { if (pickupPulseSelect.value) globalThis.GridLookoutEngine.movePulse(pickupPulseSelect.value, 0, 1); });
  document.getElementById('pickupRemoveBtn').addEventListener('click', () => {
    if (!pickupPulseSelect.value) return;
    globalThis.GridLookoutEngine.removeFromPickup(pickupPulseSelect.value);
    log('Removed from pickup', { pulseId: pickupPulseSelect.value });
  });
  document.getElementById('clearPickupBtn').addEventListener('click', () => {
    globalThis.GridLookoutEngine.clearPickup();
    log('Pickup cleared');
  });
  pickupPulseSelect.addEventListener('change', () => {
    if (pickupPulseSelect.value) {
      globalThis.GridLookoutEngine.selectPulse(pickupPulseSelect.value);
      loadSelectedPulseIntoDesigners(pickupPulseSelect.value);
    }
  });

  editor.addEventListener('input', () => {
    if (suppressEditorSync) return;
  });

  globalThis.GridLookoutEngine.onChange((state) => {
    renderAll(state);
  });
  globalThis.GridLookoutEngine.onAction((payload) => log('PulseField action', payload));

  window.addEventListener('resize', () => {
    mountJsonEditor();
    refreshVisibleSurface();
  });

  mountJsonEditor();
  activateTab('designerTab');
  pulseCellGrid.build();
  pulseFieldGrid.build();

  loadExample('example_bank_account_form.json').catch((err) => {
    log('Initial load failed', { message: err.message });
  });
})();
