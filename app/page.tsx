"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { createGrid } from "./grid/grid";
import { dots } from "./grid/dots";
import { setSizes } from "./grid/setSizes";
import { useRouter } from "next/navigation";
import { Menu } from "./components/menu";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const text1Ref = useRef<HTMLDivElement | null>(null);
  const text2Ref = useRef<HTMLDivElement | null>(null);
  const text3Ref = useRef<HTMLDivElement | null>(null);

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

    // Find the size of the texts
    const text1Size = {
      x: text1Ref.current?.getBoundingClientRect()?.x || 0,
      y: text1Ref.current?.getBoundingClientRect()?.y || 0,
      width: text1Ref.current?.getBoundingClientRect()?.width || 0,
      height: text1Ref.current?.getBoundingClientRect()?.height || 0,
    };
    const text2Size = {
      x: text2Ref.current?.getBoundingClientRect()?.x || 0,
      y: text2Ref.current?.getBoundingClientRect()?.y || 0,
      width: text2Ref.current?.getBoundingClientRect()?.width || 0,
      height: text2Ref.current?.getBoundingClientRect()?.height || 0,
    };
    const text3Size = {
      x: text3Ref.current?.getBoundingClientRect()?.x || 0,
      y: text3Ref.current?.getBoundingClientRect()?.y || 0,
      width: text3Ref.current?.getBoundingClientRect()?.width || 0,
      height: text3Ref.current?.getBoundingClientRect()?.height || 0,
    };
    const textSizes = [text1Size, text2Size, text3Size];

    // Set Canvas size + create grid + falling dots
    setSizes(render);
    createGrid(engine, textSizes);
    dots(engine);

    const resizeHandler = () => {
      const text1Size = {
        x: text1Ref.current?.getBoundingClientRect()?.x || 0,
        y: text1Ref.current?.getBoundingClientRect()?.y || 0,
        width: text1Ref.current?.getBoundingClientRect()?.width || 0,
        height: text1Ref.current?.getBoundingClientRect()?.height || 0,
      };
      const text2Size = {
        x: text2Ref.current?.getBoundingClientRect()?.x || 0,
        y: text2Ref.current?.getBoundingClientRect()?.y || 0,
        width: text2Ref.current?.getBoundingClientRect()?.width || 0,
        height: text2Ref.current?.getBoundingClientRect()?.height || 0,
      };
      const text3Size = {
        x: text3Ref.current?.getBoundingClientRect()?.x || 0,
        y: text3Ref.current?.getBoundingClientRect()?.y || 0,
        width: text3Ref.current?.getBoundingClientRect()?.width || 0,
        height: text3Ref.current?.getBoundingClientRect()?.height || 0,
      };
      const textSizes = [text1Size, text2Size, text3Size];

      // Clear the world
      Matter.World.clear(engine.world, false);

      // Reset world values
      setSizes(render);
      createGrid(engine, textSizes);
    };

    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <main className="flex h-full flex-col min-w-full pos relative">
      <AnimatePresence>
        {isMenuOpen && <Menu setIsMenuOpen={setIsMenuOpen} />}
      </AnimatePresence>
      <div ref={boxRef} className="w-full h-full">
        <canvas ref={canvasRef} />
      </div>
      <div
        ref={text1Ref}
        className="absolute top-6 left-4 md:top-10 md:left-16"
      >
        <h1 className="font-semibold text-3xl md:text-title text-black">
          Moving Dots
        </h1>
      </div>
      <div
        ref={text2Ref}
        className="absolute top-[64px] left-4 md:top-[135px] md:left-16 pr-8"
      >
        <h2 className="font-semibold text-3xl max-w-[300px] leading-relaxed md:leading-normal md:max-w-none md:text-title text-gray-300">
          We design and build interfaces
        </h2>
      </div>
      <div
        ref={text3Ref}
        className="absolute bottom-6 right-6 md:bottom-[44px] md:right-16"
      >
        <button
          className="font-semibold text-3xl md:text-title text-black hover:text-hover transition-colors"
          onClick={() => setIsMenuOpen(true)}
        >
          Work with us
        </button>
      </div>
    </main>
  );
}
