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
