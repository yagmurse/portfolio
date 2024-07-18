import { HemisphericLight, SpotLight } from "@babylonjs/core/Lights";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export const createLights = (scene) => {
  const hemiLight = new HemisphericLight(
    "hemilight",
    new Vector3(0, 1, 0),
    scene
  );
  hemiLight.intensity = 2.0;

  const spotLight = new SpotLight(
    "spotLight",
    new Vector3(0, 10, 0),
    new Vector3(0, -1, 0),
    Math.PI / 3,
    2,
    scene
  );
  spotLight.intensity = 3.0;

  return { hemiLight, spotLight };
};
