import React, { useEffect, useRef, useState, useCallback } from "react";
import { Container, BodyModel } from "./styles";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { loadModel } from "../lib/loader";

const Statue = ({ handleLoading }: any) => {
  const refContainer =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [loading, setLoading] = useState<boolean>(true);
  const [renderer, setRenderer] = useState<any>();
  const [_camera, setCamera] = useState<any>();
  const [target] = useState<any>(new THREE.Vector3(0, 0.4, 0));
  const [initialCameraPosition] = useState(
    new THREE.Vector3(
      -10 * Math.sin(0.2 * Math.PI),
      1,
      100 * Math.cos(0.2 * Math.PI)
    )
  );
  const [scene] = useState(new THREE.Scene());
  const [_controls, setControls] = useState<any>();

  const easeOutCirc = (x: number) => {
    return Math.sqrt(1 - Math.pow(x - 1, 4));
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer;

    if (container && !renderer) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const camera = new THREE.PerspectiveCamera(45, scW / scH, 0.1, 1000);

      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);
      camera.zoom = 70;
      camera.position.z = 5000;
      camera.updateProjectionMatrix();
      setCamera(camera);

      const ambientLight = new THREE.AmbientLight();
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      controls.enablePan = false;
      controls.enableZoom = false;
      setControls(controls);

      window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });

      loadModel(scene, "/assets/statue/scene.gltf", {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
        handleLoading();
      });
      let req: any = null;
      let frame = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);
        camera.updateProjectionMatrix();
        frame = frame <= 100 ? frame + 100 : frame;
        if (frame <= 100) {
          const p = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

          camera.position.y = 0;
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    }
  }, [renderer]);

  return (
    <Container>
      <BodyModel ref={refContainer} />
    </Container>
  );
};

export default Statue;
