import * as THREE from 'three';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

// var geometry = new THREE.BoxGeometry(10, 10, 10);
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

camera.position.z = 30;

// function render() {
//   requestAnimationFrame( render );
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render( scene, camera );
// }
// render();

var geometry = new THREE.SphereGeometry(4, 64, 64);
var material = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );
camera.position.z = 25;

var spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
scene.add(spotLight);
var spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set( 200, 200, 200);
scene.add(spotLight2);

var geometry = new THREE.TorusGeometry(10, 3, 16, 100);
var material = new THREE.MeshNormalMaterial();

var torus = new THREE.Mesh(geometry, material);
scene.add(torus);
 
function render() {
  requestAnimationFrame( render );
  torus.rotation.x -= 0.01;
  renderer.render( scene, camera );
}
render();