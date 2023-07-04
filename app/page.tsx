"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { createGrid } from "./grid/grid";
import { dots } from "./grid/dots";
import { setSizes } from "./grid/setSizes";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    let engine = Matter.Engine.create({});

    let render = Matter.Render.create({
      element: boxRef.current || undefined,
      engine: engine,
      canvas: canvasRef.current || undefined,
      options: {
        background: "transparent",
        wireframes: false,
      },
    });

    Matter.Runner.run(engine);
    Matter.Render.run(render);

    // Set Canvas size + create grid + falling dots
    setSizes(render);
    createGrid(engine);
    dots(engine);

    const resizeHandler = () => {
      // Clear the world
      Matter.World.clear(engine.world, false);

      // Reset world values
      setSizes(render);
      createGrid(engine);
    };

    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <main className="flex h-full flex-col min-w-full pos relative">
      <div className="absolute top-4 left-4 md:top-10 md:left-16">
        <h1 className="font-semibold text-3xl md:text-title text-black">
          Moving Dots
        </h1>
      </div>
      <div className="absolute top-[52px] left-4 md:top-[96px] md:left-16 ">
        <h2 className="font-semibold text-3xl max-w-[300px] md:max-w-none md:text-title text-gray-300">
          We make interfaces for the web
        </h2>
      </div>
      <div ref={boxRef} className="w-full h-full">
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-[44px] md:right-16">
        <h2
          className="font-semibold text-3xl md:text-title text-black cursor-pointer"
          onClick={() => router.push("/contact")}
        >
          Work with us
        </h2>
      </div>
    </main>
  );
}
