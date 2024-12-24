const canvas = document.getElementById("renderCanvas");
let carga = 0;

htmlCarga = "";
cssCarga = "";

const startRenderLoop = function (engine, canvas) {
	engine.runRenderLoop(function () {
		if (sceneToRender && sceneToRender.activeCamera) {
			sceneToRender.render();
		}
	});
};

var engine = null;
let scene = null;
let sceneToRender = null;

const createDefaultEngine = function () {
	return new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false});
};

BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {

	let random = Math.floor(Math.random() * 3);

	switch (random){
		case 0:
			runningMan();
			break;
		case 1:
			bb8();
			break;
		case 2:
			formula1();
			break;
	}

	this._loadingDiv = document.createElement("div");
	this._loadingDiv.id = "customLoadingScreenDiv";
	this._loadingDiv.innerHTML = htmlCarga;

	var customLoadingScreenCss = document.createElement('style');
	customLoadingScreenCss.innerHTML = cssCarga;

	document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);

	this._resizeLoadingUI();
	window.addEventListener("resize", this._resizeLoadingUI);
	document.body.appendChild(this._loadingDiv);
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
	window.scene = window["Intro"]("1");
};

initFunction().then(() => {
	sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {
	engine.resize();
});

const cargaModelos = setInterval(function(){
	document.getElementById("contador").innerHTML = carga + `%`;
}, 100);


function runningMan(){
	htmlCarga = `
  		<section class="world">
			<div class="back one"></div>
			<div class="back two"></div>
			<div class="back three"></div>
			<div class="back four"></div>
		
			<div class="floor">
			  <div class="rock one"></div>
			  <div class="rock two"></div>
			  <div class="rock three"></div>
		
			  <div class="grass one"></div>
			  <div class="grass two"></div>
			  <div class="grass three"></div>
			  <div class="grass four"></div>
			  <div class="grass five"></div>
			  <div class="grass six"></div>
			  <div class="grass seven"></div>
			  <div class="grass eight"></div>
			  <div class="grass nine"></div>
			  <div class="grass ten"></div>
			</div>
		
			<div class="cloud one"></div>
			<div class="cloud two"></div>
			<div class="cloud three"></div>
		
			<div class="stick">
			  <div class="head"></div>
			  <div class="arm left">
				<div class="bottom"></div>
			  </div>
			  <div class="arm right">
				<div class="bottom"></div>
			  </div>
			  <div class="leg left">
				<div class="bottom"></div>
			  </div>
			  <div class="leg right">
				<div class="bottom"></div>
			  </div>
			</div>
		  </section>
		  
		  	<div class="container">
			  <div id="contador" class="text">0%
			  </div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			  <div class="circle"></div>
			</div>
		`;
	cssCarga =  `

	#customLoadingScreenDiv {
		background: orange;
		font-family: sans-serif;
		display: flex;
	  	justify-content: center;
	  	align-items: center;
	  	height: 100%;
	}

	h1, h2 {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		color: hsl(0, 0%, 20%);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 2px;
	}

	h1 {
		top: 24px;
		font-size: 12px;
	}

	h2 {
		top: 44px;
		font-size: 10px;
		opacity: 0.7;
	}
	
	.container {
	  --dim: 150px;
	  --degree: 0deg;
	  --radius: calc(var(--dim) / 2 * 0.5);
	  
	  position: relative;
	
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.circle {
	  height: var(--dim);
	  width: var(--dim);
	  border-radius: calc(var(--dim) / 2);
	  background-color: red;
	  opacity: 0.25;
	  
	  position: absolute;
	  animation: anim 2s ease-in-out;
	  animation-iteration-count:infinite;
	}
	
	@keyframes anim { 
	  0%, 100% { transform: translate(0, 0);}
	  50% { transform: 
		translate(
		  calc(cos(var(--degree)) * var(--radius)),
		  calc(sin(var(--degree)) * var(--radius))
		);
	  }
	}
	
	.container .circle:nth-child(1) {
	  --degree: 0deg;
	}
	.container .circle:nth-child(2) {
	  --degree: 45deg;
	}
	.container .circle:nth-child(3) {
	  --degree: 90deg;
	}
	.container .circle:nth-child(4) {
	  --degree: 135deg;
	}
	.container .circle:nth-child(5) {
	  --degree: 180deg;
	}
	.container .circle:nth-child(6) {
	  --degree: 225deg;
	}
	.container .circle:nth-child(7) {
	  --degree: 270deg;
	}
	.container .circle:nth-child(8) {
	  --degree: 315deg;
	}
	
	.text {
	  font-family: 'Poppins', sans-serif;
	  font-size: 16px;
	  font-weight:700;
	  color: white;
	  z-index: 10;
	  text-transform: uppercase;
	}
	
	.text span:nth-child(1) {
	  animation: dots-animation1 2s;
	  animation-iteration-count: infinite;
	}
	.text span:nth-child(2) {
	  animation: dots-animation2 2s;
	  animation-iteration-count: infinite;
	}
	.text span:nth-child(3) {
	  animation: dots-animation3 2s;
	  animation-iteration-count: infinite;
	}

	/* World */
	section.world {
		position: absolute;
		width: 100%;
		height: 90%;
		top: 50%;
		left: 50%;
		overflow: hidden;
		box-shadow: 0 16px 10px -10px hsl(45, 100%, 47%);
		transform: translate(-50%, -50%);
	}

	section.world div {
		position: absolute;
		box-sizing: border-box;
		background: black;
		border-radius: 2px;
	}

	section.world div::before, section.world div::after {
		content: '';
		position: absolute;
		box-sizing: border-box;
	}

	/* Back */
.back {
		bottom: 0;
		right: -40%;
		background: hsl(45, 100%, 45%) !important;
	}

.back.one {
		width: 30%;
		height: 8%;
		animation: elem 2.6s linear infinite;
	}

.back.two {
		width: 40%;
		height: 16%;
		animation: elem 3.3s linear infinite 1.6s;
	}

.back.three {
		width: 7%;
		height: 24%;
		animation: elem 2.2s linear infinite 1s;
	}

.back.four {
		width: 18%;
		height: 13%;
		animation: elem 2.8s linear infinite 0.2s;
	}

	/* Floor & grass */
.floor {
		width: 100%;
		height: 4px;
		bottom: 0;
	}

.floor .rock {
		bottom: 0;
		right: -20px;
	}

.floor .rock.one {
		width: 16px;
		height: 26px;
		animation: elem 3s linear infinite;
	}

.floor .rock.two {
		width: 20px;
		height: 18px;
		animation: elem 3s linear infinite 0.4s;
	}

.floor .rock.three {
		width: 13px;
		height: 26px;
		animation: elem 3s linear infinite 1.3s;
	}

.floor .grass {
		width: 2px;
		bottom: 0;
		right: -2px;
	}

.floor .grass.one {
		height: 15px;
		animation: elem 3s linear infinite;
	}

.floor .grass.two {
		height: 10px;
		animation: elem 3.3s linear infinite 0.2s;
	}

.floor .grass.three {
		height: 18px;
		animation: elem 2.5s linear infinite 0.4s;
	}

.floor .grass.four {
		height: 5px;
		animation: elem 2.9s linear infinite 0.6s;
	}

.floor .grass.five {
		height: 7px;
		animation: elem 3s linear infinite 0.8s;
	}

.floor .grass.six {
		height: 10px;
		animation: elem 3.1s linear infinite 1s;
	}

.floor .grass.seven {
		height: 4px;
		animation: elem 3s linear infinite 1.2s;
	}

.floor .grass.eight {
		height: 7px;
		animation: elem 3s linear infinite 1.4s;
	}

.floor .grass.nine {
		height: 10px;
		animation: elem 3.1s linear infinite 1.6s;
	}

.floor .grass.ten {
		height: 6px;
		animation: elem 3s linear infinite 1.8s;
	}

	/* Cloud */
.cloud {
		height: 20px;
		right: -160px;
		background: hsla(0, 0%, 100%, 0.3) !important;
	}

.cloud::before,
.cloud::after {
		background: hsla(0, 0%, 100%, 0.3) !important;
	}

.cloud::before {
		width: 80%;
		height: 50%;
		bottom: -25%;
		left: -20%;
	}

.cloud::after {
		width: 60%;
		height: 30%;
		top: -15%;
		right: -10%;
	}

.cloud.one {
		width: 100px;
		top: 60px;
		animation: cloud 3s linear infinite;
	}

.cloud.two {
		width: 80px;
		top: 20px;
		animation: cloud 2.6s linear infinite 0.5s;
	}

.cloud.three {
		width: 130px;
		top: 110px;
		animation: cloud 3.2s linear infinite 1s;
	}

	/* Stickman */
.stick {
		width: 6px;
		height: 30px;
		bottom: 30px;
		left: 50%;
		background: black;
		border-radius: 3px;
		animation: stick 3s ease-in-out infinite;
	}

.stick div {
		transform-origin: 50% 0%;
	}

.stick .left {
		z-index: -1;
	}

.stick .right {
		z-index: 1;
	}

.stick .head {
		width: 12px;
		height: 12px;
		background: black;
		border-radius: 50%;
		transform: translate(-3px, -14px);
	}

.stick .arm {
		width: 4px;
		height: 14px;
		top: 1px;
		left: 1px;
	}

.stick .arm .bottom {
		width: 4px;
		height: 12px;
		bottom: -10px;
	}

.stick .leg {
		width: 4px;
		height: 20px;
		bottom: -19px;
		left: 1px;
	}

.stick .leg .bottom {
		width: 4px;
		height: 15px;
		bottom: -13px;
	}

	/* Stickman arms/legs animations */
.arm.left {
		animation: run 0.8s linear infinite;
	}

.arm.left .bottom {
		animation: arm-bottom 0.4s linear infinite;
	}

.arm.right {
		animation: run 0.8s linear infinite 0.4s;
	}

.arm.right .bottom {
		animation: arm-bottom 0.4s linear infinite 0.4s;
	}

.leg.left {
		animation: run 0.4s linear infinite;
	}

.leg.left .bottom {
		animation: leg-bottom 0.4s linear infinite;
	}

.leg.right {
		animation: run 0.4s linear infinite 0.2s;
	}

.leg.right .bottom {
		animation: leg-bottom 0.4s linear infinite 0.2s;
	}

	/* Keyframes */
@keyframes cloud {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-760px);
	}
	}

@keyframes elem {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-640px);
	}
	}

@keyframes stick {
		0%, 100% {
			transform: translateX(0px);
	}
		30% {
			transform: translateX(-60px);
	}
		70% {
			transform: translateX(20px);
	}
	}

@keyframes run {
		0%, 50%, 100% {
			transform: rotate(0deg);
	}
		25% {
			transform: rotate(60deg);
	}
		75% {
			transform: rotate(-60deg);
	}
	}

@keyframes arm-bottom {
		0%, 100% {
			transform: rotate(0deg);
	}
		50% {
			transform: rotate(-90deg);
	}
	}

@keyframes leg-bottom {
		0%, 100% {
			transform: rotate(0deg);
	}
		50% {
			transform: rotate(120deg);
	}
	}`;
}

function bb8(){
	htmlCarga = `
		<div class="container">
		  <div id="contador" class="text">0%</div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		</div>
		
		<!-- svg describing the loader -->
		<svg viewBox="0 0 250 160" width="100%" height="80%">
		  <defs>
			<!-- clip to crop the circle and ellipse elements in the body of the droid -->
			<clipPath id="body">
			  <circle
				cx="0"
				cy="0"
				r="33.75">
			  </circle>
			</clipPath>
		
			<!-- clip to crop the circle fabricating the reflection -->
			<clipPath id="len">
			  <circle
				cx="0"
				cy="16.5"
				r="6.75">
			  </circle>
			</clipPath>
		
			<!-- linear gradient used for the reflection on the lens of the droid
			  ! specify a repeating linear gradient with a partial end value (x2, y2) and the appropriate spread method
			-->
			<linearGradient
			  id="lens"
			  x1="0"
			  x2="0.25"
			  y1="0"
			  y2="0.25"
			  spreadMethod="repeat">
			  <stop offset="0" stop-color="transparent"></stop>
			  <stop offset="0.5" stop-color="transparent"></stop>
			  <stop offset="0" stop-color="#fff"></stop>
			  <stop offset="1" stop-color="#fff"></stop>
			</linearGradient>
		
			<!-- dashes replicated to the side of the droid -->
			<path
			  id="dash"
			  stroke-dasharray="20 4 2"
			  d="M 0 0 h 26">
			</path>
			<path
			  id="dash--small"
			  d="M 0 0 h 8">
			</path>
		
			<!-- particle replicated to the side of the droid -->
			<!-- the fill and stroke are specified in the <use> element, alongside a transform attribute changing the scale of the element -->
			<path
			  id="particle"
			  d="M 0 -2 a 5 5 0 0 0 0 4 a 5 5 0 0 0 0 -4 m -2 2 a 5 5 0 0 0 4 0 a 5 5 0 0 0 -4 0">
			</path>
		  </defs>
		
		  <!-- group describing the ground -->
		
		  <!-- group describing the particles
			! the particles are actually included in two groups, one before the droid, one after it
			by sharing the class name the groups are however moved in unison
		  -->
		  <g
			fill="none"
			stroke="#254256"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			transform="translate(86 56)">
			<!-- translate at the top of the robot when leaning toward the left -->
			<!-- add a negative delay to separate the introduction of the dashes -->
			<g>
			  <use
				href="#dash"
				class="dash"
				style="animation-delay: -0.75s">
			  </use>
			  <g transform="translate(10 15)">
				<use
				  href="#dash"
				  class="dash"
				  style="animation-delay: -0.6s">
				</use>
			  </g>
		
			  <!-- colored particles
				wrap <use> elements in groups to position and change the transform-origin
				add transform="scale()" attributes to the same elements to have particles of different sizes
				wrap particles of the same color in group elements to share the fill and stroke values
			  -->
			  <g
				fill="#FF7761"
				stroke="#FF7761">
				<g transform="translate(10 7.5)">
				  <use
					style="animation-delay: -0.8s;"
					href="#particle"
					class="particle"
					transform="scale(0.9)">
				  </use>
				</g>
				<g transform="translate(80 50)">
				  <use
					style="animation-delay: -0.5s;"
					href="#particle"
					class="particle"
					transform="scale(1.2)">
				  </use>
				</g>
				<g transform="translate(95 40)">
				  <use
					style="animation-delay: -0.4s;"
					href="#particle"
					class="particle"
					transform="scale(0.6)">
				  </use>
				</g>
				<g transform="translate(115 58)">
				  <use
					style="animation-delay: -0.25s;"
					href="#particle"
					class="particle"
					transform="scale(0.6)">
				  </use>
				</g>
				<g transform="translate(100 65)">
				  <use
					style="animation-delay: -0.37s;"
					href="#particle"
					class="particle"
					transform="scale(0.5)">
				  </use>
				</g>
				<g transform="translate(65 78)">
				  <use
					style="animation-delay: -0.55s;"
					href="#particle"
					class="particle"
					transform="scale(0.7)">
				  </use>
				</g>
				<g transform="translate(30 90)">
				  <use
					style="animation-delay: -0.7s;"
					href="#particle"
					class="particle"
					transform="scale(0.7)">
				  </use>
				</g>
			  </g>
		
			  <g
				fill="#FDC33E"
				stroke="#FDC33E">
				<g transform="translate(60 18)">
				  <use
					style="animation-delay: -0.62s;"
					href="#particle"
					class="particle"
					transform="scale(1.1)">
				  </use>
				</g>
				<g transform="translate(40 40)">
				  <use
					style="animation-delay: -0.75s;"
					href="#particle"
					class="particle"
					transform="scale(1)">
				  </use>
				</g>
				<g transform="translate(100 40)">
				  <use
					style="animation-delay: -0.25s;"
					href="#particle"
					class="particle"
					transform="scale(0.5)">
				  </use>
				</g>
				<g transform="translate(90 52)">
				  <use
					style="animation-delay: -0.34s;"
					href="#particle"
					class="particle"
					transform="scale(0.85)">
				  </use>
				</g>
				<g transform="translate(65 68)">
				  <use
					style="animation-delay: -0.55s;"
					href="#particle"
					class="particle"
					transform="scale(0.6)">
				  </use>
				</g>
			  </g>
		
			  <g
				fill="#449AAB"
				stroke="#449AAB">
				<g transform="translate(20 25)">
				  <use
					style="animation-delay: -0.8s;"
					href="#particle"
					class="particle"
					transform="scale(1.3)">
				  </use>
				</g>
			  </g>
			  <g
				fill="#39B4C1"
				stroke="#39B4C1">
				<g transform="translate(28 12)">
				  <use
					style="animation-delay: -0.88s;"
					href="#particle"
					class="particle"
					transform="scale(0.8)">
				  </use>
				</g>
				<g transform="translate(46 58)">
				  <use
					style="animation-delay: -0.66s;"
					href="#particle"
					class="particle"
					transform="scale(0.75)">
				  </use>
				</g>
				<g transform="translate(30 80)">
				  <use
					style="animation-delay: -0.74s;"
					href="#particle"
					class="particle"
					transform="scale(0.75)">
				  </use>
				</g>
			  </g>
			</g>
		  </g>
		
		  <!-- graphic describing bb-8
			bb-8 occupies in a 70x100 rectangle
			70x100 plus the 2.5 given by the width of the stroke
		  -->
		
		  <!-- translate the graphic half the stroke size, to work in a 70x100 box
			the values cascade to the nested elements, and are overwritten where needed
		  -->
		  <g
			fill="#EBF2FB"
			stroke="#254256"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			transform="translate(1.25 1.25)">
			<!-- translate 100 (125 to center, -25 to offset the imbalance introduced by the translation) left and 50 down -->
			<g transform="translate(100 50)">
			  <!-- include group elements to move the transform-origin at the bottom of the graphic -->
			  <g transform="translate(0 65)">
				<g class="bb8-base" transform="translate(0 0) rotate(-40)"><!-- translate and rotate this group to have the droid lean from the center -->
				  <g transform="translate(0 -65)">
					<!-- body -->
					<g transform="translate(0 65)">
					  <g class="bb8-center"><!-- rotate this group to have the body rotate from its center -->
						<circle
						  cx="0"
						  cy="0"
						  r="35">
						</circle>
						<!-- apply the clip on the elements inside the body -->
						<g clip-path="url(#body)">
						  <!-- line connecting the center of the circle and ellipse elements -->
						  <path
							fill="none"
							d="M -15 -25 L 35 0 L -5 28 z">
						  </path>
						  <!-- for the circle and larger ellipse specify two copies, one with a smaller radius to create a donut shape -->
						  <circle
							fill="#FEC140"
							cx="-15"
							cy="-25"
							r="22">
						  </circle>
						  <circle
							cx="-15"
							cy="-25"
							r="9">
						  </circle>
		
						  <ellipse
							fill="#FEC140"
							cx="35"
							cy="0"
							ry="30"
							rx="10">
						  </ellipse>
		
						  <ellipse
							fill="#FEC140"
							cx="-5"
							cy="28"
							rx="20"
							ry="18">
						  </ellipse>
						  <ellipse
							cx="-5"
							cy="28"
							rx="8"
							ry="7.2">
						  </ellipse>
						  <!-- dots included sparingly between the circle and ellipse elements -->
						  <circle
							fill="#254256"
							stroke="none"
							cx="7"
							cy="1"
							r="2">
						  </circle>
						  <circle
							fill="#254256"
							stroke="none"
							cx="-22"
							cy="4.5"
							r="2">
						  </circle>
						  <!-- above the elements fabricating the body include two arcs to create a shadow -->
						  <g stroke="none" fill="#254256" opacity="0.2">
							<path
							  d="M -45 0 a 45 45 0 0 1 90 0 a 55 55 0 0 0 -90 0">
							</path>
							<path
							  transform="rotate(-15)"
							  d="M -35 0 a 35 35 0 0 0 70 0 a 37 37 0 0 1 -70 0">
							</path>
						  </g>
						</g>
					  </g>
					</g>
					<!-- head -->
					<g>
					  <path
						d="M -29 29 l 6 8 h 46 l 6 -8 a 29 29 0 0 0 -58 0">
					  </path>
					  <!-- above the contour of the head include path elements to fabricate the presence of a light source
								  semi transparent #FFF and #254256 sections covering part of the droid's head
								  -->
					  <g stroke="none">
						<path
						  opacity="0.85"
						  fill="#fff"
						  d="M 0 1.25 a 27.75 27.75 0 0 0 -27.75 27.25 h 5 a 27.5 27.5 0 0 1 22.75 -27.25">
						</path>
						<path
						  opacity="0.15"
						  fill="#254256"
						  d="M 0 1.25 a 27.75 27.75 0 0 1 27.75 27.25 h -5 a 27.5 27.5 0 0 0 -22.75 -27.25">
						</path>
						<path
						  opacity="0.25"
						  fill="#254256"
						  d="M -27.75 28.5 l 6 8 h 43.5 l 6 -8 h -15.25 q -5 0 -5 -10 h -15 q 0 10 -5 10">
						</path>
					  </g>
					  <!-- for the lens include a copy of the circle using the gradient fabricating the reflection -->
					  <circle
						cx="0"
						cy="16.5"
						r="8"
						fill="#295A6E">
					  </circle>
					  <!-- apply a clip path on the lens' reflection to crop the circle as it translates outside of the lens itself -->
					  <g clip-path="url(#len)">
						<g class="reflection"><!-- translate this group to move the reflection in and out of sight -->
						  <circle
							cx="0"
							cy="16.5"
							r="8"
							fill="url(#lens)"
							opacity="0.1">
						  </circle>
						</g>
					  </g>
		
					  <!-- smaller circle for the smaller lens -->
					  <circle
						cx="17"
						cy="24"
						r="3"
						stroke="none"
						fill="#254256">
					  </circle>
					</g>
				  </g>
				</g>
			  </g>
			</g>
		  </g>
		
		  <!-- group describing the dashes above bb-8 -->
		  <g
			fill="none"
			stroke="#254256"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			transform="translate(102 77)"><!-- translate at the top of the robot when leaning toward the left -->
			<g>
			  <!-- animate the dashes like the larger counterpart -->
			  <use
				class="dash"
				href="#dash--small"
				style="animation-delay: -0.56s">
			  </use>
			  <g transform="translate(28 47)">
				<use
				  class="dash"
				  href="#dash--small"
				  style="animation-delay: -0.4s">
				</use>
				<g transform="translate(5 5)">
				  <use
					class="dash"
					href="#dash--small"
					style="animation-delay: -0.34s">
				  </use>
				  <g transform="translate(13 0)">
					<use
					  class="dash"
					  stroke-dasharray="3 5"
					  href="#dash--small"
					  style="animation-delay: -0.3s">
					</use>
				  </g>
				</g>
			  </g>
			</g>
		  </g>
		</svg>
		
		`;
	cssCarga = `

	#customLoadingScreenDiv {	
	  min-height: 100vh;
	  background: orange;
	  display: flex;
	  align-items: center;
	}
	
	.container {
	  --dim: 150px;
	  --degree: 0deg;
	  --radius: calc(var(--dim) / 2 * 0.5);
	  
	  position: relative;
	  left: 50%;
	  top: -25%;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.circle {
	  height: var(--dim);
	  width: var(--dim);
	  border-radius: calc(var(--dim) / 2);
	  background-color: red;
	  opacity: 0.25;
	  
	  position: absolute;
	  animation: anim 2s ease-in-out;
	  animation-iteration-count:infinite;
	}
	
	@keyframes anim { 
	  0%, 100% { transform: translate(0, 0);}
	  50% { transform: 
		translate(
		  calc(cos(var(--degree)) * var(--radius)),
		  calc(sin(var(--degree)) * var(--radius))
		);
	  }
	}
	
	.container .circle:nth-child(1) {
	  --degree: 0deg;
	}
	.container .circle:nth-child(2) {
	  --degree: 45deg;
	}
	.container .circle:nth-child(3) {
	  --degree: 90deg;
	}
	.container .circle:nth-child(4) {
	  --degree: 135deg;
	}
	.container .circle:nth-child(5) {
	  --degree: 180deg;
	}
	.container .circle:nth-child(6) {
	  --degree: 225deg;
	}
	.container .circle:nth-child(7) {
	  --degree: 270deg;
	}
	.container .circle:nth-child(8) {
	  --degree: 315deg;
	}
	
	.text {
	  font-family: 'Poppins', sans-serif;
	  font-size: 16px;
	  font-weight:700;
	  color: white;
	  z-index: 10;
	  text-transform: uppercase;
	}
	
	.text span:nth-child(1) {
	  animation: dots-animation1 2s;
	  animation-iteration-count: infinite;
	}
	.text span:nth-child(2) {
	  animation: dots-animation2 2s;
	  animation-iteration-count: infinite;
	}
	.text span:nth-child(3) {
	  animation: dots-animation3 2s;
	  animation-iteration-count: infinite;
	}

	
	/* animate bb-8 to rotate and translate horizontally
	! the group makes it possible to transform the element from the bottom center
	*/
	.bb8-base {
	  animation: dash 0.8s infinite alternate cubic-bezier(0.645, 0.045, 0.55, 1);
	}
	@keyframes dash {
	  to {
		transform: translate(20px) rotate(40deg); /* starting values 0 translation -40 rotation */
	  }
	}
	
	/* animate the body of bb-8 to rotate
	! the rotation occurs from the center of the body
	*/
	.bb8-center {
	  animation: rotate 0.8s infinite linear;
	}
	@keyframes rotate {
	  to {
		transform: rotate(-360deg);
	  }
	}
	
	/* animate the ground to translate horizontally
	! the translation continuously occurs from side to side
	*/
	.ground {
	  animation: translate 0.8s -0.2s infinite linear;
	}
	@keyframes translate {
	  to {
		transform: translateX(100%);
	  }
	}
	
	/* animate the dashes and particles to translate horizontally
	double the duration, but same velocity to show the elements only as the droid leans left 
	*/
	.dash, .particle {
	  animation: translateDashesParticles 1.6s infinite linear;
	}
	@keyframes translateDashesParticles {
	  50%,
	  100% {
		transform: translateX(-100%);
	  }
	}
	
	/* animate the reflection on the droid's lens */
	.reflection {
	  animation: translateReflection 0.8s infinite linear;
	}
	@keyframes translateReflection {
	  0%,
	  25% {
		transform: translateX(20px);
	  }
	  75%,
	  100% {
		transform: translateX(-20px);
	  }
	}
	`;
}

function formula1(){
	htmlCarga = `

		<div class="container">
		  <div id="contador" class="text">0%
		  </div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		  <div class="circle"></div>
		</div>
  		<!-- svg describing the loader made up of dashes and the race car-->
		<svg viewBox="0 0 178 40" width="100%" height="100%">
			<!-- dash included behind the car
			! be sure to delay the animation of the path after the dashes on the right side of the car
			-->
			<path
				class="air"
				d="M 46 16.5 h -20 a 8 8 0 0 1 0 -16"
				fill="none"
				stroke="#E85725"
				stroke-width="1"
				stroke-linejoin="round"
				stroke-linecap="round">
			</path>
		
			<!-- wrap the svg describing the car in a group
			this to translate the car horizontally within the wrapping svg
			-->
			<g id="car">
				<!-- svg describing the race car in a container 118 wide and 28.125 tall
				.125 due to the 2.25 width of the stroke
		
				position in the bottom center of the wrapping svg
				-->
				<svg viewBox="0 0 118 28.125" x="30" y="11.725" width="118" height="28.125">
					<defs>
						<!-- circle repeated for the wheel -->
						<circle
							id="circle"
							cx="0"
							cy="0"
							r="1">
						</circle>
						<!-- wheel
						three overlapping circles describing the parts of the wheel
						in between the circles add path elements to detail the graphic
						-->
						<g id="wheel">
							<use href="#circle" fill="#1E191A" transform="scale(10)"></use>
							<use href="#circle" fill="#fff" transform="scale(5)"></use>
							<!-- inner shadow -->
							<path
								fill="#1E191A"
								stroke="#1E191A"
								stroke-width="0.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								opacity="0.2"
								stroke-dashoffset="0"
								d="M -3.5 0 a 4 4 0 0 1 7 0 a 3.5 3.5 0 0 0 -7 0">
							</path>
							<use href="#circle" fill="#1E191A" transform="scale(1.5)"></use>
							<!-- yellow stripe
							include stroke-dasharray values totalling the circumference of the circle
							this to use the dash-offset property and have the stripe rotate around the center while keeping its shape
							! explicitly set the stroke-dashoffset property to 0 for the other path elements (in this way the stroke-dashoffset attribute added through the <use> element affects only this path)
							-->
							<path
								fill="none"
								stroke="#F9B35C"
								stroke-width="0.75"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-dasharray="20 14 8 5"
								d="M 0 -7.5 a 7.5 7.5 0 0 1 0 15 a 7.5 7.5 0 0 1 0 -15">
							</path>
							<!-- outer glow (from a hypothetical light source) -->
							<path
								fill="none"
								stroke="#fff"
								stroke-width="1"
								stroke-linecap="round"
								stroke-linejoin="round"
								opacity="0.1"
								stroke-dashoffset="0"
								d="M -6.5 -6.25 a 10 10 0 0 1 13 0 a 9 9 0 0 0 -13 0">
							</path>
						</g>
					</defs>
					<!-- group describing the pilot's helmet
					translate in the middle of the cockpit
					-->
					<g transform="translate(51.5 11.125)">
						<path
							stroke-width="2"
							stroke="#1E191A"
							fill="#EF3F33"
							d="M 0 0 v -2 a 4.5 4.5 0 0 1 9 0 v 2">
						</path>
						<rect
							fill="#1E191A"
							x="3.25"
							y="-3"
							width="5"
							height="3">
						</rect>
					</g>
		
					<!-- group describing the car -->
					<g transform="translate(10 24.125)">
						<!-- shadow below the car
						! change the transform-origin of the shadow to animate it from the top center
						the idea is to skew the shadow as the car moves
						-->
						<g transform="translate(59 0)">
							<path
								id="shadow"
								opacity="0.7"
								fill="#1E191A"
								d="M -64 0 l -4 4 h 9 l 8 -1.5 h 100 l -3.5 -2.5">
							</path>
						</g>
						<!-- path describing the frame of the car
						! do not add a stroke at the bottom of the frame
						additional lines are overlapped to detail the belly of the vehicle
						-->
						<path
							fill="#fff"
							stroke="#1E191A"
							stroke-width="2.25"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M 0 0 v -10 l 35 -13 v 5 l 4 0.5 l 0.5 4.5 h 35.5 l 30 13">
						</path>
		
						<!-- wings -->
						<g
							fill="#fff"
							stroke="#1E191A"
							stroke-width="2.25"
							stroke-linecap="round"
							stroke-linejoin="round">
							<path
								d="M -6 0 v -22 h 10 z">
							</path>
							<path
								d="M 105 0 h -3 l -12 -5.2 v 6.2 h 12">
							</path>
						</g>
		
						<!-- grey areas to create details around the car's dashes -->
						<g
							fill="#949699"
							opacity="0.7">
							<rect
								x="16"
								y="-6"
								width="55"
								height="6">
							</rect>
							<path
								d="M 24 -14 l 13 -1.85 v 1.85">
							</path>
						</g>
		
						<!-- dashes included sparingly on top of the frame -->
						<g
							fill="none"
							stroke="#1E191A"
							stroke-width="2.25"
							stroke-linecap="round"
							stroke-linejoin="round">
							<path
								stroke-dasharray="30 7 42"
								d="M 90 0 h -78">
							</path>
							<path
								d="M 39.5 -13 h -15">
							</path>
						</g>
		
						<!-- elements describing the side of the car -->
						<path
							fill="#fff"
							stroke="#1E191A"
							stroke-width="2.25"
							stroke-linejoin="round"
							d="M 48.125 -6 h -29 v 6 h 29"><!-- .125 to tuck the path behind the rectangle and avoid a pixel disconnect as the svg is scaled -->
						</path>
		
						<rect
							x="48"
							y="-7.125"
							width="6.125"
							height="7.125"
							fill="#1E191A">
						</rect>
		
						<!-- rear view mirror -->
						<g fill="#1E191A">
							<rect
								x="60"
								y="-15"
								width="1"
								height="6">
							</rect>
							<rect
								x="56.5"
								y="-17.5"
								width="6"
								height="2.5">
							</rect>
						</g>
					</g>
		
					<!-- group describing the wheels, positioned at the bottom of the graphic and at either end of the frame -->
					<g class="wheels" transform="translate(0 18.125)">
						<g transform="translate(10 0)">
							<use href="#wheel"></use>
						</g>
		
						<g transform="translate(87 0)">
							<!-- add an offset to rotate the yellow stripe around the center -->
							<use href="#wheel" stroke-dashoffset="-22"></use>
						</g>
					</g>
				</svg>
			</g>
		
			<!-- dashes included above and around the race car
			! include them in order from right to left
			this allows to rapidly assign an increasing delay in the script, to have the dashes animated in sequence
			-->
			<g
				fill="none"
				stroke-width="1"
				stroke-linejoin="round"
				stroke-linecap="round">
				<!-- right side -->
				<path
					class="air"
					stroke="#E85725"
					d="M 177.5 34 h -10 q -16 0 -32 -8">
				</path>
		
				<path
					class="air"
					stroke="#949699"
					d="M 167 28.5 c -18 -2 -22 -8 -37 -10.75">
				</path>
		
				<path
					class="air"
					stroke="#949699"
					d="M 153 20 q -4 -1.7 -8 -3">
				</path>
		
				<path
					class="air"
					stroke="#E85725"
					d="M 117 16.85 c -12 0 -12 16 -24 16 h -8"><!-- around (117 29.85) where the right wheel is centered -->
				</path>
		
				<!-- left side -->
				<path
					class="air"
					stroke="#949699"
					d="M 65 12 q -5 3 -12 3.8">
				</path>
		
				<path
					class="air"
					stroke="#949699"
					stroke-dasharray="9 10"
					d="M 30 13.5 h -2.5 q -5 0 -5 -5">
				</path>
		
				<path
					class="air"
					stroke="#949699"
					d="M 31 33 h -10">
				</path>
		
				<path
					class="air"
					stroke="#949699"
					d="M 29.5 23 h -12">
				</path>
				<path
					class="air"
					stroke="#949699"
					d="M 13.5 23 h -6">
				</path>
		
				<path
					class="air"
					stroke="#E85725"
					d="M 28 28 h -27.5">
				</path>
			</g>
		</svg>
		`;
	cssCarga = `

	#customLoadingScreenDiv {
	  min-height: 100vh;
	  background: orange;
	  /* center in the viewport */
	  display: grid;

	  align-content: center;
	}
	
	.container {
	  --dim: 150px;
	  --degree: 0deg;
	  --radius: calc(var(--dim) / 2 * 0.5);
	  
	  position: relative;
	
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.circle {
	  height: var(--dim);
	  width: var(--dim);
	  border-radius: calc(var(--dim) / 2);
	  background-color: red;
	  opacity: 0.25;
	  
	  position: absolute;
	  animation: anim 2s ease-in-out;
	  animation-iteration-count:infinite;
	}
	
	@keyframes anim { 
	  0%, 100% { transform: translate(0, 0);}
	  50% { transform: 
		translate(
		  calc(cos(var(--degree)) * var(--radius)),
		  calc(sin(var(--degree)) * var(--radius))
		);
	  }
	}
	
	.container .circle:nth-child(1) {
	  --degree: 0deg;
	}
	.container .circle:nth-child(2) {
	  --degree: 45deg;
	}
	.container .circle:nth-child(3) {
	  --degree: 90deg;
	}
	.container .circle:nth-child(4) {
	  --degree: 135deg;
	}
	.container .circle:nth-child(5) {
	  --degree: 180deg;
	}
	.container .circle:nth-child(6) {
	  --degree: 225deg;
	}
	.container .circle:nth-child(7) {
	  --degree: 270deg;
	}
	.container .circle:nth-child(8) {
	  --degree: 315deg;
	}
	
	.text {
	  font-family: 'Poppins', sans-serif;
	  font-size: 16px;
	  font-weight:700;
	  color: white;
	  z-index: 10;
	  text-transform: uppercase;
	}
	
	.text span:nth-child(1) {
	  animation: dots-animation1 2s;
	  animation-iteration-count: infinite;
	}
	.text span:nth-child(2) {
	  animation: dots-animation2 2s;
	  animation-iteration-count: infinite;
	}
	.text span:nth-child(3) {
	  animation: dots-animation3 2s;
	  animation-iteration-count: infinite;
	}
	
	@keyframes dots-animation1 {
	  0% { opacity: 0; }
	  25% { opacity: 0; }
	  26% { opacity: 1; }
	  100% { opacity: 1; }
	}
	
	@keyframes dots-animation2 {
	  0% { opacity: 0; }
	  50% { opacity: 0; }
	  51% { opacity: 1; }
	  100% { opacity: 1; }
	}
	
	@keyframes dots-animation3 {
	  0% { opacity: 0; }
	  75% { opacity: 0; }
	  76% { opacity: 1; }
	  100% { opacity: 1; }
	}
	
	/* on the svg element set up a default value for the --stroke-dash and --stroke-dash-negative attributes
	46 roughly being the length of the longest path.air
	*/
	body > svg {
	  width: 600px;
	  height: auto;
	  --stroke-dash: 46;
	  --stroke-dash-negative: -46;
	}
	/* animate the car to move slightly forwards and backwards */
	g#car {
	  transform: translateX(-3px);
	  animation: translate 2s ease-in-out infinite;
	}
	/* animate the shadow to skew  toward the left */
	path#shadow {
	  animation: skew 2s ease-in-out infinite;
	}
	/* animate the wheels to spin  clockwise*/
	g.wheels use {
	  animation: rotate 2s linear infinite;
	}
	/* animate the dashes of air to briefly show them and then hide them from view */
	path.air {
	  /* starting from the values described by the --stroke-dash property
	  ! the property is updated for each path in the script
	  */
	  stroke-dasharray: var(--stroke-dash);
	  stroke-dashoffset: var(--stroke-dash);
	  /* ! the delay of the animation is also set up in the script  */
	  animation: offset 2s linear infinite;
	  /* opacity to hide the obnoxious dots otherwise shown on firefox and edge */
	  opacity: 0;
	}
	
	/* keyframe animations
	! be sure to have the animations overlap as to show a realistic behavior
	- as the car moves right the wheels spin faster, the shadow skews left, the dashes of air appear in sequence
	- as the car moves left the wheels spin slower while the shadow returns to its resting place
	*/
	@keyframes translate {
	  50% {
		transform: translateX(3px);
	  }
	  100% {
		transform: translateX(-3px);
	  }
	}
	@keyframes skew {
	  50% {
		transform: skewX(-20deg);
	  }
	}
	@keyframes rotate {
	  50% {
		transform: rotate(4turn);
	  }
	  100% {
		transform: rotate(6turn);
	  }
	}
	
	/* beside animating the stroke-dashoffset property rapidly change the opacity to show the dashes and hide them when they are removed by changing the offset property
	otherwise the dashes would still be partially visible on firefox and edge (at least)
	*/
	@keyframes offset {
	  1% {
		opacity: 1;
	  }
	  15% {
		stroke-dashoffset: 0;
		opacity: 1;
	  }
	  24% {
		opacity: 1;
	  }
	  25% {
		opacity: 0;
		/* ! on chrome and firefox the calc() function allows to compute the negative value, but Edge seems to prefer having another variable instead */
		/* stroke-dashoffset: calc(var(--stroke-dash) * -1px); */
		stroke-dashoffset: var(--stroke-dash-negative);
	  }
	  100% {
		stroke-dashoffset: var(--stroke-dash-negative);
	  }
	}
	`;
}