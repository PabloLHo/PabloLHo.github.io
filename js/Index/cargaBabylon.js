/*Archivos JS encargado de la correcta inicialización de babylon y su correspondiente llamada al modelado oportuno*/

var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
	engine.runRenderLoop(function () {
		if (sceneToRender && sceneToRender.activeCamera) {
			sceneToRender.render();
		}
	});
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };



BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {

	this._loadingDiv = document.createElement("div");
	this._loadingDiv.id = "customLoadingScreenDiv";
	this._loadingDiv.innerHTML = `
        <div id="volador" class="body">
        	<div class="tio" id="tio">
				<span><span></span><span></span><span></span><span></span></span>
				<div class="base">
					<span></span>
					<div class="face"></div>
				</div>
			</div>
            <div class="longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
	var customLoadingScreenCss = document.createElement('style');
	customLoadingScreenCss.type = 'text/css';
	customLoadingScreenCss.innerHTML = `
            @import url(https://fonts.googleapis.com/css?family=Open+Sans:300);

            #customLoadingScreenDiv{
                background-color: orange;
                color: white;
                font-size:50px;
                text-align:center;
            }
			
			h1 {
			  position: absolute;
			  font-family: 'Open Sans';
			  font-weight: 600;
			  font-size: 15px;
			  text-transform: uppercase;
			  left: 50%;
			  top: 32%;
			  margin-left: -20px;
			}
			
			.tio {
			  position: absolute;
			  top: 25%;
			  margin-left: -50px;
			  left: 50%;
			  animation: speeder .4s linear infinite;
			
			  > span {
				height: 5px;
				width: 35px;
				background: #000;
				position: absolute;
				top: -19px;
				left: 60px;
				border-radius: 2px 10px 1px 0;
			  }
			}
			
			.base {
			  span {
				position: absolute;
				width: 0;
				height: 0;
				border-top: 6px solid transparent;
				border-right: 100px solid #000;
				border-bottom: 6px solid transparent;
			
				&:before {
				  content: "";
				  height: 22px;
				  width: 22px;
				  border-radius: 50%;
				  background: #000;
				  position: absolute;
				  right: -110px;
				  top: -16px;
				}
			
				&:after {
				  content: "";
				  position: absolute;
				  width: 0;
				  height: 0;
				  border-top: 0 solid transparent;
				  border-right: 55px solid #000;
				  border-bottom: 16px solid transparent;
				  top: -16px;
				  right: -98px;
				}
			  }
			}
			
			.face {
			  position: absolute;
			  height: 12px;
			  width: 20px;
			  background: #000;
			  border-radius: 20px 20px 0 0;
			  transform: rotate(-40deg);
			  right: -125px;
			  top: -15px;
			
			  &:after {
				content: "";
				height: 12px;
				width: 12px;
				background: #000;
				right: 4px;
				top: 7px;
				position: absolute;
				transform: rotate(40deg);
				transform-origin: 50% 50%;
				border-radius: 0 0 0 2px;
			  }
			}
			
			.body > span > span:nth-child(1),
			.body > span > span:nth-child(2),
			.body > span > span:nth-child(3),
			.body > span > span:nth-child(4) {
			  width: 30px;
			  height: 1px;
			  background: #000;
			  position: absolute;
			  animation: fazer1 .2s linear infinite;
			}
			
			.body > span > span:nth-child(2) {
			  top: 3px;
			  animation: fazer2 .4s linear infinite;
			}
			
			.body > span > span:nth-child(3) {
			  top: 1px;
			  animation: fazer3 .4s linear infinite;
			  animation-delay: -1s;
			}
			
			.body > span > span:nth-child(4) {
			  top: 4px;
			  animation: fazer4 1s linear infinite;
			  animation-delay: -1s;
			}
			
			@keyframes fazer1 {
			  0% {
				left: 0;
			  }
			  100% {
				left: -80px;
				opacity: 0;
			  }
			}
			
			@keyframes fazer2 {
			  0% {
				left: 0;
			  }
			  100% {
				left: -100px;
				opacity: 0;
			  }
			}
			
			@keyframes fazer3 {
			  0% {
				left: 0;
			  }
			  100% {
				left: -50px;
				opacity: 0;
			  }
			}
			
			@keyframes fazer4 {
			  0% {
				left: 0;
			  }
			  100% {
				left: -150px;
				opacity: 0;
			  }
			}
			
			@keyframes speeder {
			  0% {
				transform: translate(2px, 1px) rotate(0deg);
			  }
			  10% {
				transform: translate(-1px, -3px) rotate(-1deg);
			  }
			  20% {
				transform: translate(-2px, 0px) rotate(1deg);
			  }
			  30% {
				transform: translate(1px, 2px) rotate(0deg);
			  }
			  40% {
				transform: translate(1px, -1px) rotate(1deg);
			  }
			  50% {
				transform: translate(-1px, 3px) rotate(-1deg);
			  }
			  60% {
				transform: translate(-1px, 1px) rotate(0deg);
			  }
			  70% {
				transform: translate(3px, 1px) rotate(-1deg);
			  }
			  80% {
				transform: translate(-2px, -1px) rotate(1deg);
			  }
			  90% {
				transform: translate(2px, 1px) rotate(0deg);
			  }
			  100% {
				transform: translate(1px, -2px) rotate(-1deg);
			  }
			}
			
			.longfazers {
			  position: absolute;
			  width: 100%;
			  height: 100%;
			  z-index: 1000;
			
			  span {
				position: absolute;
				height: 2px;
				width: 20%;
				background: #000;
			
				&:nth-child(1) {
				  top: 20%;
				  animation: lf .6s linear infinite;
				  animation-delay: -5s;
				}
			
				&:nth-child(2) {
				  top: 40%;
				  animation: lf2 .8s linear infinite;
				  animation-delay: -1s;
				}
			
				&:nth-child(3) {
				  top: 60%;
				  animation: lf3 .6s linear infinite;
				}
			
				&:nth-child(4) {
				  top: 80%;
				  animation: lf4 .5s linear infinite;
				  animation-delay: -3s;
				}
			  }
			}
			
			@keyframes lf {
			  0% {
				left: 200%;
			  }
			  100% {
				left: -200%;
				opacity: 0;
			  }
			}
			@keyframes lf2 {
			  0% {
				left: 200%;
			  }
			  100% {
				left: -200%;
				opacity: 0;
			  }
			}
			@keyframes lf3 {
			  0% {
				left: 200%;
			  }
			  100% {
				left: -100%;
				opacity: 0;
			  }
			}
			@keyframes lf4 {
			  0% {
				left: 200%;
			  }
			  100% {
				left: -100%;
				opacity: 0;
			  }
			}
            `;

	document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
	this._resizeLoadingUI();
	window.addEventListener("resize", this._resizeLoadingUI);
	document.body.appendChild(this._loadingDiv);
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
	audio.stop();
	document.getElementById("customLoadingScreenDiv").style.display = "none";
	console.log("scene is now loaded");
}

var createScene = function () {

	engine.displayLoadingUI();


	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);

	var audio = new BABYLON.Sound("cargando", "./assets/Intro.mp4", scene, null, {
		loop: true,   // Hacer que el audio se repita mientras la escena se carga
		autoplay: true // Reproducir inmediatamente
	});

	// This creates and positions a free camera (non-mesh)
	var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

	return scene;
};


window.initFunction = async function() {
	var asyncEngineCreation = async function() {
		try {
			return createDefaultEngine();
		} catch(e) {
			console.log("the available createEngine function failed. Creating the default engine instead");
			return createDefaultEngine();
		}
	}
	window.engine = await asyncEngineCreation();
	if (!engine) throw 'engine should not be null.';
	startRenderLoop(engine, canvas);
	window.scene = createScene();
};
	
	
initFunction().then(() => {
	sceneToRender = scene   
});



// Resize
window.addEventListener("resize", function () {
	engine.resize();
});

// function empezar(){
// 	document.getElementById('popup').style.display = 'none'
// 	document.getElementById("header").style.display = "block";
// 	inicio = true;
// }


