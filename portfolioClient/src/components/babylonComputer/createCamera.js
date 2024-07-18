import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export const createCamera = (canvasRef, scene) => {
  const camera = new ArcRotateCamera(
    "camera1",
    -Math.PI / 2,
    Math.PI / 2,
    10,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvasRef.current, true);
  // Limit rotation to x-y plane
  camera.lowerBetaLimit = Math.PI / 2;
  camera.upperBetaLimit = Math.PI / 2;
  // Disable focus
  camera.lowerRadiusLimit = camera.radius;
  camera.upperRadiusLimit = camera.radius;

  return camera;
};
