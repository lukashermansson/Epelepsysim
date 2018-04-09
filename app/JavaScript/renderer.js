const OneColor = require('./renderingModules/OneColor');

const OneColorMode = new OneColor();

const Pixel = require('./renderingModules/Pixel');

const PixelMode = new Pixel();

const RainbowColor = require('./renderingModules/RainbowColor');

const RainbowColorMode = new RainbowColor();

const CrossoverColor = require('./renderingModules/CrossoverColor');

const CrossoverColorMode = new CrossoverColor();
const carusel = document.getElementById('carusel');

let isRunning = false;
let escapestate = false;
let colormode = OneColorMode;
const clolorModes = [];
clolorModes.push(OneColorMode);
clolorModes.push(PixelMode);
clolorModes.push(RainbowColorMode);
clolorModes.push(CrossoverColorMode);

populateCarusel();

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
    colormode.draw(ctx);
  }
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
    if (f <= clolorModes.length - 1) {
      children[f + 1].className += ' selected';
      colormode = clolorModes[f + 1];
    } else {
      children[0].className += ' selected';
      colormode = clolorModes[0];
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

function populateCarusel() {
  for (let i = 0; i < clolorModes.length; i++) {
    const node = document.createElement('span');
    const textnode = document.createTextNode(clolorModes[i].name);
    node.appendChild(textnode);
    carusel.appendChild(node);
  }
}
