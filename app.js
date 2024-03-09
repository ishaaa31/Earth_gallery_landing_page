let scene, camera, renderer;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Add Earth
    createEarth();

    // Add points with images
    addPointsWithImages();

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

function createEarth() {
    const radius = 2; // Radius of the Earth
    const segments = 32; // Number of segments
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('earth_texture.jpg', () => {
        // Texture loaded callback
        const material = new THREE.MeshBasicMaterial({ map: texture});
        const earth = new THREE.Mesh(geometry, material);
        scene.add(earth);
    });
}

function addPointsWithImages() {
    // Example: Add points with images at specific latitudes and longitudes
addPointWithImage(-60, -45, '1.jpg');
addPointWithImage(-25, -45, '2.jpg');
addPointWithImage(10, -45, '3.jpg');
addPointWithImage(45, -45, '4.jpg');
addPointWithImage(80, -45, '5.jpeg');
addPointWithImage(-60, 0, '6.jpg');
addPointWithImage(-25, 0, '7.jpg');
addPointWithImage(10, 0, '8.jpg');
addPointWithImage(45, 0, '9.jpeg');
addPointWithImage(80, 0, '10.jpg');
addPointWithImage(-60, 45, '11.jpg');
addPointWithImage(-25, 45, '12.jpg');
addPointWithImage(10, 45, '13.jpg');
addPointWithImage(45, 45, '14.jpg');
addPointWithImage(80, 45, '15.jpg');
addPointWithImage(-60, 90, '16.jpg');
addPointWithImage(-25, 90, '17.jpg');
addPointWithImage(10, 90, '18.jpg');
addPointWithImage(45, 90, '19.jpg');
addPointWithImage(80, 90, '20.jpg');
addPointWithImage(-60, 135, '21.jpg');
addPointWithImage(-25, 135, '22.jpg');
addPointWithImage(10, 135, '23.jpg');
addPointWithImage(45, 135, '24.jpg');
addPointWithImage(80, 135, '25.jpg');
addPointWithImage(-60, 180, '26.jpeg');
addPointWithImage(-25, 180, '27.jpg');
addPointWithImage(10, 180, '28.jpg');
addPointWithImage(45, 180, '29.jpeg');
addPointWithImage(80, 180, '30.jpg');
addPointWithImage(-60, -90, '31.jpg');
addPointWithImage(-25, -90, '32.jpg');
addPointWithImage(10, -90, '33.jpg');
addPointWithImage(45, -90, '34.jpg');
addPointWithImage(80, -90, '35.jpg');
addPointWithImage(-60, -135, '36.jpg');
addPointWithImage(-25, -135, '37.jpg');
addPointWithImage(10, -135, '38.jpg');
addPointWithImage(45, -135, '39.jpg');
addPointWithImage(80, -135, '40.jpg');
addPointWithImage(-60, -180, '41.jpeg');
addPointWithImage(-25, -180, '42.jpg');
addPointWithImage(10, -180, '43.jpg');
addPointWithImage(45, -180, '44.jpeg');
addPointWithImage(80, -180, '45.jpg');
addPointWithImage(-60, -225, '46.jpg');
addPointWithImage(-25, -225, '47.jpg');
addPointWithImage(10, -225, '48.jpg');
addPointWithImage(45, -225, '49.jpg');
addPointWithImage(80, -225, '50.jpg');
addPointWithImage(-60, -270, '51.jpg');
addPointWithImage(-25, -270, '52.jpg');
addPointWithImage(10, -270, '53.jpg');
addPointWithImage(45, -270, '54.jpg');
addPointWithImage(80, -270, '55.jpg');
addPointWithImage(-60, -315, '56.jpg');
addPointWithImage(-25, -315, '57.jpg');
addPointWithImage(10, -315, '58.jpg');
    // Add more points as needed
}

function addPointWithImage(latitude, longitude, imagePath) {
    // Convert latitude and longitude to radians
    const latRad = THREE.MathUtils.degToRad(latitude);
    const lonRad = THREE.MathUtils.degToRad(longitude);

    // Calculate texture coordinates
    const u = (0.5 - lonRad / (2 * Math.PI));
    const v = (0.5 + latRad / Math.PI);

    // Load the image texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imagePath, (texture) => {
        // Texture loaded callback
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const geometry = new THREE.PlaneGeometry(1, 1); // Adjust the size as needed

        // Create a mesh for the image
        const imageMesh = new THREE.Mesh(geometry, material);

        // Set the position of the image mesh
        imageMesh.position.x = Math.cos(lonRad) * Math.cos(latRad) * 2;
        imageMesh.position.y = Math.sin(latRad) * 2;
        imageMesh.position.z = Math.sin(lonRad) * Math.cos(latRad) * 2;

        // Orient the image mesh to face the center of the Earth
        imageMesh.lookAt(new THREE.Vector3(0, 0, 0));

        // Add the image mesh to the scene
        scene.add(imageMesh);
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Add rotation animation for Earth (optional)
    scene.rotation.y += 0.005;

    // Render the scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Define zoom constants
const ZOOM_IN_FACTOR = 0.1;
const ZOOM_OUT_FACTOR = -0.1;

// Function to handle zoom in
function zoomIn() {
    camera.position.z += ZOOM_IN_FACTOR;
}

// Function to handle zoom out
function zoomOut() {
    camera.position.z += ZOOM_OUT_FACTOR;
}

document.addEventListener('keydown', function(event) {
    if (event.key === '+') {
        zoomIn(); // Zoom in when user presses '+'
    } else if (event.key === '-') {
        zoomOut(); // Zoom out when user presses '-'
    }
});

// Alternatively, you can use mouse wheel events for zooming
 document.addEventListener('wheel', function(event) {
     if (event.deltaY > 0) {
         zoomOut(); // Zoom out when user scrolls down
     } else {
         zoomIn(); // Zoom in when user scrolls up
     }
 });

// Initialize the scene
init();