"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

interface LivePreviewProps {
  profileState: any;
  isVisible: boolean;
  onClose?: () => void;
}

export function LivePreview({ profileState, isVisible, onClose }: LivePreviewProps) {
  const [previewState, setPreviewState] = useState(profileState);
  const previewRef = useRef<HTMLDivElement>(null);
  const springX = useSpring(0, { stiffness: 200, damping: 20 });
  const springY = useSpring(0, { stiffness: 200, damping: 20 });
  
  // Sync with parent state
  useEffect(() => {
    setPreviewState(profileState);
  }, [profileState]);
  
  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (previewRef.current && !previewRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Debounced state update to parent
  const debouncedUpdate = useCallback((key: string, value: any) => {
    // Clear existing timeout
    if (debouncedUpdate.timeoutId) {
      clearTimeout(debouncedUpdate.timeoutId);
    }
    
    debouncedUpdate.timeoutId = setTimeout(() => {
      // Update parent state (this would normally use a callback or context)
      // For demo purposes, we'll trigger a custom event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('profile-update', {
          detail: { [key]: value }
        }));
      }
    }, 150);
  }, []);
  
  // Attach the debounce function property
  if (!debouncedUpdate.hasOwnProperty('timeoutId')) {
    (debouncedUpdate as any).timeoutId = null;
  }
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={previewRef}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-[340px] max-w-[90vw] bg-[#0a0a0a] rounded-[2.5rem] border-4 border-[#1a1a1a] shadow-2xl overflow-hidden backdrop-blur-md"
          style={{
            backgroundColor: 'rgba(10, 10, 10, 0.85)',
            borderColor: 'rgba(26, 26, 26, 0.7)'
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 transition-all duration-200 hover:scale-105"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          
          {/* Phone frame */}
          <div className="relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-black/60 rounded-full" />
            
            {/* Screen */}
            <div className="w-full h-[580px] bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] p-6 pt-12 relative">
              
                {/* Status bar */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[10px] text-white/40">9:41</div>
                  <div className="flex gap-1">
                    <div className="w-8 h-1 bg-white/20 rounded-full" />
                    <div className="w-5 h-1 bg-white/20 rounded-full" />
                  </div>
                </div>

                {/* Background Image */}
                {previewState.bgImage && (
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src={previewState.bgImage} 
                      alt="" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Profile Card */}
                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="relative mx-auto mb-4 w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/30">
                    <img 
                      src={previewState.profileImage || 'https://i.pravatar.cc/150?u=gamer'} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      style={{ 
                        opacity: previewState.profileOpacity / 100,
                        filter: `blur(${previewState.profileBlur / 10}px)`
                      }}
                    />
                    {(!previewState.profileImage || previewState.profileOpacity < 100) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                        <span className="text-2xl">🔥</span>
                      </div>
                    )}
                    
                    {/* Glow effect */}
                    {(previewState.glowUsername || previewState.glowSocials) && (
                      <div className="absolute inset-0 -rounded-full pointer-events-none" 
                        style={{
                          background: 'radial-gradient(circle, var(--tw-gradient-stops))',
                          backgroundImage: 'linear-gradient(45deg, #a855f7, #ec4899)',
                          opacity: 0.3,
                          animation: 'pulse 2s ease-in-out infinite'
                        }}
                      />
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="text-center space-y-2">
                    <h3 className="text-base font-bold text-white">
                      @{previewState.username || 'user'}
                    </h3>
                    <p className="text-[11px] text-white/50 max-w-[200px] mx-auto">
                      {previewState.description || 'Digital creator'}
                    </p>
                    
                    {previewState.location !== "None" && (
                      <div className="flex items-center justify-center gap-1 text-[10px] text-white/40">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8 6 5 9.5 5 14c0 2.5 2 5 5 6.5l5-5.5c3-1.5 5-3.5 5-6.5 0-4.5-4-8-8-8zm0 12c-1.5 0-3-1-4-2.5s-2-4-2-6.5 2-6 5-8 4-2 4-2 0 8-5 12z"/>
                        </svg>
                        {previewState.location}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="mt-6 space-y-2 px-4">
                  {[
                    { name: "Twitter", icon: "🐦", color: "#1da1f2" },
                    { name: "Instagram", icon: "📷", color: "#e4405f" },
                    { name: "YouTube", icon: "▶️", color: "#ff0000" },
                    { name: "Discord", icon: "💬", color: "#5865f2" },
                    { name: "GitHub", icon: "<>", color: "#ffffff" },
                    { name: "Spotify", icon: "Ⓜ️", color: "#1db954" }
                  ].map((link, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-300"
                      style={{
                        backgroundColor: previewState.glowSocials 
                          ? `${link.color}15` 
                          : 'rgba(255, 255, 255, 0.03)',
                        color: previewState.glowSocials ? link.color : 'white',
                        border: previewState.glowSocials 
                          ? `1px solid ${link.color}30` 
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        boxShadow: previewState.glowSocials 
                          ? `0 0 ${12}px ${link.color}40` 
                          : 'none',
                        transform: 'translateZ(0)'
                      }}
                    >
                      {link.name}
                    </div>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-white/40">
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/50">
                      <path d="M12 4.5c-5.33 4-8 6.5-8 9.5 0 3.04 2.54 5.5 8 5.5 5.46 0 8-2.46 8-5.5 0-3-2.67-5.5-8-9.5zM12 16.5c-3.31 0-6-2.19-6-4.5s2.69-4.5 6-4.5 6 2.19 6 4.5-2.69 4.5-6 4.5z"/>
                    </svg>
                    <span>{(parseInt(profileState.views?.toString() || '0') || 0).toLocaleString()} views</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white/50">
                      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4c-4.73 0-8.6 3.51-9.96 8.02-1.36-4.51-5.23-8.02-9.96-8.02-1.36 0-2.55.99-3.19 2.42-1.08 1.07-1.69 2.68-1.69 4.42 0 3.25 2.31 5.83 5.24 6.43l2.07-.21c.56-.34 1.14-.49 1.71-.49.57 0 1.11.18 1.58.52l-.01.14c0 .72.4 1.33.9 1.66l2.16-.23c-.52-.12-1-.42-1.27-.85-.27-.43-.43-.93-.43-1.48 0-1.25.48-2.34 1.09-3.24z"/>
                    </svg>
                    <span>Shared 124 times</span>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}