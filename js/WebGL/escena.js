var cargado = false;

loadedModels = [];
orderedModels = [];
models = [];

var camera;
var cameraPasillo;
var cameraLibre;

let clicable = false;
let highlightLayer = null;
let ultimaSeleccion = null;

let positionX = 0; // Posición inicial del modelo

var minX = -2.5, maxX = -1.75;
var minZ = -0.5, maxZ = 5.5;
var minY = 2.2, maxY = 4;

var giroSilla = 0.002;
var angle;
var chairMovement = true;

function habitacion(){

    engine.displayLoadingUI();

    scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0,0,0);

    camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 1.4, Math.PI / 3, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    camera.upperBetaLimit = Math.PI / 2.5;
    camera.upperRadiusLimit = 17;
    camera.upperAlphaLimit = Math.PI;

    camera.lowerBetaLimit = Math.PI / 20;
    camera.lowerRadiusLimit = 5;
    camera.lowerAlphaLimit = Math.PI / 2;

    camera.angularSensibilityX = 5000;
    camera.angularSensibilityY = 5000;

    camera.panningDistanceLimit = 3;

    cameraPasillo = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(-2,2.2,2.5));
    cameraLibre = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(-2,2.2,2.5));

    scene.activeCamera = camera;

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    var light2 = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(1,0,1), scene);

    highlightLayer = new BABYLON.HighlightLayer("Seleccionador", scene);

    scene.onPointerDown = (evt) => {
        if(clicable) {
            const ray = scene.createPickingRay(scene.pointerX, scene.pointerY);
            const raycastHit = scene.pickWithRay(ray);
            if (raycastHit.pickedMesh && !raycastHit.pickedMesh.name.includes("Habitacion")) {
                if (ultimaSeleccion) {
                    highlightLayer.removeAllMeshes();
                }else
                    crearTabSeleccion();
                if (raycastHit.pickedMesh !== ultimaSeleccion) {
                    highlightLayer.addMesh(raycastHit.pickedMesh, new BABYLON.Color3.Green());
                    if(raycastHit.pickedMesh.name.includes("primitive")){
                        nombre = raycastHit.pickedMesh.name.split("_")[1];
                        scene.meshes.forEach(function (mesh) {
                            if(mesh.name.includes(nombre))
                                highlightLayer.addMesh(mesh, new BABYLON.Color3.Green());
                        });
                    }
                    ultimaSeleccion = raycastHit.pickedMesh;
                } else {
                    ultimaSeleccion = null;
                    eliminarTabSeleccion();
                }
            } else {
                if (ultimaSeleccion) {
                    highlightLayer.removeAllMeshes();
                    ultimaSeleccion = null;
                    eliminarTabSeleccion();
                }
            }
        }
    }

    scene.onBeforeRenderObservable.add(function() {
        limitarCamara(cameraPasillo);
        limitarCamara(cameraLibre);
    });

    window.addEventListener("keydown", function (event) {
        switch (event.key) {
            case " ":
                cameraPasillo.position.y += 0.01;  // Mueve la cámara hacia arriba
                break;
            case "Shift":
                cameraPasillo.position.y -= 0.01;  // Mueve la cámara hacia abajo
                break;
        }
    });

    readModelsPath().then(models => {
        loadModels(models).then(() => {
            cargado = true;
            angle = 0;
            scene.registerBeforeRender(function(){

                if(chairMovement) {
                    var mesh = scene.getMeshByName("Habitacion_Silla gaming_primitive2");
                    var mesh2 = scene.getMeshByName("Habitacion_Silla gaming_primitive3");
                    var mesh3 = scene.getMeshByName("Habitacion_Silla gaming_primitive0");

                    mesh.rotation.y = angle;
                    mesh2.rotation.y = angle;
                    mesh3.rotation.y = angle;

                    angle += giroSilla;

                    if (angle >= Math.PI / 3 || angle <= -Math.PI / 6)
                        giroSilla *= -1;
                }
            });
        });
    });

    return scene;

}

