import * as THREE from 'three';

export class Tree {
  constructor(config = {}) {
    this.group = new THREE.Group();
    this.config = {
      data: config.data || [],
      nodeSize: config.nodeSize || 1,
      color: config.color || 0x00ff00,
      lineThickness: config.lineThickness || 0.1,
      origin: config.origin || new THREE.Vector3(0, 0, 0),
    };

    this.buildTree();
  }

  update(config = {}) {
    Object.assign(this.config, config);
    this.buildTree();
  }

  buildTree() {
    this.group.clear();
    const { data, nodeSize, color, lineThickness, origin } = this.config;
    if (!data || data.length === 0) return;

    const nodes = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i] == null) continue;

      const depth = Math.floor(Math.log2(i + 1));
      const indexInLevel = i - (2 ** depth - 1);
      const totalInLevel = 2 ** depth;
      const x = (indexInLevel - (totalInLevel - 1) / 2) * 2;
      const y = -depth * 3;

      const radius = nodeSize * (data[i] / 10); // size tied to input value
      const geometry = new THREE.SphereGeometry(radius, 16, 16);
      const material = new THREE.MeshStandardMaterial({ color });
      const sphere = new THREE.Mesh(geometry, material);

      sphere.position.set(origin.x + x, origin.y + y, origin.z);
      this.group.add(sphere);
      nodes[i] = sphere;

      const parentIndex = Math.floor((i - 1) / 2);
      if (nodes[parentIndex]) {
        const start = nodes[parentIndex].position;
        const end = sphere.position;
        const line = this.createLine(start, end, lineThickness);
        this.group.add(line);
      }
    }
  }

  createLine(start, end, thickness) {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();

    const geometry = new THREE.CylinderGeometry(thickness, thickness, length, 8);
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 });
    const cylinder = new THREE.Mesh(geometry, material);

    cylinder.position.copy(start).add(end).multiplyScalar(0.5);
    cylinder.lookAt(end);
    cylinder.rotateX(Math.PI / 2);

    return cylinder;
  }
}
