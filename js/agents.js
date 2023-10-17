import { randomRange, context } from "./sketch.js";

const root = document.querySelector(":root");

let color;
let backColor;

const sketchColors = () => {
  color = getComputedStyle(root).getPropertyValue("--color");
  backColor = getComputedStyle(root).getPropertyValue("--background-color");
};
sketchColors();

const speed = 0.7;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(
      randomRange(-speed, speed),
      randomRange(-speed, speed)
    );
    this.radius = randomRange(1, 6);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw() {
    context.fillStyle = backColor;
    context.lineWidth = 0.7;

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = color;
    context.stroke();

    context.restore();
  }
}

export { Agent, color, backColor, sketchColors };
