const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const frameCount = 240;
const images = [];
let imagesLoaded = 0;

// Build image path (JPG)
function getFrame(index) {
    return `frames/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = getFrame(i);
    images.push(img);

    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
            drawFrame(0);
        }
    };
}

// Draw frame
function drawFrame(index) {
    const img = images[index];
    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    ctx.drawImage(
        img,
        x,
        y,
        img.width * scale,
        img.height * scale
    );
}

// Scroll control
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(() => drawFrame(frameIndex));
});
