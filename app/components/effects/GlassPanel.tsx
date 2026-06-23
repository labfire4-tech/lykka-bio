"use client";

import { motion, useState } from 'react';

interface GlassPanelProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  videoSrc?: string;
  className?: string;
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  glow?: boolean;
  animatedBorder?: boolean;
  padding?: string;
  radius?: string;
}

export function GlassPanel({ 
  title, 
  subtitle, 
  children, 
  videoSrc,
  className = '',
  blur = 'md',
  glow = false,
  animatedBorder = false,
  padding = '6',
  radius = '3xl'
}: GlassPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const blurMap = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl'
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        scale: isPressed ? 0.98 : 1.02, 
        y: isPressed ? 0 : -2 
      }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden transition-all duration-500 ${className}`}
      style={{
        borderRadius: radius,
        background: videoSrc 
          ? 'transparent'
          : 'rgba(255, 255, 255, 0.025)',
        backdropFilter: blurMap[blur],
        WebkitBackdropFilter: blurMap[blur],
        border: animatedBorder 
          ? '1px solid transparent' 
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: glow 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 60px rgba(168, 85, 247, 0.15)'
          : '0 8px 32px rgba(0, 0, 0, 0.12)',
        ...(isHovered && animatedBorder && {
          boxShadow: '0 0 0 3px rgba(168, 85, 247, 0.4)',
          borderImage: 'linear-gradient(45deg, #a855f7, #ec4899, #f97316) 1',
          borderImageSlice: '1'
        })
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
{/* Animated border gradient */}
       {animatedBorder && (
         <div className="absolute inset-0 rounded-[var(--radius)] p-[2px] pointer-events-none" style={{
           background: 'linear-gradient(45deg, #a855f7, #ec4899, #f97316, #10b981, #06b6d4, #8b5cf6)',
           WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
           WebkitMaskComposite: 'xor',
           maskComposite: 'exclude',
           pointerEvents: 'none'
         }}>
           <div className="absolute inset-0 rounded-[var(--radius)]" style={{ 
             background: 'rgba(0,0,0,0.85)', 
             pointerEvents: 'none' 
           }} />
         </div>
       )}
      
      {/* Video background */}
      {videoSrc && (
        <div className="absolute inset-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              filter: 'brightness(0.3) contrast(1.2) saturate(1.1) hue-rotate(-10deg)',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}
            onError={(e) => console.error('Video loading failed:', e)}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      )}
      
      {/* Content */}
      <div className={`relative z-10 p-[${padding}]`}>
        {title && (
          <motion.h3 
            className="mb-2 text-2xl font-bold text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {title}
          </motion.h3>
        )}
        
        {subtitle && (
          <motion.p 
            className="mb-4 text-base text-white/60"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
        <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-purple-500/20 to-pink-500/20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 bg-gradient-to-tr from-purple-500/20 to-pink-500/20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-purple-500/20 to-pink-500/20" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 left-1/4 w-12 h-12 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 right-1/3 w-8 h-8 bg-pink-500/10 rounded-full blur-2xl animate-float" />
          <div className="absolute top-1/3 left-[90%] w-16 h-16 bg-gradient-to-tr from-purple-400/5 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

// Helper component for animated floating effect
function FloatAnimation({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      className="pointer-events-none"
      style={{ 
        animationDelay: `${delay}s`,
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out'
      }}
      animate={{ 
        y: [0, -10, 0], 
        rotate: [0, 2, 0],
        scale: [1, 1.02, 1]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity
      }}
    >
      {children}
    </motion.div>
  );
}