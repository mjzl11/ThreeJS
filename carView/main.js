//npx vite

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(1000, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight( 0xffffff, 100 )
const lightB = new THREE.DirectionalLight( 0xd6f5d6, 100 )
light.position.set(1, 1, 1); // Position the light
scene.add(light, lightB);

const loader = new GLTFLoader();
let loadedModel;

loader.load('./free_1975_porsche_911_930_turbo/scene.gltf', function (gltf) {
    loadedModel = gltf.scene;
	scene.rotation.y = 500;
	scene.rotation.x = 100;
	scene.rotation.z = 2.9
	scene.add( gltf.scene )
    scene.add(loadedModel);
}, undefined, function (error) {
    console.error(error);
});

camera.position.z = 5;

const mouse = new THREE.Vector2();
const previousMouse = new THREE.Vector2();
let isDragging = false;

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
        const delta = new THREE.Vector2().subVectors(mouse, previousMouse);
        if (loadedModel) {
            loadedModel.rotation.y += delta.x * 1;
            loadedModel.rotation.x += delta.y * 1;
        }
    }

    previousMouse.copy(mouse);
});

window.addEventListener('mousedown', () => {
    isDragging = true;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();