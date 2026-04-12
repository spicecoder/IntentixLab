(function (global) {
  function Engine() {
    this.scene = null;
    this.selectedPulseId = null;
    this.pickupPulseIds = [];
    this.showGuides = true;
    this.listeners = new Set();
    this.actionHandler = null;
  }

  Engine.prototype.loadScene = function (scene) {
    this.scene = scene;
    this.selectedPulseId = scene && scene.cells && scene.cells[0] ? scene.cells[0].cellId : null;
    this.pickupPulseIds = [];
    this._notify();
  };

  Engine.prototype.onChange = function (listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  Engine.prototype._notify = function () {
    this.listeners.forEach((listener) => listener(this.getState()));
  };

  Engine.prototype.getState = function () {
    return {
      scene: this.scene,
      selectedPulseId: this.selectedPulseId,
      pickupPulseIds: [...this.pickupPulseIds],
      showGuides: this.showGuides
    };
  };

  Engine.prototype.findPulse = function (pulseId) {
    return (this.scene && this.scene.cells || []).find((cell) => cell.cellId === pulseId) || null;
  };

  Engine.prototype.selectPulse = function (pulseId) {
    this.selectedPulseId = pulseId;
    this._notify();
  };

  Engine.prototype.addSelectedToPickup = function () {
    if (!this.selectedPulseId) return;
    if (!this.pickupPulseIds.includes(this.selectedPulseId)) {
      this.pickupPulseIds.push(this.selectedPulseId);
      this._notify();
    }
  };

  Engine.prototype.togglePickupPulse = function (pulseId) {
    if (this.pickupPulseIds.includes(pulseId)) {
      this.pickupPulseIds = this.pickupPulseIds.filter((id) => id !== pulseId);
    } else {
      this.pickupPulseIds.push(pulseId);
    }
    this._notify();
  };

  Engine.prototype.clearPickup = function () {
    this.pickupPulseIds = [];
    this._notify();
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
