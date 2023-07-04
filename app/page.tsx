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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <main className="flex min-h-screen flex-col min-w-full pos relative">
      <div className="absolute top-[40px] left-[64px]">
        <h1 className="font-semibold text-title text-black">Moving Dots</h1>
      </div>
      <div className="absolute top-[96px] left-[64px] ">
        <h2 className="font-semibold text-title text-gray-300">
          We make interfaces for the web
        </h2>
      </div>
      <div ref={boxRef} className="w-full h-full">
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute bottom-[44px] right-[64px]">
        <h2
          className="font-semibold text-title text-black cursor-pointer"
          onClick={() => router.push("/contact")}
        >
          Work with us
        </h2>
      </div>
    </main>
  );
}
