import { Agent, backColor, color } from "./agents.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let { width, height } = canvasSketch();
let agents = [];

window.addEventListener("resize", sketch, false);

const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

function canvasSketch() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  let width = canvas.width;
  let height = canvas.height;

  //   sketch(width, height);
  return { width, height };
}

const createAgents = () => {
  const numberOfAgents = (width * 2) / 10;
  for (let i = 0; i < numberOfAgents; i++) {
    const x = randomRange(0, width);
    const y = randomRange(0, height);

    agents.push(new Agent(x, y));
  }
};

createAgents();

function sketch() {
  // clear canvas with full white rectangle
  context.save();
  context.fillStyle = backColor;

  context.beginPath();
  context.rect(0, 0, width, height);
  context.fill();

  context.restore();

  // resize validation
  if (window.innerWidth != width || window.innerHeight != height) {
    console.log("resize");
    width = window.innerWidth;
    height = window.innerHeight;
    agents = [];
    canvasSketch();
    createAgents();
  }

  for (let i = 0; i < agents.length; i++) {
    const agent = agents[i];
    for (let j = i + 1; j < agents.length; j++) {
      const other = agents[j];
      const distBetween = 200;

      const dist = agent.pos.getDistance(other.pos);

      if (dist > distBetween) continue;

      context.save();

      context.lineWidth = mapRange(dist, 0, distBetween, 0.7, 0);
      context.beginPath();
      context.moveTo(agent.pos.x, agent.pos.y);
      context.lineTo(other.pos.x, other.pos.y);
      context.strokeStyle = color;
      context.stroke();

      context.restore();
    }
  }

  // animation
  agents.forEach((agent) => {
    agent.update();
    if (agent.pos.x <= 0 || agent.pos.x >= width) {
      agent.vel.x *= -1;
    }
    if (agent.pos.y <= 0 || agent.pos.y >= height) {
      agent.vel.y *= -1;
    }
    agent.draw();
  });
}

const animate = () => {
  sketch();
  requestAnimationFrame(animate);
};

animate();

export { randomRange, context };
