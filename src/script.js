import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/textures/3.jpg')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.7, 64, 64)

// Materials

const material = new THREE.MeshStandardMaterial()
material.color = new THREE.Color(0xff22f2)
material.metalness = 1;
material.roughness = .5;
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xfafafa, 0.5)
pointLight.position.set(2, 1, 4);
scene.add(pointLight)

// Light 1
const pointLight1 = new THREE.PointLight(0xfafafa, 0.5)
pointLight1.position.set(-6.0, 4.5, 2.4);
scene.add(pointLight1)

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 0.01)
pointLight2.position.set(26.0, 4.5, 2.4);
pointLight2.intensity = 2;

scene.add(pointLight2)

// debug helper
// // const light2 = gui.addFolder('Light 2')
// //
// // light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// // light2.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
// // light2.add(pointLight2.position, 'z').min(-6).max(6).step(0.01)
// // light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)
//
// const light2Color = {
//   color: 0xff0000
// }
//
// light2.addColor(light2Color, 'color')
//   .onChange(() => {
//     pointLight2.color.set(light2Color.color)
//   })

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 2);
// scene.add(pointLightHelper )



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// get mouse coords
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowX)
  mouseY = (event.clientY - windowY)
}
// end get mouse coords

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.002
}

window.addEventListener('scroll', updateSphere);

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x)
    sphere.position.z += 0.01 * (targetY - sphere.position.z)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
