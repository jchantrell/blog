import React from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./box";
import dynamic from "next/dynamic";

const Castle = dynamic(() => import("../three/castle"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Scene = () => {
  return (
    <Canvas
      shadows={true}
      camera={{
        position: [-6, 7, 7],
      }}
    >
      <Castle />
    </Canvas>
  );
};

export default Scene;
