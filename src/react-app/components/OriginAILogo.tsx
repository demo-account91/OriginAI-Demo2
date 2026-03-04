import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OriginAILogoProps {
  className?: string;
  animate?: boolean;
}

export default function OriginAILogo({ className = '', animate = true }: OriginAILogoProps) {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, [animate]);

  return (
    <div className={`relative ${className}`}>
      {/* Main logo */}
      <div className="relative">
        <h1 
          className={`font-['Orbitron'] text-6xl md:text-8xl font-black tracking-wider ${
            glitchActive ? 'animate-glitch' : ''
          }`}
        >
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Origin
            </span>
            {/* Glow layers */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent blur-lg opacity-50">
              Origin
            </span>
          </span>
          <span className="relative inline-block ml-1">
            <span className="relative z-10 neon-text-cyan">
              AI
            </span>
            {/* Animated underline */}
            <motion.span
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="font-['Rajdhani'] text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase mt-4"
        >
          Detect • Verify • Trust
        </motion.p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-pink-400/50" />
      <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-pink-400/50" />
      <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  );
}
