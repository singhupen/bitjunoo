"use client";

import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';

const TechCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        {/* Outer glass crystal */}
        <mesh>
          <icosahedronGeometry args={[1.6, 0]} />
          <MeshTransmissionMaterial
            backside={false} // Optimized: backside calculation can be heavy
            samples={2} // Reduced from 4
            thickness={1.2}
            chromaticAberration={0.08} // Optimized
            distortion={0.15} // Optimized
            distortionScale={0.3} // Optimized
            temporalDistortion={0.05} // Optimized
            color="#7dd3fc"
            roughness={0.1} // Increased slightly for performance
            ior={1.5}
            attenuationColor="#38bdf8"
            attenuationDistance={1.2}
          />
        </mesh>
        
        {/* Inner solid wireframe core */}
        <mesh scale={0.85}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#38bdf8" 
            wireframe 
            emissive="#0284c7" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8} 
          />
        </mesh>

        <mesh scale={0.45}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#e0f2fe" wireframe opacity={0.6} transparent />
        </mesh>

        {/* Inner core glow light */}
        <pointLight color="#38bdf8" intensity={5} distance={5} />

        {/* Orbiting neon rings - Reduced segments from 100 to 48, radial from 16 to 12 */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.015, 12, 48]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={3} />
        </mesh>
        
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.01, 12, 48]} />
          <meshStandardMaterial color="#38bdf8" opacity={0.6} transparent emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </Float>
      
      {/* Procedural local environment map - Reduced resolution from 256 to 128 */}
      <Environment resolution={128}>
        <mesh scale={100}>
          {/* Reduced segments from 16 to 8 */}
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#0284c7" side={THREE.BackSide} />
        </mesh>
        <group>
          <mesh position={[0, 15, 0]} scale={[25, 2, 25]}>
            <boxGeometry />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[15, 8, 10]} scale={[4, 20, 20]}>
            <boxGeometry />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>
          <mesh position={[-15, 5, -10]} scale={[4, 20, 20]}>
            <boxGeometry />
            <meshBasicMaterial color="#7dd3fc" />
          </mesh>
          <mesh position={[0, -15, 0]} scale={[20, 2, 20]}>
            <boxGeometry />
            <meshBasicMaterial color="#0369a1" />
          </mesh>
        </group>
      </Environment>
    </group>
  );
};

const OrbitingNodes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.18;
    }
  });

  const nodeCount = 6;
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }).map((_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.9;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle * 2) * 0.45,
        z: Math.sin(angle) * radius,
      };
    });
  }, [nodeCount]);

  return (
    <group ref={groupRef}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          {/* Reduced segments from 16 to 12 */}
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial 
            color="#38bdf8" 
            emissive="#0ea5e9" 
            emissiveIntensity={3.5} 
          />
        </mesh>
      ))}
    </group>
  );
};

const Particles = ({ count = 100 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.05;
      pointsRef.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#38bdf8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

export default function Hero3DScene() {
  return (
    <div className="w-full h-full pointer-events-none sm:pointer-events-auto" style={{ touchAction: 'pan-y' }}>
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ touchAction: 'pan-y' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#e0f2fe" />
          <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#0284c7" />
          <TechCore />
          <OrbitingNodes />
          <Particles count={75} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
