import { TreeModule } from './al-g/ds/TreeModule.js';
import { RotateModifier } from './al-g/modifiers/RotateModifier.js';

let scene, camera, renderer, light;
let sceneObjects = [];

init();
animate();

function parseInput(input) {
    try {
        return JSON.parse(input);
    } catch {
        return input;
    }
}

function init() {
    // Setup Three.js
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    light = new THREE.AmbientLight("#FF0000", 1)
    scene.add(light)

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Default addTree (quick test button)
    const addTreeBtn = document.getElementById("addTree");
    if (addTreeBtn) {
        addTreeBtn.onclick = () => {
            const tree = new TreeModule({
                shape: 'sphere',
                colors: ['#0000ff'],
                origins: [[0, 0, 0]],
                nodeSize: 0.5,
                linkLength: 2,
                depth: 3
            });
            tree.build();
            scene.add(tree.group);
            sceneObjects.push(tree);
        };
    }


    // Advanced form-based tree creation
    const treeForm = document.getElementById("treeForm");
    if (treeForm) {
        treeForm.onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const config = {
                shape: formData.get('shape'),
                colors: parseInput(formData.get('colors')),
                origins: parseInput(formData.get('origins')),
                nodeSize: parseFloat(formData.get('size')),
                linkLength: parseFloat(formData.get('linkLength')),
                depth: parseInt(formData.get('depth'))
            };
            const tree = new TreeModule(config);
            tree.build();
            scene.add(tree.group);
            sceneObjects.push(tree);
        };
    }
}

function animate(time) {
    requestAnimationFrame(animate);
    sceneObjects.forEach(obj => {
        if (typeof obj.update === 'function') {
            obj.update(time);
        }
    });
 
    renderer.render(scene, camera);
}
