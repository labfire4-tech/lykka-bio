import './globals.css';
import { Inter } from 'next/font/google';
import { Crisp } from 'crisp-chat';

import { CustomCursor } from '@/app/components/effects/CustomCursor';
import { CRTOverlay } from '@/app/components/effects/CRTOverlay';
import { ParticleEffect } from '@/app/components/effects/ParticleEffect';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'LYKKA.bio - Premium Link-in-Bio Platform',
  description: 'Create stunning, animated link-in-bio pages with guns.lol-inspired aesthetics',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className} style={{ backgroundColor: '#000' }}>
        {/* Global CRT effect */}
        <CRTOverlay intensity={0.1} scanlineOpacity={0.08} />
        
        {/* Global particle effects */}
        <div className="pointer-events-none">
          <ParticleEffect type="stars" count={40} size={1} speed={0.3} opacity={0.2} className="z-[9994]" />
          <ParticleEffect type="pulse" count={20} size={2.5} speed={0.8} opacity={0.15} color={['#a855f7', '#ec4899']} className="z-[9994]" />
        </div>
        
        {/* Global custom cursor */}
        <CustomCursor variant="trail" color="#a855f7" trailCount={10} size={24} />
        
        {/* Page content */}
        {children}
        
        {typeof window !== 'undefined' && (
          <Crisp 
            websiteId="https://lykka-bio.crisp.chat/" 
          />
        )}
      </body>
    </html>
  );
}