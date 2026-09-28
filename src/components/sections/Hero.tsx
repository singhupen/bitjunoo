"use client";

import { ArrowRight, Play, Zap, Atom, Server, Hexagon, Database, Boxes, Globe, Terminal, Layers, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, MeshTransmissionMaterial, Environment, Html } from '@react-three/drei';
import { useRef, useMemo, Suspense } from 'react';
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
            thickness={1.2}
            chromaticAberration={0.12}
            anisotropy={0.1}
            distortion={0.25}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#7dd3fc"
            roughness={0.05}
            ior={1.55}
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

        {/* Orbiting neon rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.015, 16, 100]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={3} />
        </mesh>
        
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.01, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" opacity={0.6} transparent emissive="#38bdf8" emissiveIntensity={0.8} />
        </mesh>
      </Float>
      
      {/* Procedural local environment map for instant zero-latency reflections */}
      <Environment resolution={256}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 16, 16]} />
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

const stack = [
  { name: "React 19", icon: Atom },
  { name: ".NET 9", icon: Server },
  { name: "Node.js", icon: Hexagon },
  { name: "TypeScript", icon: Terminal },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Boxes },
  { name: "Next.js 16", icon: Layers },
  { name: "Cloud / AWS", icon: Globe },
];

const OrbitingTech = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
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
        const radius = 3.2;
        return (
          <group 
            key={t.name}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.2, Math.sin(angle) * radius]}
          >
            <Html center zIndexRange={[100, 0]}>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/85 border border-sky-400/30 backdrop-blur-md text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:border-sky-400 transition-all select-none cursor-default">
                <t.icon className="w-3.5 h-3.5 text-cyan-400" />
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

const Particles = ({ count = 220 }) => {
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
      <pointsMaterial size={0.035} color="#38bdf8" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center pt-28 pb-16 overflow-hidden bg-slate-950"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-screen"
      >
        <source src="/assets/ai-tech.mp4" type="video/mp4" />
      </video>

      {/* Modern cybernetic radial lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/95 z-0 pointer-events-none" />

      {/* High-efficiency container: expanded max-w and tighter horizontal padding */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          {/* Status pill badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-semibold tracking-wide">Enterprise IT Consultancy & Digital Engineering</span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-[4rem] font-bold leading-[1.12] tracking-tight text-white mb-6"
          >
            Engineering Powerful{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
              Digital Solutions
            </span>{" "}
            for High-Growth Brands
          </motion.h1>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl"
          >
            <img src="/icon.png" alt="BitJunoo Logo" className="inline-block h-6 w-auto mx-1 -mt-1" /> crafts high-performance web applications, enterprise-grade backends, and cloud architectures. We bridge strategy with engineering precision to scale your business with speed and security.
          </motion.p>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 text-white font-semibold text-sm sm:text-base shadow-[0_0_25px_rgba(14,165,233,0.35)] hover:shadow-[0_0_35px_rgba(14,165,233,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white font-medium text-sm sm:text-base border border-white/15 backdrop-blur-md transition-all duration-200"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              Explore Case Studies
            </a>
          </motion.div>

          {/* Refined Stats Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 pt-8 border-t border-white/10 mt-10 max-w-2xl"
          >
            {[
              { value: '150+', label: 'Delivered Projects', sub: 'On-time delivery' },
              { value: '99.8%', label: 'Client Satisfaction', sub: 'Global enterprise trust' },
              { value: '10+ Yrs', label: 'Engineering Depth', sub: 'Modern full-stack' },
            ].map((s) => (
              <div 
                key={s.label}
                className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-sky-500/30 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-slate-200 mt-1">{s.label}</div>
                <div className="text-[11px] text-sky-400/80 hidden sm:block mt-0.5">{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Interactive Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative h-[380px] sm:h-[460px] lg:h-[540px] w-full mt-6 lg:mt-0"
        >
          {/* Ambient Glow behind 3D core */}
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/20 via-blue-600/10 to-cyan-400/10 rounded-3xl blur-2xl pointer-events-none" />

          {/* Interactive Hint Badge */}
          <div className="absolute top-3 right-3 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-white/15 text-[11px] text-slate-300 backdrop-blur-md pointer-events-none select-none">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Interactive 3D Engine • Drag to rotate</span>
          </div>

          <Canvas 
            camera={{ position: [0, 0, 6], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} color="#e0f2fe" />
              <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#0284c7" />
              <pointLight position={[0, 0, 0]} intensity={2.5} color="#38bdf8" distance={6} />
              <TechCore />
              <OrbitingTech />
              <Particles count={220} />
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}