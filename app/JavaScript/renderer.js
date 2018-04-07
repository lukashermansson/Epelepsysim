
let isRunning = false;
let escapestate = false;
let colormode = 1;

const canvas = document.getElementById('canv');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.imageSmothingEnabled = false;
const button = document.getElementById('accept');

button.addEventListener('click', clickEvent);

const box = document.getElementById('box');

box.addEventListener('change', boxlistener);

let startingTime;
let lastTime;
let totalElapsedTime;
let elapsedSinceLastLoop;
let runningtime = 0;
function loop(currentTime) {
  if (!startingTime) { startingTime = currentTime; }
  if (!lastTime) { lastTime = currentTime; }
  elapsedSinceLastLoop = (currentTime - lastTime);
  totalElapsedTime = (currentTime - startingTime);
  lastTime = currentTime;

  if (!escapestate) {
    runningtime += elapsedSinceLastLoop;
  }
  draw();

  window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);

function draw() {
  if (isRunning && !escapestate) {
    switch (colormode) {
      case 1:
        drawOneColor();
        break;
      case 2:
        drawPixelColor();
        break;
      case 3:
        drawRainbowColor();
        break;
      case 4:
        drawCrosserColor();
        break;
      default:
        break;
    }
  }
}
function drawCrosserColor() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; ++y) {
    for (let x = 0; x < canvas.width; ++x) {
      let index = ((y * canvas.width) + x) * 4;

      imageData.data[index] = (y * runningtime + runningtime) % 255; // red
      imageData.data[++index] = (y / x / runningtime + runningtime) % 255; // green
      imageData.data[++index] = (y * x * runningtime) % 255; // blue
    }
  }
  ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}


function drawOneColor() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}

function drawRainbowColor() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; ++y) {
    for (let x = 0; x < canvas.width; ++x) {
      let index = ((y * canvas.width) + x) * 4;

      imageData.data[index] = 100; // red
      imageData.data[++index] = (y / x * runningtime + runningtime) % 255; // green
      imageData.data[++index] = (y * x * runningtime + runningtime) % 255; // blue
    }
  }
  ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}

function drawPixelColor() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}


function clickEvent() {
  isRunning = true;

  const elem = document.getElementById('warning');
  const canv = document.getElementById('canv');
  const esc = document.getElementById('escape');
  esc.style.display = 'block';
  canv.style.display = 'block';
  elem.parentNode.removeChild(elem);
}
function boxlistener() {
  const select = document.getElementById('box');
  switch (select.options[select.selectedIndex].value) {
    case 'FullColor':
      colormode = 1;
      break;
    case 'pixel':
      colormode = 2;
      break;
    case 'Rainbow':
      colormode = 3;
      break;
    case 'Crosser':
      colormode = 4;
      break;
    default:
      colormode = 0;
      break;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    escapestate = !escapestate;
  }

  if (escapestate) {
    document.getElementById('escape').className += 'active';
  } else {
    document.getElementById('escape').classList.remove('active');
  }
});
