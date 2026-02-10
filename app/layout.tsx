import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const baseUrl = "https://livelyicons.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00ff88",
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "LivelyIcons — Animated React Icon Library with Motion",
    template: "%s | LivelyIcons",
  },
  description:
    "A comprehensive React icon library with 1300+ beautifully animated SVG icons. Built-in hover animations, 9 motion types, tree-shakeable, TypeScript-first, and accessible by default. Powered by Motion for smooth 60fps animations.",
  keywords: [
    "react icons",
    "animated icons",
    "svg icons",
    "motion icons",
    "icon library",
    "react components",
    "typescript icons",
    "hover animations",
    "framer motion icons",
    "accessible icons",
    "tree shakeable icons",
    "next.js icons",
    "tailwind icons",
    "lucide alternative",
    "heroicons alternative",
  ],
  authors: [{ name: "LivelyIcons" }],
  creator: "LivelyIcons",
  publisher: "LivelyIcons",
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "LivelyIcons",
    title: "LivelyIcons — Animated React Icon Library",
    description:
      "1300+ animated SVG icons for React. Built-in hover animations, 9 motion types, tree-shakeable, TypeScript-first. The only icon library with built-in animations.",
    images: [
      {
        url: "/social/169.jpeg",
        width: 1200,
        height: 630,
        alt: "LivelyIcons - Animated React Icon Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LivelyIcons — Animated React Icon Library",
    description:
      "1300+ animated SVG icons for React. Built-in hover animations, 9 motion types, tree-shakeable, TypeScript-first.",
    images: ["/social/169.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
  classification: "Software Library",
  referrer: "origin-when-cross-origin",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "${baseUrl}/#organization",
            "name": "LivelyIcons",
            "url": "${baseUrl}",
            "logo": {
              "@type": "ImageObject",
              "url": "${baseUrl}/logo.svg"
            },
            "sameAs": ["https://github.com/livelyicons/icons"]
          }`}
        </Script>
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "${baseUrl}/#website",
            "url": "${baseUrl}",
            "name": "LivelyIcons",
            "description": "A comprehensive React icon library with 1300+ beautifully animated SVG icons.",
            "publisher": {
              "@id": "${baseUrl}/#organization"
            }
          }`}
        </Script>
        <Script
          id="json-ld-software"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": "${baseUrl}/#software",
            "name": "LivelyIcons",
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "React icon library with 1300+ animated SVG icons. Features 9 animation types, 4 trigger modes, tree-shaking support, TypeScript, and accessibility built-in.",
            "featureList": [
              "1300+ animated SVG icons",
              "9 animation types: scale, rotate, translate, shake, pulse, bounce, draw, spin, none",
              "4 trigger modes: hover, loop, mount, inView",
              "Tree-shakeable - import only what you need",
              "TypeScript first with full type safety",
              "Accessible by default with prefers-reduced-motion support",
              "React Server Components compatible",
              "Powered by Motion for 60fps animations",
              "shadcn/ui registry support"
            ],
            "softwareVersion": "1.0.1",
            "programmingLanguage": ["TypeScript", "JavaScript"],
            "runtimePlatform": ["React", "Next.js"],
            "downloadUrl": "https://www.npmjs.com/package/livelyicons",
            "installUrl": "https://www.npmjs.com/package/livelyicons"
          }`}
        </Script>
      </head>
      <body className="noise-bg">
        <ClerkProvider>
          {children}
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  );
}
