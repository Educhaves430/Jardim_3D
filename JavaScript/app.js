
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

const clock = new THREE.Clock();

const scene = new THREE.Scene();

const house = new THREE.Group();

const renderer = new THREE.WebGLRenderer();

const loader = new GLTFLoader();

//SkyBox 
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

//Botão Start
const menuPanel = document.getElementById('menuPanel');
const startButton = document.getElementById('startButton');
startButton.addEventListener(
    'click',
    function () {
        controls.lock()
    },
    false
)
const controls = new PointerLockControls(camera, renderer.domElement);
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'));
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'));

//Movimento teclas
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

    //Definir tamanho da janela
    renderer.setSize(width, height);
    renderer.setClearColor(0xcce0ff, 1);
    document.body.appendChild(renderer.domElement);

    //Posição da camara
    camera.position.set(0, 1, 0)
    camera.lookAt(scene.position);

    //Luz
    const light = new THREE.AmbientLight(0xCCCCCC);
    scene.add(light);

    //Criar Objetos
    createGrass();
    createHouse();

    //Criar Animação
    animate();

    //Função criar Plano/Relva
    function createGrass() {
        const geometry = new THREE.PlaneGeometry(30, 30);
    
        const texture = new THREE.TextureLoader().load('img/relva.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 10, 10 );
    
        const grassMaterial = new THREE.MeshBasicMaterial({map: texture});
    
        const grass = new THREE.Mesh( geometry, grassMaterial );
    
        grass.rotation.x = -0.5 * Math.PI;
    
        scene.add( grass );
    }
    
    //Criar chão de madeira
    function createFloor() {
        const geometry = new THREE.PlaneGeometry( 10, 15);
    
        const texture = new THREE.TextureLoader().load('img/chao.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 10, 10 );
    
        const material = new THREE.MeshBasicMaterial({map: texture});
    
        const floor = new THREE.Mesh( geometry, material );
    
        floor.rotation.x = -0.5 * Math.PI;
        floor.position.y = 0.001;
        //floor.position.z = 7.5;
    
        house.add(floor);
    }

    //Criar casa
    function createHouse() {
        createFloor();
        
        const sideWall01 = createSideWall();
        const sideWall02 = createSideWall();
        sideWall01.position.x = 10;
        sideWall01.position.z = -12;
        sideWall02.position.x = 10;
        sideWall02.position.z = 12;

        const sideWall11 = createSideWall();
        const sideWall12 = createSideWall();
        sideWall11.position.x = -10;
        sideWall11.position.z = -12;
        sideWall12.position.x = -10;
        sideWall12.position.z = 12;

        const frontWall1 = createFrontWall();
        frontWall1.position.x = 11.38;
        frontWall1.position.z = 0.5;
        const frontWall2 = createFrontWall();
        frontWall2.position.x = -12.38;
        frontWall2.position.z = 0.5;
        //createBackWall();

        const roof1 = createRoof();
        const roof2 = createRoof();
        const roof3 = createRoof();
        const roof4 = createRoof();
        roof1.rotation.x = Math.PI / 2;
        roof1.rotation.y = -(Math.PI / 4);
        roof1.rotation.z = Math.PI * 0.5;
        roof1.position.y = 4.9;
        roof1.position.x = 12.8;
        roof1.position.z = 0.5;
        roof2.rotation.x = Math.PI / 2;
        roof2.rotation.y = Math.PI / 4;
        roof2.rotation.z = Math.PI * 0.5;
        roof2.position.y = 7.7;
        roof2.position.x = -10.2;
        roof2.position.z = 0.5;
        roof3.rotation.x = Math.PI / 2;
        roof3.rotation.y = -(Math.PI / 4);
        roof3.rotation.z = Math.PI * 0.5;
        roof3.position.y = 4.9;
        roof3.position.x = -7.2;
        roof3.position.z = 0.5;
        roof4.rotation.x = Math.PI / 2;
        roof4.rotation.y = Math.PI / 4;
        roof4.rotation.z = Math.PI * 0.5;
        roof4.position.y = 7.5;
        roof4.position.x = 10;
        roof4.position.z = 0.5;

        //createWindow();
        //createDoor();
        createBench1();
        createBench2();
        createBench3();
        createBench4();
        createBench5();
        createBench6();
        //createBed();
    }
   
    scene.add(house);

    //scene.fog = new THREE.Fog(0xffffff, 10, 1500);
}

//Criar paredes laterais com prisma triangular
function createSideWall() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-2.5, 0);
    shape.lineTo(-2.5,5);
    shape.lineTo(0,7.5);
    shape.lineTo(2.5,5);
    shape.lineTo(2.5,0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape );

    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.5, 0.5);

    var material = new THREE.MeshBasicMaterial( {map: texture} );

    const sideWall = new THREE.Mesh( extrudeGeometry, material ) ;

    house.add(sideWall);

    return sideWall;
}

