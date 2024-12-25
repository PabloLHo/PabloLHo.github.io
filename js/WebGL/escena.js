var cargado = false;

loadedModels = [];
orderedModels = [];
models = [];

let positionX = 0; // Posición inicial del coche

function Intro(){

    engine.displayLoadingUI();

    scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color3(0,0,0);

    const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 1.4, Math.PI / 3, 13, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    camera.upperBetaLimit = Math.PI / 2.5;
    camera.upperRadiusLimit = 15;
    camera.upperAlphaLimit = Math.PI;

    camera.lowerBetaLimit = Math.PI / 20;
    camera.lowerRadiusLimit = 10;
    camera.lowerAlphaLimit = Math.PI / 2;

    camera.angularSensibilityX = 5000;
    camera.angularSensibilityY = 5000;

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0));

    models = ["Estanteria_1.glb", "Balda grande.glb", "Comoda.glb", "Estanteria_3.glb", "Armario.glb", "Estanteria_4.glb", "Estanteria pie.glb", "Cama.glb", "Zapatillas asfalto.glb",
        "Estructura y muebles.glb", "Bateria externa.glb", "Escritorio.glb", "Estanteria_2.glb", "Zapatillas trail.glb", "Mochila.glb", "Baldas.glb", "Pila de papeles.glb",
        "Objetos en el suelo.glb"];


    loadModels(models).then(() => {
        cargado = true;
    });


    return scene;

}

// function loadModels(modelFiles) {
//
//     let contador = 0
//
//     modelFiles.forEach(function(file, index) {
//         BABYLON.SceneLoader.ImportMesh(
//             "",
//             "./assets/modelos/",
//             file,
//             scene,
//             function (meshes) {
//
//                 loadedModels.push({ fileName: file, meshes: meshes });
//                 orderedModels.push(file);
//
//                 contador++;
//                 carga += Math.floor(100 / modelFiles.length);
//
//                 if(contador === modelFiles.length) {
//                     cargado = true;
//                     carga = 100;
//                 }
//             }
//         );
//     });
//
// }

function loadModels(modelFiles) {
    let contador = 0;
    const totalModelos = modelFiles.length;
    const progressMap = {};

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

        setTimeout(() => {
            engine.hideLoadingUI();
            clearInterval(intervalID);
            clearInterval(cargaModelos);
            }, 1200);

    }
}, 1000);