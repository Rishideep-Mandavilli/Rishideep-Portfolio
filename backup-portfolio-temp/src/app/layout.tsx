import type { Metadata } from "next";
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

export const metadata: Metadata = {
  title: "Rishideep Mandavilli",
  description: "Building Intelligent Systems",
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