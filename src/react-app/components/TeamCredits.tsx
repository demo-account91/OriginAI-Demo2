import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Swapnil Bag', row: 1 },
  { name: 'Soumalya Dey', row: 1 },
  { name: 'Trinanjana', row: 2 },
  { name: 'Anurag', row: 2 },
];

export default function TeamCredits() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="text-center"
    >
      {/* Team Label */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="font-['Orbitron'] text-xs tracking-[0.4em] uppercase mb-4 text-cyan-400/70"
      >
        Team Hackers
      </motion.h3>

      {/* Team Members Grid */}
      <div className="space-y-2">
        {/* Row 1 */}
        <div className="flex justify-center gap-8">
          {teamMembers.filter(m => m.row === 1).map((member, index) => (
            <motion.span
              key={member.name}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
              className="font-['Rajdhani'] text-sm md:text-base text-white/30 hover:text-white/60 transition-colors duration-300 cursor-default"
            >
              {member.name}
            </motion.span>
          ))}
        </div>
        
        {/* Row 2 */}
        <div className="flex justify-center gap-8">
          {teamMembers.filter(m => m.row === 2).map((member, index) => (
            <motion.span
              key={member.name}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + index * 0.1 }}
              className="font-['Rajdhani'] text-sm md:text-base text-white/30 hover:text-white/60 transition-colors duration-300 cursor-default"
            >
              {member.name}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.7, duration: 0.5 }}
        className="mt-4 mx-auto w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
      />
    </motion.div>
  );
}
