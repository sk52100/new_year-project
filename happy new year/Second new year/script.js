// Countdown Timer
const countdownElement = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
};

const newYear = new Date("January 1, 2024 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = newYear - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    countdownElement.days.textContent = String(days).padStart(2, "0");
    countdownElement.hours.textContent = String(hours).padStart(2, "0");
    countdownElement.minutes.textContent = String(minutes).padStart(2, "0");
    countdownElement.seconds.textContent = String(seconds).padStart(2, "0");
}

setInterval(updateCountdown, 1000);

// Personalized Message and Fireworks
const nameInput = document.getElementById("nameInput");
const startButton = document.getElementById("startButton");
const personalMessage = document.getElementById("personalMessage");

startButton.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name) {
        personalMessage.textContent = `Happy New Year, ${name}! 🎉 May your year be filled with joy and success!`;
        startFireworks();
    } else {
        personalMessage.textContent = "Please enter your name!";
    }
});

// Fireworks Effect
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
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
function startFireworks() {
    setInterval(() => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        for (let i = 0; i < 10; i++) {
            fireworks.push(new Firework(x, y));
        }
    }, 300);

    function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.alpha <= 0) fireworks.splice(index, 1);
        });

        requestAnimationFrame(animate);
    }

    animate();
}
