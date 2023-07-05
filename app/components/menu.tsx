import { FC, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { setSizes } from "../grid/setSizes";
import Matter from "matter-js";

interface MenuProps {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export const Menu: FC<MenuProps> = ({ setIsMenuOpen }) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    let engine = Matter.Engine.create();

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

    // Set Canvas size
    setSizes(render);

    var stack = Matter.Composites.stack(
      0,
      0,
      20,
      20,
      0,
      0,
      function (x: number, y: number) {
        return Matter.Bodies.circle(x, y, Matter.Common.random(10, 110), {
          restitution: 0.2,
          render: {
            fillStyle: "#fff",
          },
        });
      }
    );

    Matter.Composite.add(engine.world, stack);

    const floor = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 10,
      window.innerWidth,
      20,
      {
        isStatic: true,
        render: {
          fillStyle: "#fff",
        },
      }
    );

    Matter.World.add(engine.world, floor);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed flex md:justify-center md:items-center top-0 left-0 w-full h-full bg-gray-100 z-10"
    >
      <div
        className="group absolute z-20 bottom-6 right-6 md:bottom-14 md:right-14 w-14 h-14 cursor-pointer"
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute top-1/2 left-1/2 w-12 -translate-x-1/2 -translate-y-1/2 h-0.5 bg-gray-900 rounded rotate-45 group-hover:rotate-[40deg] transition-all" />
        <div className="absolute top-1/2 left-1/2 w-12 -translate-x-1/2 -translate-y-1/2 h-0.5 bg-gray-900 rounded -rotate-45 group-hover:-rotate-[40deg] transition-all" />
      </div>
      <div className="relative z-10 w-full flex flex-col gap-20 md:gap-0 md:flex-row max-w-[960px] mx-4 md:mx-6">
        <div className="md:flex-1 pt-8 md:pt-0">
          <h1 className="font-semibold text-gray-900 text-5xl md:text-7xl max-w-md">
            Let&apos;s work together.
          </h1>
        </div>
        <div className="mr-12">
          <div className="text-gray-400 text-xl mb-2">New business</div>
          <a
            className="text-text-gray-900 text-xl"
            href="mailto:hello@movingdots.xyz"
          >
            hello@movingdots.xyz
          </a>
          <div className="text-gray-400 mt-6 md:mt-12 mb-2 text-xl">
            Join us
          </div>
          <a
            className="text-text-gray-900 text-xl"
            href="mailto:careers@movingdots.xyz"
          >
            careers@movingdots.xyz
          </a>
        </div>
      </div>
      <div ref={boxRef} className="absolute top-0 left-0 w-full h-full">
        <canvas ref={canvasRef} />
      </div>
    </motion.div>
  );
};
