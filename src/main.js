import './style.css'

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

function add_star() {
	const star = new THREE.Mesh(star_geometry, star_material);
	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
	star.position.set(x, y, z);
	scene.add(star);
}

function on_scroll() {
	const t = document.body.getBoundingClientRect().top;
	camera.position.x = t * -0.01;
	camera.position.y = t * -0.01;
	camera.position.z = t * -0.01 + 30;
	camera.rotation.set(t * .0001, 0, t * -0.0001);

	// torus.rotation.x += 0.01;
	// torus.rotation.y -= 0.05;

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.05;
	// cube.rotation.z += 0.1;

	if(t==0){
		div_top_nav.style.backgroundColor = "transparent";
	}else{
		div_top_nav.style.backgroundColor = "black";
	}

}

function animate() {
	requestAnimationFrame(animate);

	// controls.update();
	renderer.render(scene, camera);
}

const div_top_nav = document.getElementById("div_top_nav");

// CREATE SCENE, CAMERA, RENDERER
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(window.innerHeight);
// MOVE CAMERA SO WE CAN SEE THE OBJECTS
camera.position.setZ(30);

// const space_texture = new THREE.TextureLoader().load("src/space_bg.jpg");
// scene.background = space_texture;
// TORUS
// const torus_geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const torus_material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// const torus = new THREE.Mesh(torus_geometry, torus_material);
// scene.add(torus);

// // CUBE
// const cube_geometry = new THREE.BoxGeometry(10,10,10,1,1,1);
// const cube_material = new THREE.MeshStandardMaterial({color:0xffffff});
// const cube = new THREE.Mesh(cube_geometry, cube_material);
// scene.add(cube);
// cube.position.set(30,10,-10);

// LIGHTING
// const point_light = new THREE.PointLight(0xffffff);
// point_light.position.set(5,5,5);
// point_light.intensity *= 1000;
// scene.add(point_light);
const ambient_light = new THREE.AmbientLight(0xffffff);
ambient_light.intensity = 5
scene.add(ambient_light);

// HELPERS
// const light_helper = new THREE.PointLightHelper(point_light);
// const grid_helper = new THREE.GridHelper(200,50);
// scene.add(grid_helper);

// ORBIT CONTROLS
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableZoom = false;

const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
const star_material = new THREE.MeshStandardMaterial({ color: 0xffffff });


Array(300).fill().forEach(add_star);
document.body.onscroll = on_scroll;
animate();

// move_camera();