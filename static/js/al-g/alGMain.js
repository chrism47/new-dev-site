import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.158.0/examples/jsm/controls/OrbitControls.js';

import { Tree } from './ds/treeModule.js';
import { Structure } from './alGStruct.js';

// --- Scene Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// --- Lighting ---
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(10, 10, 10);
scene.add(ambient);
scene.add(directional);

// --- Structure + Tree Setup ---
const structure = new Structure(scene);

// Create default tree and register as module
const initialTree = new Tree();
structure.addModule("tree", initialTree);
structure.setActiveModule("tree");

// --- Form Handling ---
const form = document.getElementById('treeForm');
const nodeSizeVal = document.getElementById('nodeSizeVal');
const lineThicknessVal = document.getElementById('lineThicknessVal');
const createTreeBtn = document.getElementById('createTreeBtn');

function getFormValues() {
  const formData = new FormData(form);
  return {
    data: formData.get('data').split(',').map(x => parseFloat(x.trim())),
    nodeSize: parseFloat(formData.get('nodeSize')),
    lineThickness: parseFloat(formData.get('lineThickness')),
    color: parseInt(formData.get('color').replace('#', ''), 16),
    originX: parseFloat(formData.get('originX')),
    originY: parseFloat(formData.get('originY')),
    originZ: parseFloat(formData.get('originZ')),
  };
}

// Update current active module (tree) in real time
form.addEventListener('input', () => {
  const values = getFormValues();

  nodeSizeVal.textContent = values.nodeSize;
  lineThicknessVal.textContent = values.lineThickness;

  const activeModule = structure.getActiveModule();
  if (activeModule && typeof activeModule.update === 'function') {
    activeModule.update({
      data: values.data,
      nodeSize: values.nodeSize,
      lineThickness: values.lineThickness,
      color: values.color,
      origin: new THREE.Vector3(values.originX, values.originY, values.originZ),
    });
  }
});

// Create new tree and register it as active brush
createTreeBtn.addEventListener('click', () => {
  const values = getFormValues();
  const newTree = new Tree({
    data: values.data,
    nodeSize: values.nodeSize,
    lineThickness: values.lineThickness,
    color: values.color,
    origin: new THREE.Vector3(values.originX, values.originY, values.originZ),
  });

  const moduleName = `tree_${structure.modules.length}`;
  structure.addModule(moduleName, newTree);
  structure.setActiveModule(moduleName);
});

// --- Render Loop ---
function animate() {
  requestAnimationFrame(animate);
  controls.update();
//   console.log(controls.update())
  renderer.render(scene, camera);
}
animate();


document.addEventListener('DOMContentLoaded', () => {
  const minBtn = document.querySelector('.minimize-btn');
  const form = document.getElementById('treeForm');

  if (minBtn && form) {
    minBtn.addEventListener('click', () => {
      form.style.display = (form.style.display === 'none') ? 'block' : 'none';
    });
  }
});



// --- Resize Handling ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// --- Style DOM ---
renderer.domElement.classList = "background-window";
