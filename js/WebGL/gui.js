var gui;
var system;

var ver = true;
var aislado = false;

var previousTypeCam;
var previousCamTarget;
var previousCamPos;

var seleccionTab;
var vistaTab;

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
		chair: true,
		Tipo: "Pajaro",
		Mueble: "Habitación",
	};

	f_b = gui.addFolder('Scene interaction');
	creacionSeleccionVista();
	let centrarVista = { Centrar: function () { centrarCamara() } };
	f_b.add(centrarVista, 'Centrar').name("Centrar cámara");
	f_b.add(system, "Mueble", { Armario: "Armario", Balda_Centro_Derecha: "Balda Centro Derecha", Balda_Centro_Izquierda: "Balda Centro Izquierda", Balda_Derecha: "Balda Derecha",
		Balda_Izquierda: "Balda Izquierda", Caballete: "Caballete", Cama: "Cama", Comoda: "Comoda",  Escritorio: "Escritorio", Estanteria: "Estanteria", Habitacion: "Habitación", Repisa: "Repisa"}).name("Aislar mueble").listen().onChange(function(){ cambioEstancia(); });
	f_b.open();

	animations = gui.addFolder('Animations');
	animations.add(system, 'chair', true).name("Chair animation").listen().onChange(function () { chairMovement = !chairMovement; });
	animations.close();

	links = gui.addFolder("Links");
	let volverInformacion = { Volver: function () { location.href = "home.html" } };
	links.add(volverInformacion, 'Volver').name("Personal Page");
	links.close();

}


function crearTabSeleccion(){
	let irA = { irA: function () { visualizarObjeto(); } };
	var mover_a_objeto = f_b.add(irA, 'irA').name("Ir a la seleccion");
	mover_a_objeto.__li.style.marginLeft = '5%';

	var ul = gui.__folders["Scene interaction"].domElement.querySelector('ul');
	ul.insertBefore(mover_a_objeto.__li, ul.children[2]);
}

function eliminarTabSeleccion(){
	var folder = gui.__folders["Scene interaction"];
	folder.remove(folder.__controllers[folder.__controllers.length - 1]);
	if(!ver)
		folder.remove(folder.__controllers[folder.__controllers.length - 1]);
}

function visualizarObjeto(){

	if(ver) {

		ver = false;

		previousTypeCam = system["Tipo"];
		if(previousTypeCam === "Pajaro") {
			previousCamPos = new BABYLON.Vector3(camera.alpha, camera.beta, camera.radius);
			previousCamTarget = camera.target;
		}else {
			previousCamTarget = cameraPasillo.getTarget();
			previousCamPos = cameraPasillo.position;
		}

		system["Tipo"] = "Pasillo";
		system["seleccion"] = false;
		clicable = false;

		var pos = ultimaSeleccion._absolutePosition;
		let ubi_x = 4;
		if (pos._x > -2)
			ubi_x = -3;

		cameraPasillo = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(pos._x + ubi_x, pos._y, pos._z));
		cameraPasillo.setTarget(pos);
		cameraPasillo.speed = 0.05;
		cameraPasillo.angularSensibility = 10000;
		cameraPasillo.ellipsoid = new BABYLON.Vector3(0.2, 0.5, 0.2);
		cameraPasillo.attachControl(canvas, true);
		scene.activeCamera = cameraPasillo;

		var folder = gui.__folders["Scene interaction"];
		folder.__controllers[folder.__controllers.length - 1].name("Posición original");

		let aislaObjeto = { irA: function () { aislarObjeto(); } };
		var mover_a_objeto = f_b.add(aislaObjeto, 'irA').name("Aislar objeto");
		mover_a_objeto.__li.style.marginLeft = '5%';

		var ul = gui.__folders["Scene interaction"].domElement.querySelector('ul');
		ul.insertBefore(mover_a_objeto.__li, ul.children[3]);

		minX = -2.75;
		maxX = -0.5;
		minZ = pos._z - 1;
		maxZ = pos._z + 1;

	}else{

		if(aislado){
			aislarObjeto();
		}

		system["Tipo"] = previousTypeCam;

		cambioCamara();

		if(previousTypeCam === "Pajaro") {
			camera.alpha = previousCamPos._x;
			camera.beta = previousCamPos._y;
			camera.radius = previousCamPos._z;
			camera.target = previousCamTarget;
		}else {
			cameraPasillo.position = previousCamPos;
			cameraPasillo.setTarget(previousCamTarget);
		}

		eliminarTabSeleccion();
		ultimaSeleccion = null;
		highlightLayer.removeAllMeshes();

		minX = -2.5;
		maxX = -1.75;
		minZ = -0.5;
		maxZ = 5.5;

		ver = true;

	}

}

