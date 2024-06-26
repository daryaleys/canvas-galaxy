import "./style.css";

const canvas = document.querySelector("canvas"),
  ctx = canvas?.getContext("2d");
let winWidth = 0,
  winHeight = 0;

const setSize = () => {
  if (canvas && ctx) {
    winHeight = window.innerHeight;
    canvas.height = winHeight;
    winWidth = document.documentElement.clientWidth;
    canvas.width = winWidth;

    init();
  }
};

window.addEventListener("DOMContentLoaded", setSize);
window.addEventListener("resize", setSize);

const mouse = {
  x: winWidth / 2,
  y: winHeight / 2,
};

canvas?.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

let mouseDown = false;
canvas?.addEventListener("mousedown", () => {
  mouseDown = true;
});
canvas?.addEventListener("mouseup", () => {
  mouseDown = false;
});

const colorArray = ["white", "iightblue", "pink", "lightyellow"];

type Particle = {
  x: number;
  y: number;
  radius: number;
  color: string;
  draw(): void;
  update(): void;
};

const createParticle = (
  x: number,
  y: number,
  radius: number,
  color: string
): Particle => ({
  x: x,
  y: y,
  radius: radius,
  color: color,
  draw() {
    if (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  },
  update() {
    this.draw();
  },
});

let particles: Particle[] = [];
function init() {
  particles = [];

  for (let i = 0; i < 400; i++) {
    if (canvas && ctx) {
      const canvasWidth = canvas.width + 1000;
      const canvasHeight = canvas.height + 1000;

      const x = (Math.random() - 0.5) * canvasWidth;
      const y = (Math.random() - 0.5) * canvasHeight;
      const radius = Math.random() * 5;
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      particles.push(createParticle(x, y, radius, color));
    }
  }

  console.log(particles);
}

let radians = 0;
let alpha = 1;
function animate() {
  if (canvas && ctx) {
    requestAnimationFrame(animate);

    ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    particles.forEach((particle) => {
      particle.update();
    });
    ctx.restore();

    radians += 0.001;

    if (mouseDown && alpha >= 0.05) {
      alpha -= 0.01;
    } else if (!mouseDown && alpha < 1) {
      alpha += 0.01;
    }
  }
}

init();
animate();
