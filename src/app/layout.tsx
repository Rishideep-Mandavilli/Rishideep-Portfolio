import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
// @ts-ignore: CSS module declarations may be missing in this environment
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { CursorField } from "@/components/ui/CursorField";
import { ConsoleSignature } from "@/components/ui/ConsoleSignature";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rishideep Mandavilli | AI Systems Portfolio",
  description:
    "Portfolio of Rishideep Mandavilli, focused on AI interfaces, automation, computer vision, and interactive full-stack systems.",
  keywords: [
    "Rishideep Mandavilli",
    "AI portfolio",
    "computer vision",
    "Next.js developer",
    "automation",
    "interactive portfolio",
  ],
  icons: {
    icon: [
      { url: '/profile.png', sizes: 'any', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${grotesk.variable} ${plexMono.variable}`}>
      <body className="antialiased font-display">
        <AnimatedBackground />
        <CursorField />
        <ConsoleSignature />
        {children}
      </body>
    </html>
  );
}
