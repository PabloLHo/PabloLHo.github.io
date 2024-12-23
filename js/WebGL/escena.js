var inicio = false;
var cargado = false;
var pillado = false;

var scene_cap;
var scene_2;
var sceneX;

var textureGround;
var x = 0;



function Intro(escena){

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

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    BABYLON.SceneLoader.ImportMeshAsync("", "assets/modelos/", "myRoom.glb", scene).then((result) => {

        var cap = result.meshes[0];
        //cap.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);

        cap.position = new BABYLON.Vector3(0, 0, 0);
        cargado = true;
    });

    return scene;

}

const intervalID = setInterval(function(){
    if(cargado) {
        engine.hideLoadingUI();
        clearInterval(intervalID);
    }
}, 1000);