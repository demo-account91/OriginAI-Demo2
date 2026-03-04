import { motion } from 'framer-motion';
import DashboardHeader from '@/react-app/components/DashboardHeader';
import DetectorGrid from '@/react-app/components/DetectorGrid';
import { Shield, Activity, Clock, TrendingUp } from 'lucide-react';

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 border border-white/10"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-['Orbitron'] font-bold">{value}</p>
          <p className="text-xs text-muted-foreground font-['Rajdhani'] uppercase tracking-wide">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-purple-950/10" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/3 rounded-full blur-[150px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <DashboardHeader />
        
        <main className="px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="font-['Orbitron'] text-3xl md:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                  Welcome back
                </span>
              </h1>
              <p className="font-['Rajdhani'] text-muted-foreground text-lg">
                Choose a detector to analyze your content for AI-generated material
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
            >
              <StatCard
                icon={<Shield className="w-5 h-5 text-cyan-400" />}
                label="Scans Today"
                value="0"
                color="bg-cyan-500/10"
              />
              <StatCard
                icon={<Activity className="w-5 h-5 text-pink-400" />}
                label="AI Detected"
                value="0%"
                color="bg-pink-500/10"
              />
              <StatCard
                icon={<Clock className="w-5 h-5 text-purple-400" />}
                label="Avg. Time"
                value="--"
                color="bg-purple-500/10"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5 text-orange-400" />}
                label="Accuracy"
                value="99.2%"
                color="bg-orange-500/10"
              />
            </motion.div>

            {/* Section title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-6"
            >
              <h2 className="font-['Orbitron'] text-xl font-semibold tracking-wide">
                Detection Tools
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
            </motion.div>

            {/* Detector cards */}
            <DetectorGrid />

            {/* Recent activity section (placeholder) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12"
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-['Orbitron'] text-xl font-semibold tracking-wide">
                  Recent Activity
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
              </div>

              <div className="glass rounded-2xl border border-white/10 p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/30 flex items-center justify-center">
                  <Activity className="w-8 h-8 text-muted-foreground/50" />
                </div>
                <p className="font-['Rajdhani'] text-muted-foreground">
                  No recent scans yet. Start by selecting a detector above.
                </p>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
