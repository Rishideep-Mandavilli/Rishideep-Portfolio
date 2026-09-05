import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résumé — Rishideep Mandavilli",
  description:
    "Résumé of Rishideep Mandavilli — AI systems, full-stack web, computer vision, and interactive interfaces.",
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
