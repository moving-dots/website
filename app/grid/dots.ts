import Matter from "matter-js";

export const dots = (engine: Matter.Engine) => {
  setInterval(() => {
    let balls: Matter.Body[] = [];
    const ballRadius = 8; // radius of each ball
    const ballColors = [
      "#0444C1",
      "#FF4B4B",
      "#2DE32A",
      "#FFAD31",
      "#4B95DA",
      "#BC1D90",
      "#FDA24E",
      "#F5DF19",
      "#CB1E5D",
      "#B0D743",
      "#6FF2A4",
      "#3CD3E8",
    ];

    // Remove balls if there are too many
    if (balls.length > 100) {
      const ballToRemove = balls.shift();
      ballToRemove && Matter.World.remove(engine.world, ballToRemove);
    }

    let randomPosition =
      Math.random() * (window.innerWidth / 1.5) + window.innerWidth / 6;

    const ball = Matter.Bodies.circle(randomPosition, 0, ballRadius, {
      restitution: 0.9,
      render: {
        fillStyle: ballColors[Math.floor(Math.random() * ballColors.length)],
      },
    });
    balls.push(ball);
    Matter.World.add(engine.world, ball);
  }, 200);
};
