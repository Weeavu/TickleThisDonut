var video = document.getElementById("vidd");

var speedSpan = document.getElementById("speed");
speedSpan.innerHTML = video.playbackRate.toPrecision(3);

var loop = false;

video.addEventListener('durationchange', function(){
	document.getElementById("totalTime").innerHTML = timeFormat(video.duration);
	document.getElementById("endSection").value = timeFormat(video.duration);
});

video.ontimeupdate = function() {
	document.getElementById("currTime").innerHTML = timeFormat(video.currentTime);
	if(loop){
		section();
	}
}

function timeFormat(seconds){
	var min = Math.floor(seconds / 60)
	var sec = Math.floor(seconds % 60)
	var minString, secString;
	if(min < 10) {
		minString = "0" + min.toString();
	} else {
		minString = min.toString();
	}

	if(sec < 10) {
		secString = "0" + sec.toString();
	} else {
		secString = sec.toString();
	}
	return minString + ":" + secString;
}

function playVid() {
	var status = document.getElementById("vidStat");
	if(video.paused) {
		video.play();
		status.className = "fa fa-pause";
	} else {
		video.pause();
		status.className = "fa fa-play";
	}
	
}

function flipVid() {
	video.classList.toggle('mirrored');
	document.getElementById('mirrorBtn').classList.toggle('mirrorBtn');
}

function changeSpeed(rate){
	video.playbackRate += rate;
	if(video.playbackRate >= 1) { 
	    speedSpan.innerHTML = video.playbackRate.toPrecision(3);
	} else {
	    speedSpan.innerHTML = video.playbackRate.toPrecision(2);
	}
}

function volChange(){
	var curVol = document.getElementById("vol").value;

	video.volume = curVol;
}

var start = document.getElementById("startSection");
var end = document.getElementById("endSection");
	
function section(){
	if(video.currentTime >= toSeconds(end)){
		video.currentTime = toSeconds(start);
	}
}

function loopBtn(){
	document.getElementById("loopBtn").classList.toggle('mirrorBtn');
	video.currentTime = toSeconds(start);
	playVid();
	if(loop){
		loop = false;
		start.disabled = false;
		end.disabled = false;
	} else {
		loop = true;
		start.disabled = true;
		end.disabled = true;
	}
	console.log(loop);
}

function toSeconds(time) {
	var parts = time.value.split(':');
	var start = +parts[0] * 60 + +parts[1];

	return start;
}

function changeWidth() {
	var width = document.getElementById("res");
	video.width = parseInt(width.value);
}

function changeTime(rate){
	video.currentTime += rate;
}

window.addEventListener('keydown', function(e) {
	switch (e.keyCode) {
		case 32:
			e.preventDefault();
	    	document.getElementById("vol").focus();
			document.getElementById("vol").blur();
			playVid();
			break;
		case 38:
			e.preventDefault();
			changeSpeed(.1);
			break;
		case 40:
			e.preventDefault();
			changeSpeed(-.1);
			break;
		case 37:
			e.preventDefault();
			changeTime(-5);
			break;
		case 39:
			e.preventDefault();
			changeTime(5);
			break;
		case 77:
			flipVid();
			break;
		default:
			// code
	}
});

function enableBtn(){
	var button = document.getElementById("subBtn");
	button.disabled = false;
}
