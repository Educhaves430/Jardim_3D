import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

//['./static/skybox/clouds1_north.bmp', './static/skybox/clouds1_south.bmp', './static/skybox/clouds1_up.bmp', './static/skybox/clouds1_down.bmp', './static/skybox/clouds1_east.bmp', './static/skybox/clouds1_west.bmp']

//document.addEventListener('DOMContentLoaded', Start);

const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

//var USE_WIREFRAME = false;

const scene = new THREE.Scene();

const house = new THREE.Group();

const renderer = new THREE.WebGLRenderer();

var keyboard = {};
var player = { height:0.7, speed:0.4, turnSpeed:Math.PI*0.02 };
var USE_WIREFRAME = false;

//Alvo x1
var geometria = new THREE.CylinderGeometry(1.15, 1.15, 0.09, 64, 1);
var material_r = new THREE.MeshBasicMaterial({ color: "red", });
var cylinder00 = new THREE.Mesh(geometria, material_r);
cylinder00.rotateX(3/2);

geometria = new THREE.CylinderGeometry(0.95, 0.95, 0.1, 64, 1);
var material_w = new THREE.MeshBasicMaterial({ color: "white", });
var cylinder01 = new THREE.Mesh(geometria, material_w);
cylinder01.rotateX(3/2);

geometria = new THREE.CylinderGeometry(0.75, 0.75, 0.11, 64, 1);
var cylinder02 = new THREE.Mesh(geometria, material_r);
cylinder02.rotateX(3/2);

geometria = new THREE.CylinderGeometry(0.5, 0.5, 0.12, 64, 1);
var cylinder03 = new THREE.Mesh(geometria, material_w);
cylinder03.rotateX(3/2);

geometria = new THREE.CylinderGeometry(0.25, 0.25, 0.13, 64, 1);
var cylinder04 = new THREE.Mesh(geometria, material_r);
cylinder04.rotateX(3/2);

//Alvo x2
geometria = new THREE.CylinderGeometry(0.70, 0.70, 0.11, 64, 1);
var material_b = new THREE.MeshBasicMaterial({ color: "blue", });
var cylinder10 = new THREE.Mesh(geometria, material_b);
cylinder10.rotateX(3/2);

geometria = new THREE.CylinderGeometry(0.5, 0.5, 0.12, 64, 1);
var cylinder11 = new THREE.Mesh(geometria, material_w);
cylinder11.rotateX(3/2);

geometria = new THREE.CylinderGeometry(0.25, 0.25, 0.13, 64, 1);
var cylinder12 = new THREE.Mesh(geometria, material_b);
cylinder12.rotateX(3/2);

var alvo_x1 = new THREE.Group();
    alvo_x1.add(cylinder00, cylinder01, cylinder02, cylinder03, cylinder04);
    alvo_x1.position.x = 10;
    alvo_x1.position.y = 2;

    var alvo_x2 = new THREE.Group();
    alvo_x2.add(cylinder10, cylinder11, cylinder12);
    alvo_x2.position.x = 15;
    alvo_x2.position.y = 2;

    scene.add(alvo_x1);
scene.add(alvo_x2);

//light.lookAt(alvo_x1.position);

/*const axes = new THREE.AxesHelper(5);
scene.add(axes);
axes.position.setY(10);*/

const skyboxloader = new THREE.CubeTextureLoader();
skyboxloader.load(
    [
        'img/sky/px.bmp',
		'img/sky/nx.bmp',
		'img/sky/py.bmp',
		'img/sky/ny.bmp',
		'img/sky/pz.bmp',
		'img/sky/nz.bmp'
    ],
    (texture) => {
        scene.background = texture;
    }
)

const menuPanel = document.getElementById('menuPanel')
const startButton = document.getElementById('startButton')
startButton.addEventListener(
    'click',
    function () {
        controls.lock()
    },
    false
)

const controls = new PointerLockControls(camera, renderer.domElement)
//controls.addEventListener('change', () => console.log("Controls Change"))
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'))
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'))

