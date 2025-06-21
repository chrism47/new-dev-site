export class Structure {
  constructor(scene) {
    this.scene = scene;
    this.modules = {};
    this.activeModule = null;
  }

  addModule(name, moduleInstance) {
    this.modules[name] = moduleInstance;
    if (!this.activeModule) {
      this.activeModule = name;
    }

    // Add group if exists
    if (moduleInstance.group) {
      this.scene.add(moduleInstance.group);
    } else {
      console.warn(`Module ${name} has no .group property to add to scene.`);
    }
  }

  setActiveModule(name) {
    if (this.modules[name]) {
      this.activeModule = name;
    } else {
      console.warn(`Module ${name} not found.`);
    }
  }

  getActiveModule() {
    return this.modules[this.activeModule];
  }

  updateFromConfig(config) {
    const module = this.getActiveModule();
    if (module && typeof module.update === 'function') {
      module.update(config);
    }
  }

  getModuleNames() {
    return Object.keys(this.modules);
  }
}
