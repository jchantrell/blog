import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import loadingManager from "./loadingManager";

export function loadModel(
  scene: any,
  glbPath: any,
  options = { receiveShadow: true, castShadow: true }
) {
  const { receiveShadow, castShadow } = options;
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader(loadingManager);
    loader.load(
      glbPath,
      (gltf) => {
        loadingManager.onStart = () => {
          console.log("started");
        };

        loadingManager.onProgress = () => {
          console.log("progress made");
        };

        loadingManager.onLoad = () => {
          console.log("loading complete");
        };
        const obj = gltf.scene;
        obj.name = "statue";
        obj.position.y = 0;
        obj.position.x = 0;
        obj.receiveShadow = receiveShadow;
        obj.castShadow = castShadow;
        scene.add(obj);

        obj.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = castShadow;
            child.receiveShadow = receiveShadow;
          }
        });
        resolve(obj);
      },
      undefined,
      function (error) {
        reject(error);
      }
    );
  });
}
