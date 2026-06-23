"use client";

import { useState, useEffect } from 'react';
import { motion, useTransition, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import { StatCard } from '@/app/components/ui/StatCard';
import LivePreview from '@/app/components/effects/LivePreview';
import ParticleEffect from '@/app/components/effects/ParticleEffect';
import { GlassPanel } from '@/app/components/effects/GlassPanel';

export default function DashboardPage() {
  const [userStats] = useState({
    totalViews: 15847,
    profileClicks: 8932,
    recentGrowth: 23.5,
    conversionRate: 4.2,
    followers: 1240,
    following: 89
  });
  
  const [livePreview, setLivePreview] = useState(false);
  const [theme, setTheme] = useState({
    backgroundColor: '#000000',
    textColor: '#ffffff',
    accentColor: '#a855f7',
    rounded: 'full'
  });
  
  const [profileState, setProfileState] = useState({
    username: 'gamer',
    displayName: 'AZRAEL',
    bio: 'Digital creator • Gamer • Streamer',
    avatar: 'https://i.pravatar.cc/150?u=gamer',
    theme: {
      backgroundColor: '#000000',
      textColor: '#ffffff',
      accentColor: '#a855f7',
      rounded: 'full'
    },
    socialLinks: [
      { name: 'Twitter', url: 'https://twitter.com', icon: 'fa-twitter', color: '#1da1f2' },
      { name: 'Instagram', url: 'https://instagram.com', icon: 'fa-instagram', color: '#e4405f' },
      { name: 'YouTube', url: 'https://youtube.com', icon: 'fa-youtube', color: '#ff0000' },
      { name: 'Discord', url: 'https://discord.com', icon: 'fa-discord', color: '#5865f2' },
    ]
  });
  
  const [transition] = useTransition({
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats randomly
      setUserStats(prev => ({
        ...prev,
        totalViews: prev.totalViews + Math.floor(Math.random() * 10),
        profileClicks: prev.profileClicks + Math.floor(Math.random() * 5),
        followers: Math.max(0, prev.followers + Math.floor(Math.random() * 3) - 1),
        following: Math.max(0, prev.following + Math.floor(Math.random() * 2) - 1)
      }));
      
      // Update profile data occasionally
      if (Math.random() > 0.9) {
        setProfileState(prev => ({
          ...prev,
          displayName: ['AZRAEL', 'Nyx', 'Vortex', 'Pixel', 'Neon'][Math.floor(Math.random() * 5)],
          bio: ['Digital creator • Gamer • Streamer', 'Creating content daily', 'Streaming games & art', 'Building my online presence'][Math.floor(Math.random() * 4)]
        }));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleTogglePreview = () => {
    setLivePreview(!livePreview);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-effects-none">
        <ParticleEffect type="stars" count={30} size={1.5} speed={0.5} opacity={0.3} />
        <ParticleEffect type="pulse" count={15} size={3} speed={1} opacity={0.2} color={['#a855f7', '#ec4899']} />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-white/60">Welcome back, {profileState.displayName}!</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleTogglePreview}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4.5c-5.33 4-8 6.5-8 9.5 0 3.04 2.54 5.5 8 5.5 5.46 0 8-2.46 8-5.5 0-3-2.67-5.5-8-9.5zM12 16.5c-3.31 0-6-2.19-6-4.5s2.69-4.5 6-4.5 6 2.19 6 4.5-2.69 4.5-6 4.5z"/>
                </svg>
                <span>{livePreview ? 'Hide Preview' : 'Show Preview'}</span>
              </button>
              
              <Link href="/customize" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 4v16m8-8H4" />
                </svg>
                <span>Edit Profile</span>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            asChild
          >
            <StatCard 
              title="Total Views"
              value={userStats.totalViews.toLocaleString()}
              change="+12.3%"
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-purple-400"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13L9 10.5l-2.5-1.5L4.5 12l2.5 2.5 5-5 2.5 2.5L19.5 12l-2.5-2.5-1.5-1.5-2.5 2.5-2.5-2.5z"/></svg>}
              color="#a855f7"
              trend="up"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            asChild
          >
            <StatCard 
              title="Profile Clicks"
              value={userStats.profileClicks.toLocaleString()}
              change="+8.2%"
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400"><path d="M21.39 11.13l-3.87-3.87a4.46 4.46 0 0 0-6.32 0L2.69 14.72a4.46 4.46 0 0 0 0 6.32l4.77 4.77c1.75 1.75 4.6 1.75 6.32 0l3.87-3.87a4.46 4.46 0 0 0 0-6.32zM9.68 15a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>}
              color="#3b82f6"
              trend="up"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            asChild
          >
            <StatCard 
              title="Growth Rate"
              value={`${userStats.recentGrowth}%`}
              change="+2.1%"
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-400"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.33-6.33L18 9.34z"/></svg>}
              color="#10b981"
              trend="up"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            asChild
          >
            <StatCard 
              title="Followers"
              value={userStats.followers.toLocaleString()}
              change="+5"
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-pink-400"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13L9 10.5l-2.5-1.5L4.5 12l2.5 2.5 5-5 2.5 2.5L19.5 12l-2.5-2.5-1.5-1.5-2.5 2.5-2.5-2.5z"/></svg>}
              color="#ec4899"
              trend="up"
            />
          </motion.div>
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            asChild
          >
            <GlassPanel title="Analytics Overview" subtitle="Last 30 days" glow>
              <div className="space-y-4">
                {/* Chart container */}
                <div className="h-64 relative">
                  {/* Chart grid */}
                  <div className="absolute inset-0 pointer-events-none grid grid-cols-12 grid-rows-6 gap-0.5">
                    {[...Array(6)].map((_, rowIndex) => (
                      <div key={`h-${rowIndex}`} className="col-span-12 border-b border-white/5" />
                    ))}
                    {[...Array(12)].map((_, colIndex) => (
                      <div key={`v-${colIndex}`} className="row-span-6 border-r border-white/5" />
                    ))}
                  </div>
                  
                  {/* Chart data */}
                  <div className="absolute inset-0 pointer-events-none flex items-end justify-between gap-1 px-2 pb-2">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const height = 20 + Math.random() * 40; // 20-60px height
                      const delay = i * 0.05;
                      return (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height }}
                          transition={{ delay, duration: 0.6, ease: "easeOut" }}
                          className="w-full bg-gradient-to-t from-purple-600/50 to-purple-400/50 rounded-t-lg"
                          style={{ 
                            opacity: 0.7,
                            background: `linear-gradient(to top, rgba(168, 85, 247, ${0.1 + (i / 12) * 0.6}), rgba(168, 85, 247, ${0.3 + (i / 12) * 0.4}))`
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Chart labels */}
                  <div className="absolute bottom-0 left-0 right-0 h-10 flex items-center justify-between px-2 text-xs text-white/40">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => (
                      <span key={month} className="w-[calc(100%/12)] text-center">{month}</span>
                    ))}
                  </div>
                </div>
                
                {/* Chart legend */}
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500/50 rounded" />
                    <span className="text-xs">Profile Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-pink-500/50 rounded" />
                    <span className="text-xs">Engagement Rate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500/50 rounded" />
                    <span className="text-xs">Click Through Rate</span>
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
          
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            asChild
          >
            <GlassPanel title="Recent Activity">
              <div className="space-y-4">
                {[
                  { action: 'Profile viewed', user: 'alex_gamer', time: '2m ago', type: 'view', icon: '👁️' },
                  { action: 'New follower', user: 'sarah_stream', time: '15m ago', type: 'follow', icon: '👥' },
                  { action: 'Social link clicked', user: 'mike_games', time: '1h ago', type: 'click', icon: '🔗' },
                  { action: 'Profile updated', user: 'you', time: '2h ago', type: 'update', icon: '✏️' },
                  { action: 'New message', user: 'emma_stream', time: '5h ago', type: 'message', icon: '💬' },
                  { action: 'Content shared', user: 'tech_guru', time: '6h ago', type: 'share', icon: '📤' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                    className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0 last:pb-0"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full 
                        ${activity.type === 'view' ? 'bg-blue-600/20 text-blue-400' :
                          activity.type === 'follow' ? 'bg-green-600/20 text-green-400' :
                          activity.type === 'click' ? 'bg-purple-600/20 text-purple-400' :
                          activity.type === 'update' ? 'bg-orange-600/20 text-orange-400' :
                          activity.type === 'message' ? 'bg-pink-600/20 text-pink-400' :
                          activity.type === 'share' ? 'bg-yellow-600/20 text-yellow-400' :
                          'bg-gray-600/20 text-gray-400'}"
                      >
                        {activity.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{activity.action}</p>
                      <p className="text-xs text-white/40">from @{activity.user}</p>
                    </div>
                    <span className="text-xs text-white/40 whitespace-nowrap">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>
          
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            asChild
          >
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Live Preview</h2>
              <div className="flex justify-center">
                <button
                  onClick={handleTogglePreview}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all duration-300"
                >
                  {livePreview ? 'Hide Preview' : 'Show Live Preview'}
                </button>
              </div>
              
              {livePreview && (
                <div className="mt-4">
                  <AnimatePresence>
                    <LivePreview 
                      key="live-preview"
                      profileState={profileState}
                      isVisible={true}
                      onClose={() => setLivePreview(false)}
                    />
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// StatsCard component
function StatCard({ title, value, change, icon, color, trend }: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode; 
  color: string; 
  trend: 'up' | 'down' | 'neutral' 
}) {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-yellow-400'
  }[trend];
  
  const trendIcon = {
    up: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14l5-5 5 5z" />
      </svg>
    ),
    down: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5z" />
      </svg>
    ),
    neutral: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 12h14v2H5z" />
      </svg>
    )
  }[trend];
  
  return (
    <div className="rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 group"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderColor: `${color}20`,
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
          {trendIcon}
          <span>{change}</span>
        </div>
      </div>
      
      <h3 className="text-white/60 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}