
import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

const clock = new THREE.Clock();

const scene = new THREE.Scene();

const house = new THREE.Group();

const player = new THREE.Group();

const shooter1 = new THREE.Group();
const shooter2 = new THREE.Group();
const shooter3 = new THREE.Group();

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
            controls.moveForward(1)
            break
        case 'KeyA':
            controls.moveRight(-1)
            break
        case 'KeyS':
            controls.moveForward(-1)
            break
        case 'KeyD':
            controls.moveRight(1)
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
    camera.position.set(0, 1.5, 0)
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
    
    //Criar chão de areia
    function createFloor() {
        const geometry = new THREE.PlaneGeometry( 9, 15);
    
        const texture = new THREE.TextureLoader().load('img/chao.jpg');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 3, 15);
    
        const material = new THREE.MeshBasicMaterial({map: texture});
    
        const floor = new THREE.Mesh( geometry, material );
    
        floor.rotation.x = -0.5 * Math.PI;
        floor.position.y = 0.001;
    
        house.add(floor);
    }

    function createPlayer(){
        const footspl = createfoots();
        footspl.position.y = 0.15;
        const legspl = createLegs();
        legspl.position.y = 0.575;
        const bodypl = createBody();
        bodypl.position.y = 1.23;
        const rightArm = createArm();
        rightArm.position.x = -0.63;
        rightArm.position.y = 1.46;
        const leftArm = createArm();
        leftArm.position.x = 0.63;
        leftArm.position.y = 1.46;
        const rightHandpl = createHand();
        rightHandpl.position.x = -0.63;
        rightHandpl.position.y = 1.15;
        const leftHandpl = createHand();
        leftHandpl.position.x = 0.63;
        leftHandpl.position.y = 1.15;
        const headpl = createhead();
        headpl.position.y = 1.65;
        const lowhatpl = createlowhat();
        lowhatpl.position.y = 1.75;
        const highhatpl = createhighhat();
        highhatpl.position.y = 1.85;
        house.add(player);
        return player;
    }

    function createShooter1(){
        
    }

    function createShooter2(){
        
    }

    function createShooter3(){
        
    }

    //Criar casa
    function createHouse() {
        createFloor();
        const playerPl = createPlayer();
        playerPl.position.z = -6.5;
        const line1 = createLine();
        const line2 = createLine();
        line1.rotation.y = Math.PI * 0.5;
        line1.position.x = 1.5;
        line2.rotation.y = Math.PI * 0.5;
        line2.position.x = -1.5;
        
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


        const backwall1 = createBackWall();
        backwall1.position.y = -0.001;
        backwall1.position.x = 0;
        backwall1.position.z = 13;

        const backwall2 = createBackWall();
        backwall2.position.y = -0.001;
        backwall2.position.x = 0;
        backwall2.position.z = -11;

        //Criar cerca
        createFence11();
        createFence21();
        createFence12();
        createFence22();
        createFence13();
        createFence23();
        createFence14();
        createFence24();
        createFence15();
        createFence25();
        createFence16();
        createFence26();
        createFenceEntry1();
        createFenceEntry2();

        //Criar bancos
        createBench1();
        createBench2();
        createBench3();
        createBench4();
        createBench5();
        createBench6();
        
        //criar Árvores
        createArvore1();
        createArvore2();
        createArvore3();
        createArvore4();
        createArvore5();
        createArvore6();
        createArvore7();
        createArvore8();
    }
   
    scene.add(house);
}

function createfoots(){
    var geometriafoots = new THREE.BoxBufferGeometry(1, 0.15, 0.5);
    var materialfoots = new THREE.MeshBasicMaterial({ color: "brown", });
    const foots = new THREE.Mesh(geometriafoots, materialfoots);
    player.add(foots);
    return foots;
}

function createLegs(){
    var geometrialegs = new THREE.BoxBufferGeometry(1, 0.7, 0.5);
    var materiallegs = new THREE.MeshBasicMaterial({ color: "blue", });
    const legs = new THREE.Mesh(geometrialegs, materiallegs);
    player.add(legs);
    return legs;
}

function createBody(){
    var geometriabody = new THREE.BoxBufferGeometry(1, 0.6, 0.5);
    var materialbody = new THREE.MeshBasicMaterial({ color: "white", });
    const bodyp = new THREE.Mesh(geometriabody, materialbody);
    player.add(bodyp);
    return bodyp;
}

function createArm(){
    var geometriaarm = new THREE.BoxBufferGeometry(0.25, 0.15, 0.5);
    var materialarm = new THREE.MeshBasicMaterial({ color: "white", });
    const arm = new THREE.Mesh(geometriaarm, materialarm);
    player.add(arm);
    return arm;
}

function createHand(){
    var geometriahand = new THREE.BoxBufferGeometry(0.25, 0.45, 0.5);
    var materialhand = new THREE.MeshBasicMaterial({ color: "pink", });
    const hand = new THREE.Mesh(geometriahand, materialhand);
    player.add(hand);
    //shooter1.add(hand);
    //shooter2.add(hand);
    //shooter3.add(hand);
    return hand;
}

function createhead(){
    var geometriahead = new THREE.BoxBufferGeometry(0.5, 0.25, 0.5);
    var materialhead = new THREE.MeshBasicMaterial({ color: "pink", });
    const head = new THREE.Mesh(geometriahead, materialhead);
    player.add(head);
    //shooter1.add(head);
    //shooter2.add(head);
    //shooter3.add(head);
    return head;
}

