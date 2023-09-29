jQuery(document).ready(equalImgWidth);
jQuery(document).resize(equalImgWidth);

var inputDown = ('ontouchstart' in document.documentElement)  ? 'touchstart' : 'mousedown';
var inputMove = ('ontouchmove' in document.documentElement)  ? 'touchmove' : 'mousemove';
var inputUp = ('ontouchend' in document.documentElement)  ? 'touchend' : 'mouseup';
var handleClicked = false;

var slidePercent = "";

function equalImgWidth() {
  var imgWidth = $("#image-compare-wrapper").width() +'px';
    console.log(imgWidth);
}

$("#image-compare-handle").on(inputDown, handleScaleUp);

$("#image-compare-divider").on(inputMove, function(event) {
  var relativeX = (event.pageX) ? event.pageX : event.touches[0].pageX;
  var containerOffset = $("#image-compare-divider").offset().left;
  var containerWidth = $("#image-compare-wrapper").width();

  slidePercent = (((relativeX - containerOffset)/containerWidth)*100)+"%";
  resizeBeforeImage();
});

function handleScaleUp(){
  handleClicked = true;
  $("#image-compare-handle").css("background", "rgb(120, 120, 120)");
  $("#image-compare-beforeImage").css("border-right", "0px");
}

$(window).on(inputUp, function(){
  handleScaleDown();
});

function handleScaleDown() {
  handleClicked = false;
  $("#image-compare-handle").css("background", "#76b900");
  $("#image-compare-beforeImage").css("border-right", "3px #76b900 solid");
}

function resizeBeforeImage(){
  if (handleClicked === true) {
    $("#image-compare-beforeImage").css("width", slidePercent);
    $("#image-compare-handle").css("left", slidePercent);
  }
}
