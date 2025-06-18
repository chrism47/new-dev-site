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

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  float wave = 0.01 * noise(uv * 30.0)*sin(uv.y * 30.0 + uTime * 6.0) +
               0.02 * noise(uv * 25.0)* sin(uv.x * 40.0 - uTime * 1.0);

  float rippleSum = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
  if (i >= uRippleCount) break;

  float t = uTime - uRippleStartTimes[i];
  if (t < 2.0) {
    float dist = distance(uv, uRipplePositions[i]);
    float n = noise(uv * 25.0 + float(i));
    dist += (n - 0.5) * 0.02;

    float radius = t * 0.3;
    float ring = smoothstep(0.05, 0.0, abs(dist - radius));
    float ripple = ring * (1.0 - dist * 0.5) * exp(-1.5 * t);
    rippleSum += ripple;
  }
}



  float n = noise(uv * 50.0 + uTime * 0.1);
  float final = wave + rippleSum + (n - 0.5) * 0.1;

vec3 base = vec3(0.0, 0.06, 0.02);                // background color
vec3 rippleColor = vec3(0.01, 0.5, .1);         // ripple ring color (light cyan)

vec3 color = base + wave * 0.8 + rippleSum * rippleColor;  
gl_FragColor = vec4(color, 0.7);
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
