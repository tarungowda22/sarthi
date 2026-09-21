'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface SarthiRobot3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  status?: 'idle' | 'active' | 'scanning';
  animate?: boolean;
}

export default function SarthiRobot3D({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  status = 'idle',
  animate = true 
}: SarthiRobot3DProps) {
  const robotRef = useRef<Group>(null);
  const cameraMastRef = useRef<Group>(null);
  const wheelRef = useRef<Group>(null);

  useFrame((state) => {
    if (!animate) return;

    const time = state.clock.getElapsedTime();

    // Camera mast rotation
    if (cameraMastRef.current) {
      cameraMastRef.current.rotation.y = Math.sin(time * 0.5) * 0.5;
    }

    // Idle animation
    if (robotRef.current && status === 'idle') {
      robotRef.current.position.y = Math.sin(time * 1) * 0.02;
    }

    // Wheel rotation
    if (wheelRef.current && status === 'active') {
      wheelRef.current.rotation.x = time * 2;
    }
  });

  return (
    <group ref={robotRef} position={position} rotation={rotation}>
      {/* Main Body - Black Armored */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.8, 1.8]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Body Armor Panels */}
      <mesh position={[0.65, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.6, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.65, 0.4, 0]}>
        <boxGeometry args={[0.1, 0.6, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Front Rescue Hook - Red */}
      <mesh position={[0, 0.2, 1.0]}>
        <torusGeometry args={[0.15, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.4, 1.15]}>
        <cylinderGeometry args={[0.05, 0.05, 0.2, 16]} />
        <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Roof-Mounted Camera/LiDAR */}
      <group ref={cameraMastRef} position={[0, 0.9, 0]}>
        {/* Camera Mast */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Camera Housing */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.25, 0.15, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Camera Lens */}
        <mesh position={[0, 0.35, 0.16]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.8} />
        </mesh>
        
        {/* LiDAR Scanner */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.05, 16]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Side Rescue Equipment */}
      <mesh position={[0.7, 0.3, 0.5]}>
        <boxGeometry args={[0.15, 0.3, 0.2]} />
        <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[-0.7, 0.3, 0.5]}>
        <boxGeometry args={[0.15, 0.3, 0.2]} />
        <meshStandardMaterial color="#dc2626" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* AI Logo on Front */}
      <mesh position={[0, 0.5, 0.91]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 0.3, 0.91]}>
        <boxGeometry args={[0.1, 0.15, 0.02]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
      </mesh>

      {/* SARTHI Branding */}
      <mesh position={[0, 0.2, -0.91]}>
        <boxGeometry args={[0.3, 0.1, 0.02]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>

      {/* Bright White Headlights */}
      <mesh position={[0.3, 0.15, 0.91]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-0.3, 0.15, 0.91]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>

      {/* Red Emergency Lights */}
      <mesh position={[0.4, 0.85, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#dc2626" 
          emissive="#dc2626" 
          emissiveIntensity={status === 'active' ? 1 : 0.3}
        />
      </mesh>
      <mesh position={[-0.4, 0.85, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial 
          color="#dc2626" 
          emissive="#dc2626" 
          emissiveIntensity={status === 'active' ? 1 : 0.3}
        />
      </mesh>

      {/* Six Suspension Wheels */}
      <group ref={wheelRef}>
        {/* Front Left */}
        <mesh position={[-0.6, 0, 0.7]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Front Right */}
        <mesh position={[0.6, 0, 0.7]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Middle Left */}
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Middle Right */}
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Rear Left */}
        <mesh position={[-0.6, 0, -0.7]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Rear Right */}
        <mesh position={[0.6, 0, -0.7]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Suspension System */}
      {[
        [-0.6, 0.15, 0.7], [0.6, 0.15, 0.7],
        [-0.6, 0.15, 0], [0.6, 0.15, 0],
        [-0.6, 0.15, -0.7], [0.6, 0.15, -0.7]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.04, 0.04, 0.2, 8]} />
          <meshStandardMaterial color="#444" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}

      {/* Status Lights */}
      <pointLight position={[0, 1, 0]} intensity={2} distance={10} color="#00ffff" />
      <spotLight position={[0, 2, 0]} angle={0.5} penumbra={0.5} intensity={3} color="#ffffff" />
      
      {/* Emergency Light Glow */}
      {status === 'active' && (
        <>
          <pointLight position={[0.4, 0.85, 0]} intensity={1} distance={5} color="#dc2626" />
          <pointLight position={[-0.4, 0.85, 0]} intensity={1} distance={5} color="#dc2626" />
        </>
      )}
    </group>
  );
}