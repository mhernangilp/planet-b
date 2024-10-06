import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

// Crear la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141820);

// Crear el fondo de estrellas
//const starTexture = new THREE.TextureLoader().load('public/background2.jpg');
//const starMaterial = new THREE.MeshBasicMaterial({
//  map: starTexture,
//  side: THREE.BackSide,
//  opacity: 0.25,
//  transparent: true
//});

const starGeometry = new THREE.SphereGeometry(600, 60, 40);
const stars = new THREE.Mesh(starGeometry);
scene.add(stars);

// Crear el globo con texturas
const Globe = new ThreeGlobe()
  .globeImageUrl('public/gas-texture2.jpeg')
  .bumpImageUrl('public/gas-topology.png');

// Material personalizado para el globo
const globeMaterial = Globe.globeMaterial();
globeMaterial.bumpScale = 0.1; // Ajusta según sea necesario

// Luz direccional
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Configurar el renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
const wBall = 1920/2.8;
const hBall = 1080/2.8;
renderer.setSize(wBall, hBall);
document.getElementById('globeViz').appendChild(renderer.domElement);

// Añadir el globo y la luz a la escena
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));

// Configurar la cámara
const aux = wBall/hBall;
const camera = new THREE.PerspectiveCamera(45, aux, 0.1, 1000);
camera.position.z = 300; // Ajusta la distancia según sea necesario
camera.updateProjectionMatrix();

// Controles de cámara
const tbControls = new TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 250;
tbControls.maxDistance = 350;
tbControls.rotateSpeed = 5;
tbControls.zoomSpeed = 0.8;

// Animación
(function animate() {
  tbControls.update();
  renderer.render(scene, camera);
  
  // Rotar el fondo de estrellas más lentamente que el globo
  stars.rotation.y += 0.0005; // Ajusta esta velocidad para controlar la rotación del fondo
  
  // Rotar el globo
  Globe.rotation.y += 0.003; // Mantén la rotación del globo
  
  requestAnimationFrame(animate);
})();

// Ajustar el tamaño del renderizado al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
