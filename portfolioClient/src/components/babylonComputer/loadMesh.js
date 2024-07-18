import { SceneLoader, Vector3 } from "@babylonjs/core";

export const loadMesh = (scene) => {
  SceneLoader.ImportMesh(
    "",
    "/cartoon_computer/",
    "scene.gltf",
    scene,
    (meshes) => {
      const mesh = meshes[0];
      mesh.scaling = new Vector3(0.75, 0.75, 0.75);
      mesh.position = new Vector3(0, -3, 0);
    }
  );
};
