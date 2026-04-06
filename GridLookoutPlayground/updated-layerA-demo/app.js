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
