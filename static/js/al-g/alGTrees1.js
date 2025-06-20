import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// ---------------- BST ----------------
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const insertNode = (node, value) => {
      if (!node) return new TreeNode(value);
      if (value < node.value) node.left = insertNode(node.left, value);
      else node.right = insertNode(node.right, value);
      return node;
    };
    this.root = insertNode(this.root, value);
  }
}

// ---------------- AVL ----------------
class AVLNode extends TreeNode {
  constructor(value) {
    super(value);
    this.height = 1;
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : 0;
  }

  updateHeight(node) {
    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  balanceFactor(node) {
    return this.height(node.left) - this.height(node.right);
  }

  rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  balance(node) {
    this.updateHeight(node);
    const balance = this.balanceFactor(node);
    if (balance > 1) {
      if (this.balanceFactor(node.left) < 0) {
        node.left = this.rotateLeft(node.left);
      }
      return this.rotateRight(node);
    }
    if (balance < -1) {
      if (this.balanceFactor(node.right) > 0) {
        node.right = this.rotateRight(node.right);
      }
      return this.rotateLeft(node);
    }
    return node;
  }

  insert(value) {
    const insertNode = (node, value) => {
      if (!node) return new AVLNode(value);
      if (value < node.value) node.left = insertNode(node.left, value);
      else node.right = insertNode(node.right, value);
      return this.balance(node);
    };
    this.root = insertNode(this.root, value);
  }
}

// ---------------- Scene ----------------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0xffffff, 1));

let font;
let objects = [];

const loader = new FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', loadedFont => {
  font = loadedFont;
  renderTree();
});

function clearScene() {
  for (const obj of objects) {
    scene.remove(obj);
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) obj.material.dispose();
  }
  objects = [];
}

function createSphere(x, y, nodeRef) {
  const geometry = new THREE.SphereGeometry(0.6, 16, 16);
  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(x, y, 0);
  sphere.visible = true;

  scene.add(sphere);
  objects.push(sphere);

  return sphere;
}

function createLine(x1, y1, x2, y2) {
  const points = [new THREE.Vector3(x1, y1, 0), new THREE.Vector3(x2, y2, 0)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0x00ff20 });
  const line = new THREE.Line(geometry, material);
  scene.add(line);
  objects.push(line);
}

function createText(text, x, y) {
  const geometry = new TextGeometry(text.toString(), {
    font,
    size: 0.4,
    height: 0.1,
  });
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  geometry.center();
  mesh.position.set(x, y + 0.9, 0);
  scene.add(mesh);
  objects.push(mesh);
}

const bst = new BinaryTree();
const avl = new AVLTree();

function getActiveTree() {
  const type = document.getElementById('treeType').value;
  return type === 'avl' ? avl : bst;
}

function renderTree() {
  if (!font) return;
  clearScene();
  const tree = getActiveTree();
  const depthScale = parseFloat(document.getElementById('depthSlider').value);

  const draw = (node, x, y, level) => {
    if (!node) return;
    const spacing = 6 / Math.pow(2, level) * depthScale;
    createSphere(x, y, node);
    createText(node.value, x, y);

    if (node.left) {
      const lx = x - spacing;
      const ly = y - 3;
      createLine(x, y, lx, ly);
      draw(node.left, lx, ly, level + 1);
    }
    if (node.right) {
      const rx = x + spacing;
      const ry = y - 3;
      createLine(x, y, rx, ry);
      draw(node.right, rx, ry, level + 1);
    }
  };

  draw(tree.root, 0, 10, 1);
}

document.getElementById('addBtn').onclick = () => {
  let input = document.getElementById('valueInput').value.trim();
  if (input.startsWith('[') && input.endsWith(']')) input = input.slice(1, -1);
  const values = input.split(',').map(v => parseInt(v.trim(), 10)).filter(v => !isNaN(v));
  const tree = getActiveTree();
  for (const val of values) tree.insert(val);
  if (values.length > 0) {
    renderTree();
  }
};

document.getElementById('depthSlider').oninput = renderTree;
document.getElementById('treeType').onchange = renderTree;

document.getElementById('clearBtn').onclick = () => {
  bst.root = null;
  avl.root = null;
  clearScene();
};

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();