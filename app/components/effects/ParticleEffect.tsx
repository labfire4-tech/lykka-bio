"use client";

import { useEffect, useRef } from 'react';

interface ParticleProps {
  type?: 'stars' | 'glitch' | 'snow' | 'hearts' | 'matrix' | 'rainbow' | 'pulse';
  count?: number;
  size?: number;
  speed?: number;
  opacity?: number;
  color?: string | string[];
  className?: string;
}

export function ParticleEffect({ 
  type = 'stars', 
  count = 50, 
  size = 2, 
  speed = 1, 
  opacity = 0.6,
  color,
  className = ''
}: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Default colors by type
    const colorMap: Record<string, string[]> = {
      stars: ['#fff', '#f0f', '#0ff', '#0f0', '#ff0', '#f80'],
      glitch: ['#ff0', '#f00', '#0ff', '#0f0', '#00f', '#f0f'],
      snow: ['#fff', '#f8f8ff', '#f0f8ff', '#e6e6fa'],
      hearts: ['#ff0000', '#ff69b4', '#ff1493', '#db7093'],
      matrix: ['#0f0', '#0ff', '#00f', '#f0f', '#ff0', '#ffff00'],
      rainbow: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'],
      pulse: ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3']
    };
    
    const colors = color ? (Array.isArray(color) ? color : [color]) : 
                   colorMap[type] || colorMap.stars;
    
    // Particle interface
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      phase: number;
      size: number;
      type: string;
    }
    
    const particles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        radius: Math.random() * size + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * opacity + 0.2,
        phase: Math.random() * Math.PI * 2,
        size: Math.random() * 2 + 1,
        type: type
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Update phase for pulsing effects
        p.phase += 0.05;
        
        // Draw based on type
        ctx.globalAlpha = p.alpha * (type === 'pulse' ? (Math.sin( p.phase ) * 0.5 + 0.5) : 1);
        ctx.fillStyle = p.color;
        
        switch (type) {
          case 'stars':
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'glitch':
            ctx.fillRect(p.x, p.y, p.radius * 2, p.radius * 2);
            break;
            
          case 'snow':
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'hearts':
            ctx.font = `${p.radius * 2}px Arial`;
            ctx.fillText('❤️', p.x, p.y);
            break;
            
          case 'matrix':
            ctx.font = `${p.radius * 2}px monospace`;
            const char = Math.random() > 0.5 ? '1' : '0';
            ctx.fillText(char, p.x, p.y);
            break;
            
case 'rainbow':
             // Create a gradient stroke for text effect
             const gradient = ctx.createLinearGradient(
               p.x - p.radius, 
               p.y, 
               p.x + p.radius, 
               p.y
             );
             gradient.addColorStop(0, '#ff0000');
             gradient.addColorStop(0.2, '#ff7f00');
             gradient.addColorStop(0.4, '#ffff00');
             gradient.addColorStop(0.6, '#00ff00');
             gradient.addColorStop(0.8, '#0000ff');
             gradient.addColorStop(1, '#4b0082');
             ctx.fillStyle = gradient;
             ctx.font = `${p.radius * 1.5}px monospace`;
             const starChar = '★';
             ctx.fillText(starChar, p.x, p.y);
             break;
            
          case 'pulse':
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * (Math.sin(p.phase) * 0.5 + 1), 0, Math.PI * 2);
            ctx.fill();
            break;
        }
      });
      
      animationRef.requestId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.requestId) {
        cancelAnimationFrame(animationRef.requestId);
      }
    };
  }, [type, count, size, speed, opacity, color]);
  
  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[9995] ${className}`}
      style={{ 
        pointerEvents: 'none',
        zIndex: 9995
      }}
    />
  );
}