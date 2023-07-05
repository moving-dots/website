import Matter from "matter-js";

export const ballColors = [
  "#FFCB30",
  "#F9822C",
  "#18CBDB",
  "#16E7BB",
  "#0382F3",
  "#043BC9",
  "#F42222",
  "#FF9CE3",
];

export const dots = (engine: Matter.Engine) => {
  const isMobile = window.innerWidth < 480;

  setInterval(() => {
    let balls: Matter.Body[] = [];
    const ballRadius = isMobile ? 14 : 18; // radius of each ball

    // Remove balls if there are too many
    if (balls.length > 10) {
      const ballToRemove = balls.shift();
      ballToRemove && Matter.World.remove(engine.world, ballToRemove);
    }

    let randomPosition =
      Math.random() * (window.innerWidth / 1.5) + window.innerWidth / 6;

    const ball = Matter.Bodies.circle(randomPosition, 0, ballRadius, {
      restitution: 0.3,
      render: {
        fillStyle: ballColors[Math.floor(Math.random() * ballColors.length)],
      },
    });

    balls.push(ball);

    Matter.World.add(engine.world, ball);
  }, 280);
};
