import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MotionIcons — Animated Icon Library",
  description: "A comprehensive library of beautifully animated SVG icons powered by Motion for React. 21 icons with 9 animation types.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-bg">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
