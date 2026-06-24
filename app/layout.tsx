import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';

import { CustomCursor } from '@/app/components/effects/CustomCursor';
import { CRTOverlay } from '@/app/components/effects/CRTOverlay';
import { ParticleEffect } from '@/app/components/effects/ParticleEffect';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' });

export const metadata = {
  title: 'LYKKA.bio — Premium Link-in-Bio Platform',
  description: 'Create stunning, animated link-in-bio pages with premium customization, effects, and analytics.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="font-sans" style={{ backgroundColor: '#000' }}>
        {/* Subtle CRT scanline overlay */}
        <CRTOverlay intensity={0.05} scanlineOpacity={0.03} />

        {/* Ambient particle effects */}
        <div className="pointer-events-none">
          <ParticleEffect type="stars" count={25} size={1} speed={0.2} opacity={0.15} className="z-[9994]" />
        </div>

        {/* Custom cursor — desktop only */}
        <CustomCursor variant="dot" color="#a855f7" size={14} />

        {/* Page content */}
        {children}
      </body>
    </html>
  );
}
