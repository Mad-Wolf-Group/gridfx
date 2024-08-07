document.getElementById('imageUpload').addEventListener('change', function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const img = new Image();
        img.src = reader.result;
        img.id = "uploadedImage";
        document.getElementById('imagePreview').innerHTML = '';
        document.getElementById('imagePreview').appendChild(img);
    }
    reader.readAsDataURL(event.target.files[0]);
});

document.getElementById('positionButton').addEventListener('click', function() {
    // Implement image positioning logic here
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = document.getElementById('uploadedImage');
    const gridColor = document.getElementById('gridColor').value;
    const gridSpacing = parseInt(document.getElementById('gridSpacing').value);
    
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    context.strokeStyle = gridColor;
    context.lineWidth = 1;
    
    // Draw vertical grid lines
    for (let x = gridSpacing; x < canvas.width; x += gridSpacing) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
    }
    
    // Draw horizontal grid lines
    for (let y = gridSpacing; y < canvas.height; y += gridSpacing) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
    }

    const link = document.createElement('a');
    link.download = 'image_with_grid.png';
    link.href = canvas.toDataURL();
    link.click();
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('imageUpload').value = '';
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('gridColor').value = '#000000';
    document.getElementById('gridSpacing').value = '10';
});
