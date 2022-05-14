import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

//Indica ao documento HTML que quando acabar de carregar todo o seu conteúdo
//deve chamar a função "Start".
document.addEventListener('DOMContentLoaded', Start);

//Em threee.js tudo é baseado em cenas e camâras. Cada cena contém os objetos que a ela pertencem.
//Podem existir diferentes câmaras mas apenas uma é renderizada.
//As linhas de código abaixo criam uma cena, uma camâra e um render em WebGL.
//Este último é o que vai renderizar a imagem tendo em conta a câmara e a cena.
var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

// Variavel que guardara o Objeto importado
var objetoImportado = new THREE.Group();

// Variavel que ira guardar o Controlador de animações do objeto importado
var mixerAnimacao;

//Variavel que é responsavel por controlar o tempo da aplicação
var relogio = new THREE.Clock();

// Variavel com o objeto responsavel por Importador de ficheiros FBX
var loader = new FBXLoader();

// Função utilizada para importar objetos FBX. O 1º parametro é a localização do .fbx
// e o 2º parametro é 1 função que apenas é chamada se conseguir importar o objeto.
loader.load('./Objetos/Samba Dancing.fbx', object => {

    // O mixerAnimacao é inicializado tendo em conta o objeto importado Inicializar o mixer
    mixerAnimacao = new THREE.AnimationMixer(object);

    // object.animations é um array com todas as animações que o objeto tras quando é importado.
    // O que nos fazemos é Criar uma ação de animação, tendo em conta a animação que é pretendida.
    // De seguida é inicializada a reprodução da animação.
    var action = mixerAnimacao.clipAction(object.animations[0]);
    action.play();

    // object.traverse é uma função que percorre todos os filhos desse mesmo objeto. 
    // O 1.º e único parâmetro da função é uma nova função que deve ser chamada para cada filho.
    // Neste caso, o que nos fazemos é ver se o filho tem uma mesh e, no caso de ter, é indicado
    // a esse objeto que deve permitir projetar e receber sombras, respetivamente.
    object.traverse(child => {
        if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    // Adiciona o objeto importado à cena
    cubo.add(object);

    // Quando o objeto é importado este tem uma escala de 1 nos tres eixos(XYZ). Uma vez que 
    // este é demasiado grande, mudamos a escala deste objeto para ter 0.01 em todos os eixos.
    object.scale.x = 0.01;
    object.scale.y = 0.01;
    object.scale.z = 0.01;

    // Mudamos a posição do objeto importado para que este não fique na mesma posição que o cubo.
    object.position.x = 3;

    // Guardamos o objeto importado na variavel objetoImportado.
    objetoImportado = object;
})

//o código abaixo indica ao render qual o tamanho da janela de visualização 
renderer.setSize(window.innerWidth - 15, window.innerHeight - 15);

//O código abaixo adiciona o render ao body do documento html para que este possa ser visto
document.body.appendChild(renderer.domElement);

//Em THREE.JS existem diferentes primitivas entre as quais: Box (cubo), plano (2D), circulo (2D),
//esfera, cone, cilindro, tetraedro, dodecaedro, icosaedro, octaedro, poliedro, ring (2D),
//geometria para texto e torus, etc.
//Para criarmos um objeto precisamos sempre de uma geometria e um material , o primeiro é
//responsável por definir a geometria (ou vértices de cada ponto), e o 2º é responsável 
//por dizer qual o material que o objeto irá usar.
//Para criar um cubo é necessário criar a geometria para isso utilizamos o código abaixo indicando
//qual o comprimento, altura e profundidade, respetivamente
var geometria = new THREE.BoxGeometry(1, 1, 1);

// Mudamos o material do cubo para este receba luz por parte de 1 fonte de luz.
var material = new THREE.MeshStandardMaterial({ color: 0xff0000 });

//No final, quando já tens a geometria e o material, é necessário criares uma mesh
//com os dados da geometria e do material. A mesh é o componente necessáio para
//poderes fazer as diferentes transformações do objeto.
var cubo = new THREE.Mesh(geometria, material);

//variável que vai gurdar que rotação aplicar ao cubo
var cuboCoordRotation;

//Variável que irá guardar para que dimenções a camara irá se movimentar
var camaraAndar = { x: 0, y: 0, z: 0 };
//Velocidade de movimentação que a camâra irá andar
var veleocidadeAndar = 0.05;

// Desafio 1 - Dançarino
var dancerWalk = { x: 0, y: 0, z: 0 };
var dancerSpeed = 0.1;
// Desafio 1 - Boneco de neve
var snowman = new THREE.Group();

//Este código adiciona um envento que é deplotado sempre que o rato se mexer 
document.addEventListener('mousemove', ev => {
    //A posição do rato encontra-se de 0 até ao tamanho do ecrã em pixeis. É então
    //necessário converte-lo para a escala de -1 a 1. Para isso utilizamos o código
    //a baixo
    var x = ev.clientX / window.innerWidth * 2 - 1;
    var y = ev.clientY / window.innerHeight * 2 - 1;

    //Adiciobamos a rotação que devemos aplicar na variável cuboCoordRotation
    cuboCoordRotation = {
        x: x,
        y: y
    };
});

//Adicionamos um evento que é desplotado sempre que uma tecla for mantida pressionada
/*document.addEventListener('keydown', ev => {
    //Inicializa a variável de controlo
    var coords = {
        x:0,
        y:0,
        z:0
    };

    //Verifica se a tecla W foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 87)
        coords.z -= veleocidadeAndar;

    //Verifica se a tecla S foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 83)
        coords.z += veleocidadeAndar;

    //Verifica se a tecla A foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 65)
        coords.x -= veleocidadeAndar;

    //Verifica se a tecla D foi premida e coloca a variável Z do coords para o valor correto
    if(ev.keyCode == 68)
        coords.x += veleocidadeAndar;

    //Aplica a variável coord à variável camaraAndar
    camaraAndar = coords;
});

//Adicionamos um evento que é desplotado sempre que uma tecla for mantida pressionada
document.addEventListener('keyup', ev => {
    //Inicializa a variável de controlo
    var coords = {
        x:0,
        y:0,
        z:0
    };

    //Verifica se a tecla W foi levantada
    if(ev.keyCode == 87)
        coords.z += veleocidadeAndar;

    //Verifica se a tecla S foi levantada
    if(ev.keyCode == 83)
        coords.z -= veleocidadeAndar;

    //Verifica se a tecla A foi levantada
    if(ev.keyCode == 65)
        coords.x += veleocidadeAndar;

    //Verifica se a tecla D foi levantada
    if(ev.keyCode == 68)
        coords.x -= veleocidadeAndar;

    //Aplica a variável coord à variável camaraAndar
    camaraAndar = coords;
});*/

//Adicionamos um evento que é desplotado sempre que uma tecla for mantida pressionada
document.addEventListener('keydown', ev => {
    var coords = {
        x: 0,
        y: 0,
        z: 0,
    };
    if (ev.key == 'w')
        // coords.z -= cameraSpeed;
        coords.z -= dancerSpeed;
    if (ev.key == 'a')
        // coords.x -= cameraSpeed;
        coords.x -= dancerSpeed;
    if (ev.key == 's')
        // coords.z += cameraSpeed;
        coords.z += dancerSpeed;
    if (ev.key == 'd')
        // coords.x += cameraSpeed;
        coords.x += dancerSpeed;
    // cameraWalk = coords;
    dancerWalk = coords;
});

//Adicionamos um evento que é desplotado sempre que uma tecla for mantida pressionada
document.addEventListener('keyup', ev => {
    var coords = {
        x: 0,
        y: 0,
        z: 0,
    };
    if (ev.key == 'w')
        // coords.z += cameraSpeed;
        coords.z += dancerSpeed;
    if (ev.key == 'a')
        // coords.x += cameraSpeed;
        coords.x += dancerSpeed;
    if (ev.key == 's')
        // coords.z -= cameraSpeed;
        coords.z -= dancerSpeed;
    if (ev.key == 'd')
        // coords.x -= cameraSpeed;
        coords.x -= dancerSpeed;
    // cameraWalk = coords;
    dancerWalk = coords;
});

// Desafio 2 - Cubo aleatório
document.addEventListener('keypress', ev => {
    if (ev.key == ' ') {
        let material = new THREE.MeshStandardMaterial({ color:  Math.random() * 0xffffff });
        let ncube = new THREE.Mesh(geometria, material);
        let x = THREE.MathUtils.randFloat(-15, 15);
        let y = THREE.MathUtils.randFloat(-15, 15);
        let z = THREE.MathUtils.randFloat(-15, 15);
        ncube.position.set(x, y, z);
        cena.add(ncube);
    }
});

//Função chamada quando a página HTML acabar de carregar e é responsável por configurar
//a cena para a primeira renderização
function Start() {
    //O código abaixo adiciona o cubo que criamos anteriormente à cena.
    cena.add(cubo);

    // Desafio 1 - Boneco de neve  
    var geometria = new THREE.SphereGeometry(10, 50, 50);
    var material = new THREE.MeshBasicMaterial({ color: "white", });
    var big_ball = new THREE.Mesh(geometria, material);

    geometria = new THREE.SphereGeometry(7, 50, 50);
    var small_ball = new THREE.Mesh(geometria, material);
    small_ball.position.y += 14;

    geometria = new THREE.SphereGeometry(2, 20, 20);
    material = new THREE.MeshBasicMaterial({ color: "black" });
    var left_eye = new THREE.Mesh(geometria, material);
    left_eye.position.x -= 2;
    left_eye.position.y += 15;
    left_eye.position.z += 4.8;

    var right_eye = new THREE.Mesh(geometria, material);
    right_eye.position.x += 2;
    right_eye.position.y += 15;
    right_eye.position.z += 4.8;

    geometria = new THREE.RingGeometry(1, 2, 20, 20, Math.PI, Math.PI);
    material = new THREE.MeshBasicMaterial({ color: 'red' });
    var mouth = new THREE.Mesh(geometria, material);
    mouth.position.y += 13;
    mouth.position.z += 7;

    var head = new THREE.Group();
    head.add(small_ball, left_eye, right_eye, mouth);
    snowman.add(head, big_ball);

    snowman.position.x -= 4;
    snowman.scale.set(0.15, 0.15, 0.15);
    cena.add(snowman);

    // Criaçao de um foco de luz com a cor branca(#ffffff) e intensidade a 1 (normal)
    var light = new THREE.SpotLight('white', 1);

    // Mudar posição da luz para ficar 5u. acima de onde a câmara se encontra.
    light.position.y = 5;
    light.position.z = 10;

    // Dizemos a light para ficar a apontar para a posiçao do cubo.
    light.lookAt(cubo.position);

    // Adicionamos a light à cena
    cena.add(light);

    //Coloca a câmara a 10 unidades no eixo do z a partir do centro do mundo
    camera.position.z = 10;

    //Como já sabes, esta linha de código é responsável por dizer ao browser que
    //pretendemos criar uma animação e que deve chamar a função passada no parâmetro
    //da função.
    requestAnimationFrame(update);
}

//Função chamada a cada frame para poder-mos criar animações. Cso contrário
//apenas veriamos uma simples imagem sem haver mudanças
function update() {
    //A cada frame mudamos a rotação do cubo no eixo tendo em conta a posição do rato
    if (cuboCoordRotation != null) {
        cubo.rotation.x += cuboCoordRotation.y * 0.1;
        cubo.rotation.y += cuboCoordRotation.x * 0.1;
    }

    //A cada frame mudamos a posição da camâra tendo em conta a posição das teclas premidas
    /*if(camaraAndar != null){
        camara.position.x += camaraAndar.x;
        camara.position.z += camaraAndar.z;
    }*/

    //Desafio 1
    if (dancerWalk != null) {
        objetoImportado.position.x += dancerWalk.x;
        objetoImportado.position.z += dancerWalk.z;
    }

    // Necessario atualizar o mixerAnimacao tendo em conta o tempo desde o ultimo update.
    // relogio.getDelta() Indica quanto tempo passou desde o ultimo frame renderizado.
    if (mixerAnimacao != null) {
        mixerAnimacao.update(relogio.getDelta());
    }
    
    //Reinicializar a variável
    //camaraAndar = {x:0, y:0, z:0};
    dancerWalk = { x: 0, y: 0, z: 0 };

    //Renderizamos a cena tendo em conta qual a cena que queremos visualizar e
    //a camâra que pretendemos
    renderer.render(cena, camera);

    //Como já sabes, esta linha de código é responsável por dizer ao browser que
    //pretendemos criar uma animação e que deve chamar a função passada no parâmetro
    //da função.
    requestAnimationFrame(update);
}