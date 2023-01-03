import { 
    AmbientLight,
    AxesHelper,
    DirectionalLight,
    GridHelper,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
 } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { IFCLoader } from 'web-ifc-three/IFCLoader';

import {projects} from './data.js';

// Get project path

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const pNum = urlParams.get('project');

function getProjectByProjectNumber(projectNumber, projectList) {
    for (const p in projectList) {
        if (projectList[p].projectNumber === projectNumber) {
            return projectList[p]
        }
    }
}

const project = getProjectByProjectNumber(pNum, projects);

// Create Three.js scene
const scene = new Scene();
const size = {
    width: window.innerWidth,
    height: window.innerHeight,
};

// Create camera
const camera = new PerspectiveCamera(75, size.width / size.height);
camera.position.z = 15;
camera.position.y = 13;
camera.position.x = 8;

// Create lights
const lightColor = 0xffffff;
const ambientLight = new AmbientLight(lightColor, 0.5);
scene.add(ambientLight)

const directionalLight = new DirectionalLight(lightColor, 2);
directionalLight.position.set(0, 10, 0)
scene.add(directionalLight);

// Set up renderer
const threeCanvas = document.getElementById('three-canvas');
const renderer = new WebGLRenderer({ canvas: threeCanvas, alpha: true });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create grid and axes
const grid = new GridHelper(50, 30);
scene.add(grid);

const axes = new AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;
scene.add(axes);

const controls = new OrbitControls(camera, threeCanvas);
controls.enableDamping = true;
controls.target.set(-2, 0, 0);

// Animation loop
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

// Adjust viewport to the browser size
window.addEventListener('resize', () => {
    (size.width = window.innerWidth), (size.height = window.innerHeight);
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
});


async function loadIfc(){
    const ifcLoader = new IFCLoader();
    await ifcLoader.ifcManager.setWasmPath("./webifc-wasm/");
    const model = await ifcLoader.loadAsync(project.projectLink);
    scene.add(model);
};

loadIfc();