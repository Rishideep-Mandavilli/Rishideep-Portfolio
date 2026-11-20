import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Résumé of Rishideep Mandavilli — UI/UX & Frontend Lead at VoidLabs, Full-Stack Developer at CrossStack, AI products, and interactive interfaces.",
  alternates: { canonical: "/resume" },
};

export default function ResumeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
