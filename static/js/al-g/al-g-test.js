import * as THREE from 'three';



const width = window.innerWidth
const height = window.innerHeight
// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('#000000') // #00b140 
// Light
const light = new THREE.AmbientLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);
// Camera
const fov = 45 // AKA Field of View
const aspect = window.innerWidth / window.innerHeight
const near = 0.1 // the near clipping plane
const far = 100 // the far clipping plane
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0, 0, 10)
// Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// Creating a cube
const geometry = new THREE.BoxGeometry(.1, .1, .1)
const material = new THREE.MeshStandardMaterial()
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)


const uniforms = {
  uTime: { value: 0 }
};

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    uniform float uTime;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vUv = uv;

    vec3 pos = position;
    
    // Add sine wave motion
    float wave = sin(pos.x * 2.0 + uTime * 2.0) * 0.3;
    wave += sin(pos.y * 3.0 + uTime * 1.5) * 0.2;
    pos.z += wave;

    vPosition = pos;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

  `,
  fragmentShader: `
    varying vec3 vPosition;
varying vec2 vUv;

void main() {
    float height = vPosition.z;

    // Color gradient based on height
    vec3 deep = vec3(0.0, 0.2, 0.5);
    vec3 shallow = vec3(0.0, 0.6, 0.8);
    vec3 color = mix(deep, shallow, height + 0.5);

    gl_FragColor = vec4(color, 1.0);
}

  `,
  uniforms,
  wireframe: false,
  side: THREE.DoubleSide
});

const shader = new THREE.TorusGeometry(2, 2);
const shaderMeshOne = new THREE.Mesh(shader, shaderMaterial);
scene.add(shaderMeshOne);


// Rotation speed control
let rotationSpeedX = 0.01;
let rotationSpeedY = 0.01;

// Background color input
document.getElementById('bgColor').addEventListener('input', (e) => {
  const color = e.target.value;
  scene.background = new THREE.Color(color);
});
// Cube color
document.getElementById('objectColor').addEventListener('input', (e) => {
  material.color.set(e.target.value);
});

// Rotation speed input
document.getElementById('rotationSpeedX').addEventListener('input', (e) => {
  rotationSpeedX = parseFloat(e.target.value);
});

// Rotation speed input
document.getElementById('rotationSpeedY').addEventListener('input', (e) => {
  rotationSpeedY = parseFloat(e.target.value);
});

// Light intensity
document.getElementById('lightIntensity').addEventListener('input', (e) => {
  light.intensity = parseFloat(e.target.value);
});

// Wireframe toggle
document.getElementById('wireframe').addEventListener('change', (e) => {
  material.wireframe = e.target.checked;
});




// Rendering the scene
const container = document.querySelector('#threejs-container')
container.append(renderer.domElement)
renderer.render(scene, camera)

// Resize window with browser
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Example render loop
function animate() {
  shaderMeshOne.rotation.x += rotationSpeedX
  cube.rotation.y += rotationSpeedY
  uniforms.uTime.value = performance.now() / 1000;
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


animate();

//-------------------------------------------------------------