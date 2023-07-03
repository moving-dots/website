import Matter from "matter-js";

export const createGrid = (engine: Matter.Engine) => {
  const distance = 32; // distance between dots
  const dotRadius = 3; // radius of each dot
  const margin = 64 + dotRadius / 2; // margin around the canvas

  const gridWidth = window.innerWidth - margin * 2; // width of the grid
  const gridHeight = window.innerHeight - margin * 2; // height of the grid

  let numDotsX = Math.floor(gridWidth / distance);
  let numDotsY = Math.floor(gridHeight / distance);

  // Create fake grid to test position of the dots
  // const fakeGrid = Matter.Bodies.rectangle(
  //   gridWidth / 2 + margin,
  //   gridHeight / 2 + margin,
  //   gridWidth,
  //   gridHeight,
  //   {
  //     isStatic: true,
  //     render: {
  //       opacity: 0.6,
  //       fillStyle: "blue",
  //     },
  //   }
  // );

  // Matter.World.add(engine.world, fakeGrid);

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
};
