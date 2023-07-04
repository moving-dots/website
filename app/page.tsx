"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { createGrid } from "./grid/grid";
import { dots } from "./grid/dots";
import { setSizes } from "./grid/setSizes";
import { Menu } from "./components/menu";
import { AnimatePresence } from "framer-motion";

export default function Home() {
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
        // How can I make this canvas 100% width and height?
        background: "transparent",
        wireframes: false,
      },
    });

    Matter.Runner.run(engine);
    Matter.Render.run(render);

    // Set Canvas size + create grid + falling balls
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
      <AnimatePresence>
        {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      </AnimatePresence>
      <div className="absolute top-4 left-4  md:top-10 md:left-16">
        <h1 className="font-semibold text-3xl md:text-title text-black">
          Moving Dots
        </h1>
      </div>
      <div className="absolute top-[52px] left-4 md:top-[96px] md:left-16 ">
        <h2 className="font-semibold text-3xl max-w-[300px] md:text-title text-gray-300">
          We make interfaces for the web
        </h2>
      </div>
      <div ref={boxRef} className="w-full h-full">
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-[44px] md:right-16">
        <h2
          className="font-semibold text-3xl md:text-title text-black cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        >
          Work with us
        </h2>
      </div>
    </main>
  );
}
