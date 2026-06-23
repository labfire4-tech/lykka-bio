"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
  children: string;
  intensity?: 'low' | 'medium' | 'high' | 'none';
  color?: string;
  className?: string;
}

export function GlitchText({ 
  children, 
  intensity = 'medium', 
  color = '#fff',
  className = ''
}: GlitchTextProps) {
  const [glitch, setGlitch] = useState(false);
  
  useEffect(() => {
    if (intensity === 'none') return;
    
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000 + Math.random() * 2000);
    
    return () => clearInterval(interval);
  }, [intensity]);
  
  const getGlitchChars = () => {
    if (!glitch) return children;
    
    return children.split('').map((char, index) => {
      if (Math.random() > 0.7) {
        const chars = '!<>-_()·[]{}$*+#@%^&';
        return chars[Math.floor(Math.random() * chars.length)];
      }
      return char;
    }).join('');
  };
  
  return (
    <span 
      className={`relative inline-block ${className}`}
      style={{ color }}
    >
      {getGlitchChars()}
      {intensity !== 'low' && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{ 
            color: '#ff00ff', 
            pointerEvents: 'none',
            opacity: 0,
            fontWeight: 'bold',
            fontSize: 'inherit'
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            x: [0, 2, 0],
            y: [0, -2, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
        </motion.div>
      )}
    </span>
  );
}

export function RainbowText({ 
  children, 
  speed = 2,
  className = '',
  gradient = 'linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #00ff00, #0000ff, #8b00ff, #ff0000)'
}: { 
  children: string; 
  speed?: number;
  className?: string;
  gradient?: string;
}) {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const animate = () => {
      setPosition((prev) => (prev >= 100 ? 0 : prev + speed));
    };
    
    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [speed]);
  
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      style={{
        background: gradient,
        backgroundPosition: `${position}% 0`,
        backgroundSize: '300% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))',
        animation: `rainbow 3s linear infinite`
      }}
    >
      {children}
      <style jsx>{`
        @keyframes rainbow {
          0% { background-position: 0% 0; }
          100% { background-position: 300% 0; }
        }
      `}</style>
    </motion.span>
  );
}