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

loader.load('./southee_land_-_19_nov_2020/scene.gltf', function (gltf) {
    loadedModel = gltf.scene;
	scene.rotation.y = 500;
	scene.rotation.x = 100;
	scene.rotation.z = 2.9

    loadedModel.scale.set(20, 20, 20);

	scene.add( gltf.scene )
    scene.add(loadedModel);
}, undefined, function (error) {
    console.error(error);
});

loader.load('./new_futuristic_combat_jet_cockpit_wip-1/scene.gltf', function (gltf) {
    loadedModel = gltf.scene;
	scene.rotation.y = 500;
	scene.rotation.x = 100;
	scene.rotation.z = 2.9
	scene.add( gltf.scene )
    scene.add(loadedModel);
}, undefined, function (error) {
    console.error(error);
});

camera.position.z = 1
camera.position.x = 0.5
camera.position.y = -1.5
camera.rotation.y = 0.5
camera.rotation.x = -0.3

let moveForward = false;
let rotateLeft = false;
let rotateRight = false;

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W') {
        moveForward = true;
    }
    if (event.key === 'a' || event.key === 'A') {
        rotateLeft = true;
    }
    if (event.key === 'd' || event.key === 'D') {
        rotateRight = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 'W') {
        moveForward = false;
    }
    if (event.key === 'a' || event.key === 'A') {
        rotateLeft = false;
    }
    if (event.key === 'd' || event.key === 'D') {
        rotateRight = false;
    }
});

function animate() {
    requestAnimationFrame(animate);

    const moveSpeed = 5;
    if (moveForward) {
        loadedModel.position.z -= moveSpeed;
    }
    const rotateSpeed = 0.02;
    if (rotateLeft) {
        loadedModel.rotation.y += rotateSpeed;
    }
    if (rotateRight) {
        loadedModel.rotation.y -= rotateSpeed;
    }

    renderer.render(scene, camera);
}

animate();