const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

const frameCount = 240;

const currentFrame = index => (
  frames/ezgif-frame-${index.toString().padStart(3, '0')}.png
);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const frame = {
  index: 0
};

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw first frame
images[0].onload = () => {
  ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

// Scroll animation
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  frame.index = frameIndex;
  requestAnimationFrame(render);
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[frame.index], 0, 0, canvas.width, canvas.height);
}

// Responsive resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});
