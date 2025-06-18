import * as THREE from 'three';

let scene, camera, renderer, particleSystem;
  const particleCount = 300;
  const positions = [];
  const velocities = [];
  const lifetimes = [];
  const maxLifetime = 100;
  let scrollY = 0;
let lastScrollY = 0;
let scrollDelta = 0;

  let geometry, material;

  init();
  animate();

  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // camera.position.y = -3;
    camera.position.z = 3;

    geometry = new THREE.BufferGeometry();

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 30,
        0,
        (Math.random() - 0.5) * 2
      );
      velocities.push(
        (Math.random() - 0.5) * 0.02,
        0.05 + Math.random() * 0.05,
        (Math.random() - 0.5) * 0.02
      );
      lifetimes.push(Math.random() * maxLifetime);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const sprite = new THREE.TextureLoader().load(
      'https://threejs.org/examples/textures/sprites/spark1.png'
    );

    material = new THREE.PointsMaterial({
      size: 2,
      map: sprite,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.1,
    });

    const colors = new Float32Array(particleCount * 6);
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 2));

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
        scrollDelta = Math.sin(scrollY - lastScrollY) /Math.cos(scrollY - lastScrollY);
        lastScrollY = scrollY;

    })
  function animate() {
    requestAnimationFrame(animate);
    const pos = geometry.attributes.position.array;
    const colors = geometry.attributes.color.array;
    // camera.rotation.z += .005 * scrollDelta;
    // camera.translateZ(.005 * -scrollDelta);
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      lifetimes[i]++;
      

      // Reset particle if it "dies"
      if (lifetimes[i] > maxLifetime) {
        pos[idx] = (Math.random() - 0.5) * 12;
        pos[idx + 1] = 0;
        pos[idx + 2] = (Math.random() - 0.5) * 20 ;
        velocities[idx] = (Math.random() - 0.5) * 5;
        velocities[idx + 1] = 0.05 + Math.random() * 2 ;
        velocities[idx + 2] = (Math.random() - 0.5) * 5  *scrollDelta;
        lifetimes[i] = 0;
      }

      // Update position
      pos[idx] += velocities[idx]/100 ;
      pos[idx + 1] += velocities[idx + 1]/100 *scrollDelta;
      pos[idx + 2] += velocities[idx + 2]/100;

      // Color fading (orange to dark gray)
      const t = lifetimes[i] / maxLifetime;
      const r = 1.0 - t * 0.5 ;
      const g = 0.3 - t * 0.3;
      const b = 0.3 + t * 0.3;
      colors[idx] = r;
      colors[idx + 1] = g;
      colors[idx + 2] = b;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;

    renderer.render(scene, camera);
  }


      let backgroundWindow = document.body.appendChild(renderer.domElement);
      backgroundWindow.classList = "background-window";
