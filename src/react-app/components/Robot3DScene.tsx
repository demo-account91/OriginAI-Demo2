import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  position: [number, number, number];
  delay: number;
}

function Particle({ position, delay }: ParticleProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(1);
  const startTime = useRef(Date.now() + delay);
  
  useFrame(() => {
    if (!ref.current) return;
    const elapsed = (Date.now() - startTime.current) / 1000;
    
    if (elapsed > 0) {
      const progress = Math.min(elapsed / 2, 1);
      ref.current.position.x += (Math.random() - 0.5) * 0.05;
      ref.current.position.y += (Math.random() - 0.5) * 0.05;
      ref.current.position.z += Math.random() * 0.1;
      ref.current.scale.setScalar(1 - progress);
      setOpacity(1 - progress);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.15, 0.15, 0.15]} />
      <meshStandardMaterial 
        color="#00ffff" 
        emissive="#00ffff"
        emissiveIntensity={2}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

interface RobotCoreProps {
  isDisintegrating: boolean;
  scale: number;
}

function RobotCore({ isDisintegrating, scale }: RobotCoreProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const [visible, setVisible] = useState(true);
  
  useFrame((state) => {
    if (!groupRef.current || isDisintegrating) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  useEffect(() => {
    if (isDisintegrating) {
      const newParticles: ParticleProps[] = [];
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          position: [
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
          ],
          delay: Math.random() * 500
        });
      }
      setParticles(newParticles);
      setTimeout(() => setVisible(false), 500);
    }
  }, [isDisintegrating]);

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main body */}
      {visible && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Head */}
          <mesh position={[0, 1.2, 0]}>
            <dodecahedronGeometry args={[0.6, 0]} />
            <MeshDistortMaterial
              color="#0a0a1a"
              emissive="#6600ff"
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
              distort={0.2}
              speed={2}
            />
          </mesh>
          
          {/* Eyes */}
          <mesh position={[-0.2, 1.3, 0.5]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
          </mesh>
          <mesh position={[0.2, 1.3, 0.5]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3} />
          </mesh>
          
          {/* Torso */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.7, 1.5, 8]} />
            <MeshDistortMaterial
              color="#0a0a1a"
              emissive="#ff00ff"
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.1}
              distort={0.1}
              speed={1}
            />
          </mesh>
          
          {/* Core glow */}
          <mesh position={[0, 0, 0.4]}>
            <torusGeometry args={[0.25, 0.08, 16, 32]} />
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} />
          </mesh>
          
          {/* Arms */}
          <mesh position={[-0.9, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
            <capsuleGeometry args={[0.12, 0.8, 8, 16]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.9, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <capsuleGeometry args={[0.12, 0.8, 8, 16]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Energy rings */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2, 0.02, 16, 64]} />
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <torusGeometry args={[1.0, 0.02, 16, 64]} />
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={2} transparent opacity={0.6} />
          </mesh>
        </Float>
      )}
      
      {/* Disintegration particles */}
      {particles.map((p, i) => (
        <Particle key={i} position={p.position} delay={p.delay} />
      ))}
    </group>
  );
}

interface Robot3DSceneProps {
  onAnimationComplete?: () => void;
}

export default function Robot3DScene({ onAnimationComplete }: Robot3DSceneProps) {
  const [scale, setScale] = useState(0.1);
  const [isDisintegrating, setIsDisintegrating] = useState(false);
  const [phase, setPhase] = useState<'zoom' | 'hold' | 'disintegrate' | 'done'>('zoom');

  useEffect(() => {
    if (phase === 'zoom') {
      const interval = setInterval(() => {
        setScale(prev => {
          if (prev >= 1.5) {
            clearInterval(interval);
            setPhase('hold');
            return 1.5;
          }
          return prev + 0.02;
        });
      }, 30);
      return () => clearInterval(interval);
    }
    
    if (phase === 'hold') {
      const timeout = setTimeout(() => {
        setPhase('disintegrate');
        setIsDisintegrating(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
    
    if (phase === 'disintegrate') {
      const timeout = setTimeout(() => {
        setPhase('done');
        onAnimationComplete?.();
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [phase, onAnimationComplete]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6600ff" />
        <pointLight position={[0, 0, 5]} intensity={0.8} color="#00ffff" />
        
        <RobotCore isDisintegrating={isDisintegrating} scale={scale} />
        
        {/* Background particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10 - 5
            ]}
          >
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#00ffff" : "#ff00ff"} 
              emissive={i % 2 === 0 ? "#00ffff" : "#ff00ff"}
              emissiveIntensity={2}
            />
          </mesh>
        ))}
      </Canvas>
    </div>
  );
}
