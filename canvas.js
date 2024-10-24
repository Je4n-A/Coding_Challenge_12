// Get the canvas and context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Variables to track the drawing state
let drawing = false;
let tool = 'line'; // Default tool
let starX, startY;

// Function to start drawing
function startDrawing(e) {
    drawing = true;
    startX = e.offsetX;
    startX = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

// Function to draw on the canvas
function draw(e) {
    if (!drawing) return;
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for dynamic drawing

    if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
    } else if (tool === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.strokeRect(startX, startY, width, height);
    } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    };
};

// Function to stop drawing
function stopDrawing() {
    drawing = false;
    ctx.closePath();
};

// Add event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);