function aislarObjeto(){

	var nombre = ultimaSeleccion.name;
	if(ultimaSeleccion.name.includes("_primitive"))
		nombre = ultimaSeleccion.name.split("_")[1];

	scene.meshes.forEach(function (mesh) {
		if(!mesh.name.includes(nombre) && mesh.name !== "__root__")
			mesh.setEnabled(aislado);
	});

	if(aislado) {

		var pos = ultimaSeleccion._absolutePosition;
		let ubi_x = 4;
		if (pos._x > -2)
			ubi_x = -3;

		cameraPasillo = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(pos._x + ubi_x, pos._y, pos._z));
		cameraPasillo.setTarget(pos);
		cameraPasillo.speed = 0.05;
		cameraPasillo.angularSensibility = 10000;
		cameraPasillo.ellipsoid = new BABYLON.Vector3(0.2, 0.5, 0.2);
		cameraPasillo.attachControl(canvas, true);
		scene.activeCamera = cameraPasillo;

		scene.activeCamera = cameraPasillo;
		scene.clearColor = new BABYLON.Color3(0,0,0);

		var folder = gui.__folders["Scene interaction"];
		folder.remove(folder.__controllers[folder.__controllers.length - 1]);
		folder.__controllers[folder.__controllers.length - 1].name("Aislar objeto");

		nombre = ultimaSeleccion.name.split("_")[1];
		scene.meshes.forEach(function (mesh) {
			if(mesh.name.includes(nombre))
				highlightLayer.addMesh(mesh, new BABYLON.Color3.Green());
		});

	}else{

		scene.clearColor = new BABYLON.Color3(1,1,1);
		var folder = gui.__folders["Scene interaction"];
		folder.__controllers[folder.__controllers.length - 1].name("Volver a la escena");

		var palette = {
			Color: '#FFFFFF', // CSS string
		};

		var colorFondo = f_b.addColor(palette, 'Color').name("Color Fondo");
		colorFondo.__li.style.marginLeft = '5%';

		colorFondo.onChange((value) => {
			scene.clearColor = new BABYLON.Color3().fromHexString(value);
		});

		var ul = gui.__folders["Scene interaction"].domElement.querySelector('ul');
		ul.insertBefore(colorFondo.__li, ul.children[4]);

		var pos = ultimaSeleccion._absolutePosition;
		let ubi_x = 0;
		if (pos._x > -2)
			ubi_x = Math.PI;

		objectCamera = new BABYLON.ArcRotateCamera("objectCamera", ubi_x, Math.PI / 3, 3, new BABYLON.Vector3(pos._x, pos._y, pos._z));
		objectCamera.attachControl(canvas, true);

		objectCamera.upperRadiusLimit = 5;
		objectCamera.lowerRadiusLimit = 1.5;

		objectCamera.angularSensibilityX = 5000;
		objectCamera.angularSensibilityY = 5000;

		objectCamera.wheelPrecision = 75;

		scene.activeCamera = objectCamera;

		highlightLayer.removeAllMeshes();
		
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

			camera.wheelPrecision = 75;

			camera.panningDistanceLimit = 3;
			scene.activeCamera = camera;
			break;
		case "Pasillo":
			cameraPasillo = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(-2,2.2,2.5));
			cameraPasillo.setTarget(new BABYLON.Vector3(10,2.2,2.5))
			cameraPasillo.attachControl(canvas, true);

			cameraPasillo.ellipsoid = new BABYLON.Vector3(0.2, 0.5, 0.2);
			cameraPasillo.speed = 0.05;
			cameraPasillo.angularSensibility = 10000;

			scene.activeCamera = cameraPasillo;

			minX = -1.9;
			maxX = -2.1;
			break;
		case "Libre":
			cameraLibre = new BABYLON.UniversalCamera("cameraPasillo", new BABYLON.Vector3(-2,3,2.5));
			cameraLibre.setTarget(new BABYLON.Vector3(10,2.2,2.5));
			cameraLibre.attachControl(canvas, true);

			cameraLibre.ellipsoid = new BABYLON.Vector3(0.2, 0.5, 0.2);
			cameraLibre.speed = 0.05;
			cameraLibre.angularSensibility = 10000;
			scene.activeCamera = cameraLibre;
			minX = -2.5;
			maxX = -1.75;
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
		case "Libre":
			cameraLibreposition = new BABYLON.Vector3(-2,3,2.5);
			cameraLibre.setTarget(new BABYLON.Vector3(10,2.2,2.5));
	}
}