function limitarCamara(camara){
    var actualY = camara.position.y;
    var actualX = camara.position.x;
    var actualZ = camara.position.z;

    // Limitar la posición X
    if (camara.position.x < minX) {
        camara.position.x = minX + 0.01;
        camara.position.y = actualY;
        camara.position.z = actualZ;
    }
    if (camara.position.x > maxX) {
        camara.position.x = maxX - 0.01;
        camara.position.y = actualY;
        camara.position.z = actualZ;
    }

    // Limitar la posición Z
    if (camara.position.z < minZ) {
        camara.position.z = minZ + 0.01;
        camara.position.y = actualY;
        camara.position.x = actualX;

    }
    if (camara.position.z > maxZ) {
        camara.position.z = maxZ - 0.01;
        camara.position.y = actualY;
        camara.position.x = actualX;
    }
    // Limitar la posición Z
    if (camara.position.y < minY) {
        camara.position.y = minY + 0.01;
    }
    if (camara.position.y > maxY) {
        camara.position.y = maxY - 0.01;
    }
}


function loadModels(modelFiles) {
    models = modelFiles;
    // Crear una lista de promesas para controlar la carga de todos los modelos
    const promises = modelFiles.map((file) => {
        return BABYLON.SceneLoader.ImportMeshAsync("",  "./assets/modelos/",  file, scene,  function (evt) { // Evento onProgress para capturar el progreso de cada modelo
                var loadedPercent = 0;
                if (evt.lengthComputable) {
                    loadedPercent = (evt.loaded * 100 / evt.total).toFixed();
                } else {
                    var dlCount = evt.loaded / (1024 * 1024);
                    loadedPercent = Math.floor(dlCount * 100.0) / 100.0;
                }
                onProgress(file, loadedPercent);
            }  // Escena actual
        ).then((result) => {
            // Guardar los modelos cargados para su uso posterior
            loadedModels.push({ fileName: file, meshes: result.meshes });
            orderedModels.push(file);
            onProgress(file, 100);
        });
    });

    // Devolver una promesa que se resuelva cuando todos los modelos se hayan cargado
    return Promise.all(promises);
}

async function readModelsPath(){
    const response = await fetch("./assets/rutas.txt");
    const texto = await response.text();
    // Dividimos el contenido por líneas para obtener cada ruta
    return rutas = texto.split(',').map(linea => linea.trim()).filter(Boolean);
}

const progressMap = {};
const onProgress = (name, progress) => {
    progressMap[name] = +progress;
    const sum = Object.keys(progressMap).reduce((prev, curr) => {
        return prev + progressMap[curr];
    }, 0);
    carga = Math.round(sum / models.length);
}

const intervalID = setInterval(function(){
    if(cargado) {
        switch (elegido){
            case 0:
                const stickman = document.querySelector(".stick");
                stickman.classList.add("moving");

                break;
            case 1:
                const bb8 = document.querySelector(".bb8-center");
                const bb8_2 = document.querySelector(".bb8-base");
                bb8.classList.add("moving"); // Añadir clase 'moving' para que el androide avance
                bb8_2.classList.add("moving");
                moveRight()
                // Función que añade la clase 'moving' y activa el movimiento a la derecha
                function moveRight() {
                    positionX += 0.3; // Incrementa la posición X para mover el coche hacia la derecha
                    bb8.style.transform = `translateX(${positionX}px)`; // Aplica la nueva posición X
                    bb8_2.style.transform = `translateX(${positionX * 22}px)`;
                    requestAnimationFrame(moveRight);
                }
                break;
            case 2:
                const car = document.querySelector("g#car");
                car.classList.add('moving');
                moveCar();
                function moveCar() {
                    positionX += 5; // Incrementa la posición X para mover el coche hacia la derecha
                    car.style.transform = `translateX(${positionX}px)`; // Aplica la nueva posición X

                    // Llama a la función nuevamente en el siguiente frame de la animación
                    requestAnimationFrame(moveCar);
                }
                break;
        }

        clearInterval(intervalID);
        clearInterval(cargaModelos);
        setTimeout(() => {
            document.getElementById("header").style.display = "none";
            engine.hideLoadingUI();
            crearGUI();
            }, 1200);

    }
}, 1000);