import * as THREE from 'three';
// Setup scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
});

const MAX_RIPPLES = 10;

// Uniforms including arrays for ripple positions and start times
const uniforms = {
  uTime: { value: 0 },
  uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
  uRipplePositions: { value: new Array(MAX_RIPPLES).fill(new THREE.Vector2(-1, -1)) },
  uRippleStartTimes: { value: new Float32Array(MAX_RIPPLES).fill(-1000) },
  uRippleCount: { value: 0 },
};

// Geometry and material
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;

    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uRipplePositions[${MAX_RIPPLES}];
    uniform float uRippleStartTimes[${MAX_RIPPLES}];
    uniform int uRippleCount;

    void main() {
      vec2 uv = gl_FragCoord.xy / uResolution;
      
      float wave = 0.03 * sin(uv.y * 30.0 + uTime *10.0) +
                   0.02 * sin(uv.x * 40.0 - uTime * 1.5);

      float rippleSum = 0.0;
      for (int i = 0; i < ${MAX_RIPPLES}; i++) {
        if (i >= uRippleCount) break;

        float t = uTime - uRippleStartTimes[i];
        if (t < 2.0) {
          float dist = distance(uv, uRipplePositions[i]);
          rippleSum += sin(60.0 * dist - t * 5.0) * exp(-4.0 * dist) * exp(-1.5 * t);
        }
      }

      float final = wave + rippleSum;
      vec3 color = vec3(0.1, 0.5, 0.2) + final * .3;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
  transparent: true,
  
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const clock = new THREE.Clock();

const ripples = [];

function addRipple(x, y, time) {
  if (ripples.length >= MAX_RIPPLES) ripples.shift();
  ripples.push({ position: new THREE.Vector2(x, y), startTime: time });
  updateRipplesUniforms();
}

function updateRipplesUniforms() {
  for (let i = 0; i < MAX_RIPPLES; i++) {
    if (ripples[i]) {
      uniforms.uRipplePositions.value[i] = ripples[i].position;
      uniforms.uRippleStartTimes.value[i] = ripples[i].startTime;
    } else {
      uniforms.uRipplePositions.value[i] = new THREE.Vector2(-1, -1);
      uniforms.uRippleStartTimes.value[i] = -1000;
    }
  }
  uniforms.uRipplePositions.needsUpdate = true;
  uniforms.uRippleStartTimes.needsUpdate = true;
  uniforms.uRippleCount.value = ripples.length;
}

window.addEventListener('pointerdown', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = 1.0 - e.clientY / window.innerHeight;
  const time = clock.getElapsedTime();
  addRipple(x, y, time);
});

window.addEventListener('pointermove', (e) => {
  // Only add ripples if mouse or touch is pressed/dragging
  if (e.buttons > 0 || e.pressure > 0) {
    const x = e.clientX / window.innerWidth;
    const y = 1.0 - e.clientY / window.innerHeight;
    const time = clock.getElapsedTime();
    addRipple(x, y, time);
  }
});

function animate() {
  requestAnimationFrame(animate);
  uniforms.uTime.value = clock.getElapsedTime();
  renderer.render(scene, camera);
}

animate();

document.body.appendChild(renderer.domElement);
renderer.domElement.classList = "background-window";
