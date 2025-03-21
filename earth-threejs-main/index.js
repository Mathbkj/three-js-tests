import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);


const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.setZ(2);
const scene = new THREE.Scene();

//Earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z=-23.4/Math.PI * 180

scene.add(earthGroup);




// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 2);
scene.add(light);

// Earth Geo
const loader = new THREE.TextureLoader()


const geo = new THREE.IcosahedronGeometry(1, 12);
    const mat = new THREE.MeshStandardMaterial({
        map: loader.load("./textures/earthmap1k.jpg"), 
    });

const earthMesh = new THREE.Mesh(geo, mat);
earthMesh.rotation.y-=.002;
scene.add(earthMesh);

//EarthLight Geo
const lightMat = new THREE.MeshBasicMaterial({
    color:0x00ff00,
    transparent:true,
    opacity:0
})
const lightMesh = new THREE.Mesh(geo,lightMat);
earthGroup.add(lightMesh)

const hemiLight = new THREE.HemisphereLight();
scene.add(hemiLight);


function animate(t) {
    requestAnimationFrame(animate);
    earthMesh.rotation.x+=.001;
    earthMesh.rotation.y+=.001;
    renderer.render(scene, camera);
}
animate();

console.log("Robot Bobby was here");