function createlowhat(){
    var geometrialowhat = new THREE.BoxBufferGeometry(0.6, 0.05, 0.6);
    var materiallowhat = new THREE.MeshBasicMaterial({ color: "red", });
    const lowhat = new THREE.Mesh(geometrialowhat, materiallowhat);
    player.add(lowhat);
    //shooter1.add(lowhat);
    //shooter2.add(lowhat);
    //shooter3.add(lowhat);
    return lowhat;
}

function createhighhat(){
    var geometriahighhat = new THREE.BoxBufferGeometry(0.5, 0.2, 0.5);
    var materialhighhat = new THREE.MeshBasicMaterial({ color: "yellow", });
    const highhat = new THREE.Mesh(geometriahighhat, materialhighhat);
    player.add(highhat);
    //shooter1.add(highhat);
    //shooter2.add(highhat);
    //shooter3.add(highhat);
    return highhat;
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

//Parede grande
function createFrontWall() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(12.3, 0);
    shape.lineTo(12.3,5);
    shape.lineTo(-12.3,5);
    shape.lineTo(-12.3,0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.5, 0.5 );

    const material = new THREE.MeshBasicMaterial({map: texture} );

    const frontWall = new THREE.Mesh( extrudeGeometry, material ) ;

    frontWall.rotation.y = Math.PI * 0.5;

    house.add(frontWall);

    return frontWall;
}

//Criar parede entrada
function createBackWall() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0)
    shape.lineTo(7.5, 0);
    shape.lineTo(1, 0);
    shape.lineTo(1, 2);
    shape.lineTo(0, 2.5);
    shape.lineTo(-1, 2);
    shape.lineTo(-1, 0);
    shape.lineTo(-7.5, 0);
    shape.lineTo(-7.5, 4.5);
    shape.lineTo(7.5, 4.5);
    shape.lineTo(7.5, 0);

    const extrudeGeometry = new THREE.ExtrudeGeometry( shape ) 

    const texture = new THREE.TextureLoader().load('./img/parede.jpg');
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.5, 0.5 );

    const material = new THREE.MeshBasicMaterial({map: texture});

    const backWall = new THREE.Mesh( extrudeGeometry, material) ;

    backWall.rotation.y = Math.PI;

    house.add(backWall);

    return backWall;
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

//Criar linhas brancas
function createLine() {
    var geometria = new THREE.BoxBufferGeometry(14.5, 0.01, 0.2);
    var material = new THREE.MeshBasicMaterial({ color: "white", });
    const line = new THREE.Mesh(geometria, material);
    house.add(line);
    return line;
}

//Criar cerca
function createFence11() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(4.6, 0, -7.4);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence21() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(-4.7, 0, -7.4);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence12() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(4.6, 0, -5.2);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence22() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(-4.7, 0, -5.2);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence13() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(4.6, 0, -2.9);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence23() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(-4.7, 0, -2.9);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence14() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(4.6, 0, -0.6);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence24() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(-4.7, 0, -0.6);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence15() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(4.6, 0, 1.4);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence25() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.12;
        gltf.scene.position.set(-4.7, 0, 1.4);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence16() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.07;
        gltf.scene.position.set(4.6, 0, 3.6);
        gltf.scene.scale.set(0.55, 0.55, 1);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFence26() {
    loader.load('../obj/cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * -0.07;
        gltf.scene.position.set(-4.7, 0, 3.6);
        gltf.scene.scale.set(0.55, 0.55, 1);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFenceEntry1() {
    loader.load('../obj/entrada_cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-1.33, 0, -7.5);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createFenceEntry2() {
    loader.load('../obj/entrada_cerca/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-1.33, 0, 7.5);
        gltf.scene.scale.set(0.55, 0.55, 0.55);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

//Criar bancos de um lado
function createBench1() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, -6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench2() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, 0);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench3() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, 6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

//Criar bancos do outro lado
function createBench4() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, -6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench5() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, 0);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createBench6() {
    loader.load('../obj/bench/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, 6);
        gltf.scene.scale.set(2, 2, 2);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

//Criar árvores de um dos lados
function createArvore1() {
    loader.load('../obj/arvore/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, 9.5);
        gltf.scene.scale.set(10, 10, 10);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createArvore2() {
    loader.load('../obj/pinheiro/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, 3);
        gltf.scene.scale.set(0.7, 0.7, 0.7);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createArvore3() {
    loader.load('../obj/arvore/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, -3);
        gltf.scene.scale.set(10, 10, 10);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createArvore4() {
    loader.load('../obj/pinheiro/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(-9, 0, -8.8);
        gltf.scene.scale.set(0.7, 0.7, 0.7);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

//Criar árvores do outro lado
function createArvore5() {
    loader.load('../obj/pinheiro/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, 9.5);
        gltf.scene.scale.set(0.7, 0.7, 0.7);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createArvore6() {
    loader.load('../obj/arvore/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, 3);
        gltf.scene.scale.set(10, 10, 10);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createArvore7() {
    loader.load('../obj/pinheiro/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, -3);
        gltf.scene.scale.set(0.7, 0.7, 0.7);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

function createArvore8() {
    loader.load('../obj/arvore/scene.gltf', gltf => {
        gltf.scene.rotation.y = Math.PI * 0.5;
        gltf.scene.position.set(9, 0, -8.8);
        gltf.scene.scale.set(10, 10, 10);
        house.add(gltf.scene);
        //worldOctree.fromGraphNode(gltf.scene);
    });
}

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