let isRunning = false;
let escapestate = false;
let colormode = 1;

// get canvas element
const canvas = document.getElementById('canv');
// set height and width to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// grab the 2d context
const ctx = canvas.getContext('2d');

// get accept for disclaimer
const button = document.getElementById('accept');
button.addEventListener('click', clickEvent);

// get carusel menu for draw mode
const carusel = document.getElementById('carusel');
carusel.addEventListener('mousedown', carouselClick);
carusel.childNodes[1].className += 'selected';

// Draw loop
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

// get the loop to start
window.requestAnimationFrame(loop);

// drawing
function draw() {
  if (isRunning && !escapestate) {
    // decide what color mode to draw
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

// crossover style drawing
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
  // Update image
  ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}

// One color drawing mode
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
  // Update image
  ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}
// Rainbow color drawing mode
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
  // Update image
  ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
}
// Pixel color drawing mode
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

// click event for accept button
function clickEvent() {
  isRunning = true;

  const elem = document.getElementById('warning');
  elem.parentNode.removeChild(elem);

  const canv = document.getElementById('canv');
  canv.style.display = 'block';

  const esc = document.getElementById('escape');
  esc.style.display = 'block';
}
// carusel click event
function carouselClick() {
  const unChildren = carusel.childNodes;
  const children = [];
  // get only fist children
  for (let i = 0; i < unChildren.length; i++) {
    if (unChildren[i].nodeType === 1) {
      children.push(unChildren[i]);
    }
  }
  // find current selected mode
  let f = -1;
  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains('selected')) {
      f = i;
    }
  }
  // update buttons to have the right position etc
  if (f !== -1) {
    if (children[f + 1] != null) {
      children[f + 1].className += ' selected';
      colormode++;
    } else {
      children[0].className += ' selected';
      colormode = 1;
    }
    if (children[f] != null) {
      children[f].className += ' prev';
    }
    if (children[f - 1] != null) {
      children[f - 1].classList.remove('prev');
    } else {
      children[children.length - 1].classList.remove('prev');
    }
    children[f].classList.remove('selected');
  }
}
// escape listener
document.addEventListener('keydown', (event) => {
  if (event.code === 'Escape') {
    escapestate = !escapestate;

    // change visibility depending on escapestate
    if (escapestate) {
      document.getElementById('escape').className += 'active';
    } else {
      document.getElementById('escape').classList.remove('active');
    }
  }
});
