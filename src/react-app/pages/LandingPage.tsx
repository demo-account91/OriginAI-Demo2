import { useState, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import OriginAILogo from '@/react-app/components/OriginAILogo';
import LoginButtons from '@/react-app/components/LoginButtons';
import TeamCredits from '@/react-app/components/TeamCredits';
import ThemeToggle from '@/react-app/components/ThemeToggle';

const Robot3DScene = lazy(() => import('@/react-app/components/Robot3DScene'));

export default function LandingPage() {
  const [showContent, setShowContent] = useState(false);
  const [animationPhase, setAnimationPhase] = useState<'robot' | 'content'>('robot');
  const navigate = useNavigate();

  const handleAnimationComplete = useCallback(() => {
    setAnimationPhase('content');
    setTimeout(() => setShowContent(true), 300);
  }, []);

  const handleLogin = () => {
    // Navigate to profile setup for now
    navigate('/profile-setup');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-950/20" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[150px]" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* 3D Robot Scene */}
      <AnimatePresence>
        {animationPhase === 'robot' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
              </div>
            }>
              <Robot3DScene onAnimationComplete={handleAnimationComplete} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-between px-6 py-12"
          >
            {/* Top spacer */}
            <div className="flex-1" />

            {/* Center content */}
            <div className="flex flex-col items-center gap-12">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <OriginAILogo />
              </motion.div>

              {/* Login Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <LoginButtons
                  onGoogleClick={() => handleLogin()}
                  onEmailClick={() => handleLogin()}
                  onPhoneClick={() => handleLogin()}
                />
              </motion.div>
            </div>

            {/* Bottom spacer and team credits */}
            <div className="flex-1 flex flex-col justify-end">
              <TeamCredits />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip animation button (for development/testing) */}
      {animationPhase === 'robot' && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={() => {
            setAnimationPhase('content');
            setShowContent(true);
          }}
          className="absolute bottom-6 right-6 z-50 px-4 py-2 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          Skip →
        </motion.button>
      )}
    </div>
  );
}