//Parede da frente com janela
function createFrontWall() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(12.3, 0);
    shape.lineTo(12.3,5);
    shape.lineTo(-12.3,5);
    shape.lineTo(-12.3,0);

/*
    shape.moveTo(-7.5, 0);
    shape.lineTo(7.5, 0);
    shape.lineTo(7.5,5);
    shape.lineTo(-7.5,5);
    shape.lineTo(-7.5,0);*/




    /*const window = new THREE.Path();
    window.moveTo(0,0)
    window.lineTo(80, 30)
    window.lineTo(80, 80)
    window.lineTo(30, 80);
    window.lineTo(30, 30);
    shape.holes.push(window);*/

    /*const door = new THREE.Path();
    door.moveTo(-30, 0)
    door.lineTo(-30, 80)
    door.lineTo(-80, 80)
    door.lineTo(-80, 0);
    door.lineTo(-30, 0);
    shape.holes.push(door);*/

    //
    const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

    //
    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.5, 0.5 );

    const material = new THREE.MeshBasicMaterial({map: texture} );

    const frontWall = new THREE.Mesh( extrudeGeometry, material ) ;

    frontWall.rotation.y = Math.PI * 0.5;

    house.add(frontWall);

    return frontWall;
}

//Criar parede trás
function createBackWall() {
    const shape = new THREE.Shape();
    shape.moveTo(-7.5, 0)
    shape.lineTo(7.5, 0)
    shape.lineTo(7.5,5)
    shape.lineTo(-7.5,5);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.5, 0.5 );

    const material = new THREE.MeshBasicMaterial({map: texture});

    const backWall = new THREE.Mesh( extrudeGeometry, material) ;

    backWall.position.z = 7.5;
    backWall.position.x = -5;
    backWall.rotation.y = Math.PI * 0.5;

    house.add(backWall);
}

//Criar Telhado
function createRoof() {

    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-13, 0);
    shape.lineTo(-13, 4);
    shape.lineTo(13, 4);
    shape.lineTo(13, 0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape, { depth: 0.001 });

    const texture = new THREE.TextureLoader().load('./img/telhado.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(0.5, 0.5);

    var material = new THREE.MeshBasicMaterial( {map: texture} );

    const roof = new THREE.Mesh( extrudeGeometry, material ) ;

    house.add(roof);

    return roof;
}

//Criar Janela
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

//Criar porta
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

function createBench1() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, -6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench2() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, 0);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench3() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, 6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        worldOctree.fromGraphNode(gltf.scene);
    });
}
/////////////////////////////////////
function createBench4() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, -6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench5() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, 0);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench6() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, 6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        worldOctree.fromGraphNode(gltf.scene);
    });
}

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

    // Tells the browser to smoothly render at 60Hz
	requestAnimationFrame(animate);

	// Draw the scene from the perspective of the camera.
	renderer.render(scene, camera);
}