// import * as THREE from 'three';
// const scene = new THREE.Scene();
//     const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
//     camera.position.z = 1;

//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const uniforms = {
//       u_time: { value: 0.0 },
//       u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
//       u_mouse: { value: new THREE.Vector2(0.0, 0.0) }
//     };

//     const vertexShader = `

// attribute vec3 position;
// attribute vec2 uv;

// varying vec2 vUv;

// void main() {
//   vUv = uv;
//   gl_Position = vec4(position, 1.0);
// }

//   `;

//     const fragmentShader = `

//     precision mediump float;

// varying vec2 vUv;

// void main() {
//   float checker = step(0.5, fract(vUv.x * 10.0)) + step(0.5, fract(vUv.y * 10.0));
//   checker = mod(checker, 2.0); // alternate between 0 and 1

//   vec3 color = vec3(checker);
//   gl_FragColor = vec4(color, 1.0);
// }



//     `;

//     const material = new THREE.ShaderMaterial({
//       vertexShader,
//       fragmentShader,
//       uniforms
//     });

//     let geometry = new THREE.PlaneGeometry(2, 2);
//     geometry.setAttribute('uv', geometry.getAttribute('uv')); // reinforce uv
//     geometry.setAttribute('position', geometry.getAttribute('position')); // reinforce position
//     geometry = geometry.toNonIndexed();
    
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);

//     // Mouse tracking
//     window.addEventListener('mousemove', (e) => {
//       uniforms.u_mouse.value.x = e.clientX;
//       uniforms.u_mouse.value.y = renderer.domElement.height - e.clientY;
//     });

//     // Resize handling
//     window.addEventListener('resize', () => {
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
//     });

//     // Animation loop
//     const clock = new THREE.Clock();
//     function animate() {
//       uniforms.u_time.value = clock.getElapsedTime();
//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     }
//     animate();