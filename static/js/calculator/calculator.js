import * as THREE from "three";

// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 400);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Add a simple 3D object (cube)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// animate();






// Function to render math input into KaTeX
function renderMath() {
    const inputText = document.getElementById('math-input').value;
    const displayElement = document.getElementById('math-display');

    try {
        // Render KaTeX
        katex.render(inputText, displayElement, {
            throwOnError: false
        });
    } catch (e) {
        // If the KaTeX render fails, clear the display
        displayElement.innerHTML = '';
    }
}

// Add event listener to the text area for real-time rendering
document.getElementById('math-input').addEventListener('input', renderMath);

// Initial rendering for an empty input (in case there's any starting value)
renderMath();