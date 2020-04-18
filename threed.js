
import * as THREE from './build/three.module.js';
import { OBJLoader } from './OBJLoader.js';

var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
renderer.setClearColor(0x00ff00);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var objects = {};

//CAMERA
var camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
// var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);

//SCENE
var scene = new THREE.Scene();

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);

var light1 = new THREE.PointLight(0xffffff, 0.5);
scene.add(light1);

//OBJECT
var geometry = new THREE.CubeGeometry(100, 100, 100);
var material = new THREE.MeshLambertMaterial({color: 0xF3FFE2});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -1000);

scene.add(mesh);

var loader = new OBJLoader();

// load a resource
loader.load(
	// resource URL
	'/balloon.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );
		object.position.set(0, 0, -1000);
		objects.balloon = object;
		

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

//Resize Logic
function handleResize()
 {
  let w = window.innerWidth;
  let h = window.innerHeight;



  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}



//RENDER LOOP
requestAnimationFrame(render);

window.addEventListener('resize', handleResize);
let frame = 0;
function render() {
	if(objects.balloon){
    objects.balloon.rotation.y += 0.01;

    frame += 1;
    objects.balloon.position.y = (frame*.25) +20*Math.sin(0.02*frame);
    objects.balloon.scale.addScalar(.002);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

// Update the camera and renderer parameters when the window changes size


