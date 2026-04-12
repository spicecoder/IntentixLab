(function (global) {
  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function Engine() {
    this.scene = { schemaName: 'GridLookout', schemaVersion: '1.2', cells: [] };
    this.selectedPulseId = null;
    this.pickupPulseIds = [];
    this.showGuides = true;
    this.listeners = new Set();
    this.actionHandler = null;
  }

  Engine.prototype._notify = function () {
    const state = this.getState();
    this.listeners.forEach((listener) => listener(state));
  };

  Engine.prototype.onChange = function (listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  Engine.prototype.getState = function () {
    return {
      scene: this.scene,
      selectedPulseId: this.selectedPulseId,
      pickupPulseIds: this.pickupPulseIds.slice(),
      showGuides: this.showGuides
    };
  };

  Engine.prototype.loadScene = function (scene) {
    this.scene = deepClone(scene);
    this.selectedPulseId = this.scene.cells[0] ? this.scene.cells[0].cellId : null;
    this.pickupPulseIds = [];
    this._notify();
  };

  Engine.prototype.exportScene = function () {
    return deepClone(this.scene);
  };

  Engine.prototype.findPulse = function (pulseId) {
    return (this.scene.cells || []).find((cell) => cell.cellId === pulseId) || null;
  };

  Engine.prototype.selectPulse = function (pulseId) {
    this.selectedPulseId = pulseId;
    this._notify();
  };

  Engine.prototype.upsertPulse = function (pulse) {
    const index = this.scene.cells.findIndex((cell) => cell.cellId === pulse.cellId);
    if (index >= 0) this.scene.cells[index] = deepClone(pulse);
    else this.scene.cells.push(deepClone(pulse));
    this.selectedPulseId = pulse.cellId;
    this._notify();
  };

  Engine.prototype.removePulse = function (pulseId) {
    this.scene.cells = this.scene.cells.filter((cell) => cell.cellId !== pulseId);
    this.pickupPulseIds = this.pickupPulseIds.filter((id) => id !== pulseId);
    if (this.selectedPulseId === pulseId) this.selectedPulseId = this.scene.cells[0] ? this.scene.cells[0].cellId : null;
    this._notify();
  };

  Engine.prototype.addSelectedToPickup = function () {
    if (!this.selectedPulseId) return;
    if (!this.pickupPulseIds.includes(this.selectedPulseId)) this.pickupPulseIds.push(this.selectedPulseId);
    this._notify();
  };

  Engine.prototype.removeFromPickup = function (pulseId) {
    this.pickupPulseIds = this.pickupPulseIds.filter((id) => id !== pulseId);
    this._notify();
  };

  Engine.prototype.clearPickup = function () {
    this.pickupPulseIds = [];
    this._notify();
  };

  Engine.prototype.movePulse = function (pulseId, rowDelta, colDelta) {
    const pulse = this.findPulse(pulseId);
    if (!pulse) return;
    const rows = pulse.visual.viewport.rows;
    const cols = pulse.visual.viewport.columns;
    const spanRows = pulse.visual.position.span[0];
    const spanCols = pulse.visual.position.span[1];
    const currentRow = pulse.visual.position.startCell[0];
    const currentCol = pulse.visual.position.startCell[1];
    const nextRow = Math.min(rows - spanRows + 1, Math.max(1, currentRow + rowDelta));
    const nextCol = Math.min(cols - spanCols + 1, Math.max(1, currentCol + colDelta));
    pulse.visual.position.startCell = [nextRow, nextCol];
    this.upsertPulse(pulse);
  };

  Engine.prototype.upsertPulseField = function (pulseId, fieldViewport, fieldName, spec) {
    const pulse = this.findPulse(pulseId);
    if (!pulse) return;
    pulse.PulseFieldViewport = deepClone(fieldViewport);
    pulse.PulseFieldRender = pulse.PulseFieldRender || {};
    pulse.PulseFieldRender[fieldName] = deepClone(spec);
    this.upsertPulse(pulse);
  };

  Engine.prototype.toggleGuides = function () {
    this.showGuides = !this.showGuides;
    this._notify();
  };

  Engine.prototype.onAction = function (handler) {
    this.actionHandler = handler;
  };

  Engine.prototype.emitAction = function (payload) {
    if (typeof this.actionHandler === 'function') this.actionHandler(payload);
  };

  global.GridLookoutEngine = new Engine();
})(window);
