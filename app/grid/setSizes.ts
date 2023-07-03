import Matter from "matter-js";

export const setSizes = (render: Matter.Render) => {
  render.bounds.max.x = window.innerWidth;
  render.bounds.max.y = window.innerHeight;
  render.options.width = window.innerWidth;
  render.options.height = window.innerHeight;
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
};
