import * as THREE from './build/three.module.js';
import { OBJLoader } from './OBJLoader.js';

var blowing_audio = new Audio("./blow.mp3");
var popping_audio = new Audio("./pop.mp3");

const URL = "https://teachablemachine.withgoogle.com/models/9uYgHpsOI/";
let model, webcam, ctx, labelContainer, maxPredictions;
let renderer, objects, camera, scene, light, light1, loader, material, canvas2;

let lastState = "up";
let GrowFrames = 0;
let Active = true;

$("#bup").show();
$("#bdown").hide();

init();
	

async function loop(timestamp) {
	        webcam.update(); // update the webcam frame
	        await predict();
	    }

async function init(){

	

	const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // Note: the pose library adds a tmPose object to your window (window.tmPose)
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 300;
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    canvas2 = document.getElementById("myCanvas2");
    canvas2.width = size; canvas2.height = size;
    ctx = canvas2.getContext("2d");
   
	 

	renderer = new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias: true});
	renderer.setClearColor(0xaaaaaa);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);



	 objects = {};

	//CAMERA
	 camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);
	// var camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 3000);

	//SCENE
	scene = new THREE.Scene();

	//LIGHTS
	light = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(light);

	light1 = new THREE.PointLight(0xffffff, 0.5);
	scene.add(light1);

	loader = new OBJLoader();

	material = new THREE.MeshLambertMaterial({color: 0xaf355c});

	// load a resource
	loader.load(
		// resource URL
		'/balloon.obj',
		// called when resource is loaded
		function ( object ) {
			object.traverse( function ( child ) {

	        if ( child instanceof THREE.Mesh ) {
	            child.material = material;
	        }
	    });
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
	requestAnimationFrame(render);
}

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
	

	window.addEventListener('resize', handleResize);
	let frame = 0;
	function render() {
		if(objects.balloon){
	    	objects.balloon.rotation.y += 0.01;

	    	frame += 1;


	    	objects.balloon.position.y = 20*Math.sin(0.02*frame);
	    	if (GrowFrames>0 && Active ){
	    		objects.balloon.scale.addScalar(.003);
	    		objects.balloon.children.forEach( (mesh) => mesh.material.opacity = 1-objects.balloon.scale.x/6);
	    		GrowFrames--;

	    		if (objects.balloon.scale.x > 3.1){
	    			popping_audio.play();
	    			objects.balloon.position.set(undefined);
	    			Active = false;

	    		}
	    	};
	    }
	    renderer.render(scene, camera);
	    loop();
	    requestAnimationFrame(render);

	}
	// the link to your model provided by Teachable Machine export panel
	    

	    async function predict() {
	        // Prediction #1: run input through posenet
	        // estimatePose can take in an image, video or canvas html element
	        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
	        // Prediction 2: run input through teachable machine classification model
	        const prediction = await model.predict(posenetOutput);

	        for (let i = 0; i < maxPredictions; i++) {
	            const classPrediction =
	                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
	        }


	        if (prediction[1].probability > .80) {
	        	if (lastState == "down" ||lastState == "swap"){
	        		lastState = "up";
	        		$("#bup").show();
	        		$("#bdown").hide();
	        	};
	        };

	        if (prediction[2].probability >.80 ){
	        	if (lastState == "up" ){
	        		lastState = "down";
	        		$("#bup").hide();
	        		$("#bdown").show();
	        		blowing_audio.play();
	        		GrowFrames = 100;
	        		

	        	};

			};

	       

	        // finally draw the poses
	        drawPose(pose);
	    }

	    function drawPose(pose) {
	        if (canvas2) {
	        	ctx.clearRect(0, 0, canvas2.width, canvas2.height);
	            ctx.drawImage(canvas2, 0, 0);
	            // draw the keypoints and skeleton
	            if (pose) {
	                const minPartConfidence = 0.5;
	                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
	                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
	            }
	        }
	    }

	
// Update the camera and renderer parameters when the window changes size


