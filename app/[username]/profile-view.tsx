"use client;

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

// Liquid shadow effect for buttons and interactive elements
const liquidShadow = (color: string) => ({
  shadow: `0 4px 12px rgba(${hexToRgb(color)}, 0.3), 
           0 0 25px rgba(${hexToRgb(color)}, 0.2),
           0 0 50px rgba(${hexToRgb(color)}, 0.15)`,
});

const hexToRgb = (hex: string) =>
  hex.length === 4
    ? hex
        .split('')
        .map((x) => x + x)
        .join('')
        .match(/.{2}/g)!
        .map((x) => parseInt(x, 16))
        .map((x) => x / 255 * 255)
        .reverse()
        .join(',')
        .replace(/^0x/, '')
        .split(',')
        .slice(0, 3)
        .join(',')
    : hex
      .match(/.{2}/g)!
      .map((x) => parseInt(x, 16))
      .map((x) => x / 255 * 255)
      .reverse()
      .join(',')
      .replace(/^0x/, '')
      .split(',')
      .slice(0, 3)
      .join(',');

interface Profile {
  username: string;
  displayName: string;
  bio?: string;
  avatar: string;
  theme?: {
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    rounded?: string;
  };
  socialLinks: Array<{ name: string; url: string; icon: string; color?: string }>;
}

