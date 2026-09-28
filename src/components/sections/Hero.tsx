"use client";

import { ArrowRight, Play, Zap, Atom, Server, Hexagon, Database, Boxes, Globe, Terminal, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, MeshTransmissionMaterial, Environment, Html } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const TechCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
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
            backside
            samples={4}
            thickness={1.5}
            chromaticAberration={0.08}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#38bdf8"
          />
        </mesh>
        
        {/* Inner solid wireframe core */}
        <mesh scale={0.85}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#0284c7" wireframe opacity={0.6} transparent />
        </mesh>

        {/* Orbiting neon rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.015, 16, 100]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={2} />
        </mesh>
        
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.01, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" opacity={0.4} transparent />
        </mesh>
      </Float>
      
      <Environment preset="city" />
    </group>
  );
};

const stack = [
  { name: "React", icon: Atom },
  { name: ".NET", icon: Server },
  { name: "Node.js", icon: Hexagon },
  { name: "TypeScript", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Boxes },
  { name: "Next.js", icon: Layers },
  { name: "Tailwind", icon: Globe },
];

const OrbitingTech = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Scale down orbit radius on small screens (e.g. mobile) to ensure responsiveness
  const scale = Math.min(1, viewport.width / 7); 
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {stack.map((t, i) => {
        const angle = (i / stack.length) * Math.PI * 2;
        const radius = 3.2; // Adjusted radius for the pills
        return (
          <group 
            key={t.name}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.2, Math.sin(angle) * radius]}
          >
            <Html center zIndexRange={[100, 0]}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-sky-500/30 backdrop-blur-md text-sky-400 shadow-lg shadow-sky-500/20 opacity-80 hover:opacity-100 transition-opacity select-none cursor-default">
                <t.icon className="w-4 h-4" />
                <span className="text-xs font-semibold whitespace-nowrap">
                  {t.name}
                </span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

const Particles = ({ count = 200 }) => {
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

  useFrame((state, delta) => {
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
      <pointsMaterial size={0.04} color="#38bdf8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-slate-900"
    >
      {/* Background Video using a direct Mixkit IT background url */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen"
      >
        <source src="/assets/ai-tech.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 text-sm font-medium border border-blue-500/20 mb-6 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4" />
            Your Trusted IT Consultancy Partner
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] text-white mb-6"
          >
            Transforming Ideas Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Powerful Digital Solutions
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg text-slate-300 leading-relaxed mb-8 max-w-xl"
          >
            <img src="/icon.png" alt="BitJunoo Logo" className="inline-block h-6 w-auto mx-1 -mt-1" /> delivers cutting-edge web, mobile, and enterprise software
            solutions. We help startups and enterprises build, scale, and innovate
            with confidence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
            >
              Get a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 text-white font-semibold border border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-md transition-all"
            >
              <Play className="w-5 h-5" />
              View Our Work
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex items-center gap-8 mt-12"
          >
            {[
              { value: '150+', label: 'Projects Delivered' },
              { value: '80+', label: 'Happy Clients' },
              { value: '10+', label: 'Years Experience' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold font-heading text-white">{s.value}</div>
                <div className="text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative h-[350px] sm:h-[450px] lg:h-[500px] w-full mt-8 lg:mt-0"
        >
          {/* Three.js Canvas */}
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <TechCore />
            <OrbitingTech />
            <Particles count={250} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}