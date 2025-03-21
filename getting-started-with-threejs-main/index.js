import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js"
const w=window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement)
const fov = 75;
const aspect = w/h;
const near = .1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
camera.position.setZ(2);
const scene = new THREE.Scene();

const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true;
controls.dampingFactor = .03;

/** Basic Shape  **/
const geo = new THREE.IcosahedronGeometry(1.0,3)

const mat = new THREE.MeshStandardMaterial({
    color:0x00ccff,
    flatShading:true
    
})
const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh)



const hemiLight = new THREE.HemisphereLight(0xffff,0x000);
scene.add(hemiLight);
/**Basic Shape End */

/**Wireframe Shape */
const wireMat = new THREE.MeshBasicMaterial({color:"0xccff",wireframe:true});
const wireMesh = new THREE.Mesh(geo,wireMat);
scene.add(wireMesh);
/**Wireframe Shape End */


function animate(t=0){
    console.log(t);
    requestAnimationFrame(animate);
    //wireMesh.rotation.y=t*.0001;
    //mesh.rotation.y=t * .0001;
    controls.update(3)
    renderer.render(scene,camera);
}
animate();




console.log('Robot Bobby was here');