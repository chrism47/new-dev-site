import * as THREE from 'three';

 // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.6, 1000
      );
      camera.position.z = 100;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      let backgroundWindow = document.body.appendChild(renderer.domElement);
      backgroundWindow.classList = "background-window";

      // Create particle positions
      const particleCount = 10000;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.25) * 200;
      }

      // BufferGeometry
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // Material
      const material = new THREE.PointsMaterial({
        color: 0x81CB32,
        size: 2,
        transparent: true,
        opacity: 0.2,
        // 
      });

      // Particle System
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      
      
      // Animate
      function animate() {
        requestAnimationFrame(animate);
          particles.rotation.y += Math.sin(.0008);

        window.addEventListener("scroll", (e) => {
          

        })

        // Rotate the system slowly

        renderer.render(scene, camera);
      }

      animate();

      // Handle resizing
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });