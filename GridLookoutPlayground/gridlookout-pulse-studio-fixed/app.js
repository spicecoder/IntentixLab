(function () {
  const editor = document.getElementById('jsonEditor');
  const inspectorPane = document.getElementById('inspectorPane');
  const logPane = document.getElementById('eventLog');
  const sceneSelect = document.getElementById('sceneSelect');
  const loadExampleBtn = document.getElementById('loadExampleBtn');
  const renderBtn = document.getElementById('renderBtn');
  const formatJsonBtn = document.getElementById('formatJsonBtn');
  const addToPickupBtn = document.getElementById('addToPickupBtn');
  const clearPickupBtn = document.getElementById('clearPickupBtn');
  const toggleGuidesBtn = document.getElementById('toggleGuidesBtn');
  const tabs = Array.from(document.querySelectorAll('.mode-tab'));
  const panes = Array.from(document.querySelectorAll('.workspace-pane'));
  const jsonColumn = document.getElementById('jsonColumn');
  const jsonTab = document.getElementById('jsonTab');
  const sceneSurface = document.getElementById('sceneSurface');
  const pickupSurface = document.getElementById('pickupSurface');

  let activeTabId = 'sceneTab';

  function isNarrow() {
    return window.matchMedia('(max-width: 980px)').matches;
  }

  function log(message, obj) {
    const stamp = new Date().toLocaleTimeString();
    const text = `[${stamp}] ${message}` + (obj ? `\n${JSON.stringify(obj, null, 2)}` : '');
    logPane.textContent = text + '\n\n' + logPane.textContent;
  }

  function formatEditor() {
    try {
      editor.value = JSON.stringify(JSON.parse(editor.value), null, 2);
    } catch (err) {
      log('Format error', { message: err.message });
    }
  }

  function mountJsonEditor() {
    if (isNarrow()) {
      if (!jsonTab.contains(editor)) {
        const section = jsonTab.querySelector('.panel-section');
        section.innerHTML = '';

        const titleRow = document.createElement('div');
        titleRow.className = 'panel-title-row';
        titleRow.innerHTML = '<h2>Scene JSON</h2>';
        const btn = document.createElement('button');
        btn.textContent = 'Format';
        btn.addEventListener('click', formatEditor);
        titleRow.appendChild(btn);
        section.appendChild(titleRow);
        section.appendChild(editor);
      }
      jsonColumn.classList.add('is-hidden');
    } else {
      if (!jsonColumn.contains(editor)) {
        const section = jsonColumn.querySelector('.panel-section');
        const existing = section.querySelector('#jsonEditor');
        if (!existing) section.appendChild(editor);
      }
      jsonColumn.classList.remove('is-hidden');
    }
  }

  function getSelectedPulse(state) {
    return state.selectedPulseId ? globalThis.GridLookoutEngine.findPulse(state.selectedPulseId) : null;
  }

  function renderInspector(state) {
    const pulse = getSelectedPulse(state);
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
      <div><strong>PulseFieldRender</strong></div>
      <pre>${JSON.stringify(pulse.PulseFieldRender || {}, null, 2)}</pre>
    `;
  }

  function validateScene(scene) {
    if (!scene || scene.schemaName !== 'GridLookout') throw new Error('schemaName must be GridLookout');
    if (!Array.isArray(scene.cells)) throw new Error('cells must be an array');
    scene.cells.forEach((cell) => {
      if (!cell.visual || !cell.visual.viewport || !cell.visual.position) throw new Error(`visual block missing in ${cell.cellId}`);
      const rows = cell.visual.viewport.rows;
      const cols = cell.visual.viewport.columns;
      const [startRow, startCol] = cell.visual.position.startCell;
      const [spanRows, spanCols] = cell.visual.position.span;
      if (startRow < 1 || startCol < 1) throw new Error(`startCell must start from 1 in ${cell.cellId}`);
      if (spanRows < 1 || spanCols < 1) throw new Error(`span must be positive in ${cell.cellId}`);
      if (startRow + spanRows - 1 > rows || startCol + spanCols - 1 > cols) {
        throw new Error(`PulseCell exceeds viewport bounds in ${cell.cellId}`);
      }
    });
  }

  function renderAll(state) {
    if (!state.scene) return;

    globalThis.GridLookoutRenderer.renderSurface('sceneSurface', state.scene, {
      mode: 'scene',
      showGuides: state.showGuides,
      selectedPulseId: state.selectedPulseId,
      onSelect: (pulseId, mode) => {
        globalThis.GridLookoutEngine.selectPulse(pulseId);
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
        log(`Selected pulse in ${mode}`, { pulseId });
      },
      onFocus: true
    });

    renderInspector(state);
  }

  function refreshVisibleSurface() {
    const state = globalThis.GridLookoutEngine.getState();
    if (!state.scene) return;
    if (activeTabId === 'sceneTab' || activeTabId === 'pickupTab') {
      // render again after pane becomes visible so ResizeObserver gets stable area
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

  function loadSceneObject(scene) {
    validateScene(scene);
    editor.value = JSON.stringify(scene, null, 2);
    globalThis.GridLookoutEngine.loadScene(scene);
    log('Scene loaded', { pulseCount: scene.cells.length });
    refreshVisibleSurface();
  }

  async function loadExample(filename) {
    const response = await fetch(filename);
    if (!response.ok) throw new Error(`Could not load ${filename}`);
    const scene = await response.json();
    loadSceneObject(scene);
  }

  function renderFromEditor() {
    const scene = JSON.parse(editor.value);
    loadSceneObject(scene);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activateTab(tab.dataset.tab));
  });

  loadExampleBtn.addEventListener('click', async () => {
    try { await loadExample(sceneSelect.value); } catch (err) { log('Load error', { message: err.message }); }
  });

  renderBtn.addEventListener('click', () => {
    try { renderFromEditor(); } catch (err) { log('Render error', { message: err.message }); }
  });

  formatJsonBtn.addEventListener('click', formatEditor);

  addToPickupBtn.addEventListener('click', () => {
    globalThis.GridLookoutEngine.addSelectedToPickup();
    log('Added selected pulse to pickup');
  });

  clearPickupBtn.addEventListener('click', () => {
    globalThis.GridLookoutEngine.clearPickup();
    log('Pickup cleared');
  });

  toggleGuidesBtn.addEventListener('click', () => {
    globalThis.GridLookoutEngine.toggleGuides();
    log('Guide visibility toggled');
  });

  globalThis.GridLookoutEngine.onChange((state) => renderAll(state));
  globalThis.GridLookoutEngine.onAction((payload) => log('PulseField action', payload));

  window.addEventListener('resize', () => {
    mountJsonEditor();
    refreshVisibleSurface();
  });

  mountJsonEditor();
  activateTab('sceneTab');

  loadExample('example_bank_account_form.json').catch((err) => {
    log('Initial load failed', { message: err.message });
  });
})();
