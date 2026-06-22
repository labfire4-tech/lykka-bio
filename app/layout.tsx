import './globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomCursor from "./cursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LYKKA BIO - Premium Link-in-Bio",
  description: "Create stunning, customizable link-in-bio pages with unlimited options",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={`${inter.variable} bg-black text-white min-h-screen`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}