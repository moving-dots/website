"use client";

import React, { useLayoutEffect, useRef } from "react";
import Matter from "matter-js";

export default function Home() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    let engine = Matter.Engine.create({});

    let render = Matter.Render.create({
      element: boxRef.current || undefined,
      engine: engine,
      canvas: canvasRef.current || undefined,
      options: {
        // How can I make this canvas 100% width and height?
        background: "red",
        wireframes: false,
      },
    });

    const distance = 40; // distance between dots
    const dotRadius = 4; // radius of each dot
    const margin = 64 + dotRadius / 2; // margin around the canvas

    let balls: Matter.Body[] = [];
    const ballRadius = 10; // radius of each ball
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

    Matter.Runner.run(engine);
    Matter.Render.run(render);

    const resizeHandler = () => {
      render.bounds.max.x = window.innerWidth;
      render.bounds.max.y = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;

      // Removing everything and then adding it again doesn't feel like a great way to handle resize
      // Find a better way to remove while resizing
      // for (let i = 0; i < engine.world.bodies.length; i++) {
      //   const body = engine.world.bodies[i];
      //   console.log(body.label);
      //   if (body.label === "Circle Body") {
      //     Matter.World.remove(engine.world, body);
      //   }
      // }

      const gridWidth = window.innerWidth - margin * 2; // width of the grid
      const gridHeight = window.innerHeight - margin * 2; // height of the grid

      let numDotsX = Math.floor(gridWidth / distance);
      let numDotsY = Math.floor(gridHeight / distance);

      const fakeGrid = Matter.Bodies.rectangle(
        gridWidth / 2 + margin,
        gridHeight / 2 + margin,
        gridWidth,
        gridHeight,
        {
          isStatic: true,
          render: {
            opacity: 0.6,
            fillStyle: "blue",
          },
        }
      );

      Matter.World.add(engine.world, fakeGrid);

      // Create background grid of dots
      for (let y = 0; y < numDotsY + 1; y++) {
        const numDotsXModulo = y % 2 ? numDotsX : numDotsX + 1;

        for (let x = 0; x < numDotsXModulo; x++) {
          let xPos = x === 0 ? margin : x * (gridWidth / numDotsX) + margin;
          if (y % 2) xPos += distance / 2;

          const yPos = y === 0 ? margin : y * (gridHeight / numDotsY) + margin;

          const dot = Matter.Bodies.circle(
            Math.ceil(xPos),
            Math.ceil(yPos),
            dotRadius,
            {
              isStatic: true,
              render: {
                fillStyle: "#E2E2E2",
              },
            }
          );

          Matter.World.add(engine.world, dot);
        }
      }

      // Not sure about this but it seems to work
      for (let i = 0; i < balls.length; i++) {
        const ball = balls[i];
        const newX =
          ball.position.x * (window.innerWidth / render.options.width);
        const newY =
          ball.position.y * (window.innerHeight / render.options.height);
        Matter.Body.setPosition(ball, { x: newX, y: newY });
      }
    };

    // Annoyingly we need to call this at the beginning as well as on resize
    resizeHandler();

    window.addEventListener("resize", resizeHandler);

    // Generate new balls
    setInterval(() => {
      // Remove balls if there are too many
      if (balls.length > 100) {
        const ballToRemove = balls.shift();
        ballToRemove && Matter.World.remove(engine.world, ballToRemove);
      }

      const ball = Matter.Bodies.circle(
        Math.random() * window.innerWidth,
        0,
        ballRadius,
        {
          restitution: 0.9,
          render: {
            fillStyle:
              ballColors[Math.floor(Math.random() * ballColors.length)],
          },
        }
      );
      balls.push(ball);
      Matter.World.add(engine.world, ball);
    }, 200);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col min-w-full pos relative">
      <div className="absolute top-0 left-0 bg-white">
        <h1>Moving Dots</h1>
        <div>We make interfaces</div>
      </div>

      <div ref={boxRef} style={{ width: "100%", height: "100%" }}>
        <canvas ref={canvasRef} />
      </div>

      <div className="absolute bottom-0 right-0 bg-white">
        <a href="mailto">Work with us</a>
      </div>
    </main>
  );
}
