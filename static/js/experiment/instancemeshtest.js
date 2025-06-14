import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 6);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
new OrbitControls(camera, renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light, new THREE.AmbientLight(0x888888));

// Sphere (the ball)
const sphereRadius = 1.5;
const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 64, 64);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x226622 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Grass blade geometry (simple plane)
const grassHeight = 0.1;
const grassGeometry = new THREE.PlaneGeometry(0.02, grassHeight);
grassGeometry.translate(0, grassHeight / 2, 0); // Pivot at bottom

// Grass material
const grassMaterial = new THREE.MeshStandardMaterial({
  color: 0x33aa33,
  side: THREE.DoubleSide,
});

// Instance mesh
const bladeCount = 2000;
const instancedMesh = new THREE.InstancedMesh(grassGeometry, grassMaterial, bladeCount);
const dummy = new THREE.Object3D();

for (let i = 0; i < bladeCount; i++) {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
  const y = sphereRadius * Math.cos(phi);
  const z = sphereRadius * Math.sin(phi) * Math.sin(theta);

  // Position
  dummy.position.set(x, y, z);

  // Align with normal
  const normal = new THREE.Vector3(x, y, z).normalize();
  dummy.lookAt(dummy.position.clone().add(normal));

  // Add randomness to rotation
  dummy.rotateZ(Math.random() * Math.PI);

  // Slight size variation
  const scale = 1 + Math.random() * 0.5;
  dummy.scale.set(1, scale, 1);

  dummy.updateMatrix();
  instancedMesh.setMatrixAt(i, dummy.matrix);
}

scene.add(instancedMesh);

// Animate
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.y += 0.001;
  instancedMesh.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});