
var canvas = document.getElementById('matrixCanvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var letters = 'ABCDEFGόμικρονHIJKLM명조체NOP漢文QRSTδέλταUVXYZ0123456789漢字مزاج مرن';
letters = letters.split('');

var fontSize = 10;
var columns = canvas.width / fontSize;
var drops = [];
for (var i = 0; i < columns; i++) {
    drops[i] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px arial';

    for (var i = 0; i < drops.length; i++) {
        var text;
if (Math.random() > 0,1) { // 1% de chance d'afficher "Elias"
    text = "ACAB";
} 
else {
    text = letters[Math.floor(Math.random() * letters.length)];
}
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(draw, 33);

