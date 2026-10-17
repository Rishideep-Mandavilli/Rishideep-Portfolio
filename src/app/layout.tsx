import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
// @ts-ignore: CSS module declarations may be missing in this environment
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { CursorField } from "@/components/ui/CursorField";
import { ConsoleSignature } from "@/components/ui/ConsoleSignature";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | AI Products, Full-Stack & Design Portfolio`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Portfolio of Rishideep Mandavilli — AI products that run on real devices, full-stack web platforms, and UI/UX-led interactive interfaces.",
  keywords: [
    "Rishideep Mandavilli",
    "AI products portfolio",
    "full-stack developer",
    "UI UX designer",
    "Next.js developer",
    "speech to text",
    "on-device AI",
    "interactive portfolio",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description:
      "Voice, speech and retrieval systems that run on real devices, plus the full-stack surfaces and design systems that make them usable.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description:
      "Voice, speech and retrieval systems that run on real devices, plus the full-stack surfaces and design systems that make them usable.",
    creator: "@RishideepM15",
  },
  robots: { index: true, follow: true },
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <AnimatedBackground />
        <CursorField />
        <ConsoleSignature />
        {children}
      </body>
    </html>
  );
}
