import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Text, Sphere, Box, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface HumanoidProps {
  scrollProgress: number;
  currentSection: string;
}

const Humanoid = ({ scrollProgress, currentSection }: HumanoidProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  
  // Animation based on scroll
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Rotate towards content based on scroll
      const targetRotation = scrollProgress * Math.PI * 0.2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.02
      );
    }
    
    if (headRef.current) {
      // Head follows scroll slightly
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    
    if (rightArmRef.current) {
      // Pointing gesture that changes with sections
      const baseRotation = -Math.PI / 6;
      const waveOffset = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      rightArmRef.current.rotation.z = baseRotation + (scrollProgress * 0.5) + waveOffset;
      rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
    
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.PI / 8 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;
    }
  });

  const glowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x00d4ff),
    emissive: new THREE.Color(0x00d4ff),
    emissiveIntensity: 0.3,
    metalness: 0.8,
    roughness: 0.2,
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x1a1a2e),
    metalness: 0.9,
    roughness: 0.1,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xff9f1c),
    emissive: new THREE.Color(0xff9f1c),
    emissiveIntensity: 0.4,
    metalness: 0.7,
    roughness: 0.3,
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} scale={0.8}>
      {/* Body/Torso */}
      <mesh position={[0, 0, 0]} material={bodyMaterial}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
      </mesh>
      
      {/* Glowing core */}
      <mesh position={[0, 0.1, 0.2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={0x00d4ff}
          emissive={0x00d4ff}
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.85, 0]} material={bodyMaterial}>
        <sphereGeometry args={[0.25, 32, 32]} />
      </mesh>
      
      {/* Visor/Face */}
      <mesh position={[0, 0.88, 0.15]} rotation={[0.2, 0, 0]} material={glowMaterial}>
        <boxGeometry args={[0.35, 0.1, 0.05]} />
      </mesh>
      
      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.45, 0.3, 0]}>
        <mesh position={[0.25, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={bodyMaterial}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        </mesh>
        {/* Hand with glow */}
        <mesh position={[0.55, 0, 0]} material={glowMaterial}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
        {/* Pointing finger */}
        <mesh position={[0.7, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={accentMaterial}>
          <coneGeometry args={[0.03, 0.15, 8]} />
        </mesh>
      </group>
      
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.45, 0.3, 0]}>
        <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={bodyMaterial}>
          <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
        </mesh>
        <mesh position={[-0.55, 0, 0]} material={glowMaterial}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>
      
      {/* Legs */}
      <mesh position={[0.15, -0.7, 0]} material={bodyMaterial}>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
      </mesh>
      <mesh position={[-0.15, -0.7, 0]} material={bodyMaterial}>
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
      </mesh>
      
      {/* Feet with glow */}
      <mesh position={[0.15, -1.1, 0.05]} material={glowMaterial}>
        <boxGeometry args={[0.12, 0.08, 0.2]} />
      </mesh>
      <mesh position={[-0.15, -1.1, 0.05]} material={glowMaterial}>
        <boxGeometry args={[0.12, 0.08, 0.2]} />
      </mesh>
      
      {/* Shoulder accents */}
      <mesh position={[0.4, 0.45, 0]} material={accentMaterial}>
        <boxGeometry args={[0.15, 0.08, 0.15]} />
      </mesh>
      <mesh position={[-0.4, 0.45, 0]} material={accentMaterial}>
        <boxGeometry args={[0.15, 0.08, 0.15]} />
      </mesh>
    </group>
  );
};

const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={0x00d4ff}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const EnergyRings = () => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -state.clock.elapsedTime * 0.2;
      ring2Ref.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });
  
  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color={0x00d4ff}
          emissive={0x00d4ff}
          emissiveIntensity={0.5}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.015, 16, 100]} />
        <meshStandardMaterial
          color={0xff9f1c}
          emissive={0xff9f1c}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
};

interface HumanGuideProps {
  scrollProgress: number;
  currentSection: string;
}

const HumanGuide = ({ scrollProgress, currentSection }: HumanGuideProps) => {
  return (
    <div className="fixed right-0 top-0 w-1/3 h-screen pointer-events-none z-10 hidden lg:block">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color={0x00d4ff} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color={0xff9f1c} />
        <spotLight
          position={[0, 5, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color={0x00d4ff}
        />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Humanoid scrollProgress={scrollProgress} currentSection={currentSection} />
        </Float>
        
        <EnergyRings />
        <FloatingParticles />
        <Stars radius={100} depth={50} count={1000} factor={2} fade speed={1} />
      </Canvas>
    </div>
  );
};

export default HumanGuide;
