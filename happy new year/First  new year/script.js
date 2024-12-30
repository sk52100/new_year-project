// Fireworks effect
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.velocityX = Math.random() * 4 - 2;
        this.velocityY = Math.random() * 4 - 2;
        this.alpha = 1;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

let fireworks = [];
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();

        if (firework.alpha <= 0) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
    for (let i = 0; i < 10; i++) {
        fireworks.push(new Firework(e.clientX, e.clientY));
    }
});

// Interactive message
const messageElement = document.getElementById('message');
document.getElementById('changeMessage').addEventListener('click', () => {
    messageElement.textContent = "Make this year unforgettable!";
});

// Start fireworks animation
animate();
