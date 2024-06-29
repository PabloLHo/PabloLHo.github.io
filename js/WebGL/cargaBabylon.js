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

	loadingloadingCanvas = document.getElementById("loadingloadingCanvas");
	// Configuración específica para el loadingCanvas de carga
	// Aquí puedes dibujar lo que desees mostrar como pantalla de carga
	var ctx = loadingloadingCanvas.getContext("2d");
	ctx.fillStyle = "#ffffff";
	ctx.font = "30px Arial";
	ctx.fillText("Loading...", 50, 50); // Ejemplo de texto de carga
};

BABYLON.DefaultLoadingScreen.prototype.hideLoadingUI = function(){
	document.getElementById("customLoadingScreenDiv").style.display = "none";
	console.log("scene is now loaded");
}

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
	var aleatorio = Math.random() % 3 + 1;
	window.scene = createScene(aleatorio);
};
	
	
initFunction().then(() => {
	sceneToRender = scene   
});



// Resize
window.addEventListener("resize", function () {
	engine.resize();
});


const createScene = (escena) => {
	return window["Intro"](escena);
}