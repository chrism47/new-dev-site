// used for learning different three.js concepts



// Import Three.js
import * as THREE from 'three';


// Import required modules
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';










// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = document.body.appendChild(renderer.domElement);
canvas.className = 'background-canvas';

// Add a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ 
    color: 0x00ff00,
    roughness: 10,
  metalness: 0.2
});
const cube = new THREE.Mesh(geometry, material);
cube.position.x = -2;
scene.add(cube);















// Create a composer
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Add bloom effect
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,  // strength
  0.4,  // radius
  0.85  // threshold
);
composer.addPass(bloomPass);

// Add film grain effect
const filmPass = new FilmPass(
  5,  // noise intensity
  0.025, // scanline intensity
  648,   // scanline count
  false  // grayscale
);
composer.addPass(filmPass);


















// Add a sphere with a standard material
const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);
const sphereMaterial = new THREE.MeshStandardMaterial({ 
  color: 0xffff00,
  roughness: 10,
  metalness: 0.2
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

scene.add(sphere);

// Add lighting (needed for standard materials)
const light = new THREE.PointLight(0xfffff, 1, 100);
light.position.set(0, 0, 5);
scene.add(light, sphere);














// Set up renderer for shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Create a plane as floor
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true;
scene.add(plane);

// Make objects cast shadows
sphere.castShadow = true;
cube.castShadow = true;

// Add directional light with shadows
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);
dirLight.castShadow = true;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 20;
dirLight.shadow.camera.left = -5;
dirLight.shadow.camera.right = 5;
dirLight.shadow.camera.top = 5;
dirLight.shadow.camera.bottom = -5;
scene.add(dirLight);






// Load texture and normal map
const textureLoader = new THREE.TextureLoader();
const woodTexture = textureLoader.load('static/img/wood-texture.jpg');
const woodNormalMap = textureLoader.load('static/img/wood-normal.png');

// Create a cylinder with texture
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({
  map: woodTexture,
  normalMap: woodNormalMap,
  roughness: 0.6,
  metalness: 0.1
});
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(2, 0, 0);
cylinder.castShadow = true;
scene.add(cylinder);











// Animation loop
function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;
  composer.render(scene, camera);}
animate();