"use strict";
/* globals THREE, console */

// 1. Create an array to store stars
// 2. Create stars in random locations within a cube
// 3. Store stars in array so we can move them within render

var camera,
    scene,
    planetScene,
    renderer,
    plnaetRenderer,
    parent;
var theta;
var planeMesh;
var stars = [];
// var colors = ["#0952BD", "#ffc677", "#118CD6", "#f2f2a6", "#ffffff"];
var colors = ["#f5f5cc", "#f5efcc", "#fdfcee",  "#ffffff"];

function init() {

  theta = 0.0;

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x000000, 0.015, 72);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, alpha: true });
	renderer.sortObjects = false;
	renderer.autoClearColor = true;

  parent= document.getElementById('warp-scene');

	// Scene initialization
	camera.position.z = 55;
  camera.rotation.x = -0.13;

	renderer.setClearColor( 0x000000, 0.0);
  renderer.setSize($(parent).width(), $(parent).height());
	renderer.setPixelRatio(window.devicePixelRatio);


	parent.appendChild(renderer.domElement);

	for (var i = 0; i < 3000; i++) {
		var geometry = new THREE.SphereBufferGeometry(0.12 * Math.random(), 10, 10);
		var material = new THREE.MeshBasicMaterial({
			color: colors[Math.floor(Math.random() * colors.length)],
			shading: THREE.FlatShading
		});

		var star = new THREE.Mesh(geometry, material);

		star.position.x = Math.random() * 100 - 50;
		star.position.y = Math.random() * 100 - 50;
		star.position.z = Math.random() * 50 - 25;

		scene.add(star);
		stars.push(star);
	}

	var planeGeometry = new THREE.PlaneGeometry(1000, 500, 1, 1);
	var planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });

	planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

	scene.add(planeMesh);
}

function render() {

	requestAnimationFrame(render);
	renderer.render(scene, camera);

	for (var i = 0; i < stars.length; i++) {
		stars[i].position.z += (0.17 + 0.01*Math.sin(theta));

		if (stars[i].position.z >= 60) {
			stars[i].position.x = Math.random() * 100 - 50;
			stars[i].position.y = Math.random() * 100 - 50;
			stars[i].position.z = 5;
		}
	}

  theta += 0.02;


	// if (activated == true) {
	// 	planeMesh.material.opacity = 0.01;
	// } else {
	// 	if (planeMesh.material.opacity < 1) {
	// 		planeMesh.material.opacity += 0.01;
	// 	}
	// }
}

init();
render();

var activated = false;

window.addEventListener("mousedown", function (event) {
	activated = true;
});

window.addEventListener("mouseup", function (event) {
	activated = false;
});

window.addEventListener("resize", function () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
  renderer.setSize($(parent).width(), $(parent).height());
});

window.addEventListener("touchstart", function () {
	activated = true;
});

window.addEventListener("touchend", function () {
	activated = false;
});