const DEMO_PROFILE: Profile = {
  username: 'gamer',
  displayName: 'AZRAEL',
  bio: 'Digital creator',
  avatar: 'https://i.pravatar.cc/150?u=gamer',
  theme: { backgroundColor: '#111', textColor: '#fff', accentColor: '#a855f7', rounded: 'full' },
  socialLinks: [
    { name: 'Twitter', url: 'https://twitter.com', icon: 'fa-twitter', color: '#1da1f2' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'fa-instagram', color: '#e4405f' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-youtube', color: '#ff0000' },
    { name: 'Discord', url: 'https://discord.com', icon: 'fa-discord', color: '#5865f2' },
  ],
};

const COLORS: Record<string, string> = {
  Twitter: '#1da1f2',
  Instagram: '#e4405f',
  YouTube: '#ff0000',
  Twitch: '#6441a5',
  Discord: '#5865f2',
  GitHub: '#ffffff',
  TikTok: '#ffffff',
  LinkedIn: '#0077b5',
  Spotify: '#1db954',
  Steam: '#171a21',
};

export default function ProfileView() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [views, setViews] = useState(0);

  useEffect(() => {
    if (pathname === '/demo') {
      setProfile(DEMO_PROFILE);
    } else {
      const saved = localStorage.getItem('lykka-profile');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.username) setProfile(parsed);
        } catch {}
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!profile?.username) return;
    fetch(`https://api.counterapi.dev/v1/lykka-bio/${profile.username}/up`)
      .then(r => r.json())
      .then(d => setViews(d.count || 0))
      .catch(() => setViews(0));
  }, [profile?.username]);

  if (!profile) {
    return (
      <div className='min-h-screen bg-black text-white flex items-center justify-center py-12 px-6 font-sans' style={{ backdropFilter: 'blur(10px)' }}>
        <div className='text-center'>
          <h1 className='text-2xl md:text-3xl font-bold tracking-wide'>Profile not found</h1>
          <p className='text-white/60 mt-3'>Create a profile to showcase your style</p>
          <a href='/customize' className='mt-6 inline-block rounded-full bg-purple-600 text-white px-8 py-3 transition-all destroy-hover hover:bg-purple-700 shadow-[0_10px_25px_rgba(168,85,247,0.4)]'>
            Create One
          </a>
        </div>
      </div>
    );
  }

  const theme = profile.theme || { backgroundColor: '#111', textColor: '#fff', accentColor: '#a855f7', rounded: 'full' };
  const accentColorRgb = theme.accentColor.match(/\w+/g) ? theme.accentColor : '#a855f7';

  return (
    <div className='min-h-screen bg-black text-white relative overflow-hidden' style={{ background: theme.backgroundColor || '#111' }}>
      {/* Glass background with CRT overlay */}
      <div className='absolute inset-0 pointer-events-none opacity-15'>
        <canvas className='fixed inset-0 pointer-events-none' />
      </div>
      
      {/* Custom cursor */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='fixed w-[32px] h-[32px] rounded-full bg-purple-600/20 border-2 border-purple-400/30 translate-negative-50 -translate-x-50 -translate-y-50 pointer-events-auto animate-pulse-glow'></div>
      </div>
      
      {/* Profile container */}
      <div className='relative max-w-4xl mx-auto p-6' style={{ backdropFilter: 'blur(24px)', backgroundColor: 'rgba(0,0,0,0.6)' }}>
        {/* Neon accent lines */}
        <div className='pointer-events-none mb-12 opacity-50'>
          <motion.div className='absolute top-0 left-0 h-8 w-12 rounded-full bg-accentColor/30' animate={{ x: [0, 100, 200] }} transition={{ duration: 3, repeat: Infinity }}
            styles={{ backgroundColor: { 'accentColor': { value: theme.accentColor } } }} />
          <motion.div className='absolute bottom-0 right-0 h-8 w-12 rounded-full bg-accentColor/30' animate={{ x: [0, -100, -200] }} transition={{ duration: 3, repeat: Infinity }}
            styles={{ backgroundColor: { 'accentColor': { value: theme.accentColor } } }} />
        </div>

        {/* Profile image with interactive glow */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'spring', stiffness: 180 }}
          className='border-[8px] border-gradient-to-r from-amber-500/20 to-purple-500/20 model-minimal'
        >
          <img 
            src={profile.avatar || 'https://i.pravatar.cc/150?u=gamer'} 
            alt={profile.displayName}
            className='w-36 h-36 rounded-full mx-auto object-cover border-[8px] border-purple-500/30 shadow-[0_8px_30px_rgba(168,85,247,0.4)] transform-gpu hover:shadow-[0_8px_40px_rgba(168,85,247,0.6)] hover:scale-105 transition-transform duration-300 object-cover'
            style={{ opacity: 0.95 }}
          />
        </motion.div>

        {/* Name and bio */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className='flex flex-col items-center mb-3'>
          <h1 
            className='text-3xl md:text-4xl font-bold tracking-tight text-white font-monospace mx-1'
            style={{ background: 'linear-gradient(90deg, white 0%, transparent 60%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {profile.displayName.toUpperCase()}
          </h1>
          <p 
            className='text-lg md:text-xl text-purple-300 mt-1 max-w-md text-center font-medium' 
            style={{ letterSpacing: '0.5px' }}
          >
            {profile.bio || 'Digital creator'}
          </p>
        </motion.div>

        {/* Social links - minimalist custom buttons */}
        <div className='mt-10 flex justify-center space-x-12'>
          {profile.socialLinks.map((link) => (
            <motion.a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className='flex items-center justify-center gap-3 rounded-xl px-5 py-2.5 text-sm font-medium text-purple-400 backdrop-filter: blur(4px) transition-all transform-gpu hover:transform translateY(-2) hover:scale-102 duration-300 snapshot border-[1px] border-purple-500/30'
              style={{
                backgroundColor: theme.accentColor ? `rgba(${hexToRgb(theme.accentColor)}, 0.15)` : 'rgba(255,255,255,0.05)',
                borderColor: theme.accentColor || '#a855f7',
                color: theme.accentColor || '#a855f7',
              }}
              style={{ textShadow: '0 0 10px rgba(168,85,247,0.1)' }}
              whileHover={(e) => {
                e.preventDefault();
                e.currentTarget.style.transform = 'translateY(-2) scale(1.02)';
              }}
            >
              <i 
                className={`fab ${link.icon.replace('fa-', '')}`} 
                style={{ 
                  fontSize: '1.1rem', 
                  filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.35))',
                  transition: 'filter 0.3s ease'
                }}
                whileHover={(e) => {
                  e.currentTarget.style.filter = 'drop-shadow(0 0 15px rgba(168,85,247,0.6))';
                }}
              >
                {link.icon}
              </i>
              <span className='transition-all duration-300' style={{ textShadow: '0 0 5px rgba(255,255,255,0.2)' }}>
                {link.name}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Stats section */}
        <div className='mt-15 flex flex-col items-center space-y-4' animated-variant='fadeIn'>
          <div className='relative w-full bg-white/5 px-6 py-4 rounded-2xl backdrop-blur-lg border-[1px] border-white/10 animatedvariant='glow'</div>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>👁️</div>
            <div className='flex flex-col'>
              <div className='text-xs text-white/60 font-monospace tracking-wide'>Profile Views</div>
              <motion.h2 
                className='text-white font-monospace text-xl leading-none'
                style={{ background: 'linear-gradient(90deg, white 0%, transparent 60%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {views.toLocaleString()}
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className='mt-12 flex flex-col sm:flex-row justify-center gap-6' className='pointer-events-none'>
          <motion.div
            className='flex flex-col items-center justify-center rounded-xl bg-purple-600/30 px-8 py-4 shadow-sm hover:shadow-xl transition-all transform-gpu destroy-hover hover:scale-105'
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <span className='text-white text-purple-100 text-sm font-medium'>Create Profile</span>
          </div>
          <motion.div
            className='flex flex-col items-center justify-center rounded-xl bg-white/15 px-8 py-4 shadow-sm hover:shadow-xl transition-all transform-gpu destroy-hover hover:scale-105'
            style={{ backdropFilter: 'blur(12px)' }}
          >
            <span className='text-white text-white/80 text-sm font-medium'>Messages Asking For Invites</span>
          </div>
        </div>
      </div>

      {/* Optional CRT scan effect overlay */}
      <div className='fixed inset-0 pointer-events-none opacity-5 animate-rainbow-scanlines' />
    </div>
  );
}