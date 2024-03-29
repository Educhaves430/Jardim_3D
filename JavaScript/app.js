import * as THREE from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
//import { Octree } from 'three/examples/jsm/math/Octree';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);

const camera2 = new THREE.OrthographicCamera(-30, 30, 20, -20, -10, 1000);

const clock = new THREE.Clock();

const scene = new THREE.Scene();

const house = new THREE.Group();

const player = new THREE.Group();

const playerVelocity = new THREE.Vector3();

const shooter1 = new THREE.Group();
const shooter2 = new THREE.Group();
const shooter3 = new THREE.Group();

const renderer = new THREE.WebGLRenderer();

const loader = new GLTFLoader();

//var pontos = 0;

//var text = document.getElementById("pontos").innerHTML = pontos + " Pontos";

let c = 0;

//sons
const SomJogo = new Audio('/Sons/Fluffing-a-Duck.mp3');

let musica = false;

//const worldOctree = new Octree();

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
);

//Botão Start
const menuPanel = document.getElementById('menuPanel');
const startButton = document.getElementById('startButton');
startButton.addEventListener(
	'click',
	function () {
		controls.lock();
	},
	false
);
const controls = new PointerLockControls(camera, renderer.domElement);
controls.addEventListener('lock', () => (menuPanel.style.display = 'none'));
controls.addEventListener('unlock', () => (menuPanel.style.display = 'block'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////

function create() {

	//Definir tamanho da janela
	renderer.setSize(width, height);
	renderer.setClearColor(0xcce0ff, 1);
	document.body.appendChild(renderer.domElement);

	//Posição da camara Perspetiva
	camera.position.set(7, 2.5, 11)

	//camara ortografica
	;
	camera2.position.set(0, 26, 0);
	camera2.lookAt(scene.position);

	//LUZES
	const dlight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
	dlight.position.set(30, 100, 10);
	dlight.target.position.set(0, 0, 0);
	scene.add(dlight);


//const lightG = new THREE.PointLight( 0x00FF00, 1, 100 );
	const lightG = new THREE.PointLight(0xEDF0F3, 1, 100);
	lightG.position.set(20, 8, -15);
	scene.add(lightG);
	lightG.visible = true;

//const lightR = new THREE.PointLight( 0xff0000, 1, 100 );
	const lightR = new THREE.PointLight(0x000000, 1, 100);
	lightR.position.set(20, 12, -15);
	scene.add(lightR);
	lightR.visible = false;


	const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
	ambientLight.castShadow = true;
	scene.add(ambientLight);

	function createPlayer() {
		const footspl = createPlfoots();
		footspl.position.y = 0.15;
		const legspl = createPlLegs();
		legspl.position.y = 0.575;
		const bodypl = createPlBody();
		bodypl.position.y = 1.23;
		const rightArm = createPlArm();
		rightArm.position.x = -0.63;
		rightArm.position.y = 1.46;
		const leftArm = createPlArm();
		leftArm.position.x = 0.63;
		leftArm.position.y = 1.46;
		const rightHandpl = createPlHand();
		rightHandpl.position.x = -0.63;
		rightHandpl.position.y = 1.15;
		const leftHandpl = createPlHand();
		leftHandpl.position.x = 0.63;
		leftHandpl.position.y = 1.15;
		const headpl = createPlhead();
		headpl.position.y = 1.65;
		const lowhatpl = createlowhat();
		lowhatpl.position.y = 1.75;
		const highhatpl = createhighhat();
		highhatpl.position.y = 1.85;
		house.add(player);
		return player;
	}

//Movimento teclas
	const onKeyDown = function (event) {
		switch (event.code) {
			case 'KeyW':
				//player.moveForward(1)
				controls.moveForward(1);
				break;
			case 'KeyA':
				//player.moveRight(-1)
				controls.moveRight(-1);
				break;
			case 'KeyS':
				//player.moveForward(-1)
				controls.moveForward(-1);
				break;
			case 'KeyD':
				//player.moveRight(1)
				controls.moveRight(1);
				break;
			case 'Space':
				playerVelocity.y = 3;
				break;
			//click enter para reiniciar
			/*
		case 'Enter':
			ReiniciarJogo();
			break
			*/
			// apagarLuzes no "l"
		}
	};
	document.addEventListener('keydown', onKeyDown, false);

	document.addEventListener('keypress', ev => {
		switch (ev.code) {
			case 'KeyC':
				//click c para mudar camara
				c = c === 0 ? 1 : 0;
				break;
			case 'KeyM':
				//Ativar musica do jogo "M"
				ClickMusica();
				break;
			case 'KeyL':
				apagarLuzes();
				break;
			case 'KeyR':
				umbrella_rot = !umbrella_rot;
				break;
		}
	});

//função ligar e desligar musica
	function ClickMusica() {

		if (musica === false) {
			musica = true;
			SomJogo.play();
		} else {
			musica = false;
			SomJogo.pause();
			//reiniciar o som
			SomJogo.currentTime = 0;
		}

	}

	//-----------------------------Função Apagar luz------------------------

	function apagarLuzes() {
		let count = 0;
		dlight.visible = !dlight.visible;
		ambientLight.visible = dlight.visible;
		if (lightG.visible === true) {
			lightR.visible = true;
			lightG.visible = false;
			count++;
			ambientLight.visible = true;

		} else {
			lightR.visible = false;
			lightG.visible = true;
			count++;
			ambientLight.visible = true;
		}

		if (count === 3) {
			lightG.visible = false;
			lightR.visible = false;
			ambientLight.visible = false;
		}

	}

	//Criar Objetos
	createGrass();
	createHouse();

	//Criar Animação
	//animate();


	//Função criar Plano/Relva
	function createGrass() {
		const geometry = new THREE.PlaneGeometry(30, 30);

		const texture = new THREE.TextureLoader().load('img/relva.jpg');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(10, 10);

		const grassMaterial = new THREE.MeshBasicMaterial({map: texture});

		const grass = new THREE.Mesh(geometry, grassMaterial);

		grass.rotation.x = -0.5 * Math.PI;

		scene.add(grass);
	}

	//Criar chão de areia
	function createFloor() {
		const geometry = new THREE.PlaneGeometry(9, 15);

		const texture = new THREE.TextureLoader().load('img/chao.jpg');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(3, 15);

		const material = new THREE.MeshBasicMaterial({map: texture});

		const floor = new THREE.Mesh(geometry, material);

		floor.rotation.x = -0.5 * Math.PI;
		floor.position.y = 0.001;

		house.add(floor);
	}


	function createShooter1() {
		const footsSh1 = createfoots();
		footsSh1.position.x = 3;
		footsSh1.position.y = 0.15;
		const legsSh1 = createLegs();
		legsSh1.position.x = 3;
		legsSh1.position.y = 0.575;
		const bodySh1 = createBody();
		bodySh1.position.x = 3;
		bodySh1.position.y = 1.23;
		const rightArmSh1 = createArm();
		rightArmSh1.position.x = (3 - 0.63);
		rightArmSh1.position.y = 1.46;
		const leftArmSh1 = createArm();
		leftArmSh1.position.x = 3.63;
		leftArmSh1.position.y = 1.46;
		const rightHandSh1 = createHand();
		rightHandSh1.position.x = (3 - 0.63);
		rightHandSh1.position.y = 1.15;
		const leftHandSh1 = createHand();
		leftHandSh1.position.x = 3.63;
		leftHandSh1.position.y = 1.15;
		const headSh1 = createhead();
		headSh1.position.x = 3;
		headSh1.position.y = 1.65;
		const lowhatSh1 = createlowhatSh();
		lowhatSh1.position.x = 3;
		lowhatSh1.position.y = 1.75;
		const highhatSh1 = createhighhatSh();
		highhatSh1.position.x = 3;
		highhatSh1.position.y = 1.85;
		house.add(shooter1);
		return shooter1;
	}

	function createShooter2() {
		const footsSh2 = createfoots();
		footsSh2.position.y = 0.15;
		const legsSh2 = createLegs();
		legsSh2.position.y = 0.575;
		const bodySh2 = createBody();
		bodySh2.position.y = 1.23;
		const rightArmSh2 = createArm();
		rightArmSh2.position.x = -0.63;
		rightArmSh2.position.y = 1.46;
		const leftArmSh2 = createArm();
		leftArmSh2.position.x = 0.63;
		leftArmSh2.position.y = 1.46;
		const rightHandSh2 = createHand();
		rightHandSh2.position.x = -0.63;
		rightHandSh2.position.y = 1.15;
		const leftHandSh2 = createHand();
		leftHandSh2.position.x = 0.63;
		leftHandSh2.position.y = 1.15;
		const headSh2 = createhead();
		headSh2.position.y = 1.65;
		const lowhatSh2 = createlowhatSh();
		lowhatSh2.position.y = 1.75;
		const highhatSh2 = createhighhatSh();
		highhatSh2.position.y = 1.85;
		house.add(shooter2);
		return shooter2;
	}

	function createShooter3() {
		const footsSh3 = createfoots();
		footsSh3.position.x = -3;
		footsSh3.position.y = 0.15;
		const legsSh3 = createLegs();
		legsSh3.position.x = -3;
		legsSh3.position.y = 0.575;
		const bodySh3 = createBody();
		bodySh3.position.x = -3;
		bodySh3.position.y = 1.23;
		const rightArmSh3 = createArm();
		rightArmSh3.position.x = -3.63;
		rightArmSh3.position.y = 1.46;
		const leftArmSh3 = createArm();
		leftArmSh3.position.x = (-3 + 0.63);
		leftArmSh3.position.y = 1.46;
		const rightHandSh3 = createHand();
		rightHandSh3.position.x = -3.63;
		rightHandSh3.position.y = 1.15;
		const leftHandSh3 = createHand();
		leftHandSh3.position.x = (-3 + 0.63);
		leftHandSh3.position.y = 1.15;
		const headSh3 = createhead();
		headSh3.position.x = -3;
		headSh3.position.y = 1.65;
		const lowhatSh3 = createlowhatSh();
		lowhatSh3.position.x = -3;
		lowhatSh3.position.y = 1.75;
		const highhatSh3 = createhighhatSh();
		highhatSh3.position.x = -3;
		highhatSh3.position.y = 1.85;
		house.add(shooter3);
		return shooter3;
	}

	//Criar casa
	function createHouse() {
		createFloor();
		const playerPl = createPlayer();
		playerPl.position.z = -6.5;
		const shooterSh1 = createShooter1();
		shooterSh1.position.z = 6.5;
		const shooterSh2 = createShooter2();
		shooterSh2.position.z = 6.5;
		const shooterSh3 = createShooter3();
		shooterSh3.position.z = 6.5;

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

		createUmbrella();
	}

	scene.add(house);
	//worldOctree.fromGraphNode(scene);
}

function createPlfoots() {
	const geometriaPlfoots = new THREE.BoxBufferGeometry(1, 0.15, 0.5);
	const materialPlfoots = new THREE.MeshBasicMaterial({color: "brown",});
	const plfoots = new THREE.Mesh(geometriaPlfoots, materialPlfoots);
	player.add(plfoots);
	return plfoots;
}

function createfoots() {
	const geometriafoots = new THREE.BoxBufferGeometry(1, 0.15, 0.5);
	const materialfoots = new THREE.MeshBasicMaterial({color: "brown",});
	const foots = new THREE.Mesh(geometriafoots, materialfoots);
	shooter1.add(foots);
	shooter2.add(foots);
	shooter3.add(foots);
	return foots;
}

function createPlLegs() {
	const geometriaPllegs = new THREE.BoxBufferGeometry(1, 0.7, 0.5);
	const materialPllegs = new THREE.MeshBasicMaterial({color: "blue",});
	const pllegs = new THREE.Mesh(geometriaPllegs, materialPllegs);
	player.add(pllegs);
	return pllegs;
}

function createLegs() {
	const geometrialegs = new THREE.BoxBufferGeometry(1, 0.7, 0.5);
	const materiallegs = new THREE.MeshBasicMaterial({color: "blue",});
	const legs = new THREE.Mesh(geometrialegs, materiallegs);
	shooter1.add(legs);
	shooter2.add(legs);
	shooter3.add(legs);
	return legs;
}

function createPlBody() {
	const geometriaPlbody = new THREE.BoxBufferGeometry(1, 0.6, 0.5);
	const materialPlbody = new THREE.MeshBasicMaterial({color: "white",});
	const plbodyp = new THREE.Mesh(geometriaPlbody, materialPlbody);
	player.add(plbodyp);
	return plbodyp;
}

function createBody() {
	const geometriabody = new THREE.BoxBufferGeometry(1, 0.6, 0.5);
	const materialbody = new THREE.MeshBasicMaterial({color: "white",});
	const bodyp = new THREE.Mesh(geometriabody, materialbody);
	shooter1.add(bodyp);
	shooter2.add(bodyp);
	shooter3.add(bodyp);
	return bodyp;
}

function createPlArm() {
	const geometriaPlarm = new THREE.BoxBufferGeometry(0.25, 0.15, 0.5);
	const materialPlarm = new THREE.MeshBasicMaterial({color: "white",});
	const plarm = new THREE.Mesh(geometriaPlarm, materialPlarm);
	player.add(plarm);
	return plarm;
}

function createArm() {
	const geometriaarm = new THREE.BoxBufferGeometry(0.25, 0.15, 0.5);
	const materialarm = new THREE.MeshBasicMaterial({color: "white",});
	const arm = new THREE.Mesh(geometriaarm, materialarm);
	shooter1.add(arm);
	shooter2.add(arm);
	shooter3.add(arm);
	return arm;
}

function createPlHand() {
	const geometriaPlhand = new THREE.BoxBufferGeometry(0.25, 0.45, 0.5);
	const materialPlhand = new THREE.MeshBasicMaterial({color: "pink",});
	const plhand = new THREE.Mesh(geometriaPlhand, materialPlhand);
	player.add(plhand);
	return plhand;
}

function createHand() {
	const geometriahand = new THREE.BoxBufferGeometry(0.25, 0.45, 0.5);
	const materialhand = new THREE.MeshBasicMaterial({color: "pink",});
	const hand = new THREE.Mesh(geometriahand, materialhand);
	shooter1.add(hand);
	shooter2.add(hand);
	shooter3.add(hand);
	return hand;
}

function createPlhead() {
	const geometriaPlhead = new THREE.BoxBufferGeometry(0.5, 0.25, 0.5);
	const materialPlhead = new THREE.MeshBasicMaterial({color: "pink",});
	const plhead = new THREE.Mesh(geometriaPlhead, materialPlhead);
	player.add(plhead);
	return plhead;
}

function createhead() {
	const geometriahead = new THREE.BoxBufferGeometry(0.5, 0.25, 0.5);
	const materialhead = new THREE.MeshBasicMaterial({color: "pink",});
	const head = new THREE.Mesh(geometriahead, materialhead);
	shooter1.add(head);
	shooter2.add(head);
	shooter3.add(head);
	return head;
}

function createlowhat() {
	const geometrialowhat = new THREE.BoxBufferGeometry(0.6, 0.05, 0.6);
	const materiallowhat = new THREE.MeshBasicMaterial({color: "Green",});
	const lowhat = new THREE.Mesh(geometrialowhat, materiallowhat);
	player.add(lowhat);
	return lowhat;
}

function createlowhatSh() {
	const geometrialowhatSh = new THREE.BoxBufferGeometry(0.6, 0.05, 0.6);
	const materiallowhatSh = new THREE.MeshBasicMaterial({color: "orange",});
	const lowhatSh = new THREE.Mesh(geometrialowhatSh, materiallowhatSh);
	shooter1.add(lowhatSh);
	shooter2.add(lowhatSh);
	shooter3.add(lowhatSh);
	return lowhatSh;
}

function createhighhat() {
	const geometriahighhat = new THREE.BoxBufferGeometry(0.5, 0.2, 0.5);
	const materialhighhat = new THREE.MeshBasicMaterial({color: "yellow",});
	const highhat = new THREE.Mesh(geometriahighhat, materialhighhat);
	player.add(highhat);
	return highhat;
}

function createhighhatSh() {
	const geometriahighhatSh = new THREE.BoxBufferGeometry(0.5, 0.2, 0.5);
	const materialhighhatSh = new THREE.MeshBasicMaterial({color: "red",});
	const highhatSh = new THREE.Mesh(geometriahighhatSh, materialhighhatSh);
	shooter1.add(highhatSh);
	shooter2.add(highhatSh);
	shooter3.add(highhatSh);
	return highhatSh;
}

//Criar paredes laterais com prisma triangular
function createSideWall() {
	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(-2.5, 0);
	shape.lineTo(-2.5, 5);
	shape.lineTo(0, 7.5);
	shape.lineTo(2.5, 5);
	shape.lineTo(2.5, 0);

	const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

	const texture = new THREE.TextureLoader().load('./img/parede.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(0.5, 0.5);

	const material = new THREE.MeshBasicMaterial({map: texture});

	const sideWall = new THREE.Mesh(extrudeGeometry, material);

	house.add(sideWall);

	return sideWall;
}

//Parede grande
function createFrontWall() {
	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(12.3, 0);
	shape.lineTo(12.3, 5);
	shape.lineTo(-12.3, 5);
	shape.lineTo(-12.3, 0);

	const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

	const texture = new THREE.TextureLoader().load('./img/parede.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(0.5, 0.5);

	const material = new THREE.MeshBasicMaterial({map: texture});

	const frontWall = new THREE.Mesh(extrudeGeometry, material);

	frontWall.rotation.y = Math.PI * 0.5;

	house.add(frontWall);

	return frontWall;
}

//Criar parede entrada
function createBackWall() {
	const shape = new THREE.Shape();
	shape.moveTo(0, 0);
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

	const extrudeGeometry = new THREE.ExtrudeGeometry(shape);

	const texture = new THREE.TextureLoader().load('./img/parede.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(0.5, 0.5);

	const material = new THREE.MeshBasicMaterial({map: texture});

	const backWall = new THREE.Mesh(extrudeGeometry, material);

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

	const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {depth: 0.001});

	const texture = new THREE.TextureLoader().load('./img/telhado.jpg');
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(0.5, 0.5);

	const material = new THREE.MeshBasicMaterial({map: texture});

	const roof = new THREE.Mesh(extrudeGeometry, material);

	house.add(roof);

	return roof;
}

//Criar linhas brancas
function createLine() {
	const geometria = new THREE.BoxBufferGeometry(14.5, 0.01, 0.2);
	const material = new THREE.MeshBasicMaterial({color: "white",});
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

let umbrella_rot = true;
let beach_umbrella = new THREE.Object3D();
let beach_umbrella2 = new THREE.Object3D();

function createUmbrella() {
	loader.load('../obj/beach_umbrella/scene.gltf', gltf => {
		gltf.scene.scale.set(0.02, 0.02, 0.02);
		beach_umbrella = gltf.scene.clone();
		beach_umbrella.position.setX(5);
		scene.add(beach_umbrella);
		beach_umbrella2 = gltf.scene.clone();
		beach_umbrella2.position.setX(-5);
		scene.add(beach_umbrella2);
		//worldOctree.fromGraphNode(gltf.scene);
	});
}

create();

function animate() {
	const deltaTime = Math.min(0.05, clock.getDelta());

	if (umbrella_rot) {
		beach_umbrella.rotateY(-Math.PI / 2 * deltaTime);
		beach_umbrella2.rotateY(-Math.PI / 2 * deltaTime);
	}
	if (c === 0) {
		renderer.render(scene, camera);
	} else {
		renderer.render(scene, camera2);
	}

	requestAnimationFrame(animate);
}

animate();