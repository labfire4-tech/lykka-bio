"use client";

import { motion } from 'framer-motion';
import { useState, type ReactNode } from 'react';

interface GlassPanelProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  videoSrc?: string;
  className?: string;
  glow?: boolean;
  animatedBorder?: boolean;
}

export function GlassPanel({
  title,
  subtitle,
  children,
  videoSrc,
  className = '',
  glow = false,
  animatedBorder = false,
}: GlassPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: isPressed ? 0.98 : 1.01, y: isPressed ? 0 : -2 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow-hidden rounded-3xl backdrop-blur-xl p-6 transition-all duration-500 ${className}`}
      style={{
        background: videoSrc ? 'transparent' : 'rgba(255, 255, 255, 0.025)',
        border: animatedBorder
          ? '1px solid transparent'
          : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: glow
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 60px rgba(168, 85, 247, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.12)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Animated border gradient */}
      {animatedBorder && (
        <div
          className="absolute inset-0 rounded-3xl p-[1px] pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, #a855f7, #ec4899, #f97316, #10b981, #06b6d4, #8b5cf6)',
            backgroundSize: '300% 300%',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'gradient-pan 4s linear infinite',
          }}
        />
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
              transition: 'transform 0.3s ease',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {title && (
          <motion.h3
            className="mb-2 text-xl font-bold text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {title}
          </motion.h3>
        )}

        {subtitle && (
          <motion.p
            className="mb-4 text-sm text-white/50"
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

      {/* Corner accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-6 h-6 bg-gradient-to-br from-purple-500/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-pink-500/10 to-transparent" />
      </div>
    </motion.div>
  );
}
