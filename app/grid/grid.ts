import Matter from "matter-js";

export const createGrid = (engine: Matter.Engine) => {
  const isMobile = window.innerWidth < 480; // check if mobile
  const distance = isMobile ? 48 : 46; // distance between dots
  const dotRadius = 3; // radius of each dot

  // margin around the canvas
  const marginDesktop = 64 + dotRadius / 2;
  const marginMobile = 40 + dotRadius / 2;
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

  const options = {
    isSensor: true,
    isStatic: true,
    render: {
      fillStyle: "#fff",
    },
  };

  // Text overlays on Desktop
  const whiteOverlay1 = Matter.Bodies.rectangle(186, 64, 256, 48, options);
  const whiteOverlay2 = Matter.Bodies.rectangle(348, 122, 580, 48, options);
  const whiteOverlay3 = Matter.Bodies.rectangle(
    gridWidth - 52,
    gridHeight + 62,
    264,
    48,
    options
  );

  // Text overlays on Mobile
  const whiteOverlay1M = Matter.Bodies.rectangle(106, 36, 200, 40, options);
  const whiteOverlay2M = Matter.Bodies.rectangle(146, 90, 380, 48, options);
  const whiteOverlay3M = Matter.Bodies.rectangle(106, 130, 200, 48, options);
  const whiteOverlay4M = Matter.Bodies.rectangle(
    gridWidth - 40,
    gridHeight + 42,
    210,
    48,
    options
  );

  if (!isMobile)
    Matter.World.add(engine.world, [
      whiteOverlay1,
      whiteOverlay2,
      whiteOverlay3,
    ]);
  else
    Matter.World.add(engine.world, [
      whiteOverlay1M,
      whiteOverlay2M,
      whiteOverlay3M,
      whiteOverlay4M,
    ]);
};
