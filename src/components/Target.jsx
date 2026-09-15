"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ponytail: procedural target-stand (was remote Supabase GLB, bucket deleted).
// Keeps the same position/rotation/scale API so Hero layout is unchanged.
const Target = (props) => {
  const targetRef = useRef();

  useGSAP(() => {
    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <group {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      {/* stand */}
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.2]} />
        <meshStandardMaterial color="#3b3b4f" roughness={0.6} />
      </mesh>
      <mesh position={[0, -2.7, 0]}>
        <cylinderGeometry args={[0.5, 0.6, 0.12]} />
        <meshStandardMaterial color="#23232e" roughness={0.8} />
      </mesh>
      {/* board: concentric discs facing +z */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.08, 48]} />
        <meshStandardMaterial color="#c62f2f" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.09, 48]} />
        <meshStandardMaterial color="#f2ede4" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.1, 48]} />
        <meshStandardMaterial color="#c62f2f" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.11, 32]} />
        <meshStandardMaterial color="#f2ede4" roughness={0.5} />
      </mesh>
    </group>
  );
};

export default Target;
