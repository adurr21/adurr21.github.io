import * as three from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import cityModel from './assets/model/Little City.glb';

// ThreeJS

const scene = new three.Scene();

const renderer = new three.WebGLRenderer();
const container = document.getElementById("three-container");

renderer.setSize(container.clientWidth, container.clientHeight);
const camera = new three.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 10000);
container.appendChild(renderer.domElement);


// City
const loader = new GLTFLoader();
loader.load(cityModel, (gltf) => {
    const model = gltf.scene;

    model.scale.setScalar(2);

    model.rotateY(Math.PI)

    scene.add(model);

}, undefined, (error) => {
    console.error(error);
});

const directionalLight = new three.DirectionalLight(0xffffff, 3);
scene.add(directionalLight);

const ambientLight = new three.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 4);
controls.target.set(0.5, -0.5, 0);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.75;

directionalLight.position.set(0, 2, 5)

scene.background = new three.Color(0xffffff);

renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
})

// If the browser window is resized, the renderer and camera are updated to maintain
// the page.
function onWindowResize() {
    renderer.setSize(container.clientWidth, container.clientHeight);

    camera.aspect = container.clientWidth / container.clientHeight;

    camera.updateProjectionMatrix();
}

// Add the onWindowResize() as an event listener for page resize.
window.addEventListener('resize', onWindowResize, false);