function cambioEstancia(){

	estanciaElegida = system["Mueble"];
	scene.meshes.forEach(function (mesh) {
		mesh.setEnabled(true);
	});


	if(estanciaElegida !== "Habitación"){

		if(seleccionTab) {
			var folder = gui.__folders["Scene interaction"];
			folder.remove(seleccionTab);
			folder.remove(vistaTab);

			seleccionTab = null;
			vistaTab = null;
			highlightLayer.removeAllMeshes();

			if(!ver){
				eliminarTabSeleccion();

			}
		}

		scene.meshes.forEach(function (mesh) {
			if(!mesh.name.includes(estanciaElegida) && mesh.name !== "__root__" && mesh.name !== "Habitacion_Suelo Madera")
				mesh.setEnabled(false);
		});

		meshCentral = scene.getMeshByName("Habitacion_" + estanciaElegida);

		if(meshCentral === null)
			meshCentral = scene.getMeshByName("Habitacion_" + estanciaElegida + "_primitive0");

		var pos = meshCentral._absolutePosition;

		let ubi_x = 0;
		if (pos._x > -2)
			ubi_x = Math.PI;

		radious = 5;
		if(estanciaElegida === "Armario")
			radious = 7;

		objectCamera = new BABYLON.ArcRotateCamera("objectCamera", ubi_x, Math.PI / 2.5, radious, new BABYLON.Vector3(pos._x, pos._y, pos._z));
		objectCamera.attachControl(canvas, true);

		objectCamera.upperRadiusLimit = 7;
		objectCamera.lowerRadiusLimit = 2;

		objectCamera.angularSensibilityX = 5000;
		objectCamera.angularSensibilityY = 5000;

		objectCamera.upperBetaLimit = Math.PI / 2;
		objectCamera.lowerBetaLimit = Math.PI / 20;

		objectCamera.panningDistanceLimit = 3;

		scene.activeCamera = objectCamera;

	}else{
		system["Tipo"] = "Pajaro";
		cambioCamara();
		creacionSeleccionVista();
	}

}

function creacionSeleccionVista(){
	var folder = gui.__folders["Scene interaction"];
	seleccionTab = folder.add(system, 'seleccion', false).name("Selección").listen().onChange(function () { clicable = !clicable; if(!ver){ clicable = !clicable; system["seleccion"] = false; } });
	vistaTab = folder.add(system, "Tipo", { Pajaro: "Pajaro", Pasillo: "Pasillo", Libre: "Libre" }).name("Perspectiva").listen().onChange(function(){ cambioCamara(); });

	var ul = gui.__folders["Scene interaction"].domElement.querySelector('ul');
	ul.insertBefore(seleccionTab.__li, ul.children[1]);
	ul.insertBefore(vistaTab.__li, ul.children[2]);
}