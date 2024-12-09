
const canvas = document.getElementById('artCanvas');
    const ctx = canvas.getContext('2d');
    let painting = false;
    let currentColor = '#6c63ff';  // Default color

    // Get tools
    const clearCanvasBtn = document.getElementById('clearCanvas');
    const colorPicker = document.getElementById('colorPicker');

    // Set up event listeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startPosition, { passive: false });
    canvas.addEventListener('touchend', endPosition, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });

    // Color picker change event
    colorPicker.addEventListener('input', (e) => {
        currentColor = e.target.value;  // Update current color
    });

    // Clear canvas functionality
    clearCanvasBtn.addEventListener('click', clearCanvas);

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function endPosition() {
        painting = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;

        let x, y;

        // Adjust for touch events (Mobile)
        if (e.type.includes('touch')) {
            const touch = e.touches[0];
            x = touch.clientX;
            y = touch.clientY;
        } else {
            x = e.clientX;
            y = e.clientY;
        }

        // Correct for canvas offset
        const rect = canvas.getBoundingClientRect();
        x -= rect.left;
        y -= rect.top;

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;  // Use the selected color

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);

        // Prevent default behavior on mobile to avoid scrolling
        if (e.preventDefault) e.preventDefault();
    }

    // Clear the canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Save the canvas as an image
    function saveCanvas() {
        const link = document.createElement('a');
        link.download = 'my-artwork.png';
        link.href = canvas.toDataURL();
        link.click();
    }