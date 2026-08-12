'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface Sarthi3DModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
}

export default function Sarthi3DModel({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  autoRotate = true,
  rotationSpeed = 0.5
}: Sarthi3DModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/sarthi.glb');
  const [startTime] = useState(() => Date.now());
  
  useEffect(() => {
    if (scene) {
      // Center and scale the model automatically
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      
      // Center the model
      scene.position.x = -center.x;
      scene.position.y = -center.y;
      scene.position.z = -center.z;
      
      // Scale to reasonable size (max dimension = 2 units)
      const maxDim = Math.max(size.x, size.y, size.z);
      const modelScale = 2 / maxDim;
      scene.scale.setScalar(modelScale);
    }
  }, [scene]);

  useFrame(() => {
    if (group.current && autoRotate) {
      // Smooth idle rotation using custom timer
      const elapsed = (Date.now() - startTime) / 1000;
      group.current.rotation.y = elapsed * rotationSpeed;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {scene ? <primitive object={scene} /> : null}
    </group>
  );
}

// Preload the model for instant loading
useGLTF.preload('/models/sarthi.glb');