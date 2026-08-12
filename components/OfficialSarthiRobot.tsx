'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import * as THREE from 'three';

interface OfficialSarthiRobotProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  status?: 'idle' | 'active' | 'scanning' | 'emergency';
  animate?: boolean;
}

export default function OfficialSarthiRobot({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = 1,
  status = 'idle',
  animate = true 
}: OfficialSarthiRobotProps) {
  const robotRef = useRef<Group>(null);
  const lidarRef = useRef<Group>(null);
  const cameraRef = useRef<Group>(null);
  const leftWheelsRef = useRef<Mesh[]>([]);
  const rightWheelsRef = useRef<Mesh[]>([]);
  const suspensionRef = useRef<Group>(null);
  const emergencyLightsRef = useRef<Mesh[]>([]);
  const headlightRef = useRef<Mesh>(null);
  
  const [time, setTime] = useState(0);

  useFrame((state) => {
    if (!animate) return;

    const currentTime = state.clock.elapsedTime;
    setTime(currentTime);

    // LiDAR continuous rotation
    if (lidarRef.current) {
      lidarRef.current.rotation.y = currentTime * 2;
    }

    // Camera scanning motion
    if (cameraRef.current) {
      cameraRef.current.rotation.y = Math.sin(currentTime * 0.8) * 0.3;
      cameraRef.current.rotation.x = Math.sin(currentTime * 0.5) * 0.15;
    }

    // Wheel rotation when active
    if (status === 'active' || status === 'scanning') {
      leftWheelsRef.current.forEach(wheel => {
        if (wheel) wheel.rotation.x = currentTime * 3;
      });
      rightWheelsRef.current.forEach(wheel => {
        if (wheel) wheel.rotation.x = currentTime * 3;
      });
    }

    // Suspension movement
    if (suspensionRef.current) {
      suspensionRef.current.position.y = Math.sin(currentTime * 4) * 0.01;
    }

    // Emergency light blinking
    if (status === 'emergency') {
      emergencyLightsRef.current.forEach((light, index) => {
        if (light) {
          const blinkPhase = Math.sin(currentTime * 4 + index * Math.PI);
          (light.material as THREE.MeshStandardMaterial).emissiveIntensity = 
            blinkPhase > 0 ? 2 : 0.2;
        }
      });
    }

    // Headlight glow intensity
    if (headlightRef.current) {
      const glowIntensity = 0.8 + Math.sin(currentTime * 2) * 0.2;
      (headlightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 
        glowIntensity;
    }

    // Body vibration when powered on
    if (robotRef.current && (status === 'active' || status === 'scanning')) {
      robotRef.current.position.y = Math.sin(currentTime * 10) * 0.003;
    }
  });

  // PBR Materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x0a0a0a,
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.0
  });

  const armorMaterial = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.95,
    roughness: 0.15,
    envMapIntensity: 1.2
  });

  const carbonFiberMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.8,
    roughness: 0.4,
    envMapIntensity: 0.8
  });

  const redRescueMaterial = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    metalness: 0.7,
    roughness: 0.3,
    emissive: 0xdc2626,
    emissiveIntensity: 0.3
  });

  const blueAIMaterial = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0x3b82f6,
    emissiveIntensity: 0.5
  });

  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.6,
    roughness: 0.4
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f0f0f,
    metalness: 0.3,
    roughness: 0.8
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.05
  });

  const lensMaterial = new THREE.MeshStandardMaterial({
    color: 0x00ffff,
    metalness: 0.9,
    roughness: 0.1,
    emissive: 0x00ffff,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity: 0.9
  });

  const ledMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0xffffff,
    emissiveIntensity: 1.0
  });

  return (
    <group ref={robotRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Chassis - Black Armored Body */}
      <mesh position={[0, 0.3, 0]} material={bodyMaterial}>
        <boxGeometry args={[1.4, 0.6, 2.0]} />
      </mesh>

      {/* Upper Body - Carbon Fiber Details */}
      <mesh position={[0, 0.7, 0]} material={carbonFiberMaterial}>
        <boxGeometry args={[1.2, 0.4, 1.6]} />
      </mesh>

      {/* Front Armor Plate */}
      <mesh position={[0, 0.5, 1.0]} material={armorMaterial}>
        <boxGeometry args={[1.3, 0.5, 0.15]} />
      </mesh>

      {/* Side Armor Panels */}
      <mesh position={[0.7, 0.5, 0]} material={armorMaterial}>
        <boxGeometry args={[0.12, 0.4, 1.5]} />
      </mesh>
      <mesh position={[-0.7, 0.5, 0]} material={armorMaterial}>
        <boxGeometry args={[0.12, 0.4, 1.5]} />
      </mesh>

      {/* Rear Armor */}
      <mesh position={[0, 0.5, -1.0]} material={armorMaterial}>
        <boxGeometry args={[1.3, 0.5, 0.12]} />
      </mesh>

      {/* Blue AI Logo on Front */}
      <mesh position={[0, 0.6, 1.08]} material={blueAIMaterial}>
        <circleGeometry args={[0.2, 32]} />
      </mesh>
      <mesh position={[0, 0.5, 1.08]} material={blueAIMaterial}>
        <boxGeometry args={[0.15, 0.2, 0.03]} />
      </mesh>
      <mesh position={[0, 0.35, 1.08]} material={blueAIMaterial}>
        <boxGeometry args={[0.25, 0.08, 0.03]} />
      </mesh>

      {/* Red Rescue Hook */}
      <group position={[0, 0.25, 1.15]}>
        <mesh material={redRescueMaterial}>
          <torusGeometry args={[0.18, 0.06, 16, 32, Math.PI]} />
        </mesh>
        <mesh position={[0, 0.18, 0]} material={chromeMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.25, 16]} />
        </mesh>
        <mesh position={[0, 0.35, 0]} material={redRescueMaterial}>
          <sphereGeometry args={[0.05, 16, 16]} />
        </mesh>
      </group>

      {/* Roof-Mounted LiDAR System */}
      <group ref={lidarRef} position={[0, 1.0, 0]}>
        {/* LiDAR Base */}
        <mesh position={[0, 0.1, 0]} material={armorMaterial}>
          <cylinderGeometry args={[0.15, 0.18, 0.2, 16]} />
        </mesh>
        
        {/* Rotating LiDAR Unit */}
        <mesh material={carbonFiberMaterial}>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
        </mesh>
        
        {/* LiDAR Sensors */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh 
              key={i}
              position={[Math.sin(angle) * 0.1, 0.1, Math.cos(angle) * 0.1]}
              material={lensMaterial}
            >
              <sphereGeometry args={[0.025, 8, 8]} />
            </mesh>
          );
        })}
        
        {/* Top Dome */}
        <mesh position={[0, 0.2, 0]} material={armorMaterial}>
          <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Multi-Camera System */}
      <group ref={cameraRef} position={[0, 0.85, 0.3]}>
        {/* Camera Housing */}
        <mesh material={armorMaterial}>
          <boxGeometry args={[0.3, 0.2, 0.25]} />
        </mesh>
        
        {/* Main HD Camera */}
        <mesh position={[0, 0, 0.13]} material={lensMaterial}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
        
        {/* Thermal Camera */}
        <mesh position={[0.1, 0, 0.13]} material={lensMaterial}>
          <sphereGeometry args={[0.04, 12, 12]} />
        </mesh>
        
        {/* Wide-Angle Camera */}
        <mesh position={[-0.1, 0, 0.13]} material={lensMaterial}>
          <sphereGeometry args={[0.04, 12, 12]} />
        </mesh>
        
        {/* Camera Lens Ring */}
        <mesh position={[0, 0, 0.15]} material={chromeMaterial}>
          <torusGeometry args={[0.07, 0.01, 8, 16]} />
        </mesh>
      </group>

      {/* Gas Sensor Module */}
      <group position={[0.6, 0.65, 0.5]}>
        <mesh material={armorMaterial}>
          <boxGeometry args={[0.12, 0.15, 0.12]} />
        </mesh>
        <mesh position={[0.07, 0, 0]} material={lensMaterial}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
        <mesh position={[0.07, 0.05, 0]} material={lensMaterial}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
      </group>

      {/* Six Rugged Off-Road Wheels with Independent Suspension */}
      <group ref={suspensionRef}>
        {/* Front Left */}
        <group position={[-0.65, 0.1, 0.8]}>
          {/* Suspension Arm */}
          <mesh material={armorMaterial}>
            <boxGeometry args={[0.08, 0.15, 0.3]} />
          </mesh>
          {/* Wheel Hub */}
          <mesh material={chromeMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {/* Tire */}
          <mesh 
            ref={el => { if (el) leftWheelsRef.current[0] = el }}
            material={tireMaterial}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {/* Wheel Rim */}
          <mesh material={wheelMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {/* Lug Nuts */}
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh 
                key={i}
                position={[Math.sin(angle) * 0.12, 0, Math.cos(angle) * 0.12]}
                material={chromeMaterial}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.17, 8]} rotation={[0, 0, Math.PI / 2]} />
              </mesh>
            );
          })}
        </group>

        {/* Front Right */}
        <group position={[0.65, 0.1, 0.8]}>
          <mesh material={armorMaterial}>
            <boxGeometry args={[0.08, 0.15, 0.3]} />
          </mesh>
          <mesh material={chromeMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh 
            ref={el => { if (el) rightWheelsRef.current[0] = el }}
            material={tireMaterial}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh material={wheelMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh 
                key={i}
                position={[Math.sin(angle) * 0.12, 0, Math.cos(angle) * 0.12]}
                material={chromeMaterial}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.17, 8]} rotation={[0, 0, Math.PI / 2]} />
              </mesh>
            );
          })}
        </group>

        {/* Middle Left */}
        <group position={[-0.65, 0.1, 0]}>
          <mesh material={armorMaterial}>
            <boxGeometry args={[0.08, 0.15, 0.3]} />
          </mesh>
          <mesh material={chromeMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh 
            ref={el => { if (el) leftWheelsRef.current[1] = el }}
            material={tireMaterial}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh material={wheelMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh 
                key={i}
                position={[Math.sin(angle) * 0.12, 0, Math.cos(angle) * 0.12]}
                material={chromeMaterial}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.17, 8]} rotation={[0, 0, Math.PI / 2]} />
              </mesh>
            );
          })}
        </group>

        {/* Middle Right */}
        <group position={[0.65, 0.1, 0]}>
          <mesh material={armorMaterial}>
            <boxGeometry args={[0.08, 0.15, 0.3]} />
          </mesh>
          <mesh material={chromeMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh 
            ref={el => { if (el) rightWheelsRef.current[1] = el }}
            material={tireMaterial}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh material={wheelMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh 
                key={i}
                position={[Math.sin(angle) * 0.12, 0, Math.cos(angle) * 0.12]}
                material={chromeMaterial}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.17, 8]} rotation={[0, 0, Math.PI / 2]} />
              </mesh>
            );
          })}
        </group>

        {/* Rear Left */}
        <group position={[-0.65, 0.1, -0.8]}>
          <mesh material={armorMaterial}>
            <boxGeometry args={[0.08, 0.15, 0.3]} />
          </mesh>
          <mesh material={chromeMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh 
            ref={el => { if (el) leftWheelsRef.current[2] = el }}
            material={tireMaterial}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh material={wheelMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh 
                key={i}
                position={[Math.sin(angle) * 0.12, 0, Math.cos(angle) * 0.12]}
                material={chromeMaterial}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.17, 8]} rotation={[0, 0, Math.PI / 2]} />
              </mesh>
            );
          })}
        </group>

        {/* Rear Right */}
        <group position={[0.65, 0.1, -0.8]}>
          <mesh material={armorMaterial}>
            <boxGeometry args={[0.08, 0.15, 0.3]} />
          </mesh>
          <mesh material={chromeMaterial}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh 
            ref={el => { if (el) rightWheelsRef.current[2] = el }}
            material={tireMaterial}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.15, 32]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          <mesh material={wheelMaterial}>
            <cylinderGeometry args={[0.18, 0.18, 0.16, 16]} rotation={[0, 0, Math.PI / 2]} />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const angle = (i / 6) * Math.PI * 2;
            return (
              <mesh 
                key={i}
                position={[Math.sin(angle) * 0.12, 0, Math.cos(angle) * 0.12]}
                material={chromeMaterial}
              >
                <cylinderGeometry args={[0.02, 0.02, 0.17, 8]} rotation={[0, 0, Math.PI / 2]} />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Bright White Headlights */}
      <mesh ref={headlightRef} position={[0.35, 0.2, 1.05]} material={ledMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      <mesh position={[-0.35, 0.2, 1.05]} material={ledMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Headlight Housings */}
      <mesh position={[0.35, 0.2, 0.98]} material={armorMaterial}>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>
      <mesh position={[-0.35, 0.2, 0.98]} material={armorMaterial}>
        <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Emergency LED Lights */}
      <mesh 
        ref={el => { if (el) emergencyLightsRef.current[0] = el }}
        position={[0.5, 0.95, 0]} 
        material={new THREE.MeshStandardMaterial({
          color: 0xff0000,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0xff0000,
          emissiveIntensity: status === 'emergency' ? 2 : 0.2
        })}
      >
        <boxGeometry args={[0.06, 0.03, 0.1]} />
      </mesh>
      <mesh 
        ref={el => { if (el) emergencyLightsRef.current[1] = el }}
        position={[-0.5, 0.95, 0]} 
        material={new THREE.MeshStandardMaterial({
          color: 0xff0000,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0xff0000,
          emissiveIntensity: status === 'emergency' ? 2 : 0.2
        })}
      >
        <boxGeometry args={[0.06, 0.03, 0.1]} />
      </mesh>

      {/* Side Rescue Equipment */}
      <group position={[0.75, 0.4, 0.3]}>
        <mesh material={redRescueMaterial}>
          <boxGeometry args={[0.1, 0.25, 0.15]} />
        </mesh>
        <mesh position={[0.06, 0.05, 0]} material={chromeMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        </mesh>
      </group>
      <group position={[-0.75, 0.4, 0.3]}>
        <mesh material={redRescueMaterial}>
          <boxGeometry args={[0.1, 0.25, 0.15]} />
        </mesh>
        <mesh position={[-0.06, 0.05, 0]} material={chromeMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.2, 8]} />
        </mesh>
      </group>

      {/* Mechanical Details - Bolts and Joints */}
      {[
        [0.6, 0.7, 0.8], [-0.6, 0.7, 0.8],
        [0.6, 0.7, -0.8], [-0.6, 0.7, -0.8],
        [0.6, 0.3, 0], [-0.6, 0.3, 0]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} material={chromeMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.04, 8]} />
        </mesh>
      ))}

      {/* Status Indicators */}
      <mesh position={[0, 0.5, -1.06]} material={blueAIMaterial}>
        <boxGeometry args={[0.3, 0.08, 0.02]} />
      </mesh>

      {/* Lighting */}
      <pointLight position={[0, 1.2, 0]} intensity={1.5} distance={8} color="#00ffff" />
      <spotLight position={[0, 2, 0]} angle={0.6} penumbra={0.4} intensity={2} color="#ffffff" />
      
      {/* Headlight Beams */}
      <spotLight 
        position={[0.35, 0.2, 1.2]} 
        angle={0.4} 
        penumbra={0.3} 
        intensity={status === 'active' ? 3 : 1} 
        color="#ffffff" 
        target-position={[0.35, 0, 3]}
      />
      <spotLight 
        position={[-0.35, 0.2, 1.2]} 
        angle={0.4} 
        penumbra={0.3} 
        intensity={status === 'active' ? 3 : 1} 
        color="#ffffff" 
        target-position={[-0.35, 0, 3]}
      />
      
      {/* Emergency Light Glow */}
      {status === 'emergency' && (
        <>
          <pointLight position={[0.5, 0.95, 0]} intensity={2} distance={6} color="#ff0000" />
          <pointLight position={[-0.5, 0.95, 0]} intensity={2} distance={6} color="#ff0000" />
        </>
      )}
    </group>
  );
}