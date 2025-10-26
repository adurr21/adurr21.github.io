import * as three from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import cityModel from './assets/model/Little City.glb';

// ThreeJS

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

const renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


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
camera.position.set(0, 2, 5);
controls.target.set(0.5, -0.5, 0);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.75;

directionalLight.position.set(0, 2, 5)

scene.background = new three.Color(0xffffff);

renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
})
