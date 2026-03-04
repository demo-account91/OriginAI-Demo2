import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { User, Settings, LogOut } from 'lucide-react';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function DashboardHeader() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="relative z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            {/* Animated logo icon */}
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-[2px]"
            >
              <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                <span className="font-['Orbitron'] font-bold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  O
                </span>
              </div>
            </motion.div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
          </div>
          <span className="font-['Orbitron'] text-xl font-bold tracking-wide">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Origin
            </span>
            <span className="neon-text-cyan">AI</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Profile dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 rounded-xl glass border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-['Rajdhani'] font-semibold hidden sm:block">Guest User</span>
            </motion.button>

            {/* Dropdown menu */}
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl glass-strong border border-white/10 shadow-2xl"
              >
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="font-['Rajdhani']">Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors"
                  onClick={() => setShowDropdown(false)}
                >
                  <Settings className="w-4 h-4 text-purple-400" />
                  <span className="font-['Rajdhani']">Settings</span>
                </Link>
                <hr className="my-2 border-white/10" />
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 transition-colors text-pink-400"
                  onClick={() => setShowDropdown(false)}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-['Rajdhani']">Sign Out</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
