import Matter from "matter-js";

export const createGrid = (engine: Matter.Engine) => {
  const isMobile = window.innerWidth < 480; // check if mobile
  const distance = isMobile ? 48 : 56; // distance between dots
  const dotRadius = 3; // radius of each dot

  // margin around the canvas
  const marginDesktop = 64 + dotRadius / 2;
  const marginMobile = 32 + dotRadius / 2;
  const margin = isMobile ? marginMobile : marginDesktop;

  const gridWidth = window.innerWidth - margin * 2; // width of the grid
  const gridHeight = window.innerHeight - margin * 2; // height of the grid

  let numDotsX = Math.floor(gridWidth / distance);
  let numDotsY = Math.floor(gridHeight / distance);

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

  // Create fake grid to test position of the dots
  const whiteOverlay1 = Matter.Bodies.rectangle(186, 64, 256, 48, {
    isSensor: true,
    isStatic: true,
    render: {
      fillStyle: "#fff",
    },
  });

  const whiteOverlay2 = Matter.Bodies.rectangle(348, 122, 580, 48, {
    isSensor: true,
    isStatic: true,
    render: {
      fillStyle: "#fff",
    },
  });

  const whiteOverlay3 = Matter.Bodies.rectangle(
    gridWidth - 52,
    gridHeight + 62,
    264,
    48,
    {
      isSensor: true,
      isStatic: true,
      render: {
        fillStyle: "#fff",
      },
    }
  );

  Matter.World.add(engine.world, [whiteOverlay1, whiteOverlay2, whiteOverlay3]);
};
