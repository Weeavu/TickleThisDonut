var video = document.getElementById("vidd");

var speedSpan = document.getElementById("speed");
speedSpan.innerHTML = video.playbackRate.toPrecision(3);

video.addEventListener('durationchange', function(){
	document.getElementById("totalTime").innerHTML = timeFormat(video.duration);
});

video.ontimeupdate = function() {
	document.getElementById("currTime").innerHTML = timeFormat(video.currentTime);
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
	video.style.cssText = "-moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); transform: scale(-1, 1); filter: FlipH;";
}

function changeSpeed(rate){
	video.playbackRate += rate;
	if(video.playbackRate >= 1) { 
	    speedSpan.innerHTML = video.playbackRate.toPrecision(3);
	} else {
	    speedSpan.innerHTML = video.playbackRate.toPrecision(2);
	}
}

function decSpeed(rate){
	video.playbackRate -= rate;
	
}

function volChange(){
	var curVol = document.getElementById("vol").value;

	video.volume = curVol;
}

function section(){
	var chorus = document.getElementById("startSection");
	video.currentTime = toSeconds(chorus);
	playVid();
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

window.addEventListener('keypress', function(e) {
	if(e.keyCode === 32){
	    document.getElementById("vol").focus();
	    document.getElementById("vol").blur();
		playVid();
	} 
});
