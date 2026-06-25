"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import MotorcycleModel from "./MotorcycleModel";

export default function HeroScene() {
  return (
    <div className="w-full h-screen absolute top-0 left-0 -z-10">
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <MotorcycleModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
