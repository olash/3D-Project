"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import * as THREE from "three";

export default function MotorcycleModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();

  useFrame(() => {
    if (groupRef.current) {
      // Example of binding scroll to rotation
      const scroll = scrollYProgress.get();
      groupRef.current.rotation.y = scroll * Math.PI * 2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Placeholder primitives until GLTF is provided */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0.5]}>
        <cylinderGeometry args={[0.3, 0.3, 1]} />
        <meshStandardMaterial color="#d97706" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
