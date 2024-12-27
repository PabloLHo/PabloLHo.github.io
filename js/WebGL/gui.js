var gui;
var system;

var ver = true;
var aislado = false;

var previusTypeCam;
var previusCamTarget;
var previusCamPos;

const smallDevice = window.matchMedia("(min-width: 576px)");

smallDevice.addListener(handleDeviceChange);

/*
 * Función que determina cuando la GUI debe abrirse o cerrarse automaticamente según el tamaño de la ventana
 *
 * e: Listener que controla que el tamaño de la ventana sea superior a 576px
 *
 */
function handleDeviceChange(e) {
	if (e.matches) gui.open();
	else gui.close();
}

function crearGUI() {

	gui = new dat.GUI({ name: 'GUI', width: 350 });
	handleDeviceChange(smallDevice);

	system = {
		seleccion: false,
		Tipo: "Pajaro",
	};

	f_b = gui.addFolder('Base');
	f_b.add(system, 'seleccion', false).name("Selección").listen().onChange(function () { clicable = !clicable; });
	f_b.add(system, "Tipo", { Pajaro: "Pajaro", Pasillo: "Pasillo", Libre: "Libre" }).name("Perspectiva").listen().onChange(function(){ cambioCamara(); });
	let centrarVista = { Centrar: function () { centrarCamara() } };
	f_b.add(centrarVista, 'Centrar').name("Centrar cámara");
	let volverInformacion = { Volver: function () { location.href = "home.html" } };
	f_b.add(volverInformacion, 'Volver').name("Personal Page");
	f_b.open();

}


function crearTabSeleccion(){
	let irA = { irA: function () { visualizarObjeto(); } };
	var mover_a_objeto = f_b.add(irA, 'irA').name("Ir a la seleccion");
	mover_a_objeto.__li.style.marginLeft = '5%';

	var ul = gui.__folders["Base"].domElement.querySelector('ul');
	ul.insertBefore(mover_a_objeto.__li, ul.children[2]);
}

function eliminarTabSeleccion(){
	var folder = gui.__folders["Base"];
	folder.remove(folder.__controllers[folder.__controllers.length - 1]);
	folder.remove(folder.__controllers[folder.__controllers.length - 1]);
}

function visualizarObjeto(){

	if(ver) {

		ver = false;

		previusTypeCam = system["Tipo"];
		if(previusTypeCam === "Pajaro") {
			previusCamPos = new BABYLON.Vector3(camera.alpha, camera.beta, camera.radius);
			previusCamTarget = camera.target;
		}else {
			previusCamTarget = cameraPasillo.getTarget();
			previusCamPos = cameraPasillo.position;
		}

		system["Tipo"] = "Pasillo";
		system["seleccion"] = false;
		clicable = false;

		var pos = ultimaSeleccion._absolutePosition;
		let ubi_x = 4;
		if (pos._x > -2)
			ubi_x = -3;

		cameraPasillo = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(pos._x + ubi_x, pos._y + 0.5, pos._z));
		cameraPasillo.setTarget(pos);
		cameraPasillo.speed = 0.05;
		cameraPasillo.angularSensibility = 10000;
		cameraPasillo.attachControl(canvas, true);
		scene.activeCamera = cameraPasillo;

		var folder = gui.__folders["Base"];
		folder.__controllers[folder.__controllers.length - 1].name("Posición original");

		let aislaObjeto = { irA: function () { aislarObjeto(); } };
		var mover_a_objeto = f_b.add(aislaObjeto, 'irA').name("Aislar objeto");
		mover_a_objeto.__li.style.marginLeft = '5%';

		var ul = gui.__folders["Base"].domElement.querySelector('ul');
		ul.insertBefore(mover_a_objeto.__li, ul.children[3]);

		minX = -2.75;
		maxX = -0.5;
		minZ = pos._z - 1;
		maxZ = pos._z + 1;

	}else{

		ver = true;

		if(aislado){
			aislarObjeto();
		}

		system["Tipo"] = previusTypeCam;

		cambioCamara();

		if(previusTypeCam === "Pajaro") {
			camera.alpha = previusCamPos._x;
			camera.beta = previusCamPos._y;
			camera.radius = previusCamPos._z;
			camera.target = previusCamTarget;
		}else {
			cameraPasillo.position = previusCamPos;
			cameraPasillo.setTarget(previusCamTarget);
		}

		eliminarTabSeleccion();
		ultimaSeleccion = null;
		highlightLayer.removeAllMeshes();

		minX = -2.5;
		maxX = -1.75;
		minZ = -0.5;
		maxZ = 5.5;
		minY = 2.2;
		maxY = 4;

	}

}

function aislarObjeto(){

	var nombre = ultimaSeleccion.name;
	if(ultimaSeleccion.name.includes("_primitive"))
		nombre = ultimaSeleccion.name.split("_")[0];

	scene.meshes.forEach(function (mesh) {
		if(!mesh.name.includes(nombre) && mesh.name !== "__root__")
			mesh.setEnabled(aislado);
	});

	if(aislado) {
		var folder = gui.__folders["Base"];
		folder.__controllers[folder.__controllers.length - 1].name("Aislar objeto");

		var pos = ultimaSeleccion._absolutePosition;

		let ubi_x = -10;
		if (pos._x > -2)
			ubi_x = 10;

		cameraPasillo.setTarget(new BABYLON.Vector3(ubi_x, pos._y, pos._z));
		cameraPasillo.position = new BABYLON.Vector3(pos._x + 1, pos._y, pos._z);

		scene.activeCamera = cameraPasillo;

	}else{
		var folder = gui.__folders["Base"];
		folder.__controllers[folder.__controllers.length - 1].name("Volver a la escena");

		var pos = ultimaSeleccion._absolutePosition;
		let ubi_x = 0;
		if (pos._x > -2)
			ubi_x = Math.PI;

		objectCamera = new BABYLON.ArcRotateCamera("objectCamera", ubi_x, Math.PI / 3, 5, new BABYLON.Vector3(pos._x, pos._y, pos._z));
		objectCamera.attachControl(canvas, true);

		objectCamera.upperRadiusLimit = 5;
		objectCamera.lowerRadiusLimit = 1.5;

		objectCamera.angularSensibilityX = 5000;
		objectCamera.angularSensibilityY = 5000;

		scene.activeCamera = objectCamera;
		
	}

	aislado = !aislado;
}

function cambioCamara(){
	switch(system["Tipo"]){
		case "Pajaro":
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
			scene.activeCamera = camera;
			break;
		case "Pasillo":
			//Solo hacia los lados y giros 90 grados sin movimiento, con boton para invertir mirada
		case "Libre":
			cameraLibre = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(-2,2.2,2.5));
			cameraLibre.setTarget(new BABYLON.Vector3(10,2.2,2.5))
			cameraLibre.attachControl(canvas, true);

			cameraLibre.ellipsoid = new BABYLON.Vector3(0.2, 0.5, 0.2);
			cameraLibre.speed = 0.05;
			cameraLibre.angularSensibility = 10000;
			scene.activeCamera = cameraLibre;
			break;
	}

}

function centrarCamara(){
	switch(system["Tipo"]){
		case "Pajaro":
			camera.setTarget(new BABYLON.Vector3(0,0,0));
			camera.beta = Math.PI / 3
			camera.alpha = Math.PI / 1.4;
			camera.radius = 15;
			break;
		case "Pasillo":
			cameraPasillo.setTarget(new BABYLON.Vector3(1,2.2,2.5));
			cameraPasillo.position = new BABYLON.Vector3(-2,2.2,2.5);
			break;
	}
}