const onKeyDown = function (event) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(2)
            break
        case 'KeyA':
            controls.moveRight(-2)
            break
        case 'KeyS':
            controls.moveForward(-2)
            break
        case 'KeyD':
            controls.moveRight(2)
            break
    }
}
document.addEventListener('keydown', onKeyDown, false)

function create() {
/*{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      45,
      30000
    );
    //camera.position.set(1200, -250, 20000);
    camera.position.set(1200, -250, 2000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = "canvas";
    document.body.appendChild(renderer.domElement);

    const materialArray = createMaterialArray(skyboxImage);
    skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    skybox = new THREE.Mesh(skyboxGeo, materialArray);
    scene.add(skybox);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enabled = true;
  controls.minDistance = 700;
  controls.maxDistance = 1500;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;

  window.addEventListener('resize', onWindowResize, false);

    createGrass();
    
    createHouse();

    animate();
  }
  function animate() {

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  create();

  skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  skybox = new THREE.Mesh(skyboxGeo);
  scene.add(skybox);
  animate();

const ft = new THREE.TextureLoader().load("clouds1_north.bmp");
const bk = new THREE.TextureLoader().load("clouds1_south.bmp");
const up = new THREE.TextureLoader().load("clouds1_up.bmp");
const dn = new THREE.TextureLoader().load("clouds1_down.bmp");
const rt = new THREE.TextureLoader().load("clouds1_east.bmp");
const lf = new THREE.TextureLoader().load("clouds1_west.bmp");

function createPathStrings(filename) {
    const basePath = "./static/skybox/";
    const baseFilename = basePath + filename;
    const fileType = ".bmp";
    const sides = ["north", "south", "up", "down", "east", "west"];
    const pathStings = sides.map(side => {
      return baseFilename + "_" + side + fileType;
    });
    return pathStings;
  }

  let skyboxImage = "clouds1";
/*

function createMaterialArray(filename) {
    const skyboxImagepaths = createPathStrings(filename);
    const materialArray = skyboxImagepaths.map(image => {
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
    });
    return materialArray;
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  */


    renderer.setSize(width, height);
    renderer.setClearColor(0xcce0ff, 1);
    document.body.appendChild(renderer.domElement);

    camera.position.set(15, 2, 0)
    camera.lookAt(scene.position);

    const light = new THREE.AmbientLight(0xCCCCCC);
    scene.add(light);

    createGrass();
    
    createHouse();

    animate();

    function createGrass() {
        const geometry = new THREE.PlaneGeometry( 50, 50);
    
        const texture = new THREE.TextureLoader().load('img/relva.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 10, 10 );
    
        const grassMaterial = new THREE.MeshBasicMaterial({map: texture});
    
        const grass = new THREE.Mesh( geometry, grassMaterial );
    
        grass.rotation.x = -0.5 * Math.PI;
    
        scene.add( grass );
    }
    
    function createFloor() {
        const geometry = new THREE.PlaneGeometry( 10, 15);
    
        const texture = new THREE.TextureLoader().load('img/chao.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 10, 10 );
    
        const material = new THREE.MeshBasicMaterial({map: texture});
    
        const floor = new THREE.Mesh( geometry, material );
    
        floor.rotation.x = -0.5 * Math.PI;
        floor.position.y = 1;
        floor.position.z = 7.5;
    
        house.add(floor);
    }

    function createHouse() {
        createFloor();
        
        const sideWall = createSideWall();
        const sideWall2 = createSideWall();
        sideWall2.position.z = 15;

        createFrontWall();
        createBackWall();

        const roof = createRoof();
        const roof2 = createRoof();
        roof2.rotation.x = Math.PI / 2;
        roof2.rotation.y = Math.PI / 4 * 0.6;
        roof2.position.y = 130;
        roof2.position.x = -50;
        roof2.position.z = 155;

        createWindow();
        //createDoor();

        //createBed();
    }
   
    scene.add(house);

    //scene.fog = new THREE.Fog(0xffffff, 10, 1500);
}

function createSideWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-5, 0);
    shape.lineTo(5, 0);
    shape.lineTo(5,5);
    shape.lineTo(0,7.5);
    shape.lineTo(-5,5);
    shape.lineTo(-5,0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );

    var material = new THREE.MeshBasicMaterial( {map: texture} );

    const sideWall = new THREE.Mesh( extrudeGeometry, material ) ;

    house.add(sideWall);

    return sideWall;
}

function createFrontWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-7.5, 0);
    shape.lineTo(7.5, 0);
    shape.lineTo(7.5,5);
    shape.lineTo(-7.5,5);
    shape.lineTo(-7.5,0);

    const window = new THREE.Path();
    window.moveTo(30,30)
    window.lineTo(80, 30)
    window.lineTo(80, 80)
    window.lineTo(30, 80);
    window.lineTo(30, 30);
    shape.holes.push(window);

   /* const door = new THREE.Path();
    door.moveTo(-30, 0)
    door.lineTo(-30, 80)
    door.lineTo(-80, 80)
    door.lineTo(-80, 0);
    door.lineTo(-30, 0);
    shape.holes.push(door);*/

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.01, 0.005 );

    const material = new THREE.MeshBasicMaterial({map: texture} );

    const frontWall = new THREE.Mesh( extrudeGeometry, material ) ;

    frontWall.position.z = 7.5;
    frontWall.position.x = 5;
    frontWall.rotation.y = Math.PI * 0.5;

    house.add(frontWall);
}

function createBackWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-7.5, 0)
    shape.lineTo(7.5, 0)
    shape.lineTo(7.5,5)
    shape.lineTo(-7.5,5);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.01, 0.005 );

    const material = new THREE.MeshBasicMaterial({map: texture});

    const backWall = new THREE.Mesh( extrudeGeometry, material) ;

    backWall.position.z = 7.5;
    backWall.position.x = -5;
    backWall.rotation.y = Math.PI * 0.5;

    house.add(backWall);
}

function createRoof() {
    const geometry = new THREE.BoxGeometry( 120, 320, 10 );

    const texture = new THREE.TextureLoader().load('./img/telhado.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 5, 1);
    texture.rotation = Math.PI / 2;
    const textureMaterial = new THREE.MeshBasicMaterial({ map: texture});

    const colorMaterial = new THREE.MeshBasicMaterial({ color: 'grey' });

    const materials = [
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        colorMaterial,
        textureMaterial
    ];

    const roof = new THREE.Mesh( geometry, materials );

    house.add(roof);

    roof.rotation.x = Math.PI / 2;
    roof.rotation.y = - Math.PI / 4 * 0.6;
    roof.position.y = 130;
    roof.position.x = 50;
    roof.position.z = 155;
    
    return roof;
}

function createWindow() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 50)
    shape.lineTo(50,50)
    shape.lineTo(50,0);
    shape.lineTo(0, 0);

    const hole = new THREE.Path();
    hole.moveTo(5,5)
    hole.lineTo(5, 45)
    hole.lineTo(45, 45)
    hole.lineTo(45, 5);
    hole.lineTo(5, 5);
    shape.holes.push(hole);

    const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

    var extrudeMaterial = new THREE.MeshBasicMaterial({ color: 'black' });

    var window = new THREE.Mesh( extrudeGeometry, extrudeMaterial ) ;
    window.rotation.y = Math.PI / 2;
    window.position.y = 30;
    window.position.x = 100;
    window.position.z = 120;

    house.add(window);

    return window;

}

/*function createDoor() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 80);
    shape.lineTo(50,80);
    shape.lineTo(50,0);
    shape.lineTo(0, 0);

    const hole = new THREE.Path();
    hole.moveTo(5,5);
    hole.lineTo(5, 75);
    hole.lineTo(45, 75);
    hole.lineTo(45, 5);
    hole.lineTo(5, 5);
    shape.holes.push(hole);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

    const material = new THREE.MeshBasicMaterial( { color: 'silver' } );

    const door = new THREE.Mesh( extrudeGeometry, material ) ;

    door.rotation.y = Math.PI / 2;
    door.position.y = 0;
    door.position.x = 100;
    door.position.z = 230;

    house.add(door);
}*/

