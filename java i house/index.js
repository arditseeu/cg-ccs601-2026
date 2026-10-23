import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(6, 4, 8);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
const sunLight = new THREE.DirectionalLight(0xffffff, 2);
sunLight.position.set(5, 10, 5);
scene.add(ambientLight, sunLight);

const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(10, 10, 0.2, 64),
    new THREE.MeshStandardMaterial({ color: 0x4caf50 })
);
ground.position.y = -0.1;
scene.add(ground);

const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2, 2.5, 32),
    new THREE.MeshStandardMaterial({ color: 0xf5deb3 })
);
walls.position.y = 1.25;
house.add(walls);

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(2.6, 1.8, 32),
    new THREE.MeshStandardMaterial({ color: 0xb22222 })
);
roof.position.y = 3.4;
house.add(roof);

const chimney = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.2, 1.6, 16),
    new THREE.MeshStandardMaterial({ color: 0x777777 })
);
chimney.position.set(1, 3.7, -0.5);
house.add(chimney);

const door = new THREE.Mesh(
    new THREE.CylinderGeometry(0.45, 0.45, 0.1, 32),
    new THREE.MeshStandardMaterial({ color: 0x5c3317 })
);
door.rotation.x = Math.PI / 2;
door.position.set(0, 0.45, 2);
house.add(door);

function addWindow(angleDeg) {
    const angle = THREE.MathUtils.degToRad(angleDeg);

    const holder = new THREE.Group();
    holder.position.set(Math.sin(angle) * 2, 1.6, Math.cos(angle) * 2);
    holder.rotation.y = angle;

    const windowMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32),
        new THREE.MeshStandardMaterial({ color: 0x66ccff })
    );
    windowMesh.rotation.x = Math.PI / 2;
    holder.add(windowMesh);

    house.add(holder);
}
addWindow(-50);
addWindow(50);

function addTree(x, z) {
    const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 1, 16),
        new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
    );
    trunk.position.set(x, 0.5, z);

    const leaves = new THREE.Mesh(
        new THREE.ConeGeometry(0.7, 1.8, 16),
        new THREE.MeshStandardMaterial({ color: 0x1b5e20 })
    );
    leaves.position.set(x, 1.9, z);

    scene.add(trunk, leaves);
}
addTree(4, 2);
addTree(-4, 3);
addTree(3.5, -3);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('scene').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();