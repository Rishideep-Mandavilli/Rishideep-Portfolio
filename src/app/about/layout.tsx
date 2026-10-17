import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Rishideep Mandavilli works: operating principles, the tools behind the builds, the path so far, and the parts that are honestly not finished yet.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
