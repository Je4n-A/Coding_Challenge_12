// Get the canvas and context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Variables to track the drawing state
let drawing = false;
let tool = 'line'; // Default tool
let color = '#000000'; // Color 
let starX, startY;

// Get the color input and clear button elements
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearCanvas');

// Function to start drawing
function startDrawing(e) {
    drawing = true;
    starX = e.offsetX;
    startY = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
};

// Function to draw on the canvas
function draw(e) {
    if (!drawing) return;
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas for dynamic drawing

    if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(starX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
    } else if (tool === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.strokeRect(starX, starY, width, height);
    } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - starX, 2) + Math.pow(currentY - startY, 2));
        ctx.beginPath();
        ctx.arc(starX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    };
};

// Function to stop drawing
function stopDrawing() {
    drawing = false;
    ctx.closePath();
};

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// Add event listeners for mouse events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Add event listener for color input
colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
});

// Add event listener for clear button
clearButton.addEventListener('click', clearCanvas);