/*function createBed() {
    var loader = new THREE.FBXLoader();
    loader.load('./obj/bed.fbx', function ( object ) {
        object.position.x = 40;
        object.position.z = 80;
        object.position.y = 20;

        house.add( object );
    } );
}*/

const clock = new THREE.Clock();

//const controls = new THREE.FirstPersonControls(camera);
//controls.lookSpeed = 0.05;
//controls.movementSpeed = 100;
//controls.lookVertical = false;

create()
render()
animate();

function render() {
    const delta = clock.getDelta();
    controls.update(delta);

    renderer.render(scene, camera);
    requestAnimationFrame(render)
}

function animate(){
	/*requestAnimationFrame(animate); // Tells the browser to smoothly render at 60Hz
	
	// Draw the scene from the perspective of the camera.
	renderer.render(scene, camera);
    */

    requestAnimationFrame(animate); // Tells the browser to smoothly render at 60Hz
	
	// Rotate our mesh.
	//mesh.rotation.x += 0.01;
	//mesh.rotation.y += 0.02;
	/*
	// Keyboard movement inputs
	if(keyboard[87]){ // W key
		camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[83]){ // S key
		camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
	}
	if(keyboard[65]){ // A key
		// Redirect motion by 90 degrees
		camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;
	}
	if(keyboard[68]){ // D key
		camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;
	}
	
	// Keyboard turn inputs
	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += player.turnSpeed;
	}
	*/
	// Draw the scene from the perspective of the camera.
	renderer.render(scene, camera);
}
/*
function keyDown(event){
	keyboard[event.keyCode] = true;
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

// When the page has loaded, run init();
window.onload = init;
*/

/*
function createGrass() {
    const geometry = new THREE.PlaneGeometry( 100, 100);
    const texture = new THREE.TextureLoader().load('img/relva.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 100, 100 );
    const grassMaterial = new THREE.MeshBasicMaterial({map: texture});
    const grass = new THREE.Mesh( geometry, grassMaterial );
    grass.rotation.x = -0.5 * Math.PI;
    scene.add( grass );
    }

function createHouse() {
createFloor();
const sideWall = createSideWall();
const sideWall2 = createSideWall();
sideWall2.position.z = 300;
createFrontWall();
createBackWall();
const roof = createRoof();
const roof2 = createRoof();
roof2.rotation.x = Math.PI / 2;
roof2.rotation.y = Math.PI / 4 * 0.6;
roof2.position.y = 130;
roof2.position.x = -50;
roof2.position.z = 155;
createWindow();
createDoor();
createBed();
}

function createFloor() {
    const geometry = new THREE.PlaneGeometry( 200, 300);
    const texture = new THREE.TextureLoader().load('img/chao.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 2, 2 );
    const material = new THREE.MeshBasicMaterial({map: texture});
    const floor = new THREE.Mesh( geometry, material );
    floor.rotation.x = -0.5 * Math.PI;
    floor.position.y = 1;
    floor.position.z = 150;
    house.add(floor);
    }

    function createSideWall() {
        const shape = new THREE.Shape();
        shape.moveTo(-100, 0);
        shape.lineTo(100, 0);
        shape.lineTo(100,100);
        shape.lineTo(0,150);
        shape.lineTo(-100,100);
        shape.lineTo(-100,0);
        const extrudeGeometry = new THREE.ExtrudeGeometry( shape );
        const texture = new THREE.TextureLoader().load('./img/wall.jpg');
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 0.01, 0.005 );
        var material = new THREE.MeshBasicMaterial( {map: texture} );
        const sideWall = new THREE.Mesh( extrudeGeometry, material ) ;
        house.add(sideWall);
        return sideWall;
        }

        const sideWall = createSideWall();
const sideWall2 = createSideWall();
sideWall2.position.z = 300;
*/
