var cargado = false;

loadedModels = [];

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

    // models = ["Estanteria.glb", "Objetos en el suelo.glb", "Escritorio.glb", "Balda grande.glb", "Comoda.glb", "Armario.glb", "Estanteria pie.glb",
    //     "Cama.glb", "Estructura y muebles.glb", "Baldas.glb"];

    models = ["Balda grande.glb", "Comoda.glb", "Armario.glb", "Estanteria pie.glb",
        "Cama.glb", "Estructura y muebles.glb", "Baldas.glb"];

    loadModels(models);


    return scene;

}

function loadModels(modelFiles) {

    let contador = 0

    modelFiles.forEach(function(file, index) {
        BABYLON.SceneLoader.ImportMesh(
            "",
            "./assets/modelos/",
            file,
            scene,
            function (meshes) {

                loadedModels.push({ fileName: file, meshes: meshes });

                contador++;
                carga += Math.floor(100 / modelFiles.length);

                if(contador === modelFiles.length)
                    cargado = true;
            }
        );
    });

}

const intervalID = setInterval(function(){
    if(cargado) {
        setTimeout(() => {
            engine.hideLoadingUI();
            clearInterval(intervalID);
            clearInterval(cargaModelos);
            }, 2000);

    }
}, 1000);