import { OneColor } from './renderingModules/OneColor';
import { CrossoverColor } from './renderingModules/CrossoverColor';
import { RainbowColor } from './renderingModules/RainbowColor';
import { Pixel } from './renderingModules/Pixel';
import { ColorModule } from './renderingModules/ColorModule';

const OneColorMode: OneColor = new OneColor();
const PixelMode: Pixel = new Pixel();
const RainbowColorMode: RainbowColor = new RainbowColor();
const CrossoverColorMode: CrossoverColor = new CrossoverColor();

const carusel: HTMLElement = document.getElementById('carusel');

let isRunning: boolean = false;
let escapestate: boolean = false;
let colormode: ColorModule = OneColorMode;
const clolorModes: ColorModule[] = [];
clolorModes.push(OneColorMode);
clolorModes.push(PixelMode);
clolorModes.push(RainbowColorMode);
clolorModes.push(CrossoverColorMode);

populateCarusel();

// get canvas element
const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canv');
// set height and width to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// grab the 2d context
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

// get accept for disclaimer
const button: HTMLButtonElement = <HTMLButtonElement> document.getElementById('accept');
button.addEventListener('click', clickEvent);

// get carusel menu for draw mode
carusel.addEventListener('mousedown', carouselClick);

// Draw loop
let startingTime: number;
let lastTime: number;
let totalElapsedTime: number;
let elapsedSinceLastLoop: number;
let runningtime: number = 0;
function loop(currentTime) {
  if (!startingTime) { 
    startingTime = currentTime;
  }
  if (!lastTime) { 
    lastTime = currentTime;
  }
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
    colormode.draw(ctx, runningtime);
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
  if (clolorModes.indexOf(colormode) > clolorModes.length - 2) {
    colormode = clolorModes[0];
  } else {
    colormode = clolorModes[clolorModes.indexOf(colormode) + 1];
  }
  const colorIndex = clolorModes.indexOf(colormode);
  // get only fist children
  for (let i = 0; i < unChildren.length; i++) {
    if (unChildren[i].nodeType === 1) {
      children.push(unChildren[i]);
    }
  }
  children[colorIndex].className += 'selected';
  if (clolorModes.indexOf(colormode) === 0) {
    children[clolorModes.length - 1].classList.remove('selected');
    children[clolorModes.length - 2].classList.remove('prev');
  } else if (clolorModes.indexOf(colormode) === 1) {
    children[colorIndex - 1].classList.remove('selected');
    children[colorIndex - 1].className += 'prev';
    children[clolorModes.length - 1].classList.remove('prev');
  } else {
    children[colorIndex - 1].classList.remove('selected');
    children[colorIndex - 1].className += 'prev';
    children[colorIndex - 2].classList.remove('prev');
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
    if (i === 0) {
      node.className += 'selected';
    }
    const textnode = document.createTextNode(clolorModes[i].name);
    node.appendChild(textnode);
    carusel.appendChild(node);
  }
}
