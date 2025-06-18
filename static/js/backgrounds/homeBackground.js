import * as THREE from 'three';
let scene, camera, renderer;
      let stars, starGeo;
      const starCount = 10000;

      init()
      animate()

      function init() {
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          1,
          1000
        );
        camera.position.z = 5;
      
        starGeo = new THREE.BufferGeometry();
        const positions = [];

        for (let i = 0; i < starCount; i++) {
          const x = (Math.random() - 0.5) * 100;
          const y = (Math.random() - 0.5) * 100;
          const z = Math.random() * -1000;
          positions.push(x, y, z);
        }

        starGeo.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        );

        const sprite = new THREE.TextureLoader().load(
          'https://threejs.org/examples/textures/sprites/disc.png'
        );

        const starMaterial = new THREE.PointsMaterial({
          size: 1.0,
          map: sprite,
          transparent: true,
          alphaTest: 0.5,
          color: 0x81CB32,
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
      }

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function animate() {
        requestAnimationFrame(animate);

        const positions = starGeo.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 2] += 0.1; // Move forward (z-axis)

          if (positions[i + 2] > 5) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = -100; // Reset far back
          }
        }

        starGeo.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      }
      
//  // Scene, Camera, Renderer
//       const scene = new THREE.Scene();
//       const camera = new THREE.PerspectiveCamera(
//         75, window.innerWidth / window.innerHeight, 0.6, 1000
//       );
//       camera.position.z = 100;

//       const renderer = new THREE.WebGLRenderer({ antialias: true });
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       let backgroundWindow = document.body.appendChild(renderer.domElement);
//       backgroundWindow.classList = "background-window";

//       // Create particle positions
//       const particleCount = 10000;
//       const positions = new Float32Array(particleCount * 3);
//       for (let i = 0; i < particleCount * 3; i++) {
//         positions[i] = (Math.random() -.25) * 200;
//       }

//       // BufferGeometry
//       const geometry = new THREE.BufferGeometry();
//       geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//       // Material
//       const material = new THREE.PointsMaterial({
//         color: 0x81CB32,
//         size: 2,
//         transparent: true,
//         opacity: 0.3,
        
//         // 
//       });

//       // Particle System
//       const particles = new THREE.Points(geometry, material);
//       scene.add(particles);
      
      
      // // Animate
      // function animate() {
      //   requestAnimationFrame(animate);
      //   particles.rotation.y += Math.sin(.0008);

      //   window.addEventListener("scroll", (e) => {
          
      //     particles.rotation.x += Math.random()*.0002;
      //     // particles.translateZ(.01);
      //   })

      //   // Rotate the system slowly

      //   renderer.render(scene, camera);
      // }

      // animate();

      // // Handle resizing
      // window.addEventListener('resize', () => {
      //   camera.aspect = window.innerWidth / window.innerHeight;
      //   camera.updateProjectionMatrix();
      //   renderer.setSize(window.innerWidth, window.innerHeight);
      // });
      let backgroundWindow = document.body.appendChild(renderer.domElement);
      backgroundWindow.classList = "background-window";
