import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';

// Crear la escena
const scene = new THREE.Scene();

// Crear el fondo de estrellas
const starTexture = new THREE.TextureLoader().load('public/background2.jpg');
const starMaterial = new THREE.MeshBasicMaterial({
  map: starTexture,
  side: THREE.BackSide,
  opacity: 0.25,
  transparent: true
});

const starGeometry = new THREE.SphereGeometry(600, 60, 40);
const stars = new THREE.Mesh(starGeometry, starMaterial);
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
if (window.innerWidth > 480){
  renderer.setSize(window.innerWidth / 3, window.innerHeight);
} else {
  renderer.setSize(window.innerWidth, window.innerHeight);
} // Ajustar el tamaño
document.getElementById('globeViz').appendChild(renderer.domElement);

// Añadir el globo y la luz a la escena
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));

// Configurar la cámara
var camera = null
if (window.innerWidth > 480)
  camera = new THREE.PerspectiveCamera(75, (window.innerWidth / 3) / window.innerHeight, 0.1, 1000);
else
  camera = new THREE.PerspectiveCamera(75, (window.innerWidth) / window.innerHeight, 0.1, 1000);
camera.position.z = 298; // Ajusta la distancia según sea necesario
camera.updateProjectionMatrix();

// Controles de cámara
const tbControls = new TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 298;
tbControls.maxDistance = 380;
tbControls.rotateSpeed = 2;
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
  const width = window.innerWidth;
  if (width > 480){
    renderer.setSize(width, window.innerHeight);
  } else {
    renderer.setSize(width / 3, window.innerHeight);
  }
  camera.aspect = width / window.innerHeight;
  camera.updateProjectionMatrix();
});


document.getElementById("alert").style.display = "none"
document.getElementById("destroy").style.display = "none"

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    document.getElementById("alert").style.display = "";
  }, 2000);

  document.getElementById("alert").addEventListener("click", function () {
    document.getElementById("alert").style.display = "none"
    document.getElementById("icons").style.display = "none"
    document.getElementById("asteroids").style.display = "block"
    document.getElementById("asteroids").style.marginTop = "300px"
    document.getElementById("asteroids").style.marginLeft = "-100px"
    document.getElementById("destroy").style.display = ""
    document.getElementById("destroy").style.marginTop = "100px"

    const asteroids = document.querySelectorAll("#asteroids img");
    for (let i = 0; i < asteroids.length; i += 1){
      asteroids[i].addEventListener("click", function () {
        asteroids[i].style.display = "none"
        let counter = 0;
        for (let j = 0; j < asteroids.length; j += 1){
          if (asteroids[j].style.display == "none")
            counter += 1;
        }

        if (counter == asteroids.length)
          document.getElementById("destroy").innerHTML = "Congratulations!"
      })
    }
  })
});