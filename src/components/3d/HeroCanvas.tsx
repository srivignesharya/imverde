'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingPrism() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 0.6 : 0.25);
      meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.35);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.4 : 1.3}
      >
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={hovered ? '#16db65' : '#1b4d32'}
          emissive="#04471c"
          emissiveIntensity={hovered ? 0.6 : 0.2}
          roughness={0.2}
          metalness={0.85}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

export function HeroCanvas({ className }: { className?: string }) {
  return (
    <div className={className || 'w-full h-64 sm:h-80 relative'}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ pointerEvents: 'auto' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#d9f99d" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#058c42" />
        <FloatingPrism />
      </Canvas>
    </div>
  );
}

