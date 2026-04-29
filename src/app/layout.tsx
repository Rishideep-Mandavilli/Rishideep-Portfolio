import type { Metadata } from "next";
// @ts-ignore: CSS module declarations may be missing in this environment
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

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
    <html lang="en">
      <body className="antialiased">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
