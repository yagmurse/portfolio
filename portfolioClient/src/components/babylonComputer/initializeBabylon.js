import "@babylonjs/loaders/glTF";
import { createEngine } from "./createEngine";
import { createScene } from "./createScene";
import { createCamera } from "./createCamera";
import { createLights } from "./createLights";
import { loadMesh } from "./loadMesh";

export const initializeBabylon = async (canvasRef, engineRef) => {
  const engine = createEngine(canvasRef);
  const scene = createScene(engine);
  engineRef.current = engine;

  createCamera(canvasRef, scene);
  createLights(scene);
  loadMesh(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  const handleResize = () => {
    engine.resize();
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    engine.dispose();
  };
};
