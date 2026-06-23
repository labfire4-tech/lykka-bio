import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Libre_Barcode_128_Text } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LYKKA BIO - Premium Link-in-Bio",
  description: "The most advanced link-in-bio platform. Create stunning profiles with themes, animations, and effects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={`${inter.variable} bg-black text-white min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
