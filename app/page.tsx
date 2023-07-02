"use client";

import React, { useLayoutEffect, useRef } from "react";
import Matter from "matter-js";

export default function Home() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    let Engine = Matter.Engine;
    let Render = Matter.Render;
    let World = Matter.World;
    let Bodies = Matter.Bodies;
    let Runner = Matter.Runner;

    let engine = Engine.create({});

    let render = Render.create({
      element: boxRef.current || undefined,
      engine: engine,
      canvas: canvasRef.current || undefined,
      options: {
        // How can I make this canvas 100% width and height?
        background: "transparent",
        wireframes: false,
      },
    });

    const distance = 38; // distance between dots
    const radius = 4; // radius of each dot
    let numDotsX = Math.ceil(window.innerWidth / distance);
    let numDotsY = Math.ceil(window.innerHeight / distance);

    const startX = 0; // starting x position
    const startY = 0; // starting y position

    for (let y = startY; y < numDotsY * distance; y += distance) {
      const startXOffset = y % (distance * 2) === 0 ? 0 : distance / 2;
      for (
        let x = startX + startXOffset;
        x < numDotsX * distance;
        x += distance
      ) {
        const dot = Bodies.circle(x, y, radius, {
          isStatic: true,
          render: {
            fillStyle: "#E2E2E2",
          },
        });
        World.add(engine.world, dot);
      }
    }

    const ballradius = 10; // radius of each ball
    const ballcolors = [
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
    let balls: Matter.Body[] = [];

    for (let y = startY; y < numDotsY * distance; y += distance) {
      const startXOffset = y % (distance * 2) === 0 ? 0 : distance / 2;
      for (
        let x = startX + startXOffset;
        x < numDotsX * distance;
        x += distance
      ) {
        const ball = Bodies.circle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          ballradius,
          {
            restitution: 0.9,
            render: {
              fillStyle:
                ballcolors[Math.floor(Math.random() * ballcolors.length)],
            },
          }
        );
        balls.push(ball);
      }
    }

    World.add(engine.world, balls);
    Runner.run(engine);
    Render.run(render);

    const resizeHandler = () => {
      console.log("resize");
      render.bounds.max.x = window.innerWidth;
      render.bounds.max.y = window.innerHeight;
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;

      numDotsX = Math.ceil(window.innerWidth / distance);
      numDotsY = Math.ceil(window.innerHeight / distance);

      // Removing everything and then adding it again doesn't feel like a great way to handle resize
      for (let i = 0; i < engine.world.bodies.length; i++) {
        const body = engine.world.bodies[i];
        if (body.label === "Circle Body") {
          World.remove(engine.world, body);
        }
      }

      for (let y = startY; y < numDotsY * distance; y += distance) {
        const startXOffset = y % (distance * 2) === 0 ? 0 : distance / 2;
        for (
          let x = startX + startXOffset;
          x < numDotsX * distance;
          x += distance
        ) {
          const dot = Bodies.circle(x, y, radius, {
            isStatic: true,
            render: {
              fillStyle: "#E2E2E2",
            },
          });
          World.add(engine.world, dot);
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
      if (balls.length > 10) {
        const ballToRemove = balls.shift();
        ballToRemove && World.remove(engine.world, ballToRemove);
      }
      const ball = Bodies.circle(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        ballradius,
        {
          restitution: 0.9,
          render: {
            fillStyle:
              ballcolors[Math.floor(Math.random() * ballcolors.length)],
          },
        }
      );
      balls.push(ball);
      World.add(engine.world, ball);
    }, 1000);

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
