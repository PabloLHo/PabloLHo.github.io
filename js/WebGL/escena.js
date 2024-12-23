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

    BABYLON.SceneLoader.ImportMeshAsync("", "https://github.com/PabloLHo/PabloLHo.github.io/releases/download/v1.0/myRoom.glb", "", scene).then((result) => {

        var cap = result.meshes[0];
        //cap.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);

        cap.position = new BABYLON.Vector3(0, 0, 0);
        cargado = true;
    });

    // scene_cap = new BABYLON.Scene(engine);

    // crearEntorno("../assets/CapWS.jpg", scene_cap);
    // escena_1(scene_cap, "../assets/CapWS.jpg");

    // scene_2 = new BABYLON.Scene(engine);

    // crearEntorno("../assets/loading_screen.jpg", scene_2);
    // escena_2(scene_2);

    // sceneX = new BABYLON.Scene(engine);

    // crearEntorno("../assets/loading_screen.jpg", sceneX);
    // escena_3(sceneX);

    // switch (escena){
    //     case 1:
    //         return scene_cap;
    //     case 2:
    //         return scene_2;
    //     case 3:
    //         return sceneX;
    // }

    return scene;

}

function crearEntorno(textura, scene){

    const lightCap = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(true);

    const sound = new BABYLON.Sound("intro", "assets/intro.mp4", scene, null, { loop: true, autoplay: true });
    sound.setVolume(0.15);

    const plane = BABYLON.MeshBuilder.CreatePlane("plane", { width: 20, height: 10 }, scene);

    if(textura === "../assets/CapWS.jpg") {

        var textureResolution = 1024;
        textureGround = new BABYLON.DynamicTexture("dynamic texture", textureResolution, scene);
        console.log(textureGround);
        var textureContext = textureGround.getContext();

        var materialGround = new BABYLON.StandardMaterial("Mat", scene);
        materialGround.diffuseTexture = textureGround;
        plane.material = materialGround;


        var img = new Image();
        img.src = textura;
        img.onload = function () {

            textureContext.drawImage(this, 0, 0);
            textureGround.update();


        }

    }else{
        var material = new BABYLON.StandardMaterial("material", scene);
        material.diffuseTexture = new BABYLON.Texture(textura, scene);
        material.emissiveTexture = new BABYLON.Texture(textura, scene);

        plane.material = material;
    }



}

function escena_1(scene, textura){

    BABYLON.SceneLoader.ImportMeshAsync("", "assets/modelos/", "CapAmerica2.glb", scene).then((result) => {

        var dude = result.meshes[0];

        //dude.scaling = new BABYLON.Vector3(2.75, 2.75, 2.75);
        //dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-90), BABYLON.Space.LOCAL);

        dude.position = new BABYLON.Vector3(-12, -5.2, -2);
        dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(90), BABYLON.Space.LOCAL);

        let step = 0.15;

        cargado = true;

        scene.onBeforeRenderObservable.add(() => {
            if(inicio) {
                dude.movePOV(0, 0, step);

                if (dude.position.x > 8) {
                    dude.position = new BABYLON.Vector3(-12, -5.2, -2.2);
                    sceneToRender = scene_2;
                }
            }
        })
        return BABYLON.SceneLoader.ImportMeshAsync("", "assets/modelos/", "CapAmerica.glb", scene).then((result) => {

            var cap = result.meshes[0];
            //cap.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);

            cap.position = new BABYLON.Vector3(-40, -5.2, -2);
            cap.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(90), BABYLON.Space.LOCAL);

            let step = 0.55;
            scene.onBeforeRenderObservable.add(() => {
                if (!pillado) {

                    if (scene.getMeshByName("Cap").getAbsolutePosition().x - cap.position.x > 0 && scene.getMeshByName("Cap").getAbsolutePosition().x - cap.position.x < 2 && cap.position.x > -8) {

                        pillado = true;
                    }
                }
                if(inicio)
                    cap.movePOV(0, 0, step);

                if(pillado){

                    var textureContext = textureGround.getContext();

                    var img = new Image();
                    img.src = textura;
                    img.onload = function () {

                        textureContext.clearRect(0, 0, textureGround.getSize().width, textureGround.getSize().height);
                        textureContext.drawImage(this, 0, 0);

                        textureContext.beginPath();
                        textureContext.moveTo(600 + x, 300);
                        textureContext.quadraticCurveTo(500 + x, 300, 500 + x, 375);
                        textureContext.quadraticCurveTo(500 + x, 450, 550 + x, 450);
                        textureContext.quadraticCurveTo(550 + x, 490, 510 + x, 500);
                        textureContext.quadraticCurveTo(570 + x, 490, 580 + x, 450);
                        textureContext.quadraticCurveTo(700 + x, 450, 700 + x, 375);
                        textureContext.quadraticCurveTo(700 + x, 300, 600 + x, 300);

                        textureContext.fillStyle = "white";
                        textureContext.fill();

                        //Add text to dynamic texture
                        var font = "bold 25px monospace";
                        textureGround.drawText("On your left!!", 510 + x, 385, font, "black", null, true, true);
                        x += 25;


                    }

                }

                if (cap.position.x > 8) {
                    cap.position = new BABYLON.Vector3(-27, -5.2, -2);
                    step = 0;
                }
            })
            textureGround.update();
        });
    });
}

function escena_2(scene){

}

function escena_3(scene){

}

const intervalID = setInterval(function(){
    if(cargado) {
        engine.hideLoadingUI();
        clearInterval(intervalID);
    }
}, 1000);

// Esto se encarga de comprobar si se han cargado ya todos los assets de la parte WebGL
// const intervalID = setInterval(function(){
//     if(cargado && !inicio) {
//         document.getElementById("cargaTexto").innerHTML = "Click one botton to advance";
//         document.getElementById("cargaTexto").style.left = "45%";
//     }else if(!cargado && inicio) {
//         document.getElementById("cargaTexto").style.top = "58%";
//         document.getElementById("tio").style.top = "50%";
//     }else if(inicio && cargado) {
//         engine.hideLoadingUI();
//         clearInterval(intervalID);
//     }
// }, 1000);