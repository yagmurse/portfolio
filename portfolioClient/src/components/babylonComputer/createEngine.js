import { Engine } from "@babylonjs/core/Engines/engine";

export const createEngine = (canvasRef) => {
  return new Engine(canvasRef.current, true);
};
