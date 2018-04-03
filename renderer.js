
setInterval(onTimerTick, 1); // 33 milliseconds = ~ 30 frames per sec
var isRunning = false;

var button = document.getElementById('accept');

button.addEventListener("click", clickEvent);

function onTimerTick() {
  if(isRunning){
    document.getElementById("body").style.background = getRandomColor();
  }
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clickEvent(){
  isRunning = true;


  var elem = document.getElementById('warning');
  elem.parentNode.removeChild(elem);
}
