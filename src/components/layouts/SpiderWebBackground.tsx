"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

const WebNetwork = ({ count = 80 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Initialize random positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4; // z
      vel.push(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      );
    }
    return [pos, vel];
  }, [count]);

  const maxLines = (count * (count - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  useFrame((state, delta) => {
    // Update point positions
    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Bounce off boundaries
      if (Math.abs(positions[i * 3]) > 6) velocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 6) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 2) velocities[i * 3 + 2] *= -1;
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.01;
    }

    // Connect close points with lines
    let lineCount = 0;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        // Connect if distance squared is less than a threshold
        if (distSq < 4.5) {
          linePositions[lineCount++] = positions[i * 3];
          linePositions[lineCount++] = positions[i * 3 + 1];
          linePositions[lineCount++] = positions[i * 3 + 2];
          linePositions[lineCount++] = positions[j * 3];
          linePositions[lineCount++] = positions[j * 3 + 1];
          linePositions[lineCount++] = positions[j * 3 + 2];
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineCount / 3);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.rotation.y += delta * 0.03;
      linesRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color="#05B0FC" size={0.04} transparent opacity={0.6} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0675FA" transparent opacity={0.15} />
      </lineSegments>
    </group>
  );
};

export default function SpiderWebBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
      className="fixed inset-0 z-[1] pointer-events-none opacity-40"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <WebNetwork count={70} />
      </Canvas>
    </motion.div>
  );
}
