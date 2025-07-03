const gridSize = 32;
let isDrawing = false;
let currentColor = '#000000';
let savedCreations = [];

const gridContainer = document.getElementById('grid-container');
const colorPicker = document.getElementById('colorPicker');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const artDisplayContainer = document.getElementById('artDisplayContainer');

function createGrid(size) {
  gridContainer.innerHTML = '';
  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.style.backgroundColor = 'white';
    gridContainer.appendChild(pixel);
  }
}

gridContainer.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('pixel')) {
    isDrawing = true;
    e.target.style.backgroundColor = currentColor;
  }
});

gridContainer.addEventListener('mouseover', (e) => {
  if (isDrawing && e.target.classList.contains('pixel')) {
    e.target.style.backgroundColor = currentColor;
  }
});

document.addEventListener('mouseup', () => {
  isDrawing = false;
});

colorPicker.addEventListener('input', (e) => {
  currentColor = e.target.value;
});

clearBtn.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach(pixel => {
    pixel.style.backgroundColor = 'white';
  });
});

saveBtn.addEventListener('click', handleSave);

function handleSave() {
  const pixels = document.querySelectorAll('.pixel');
  const colors = Array.from(pixels).map(p =>
    getComputedStyle(p).backgroundColor
  );

  const hasDrawing = colors.some(color => {
    const [r, g, b] = parseRGB(color);
    return !(r === 255 && g === 255 && b === 255); // i.e., it's not white
  });

  if (!hasDrawing) {
    alert('Please draw something before saving!');
    return;
  }

  savedCreations.push(colors);
  renderArtDisplay();
}

function renderArtDisplay() {
  artDisplayContainer.innerHTML = '';

  if (savedCreations.length === 0) {
    artDisplayContainer.innerHTML = '<p>No art saved yet.</p>';
    return;
  }

  savedCreations.forEach((art) => {
    const miniGrid = document.createElement('div');
    miniGrid.classList.add('mini-grid-full'); // NEW CLASS for 32x32 preview

    for (let i = 0; i < gridSize * gridSize; i++) {
      const miniPixel = document.createElement('div');
      miniPixel.classList.add('mini-pixel-full');
      miniPixel.style.backgroundColor = art[i];
      miniGrid.appendChild(miniPixel);
    }

    artDisplayContainer.appendChild(miniGrid);
  });
}

function parseRGB(colorStr) {
  const ctx = document.createElement('canvas').getContext('2d');
  ctx.fillStyle = colorStr || 'white';
  const computed = ctx.fillStyle;
  const match = computed.match(/\d+/g);
  return match ? match.map(Number) : [255, 255, 255];
}

// Initialize on page load
createGrid(gridSize);