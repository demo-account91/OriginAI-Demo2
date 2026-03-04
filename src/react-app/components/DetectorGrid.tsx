import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FileText, Mic, Camera, Video, Sparkles, ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface DetectorCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color: 'cyan' | 'magenta' | 'purple' | 'orange';
  features: string[];
  index: number;
}

const colorClasses = {
  cyan: {
    gradient: 'from-cyan-500 to-cyan-400',
    glow: 'group-hover:shadow-[0_0_40px_rgba(0,255,255,0.3)]',
    border: 'group-hover:border-cyan-400/50',
    icon: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  magenta: {
    gradient: 'from-pink-500 to-pink-400',
    glow: 'group-hover:shadow-[0_0_40px_rgba(255,0,255,0.3)]',
    border: 'group-hover:border-pink-400/50',
    icon: 'text-pink-400',
    bg: 'bg-pink-500/10',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-400',
    glow: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]',
    border: 'group-hover:border-purple-400/50',
    icon: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  orange: {
    gradient: 'from-orange-500 to-amber-400',
    glow: 'group-hover:shadow-[0_0_40px_rgba(255,165,0,0.3)]',
    border: 'group-hover:border-orange-400/50',
    icon: 'text-orange-400',
    bg: 'bg-orange-500/10',
  },
};

function DetectorCard({ title, description, icon, href, color, features, index }: DetectorCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link to={href} className="block group">
        <div
          className={`
            relative overflow-hidden rounded-2xl glass border border-white/10 p-6
            transition-all duration-500 ease-out
            ${colors.glow} ${colors.border}
            hover:translate-y-[-4px]
          `}
        >
          {/* Background gradient glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Animated corner accents */}
          <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 ${colors.icon} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-tl-2xl`} />
          <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${colors.icon} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-br-2xl`} />

          {/* Icon */}
          <div className="relative mb-6">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center`}
            >
              <div className={colors.icon}>
                {icon}
              </div>
            </motion.div>
            {/* Icon glow */}
            <div className={`absolute inset-0 rounded-2xl ${colors.bg} blur-xl opacity-50 group-hover:opacity-100 transition-opacity`} />
          </div>

          {/* Content */}
          <h3 className="font-['Orbitron'] text-xl font-bold mb-2 tracking-wide">
            {title}
          </h3>
          <p className="font-['Rajdhani'] text-muted-foreground mb-4 leading-relaxed">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className={`w-3 h-3 ${colors.icon}`} />
                <span className="font-['Rajdhani']">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className={`flex items-center gap-2 ${colors.icon} font-['Rajdhani'] font-semibold`}>
            <span>Start Detection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function DetectorGrid() {
  const detectors = [
    {
      title: 'Text Detector',
      description: 'Analyze written content for AI-generated text and check for plagiarism.',
      icon: <FileText className="w-8 h-8" />,
      href: '/detector/text',
      color: 'cyan' as const,
      features: ['AI probability %', 'Plagiarism check', 'Source matching'],
    },
    {
      title: 'Audio Detector',
      description: 'Detect synthetic or AI-generated audio content from recordings.',
      icon: <Mic className="w-8 h-8" />,
      href: '/detect/audio',
      color: 'magenta' as const,
      features: ['Voice synthesis detection', 'Record or upload', 'Deepfake analysis'],
    },
    {
      title: 'Photo Detector',
      description: 'Identify AI-generated or manipulated images with precision.',
      icon: <Camera className="w-8 h-8" />,
      href: '/detect/photo',
      color: 'purple' as const,
      features: ['GAN detection', 'Image manipulation', 'Metadata analysis'],
    },
    {
      title: 'Video Detector',
      description: 'Analyze videos for deepfakes and AI-generated content.',
      icon: <Video className="w-8 h-8" />,
      href: '/detect/video',
      color: 'orange' as const,
      features: ['Frame-by-frame analysis', 'Facial inconsistencies', 'Audio sync check'],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {detectors.map((detector, index) => (
        <DetectorCard key={detector.title} {...detector} index={index} />
      ))}
    </div>
  );
}
