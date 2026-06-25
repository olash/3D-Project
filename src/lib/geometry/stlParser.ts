import * as THREE from "three";
import { STLLoader } from "three-stdlib";

export function parseSTL(buffer: ArrayBuffer): THREE.BufferGeometry {
  const loader = new STLLoader();
  const geometry = loader.parse(buffer);
  return geometry;
}

export function calculateVolume(geometry: THREE.BufferGeometry): number {
  if (!geometry.isBufferGeometry) return 0;
  
  const position = geometry.attributes.position;
  const faces = position.count / 3;
  let volume = 0;
  
  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  for (let i = 0; i < faces; i++) {
    p1.fromBufferAttribute(position, i * 3 + 0);
    p2.fromBufferAttribute(position, i * 3 + 1);
    p3.fromBufferAttribute(position, i * 3 + 2);

    volume += p1.dot(p2.cross(p3)) / 6.0;
  }

  return Math.abs(volume);
}
