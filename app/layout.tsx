import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "QEVN TOWN — Don't Browse QEVN. Enter QEVN.",
  description:
    "An experimental, interactive 3D digital headquarters and living town engineered by QEVN. Explore engineering, AI research, production projects, culture, and direct commissions.",
  keywords: [
    "QEVN",
    "3D Web",
    "Creative Technology",
    "Brutalist Design",
    "AI Agents",
    "Next.js",
    "Three.js",
    "WebGL",
    "Digital Headquarters",
  ],
  authors: [{ name: "QEVN Engineering" }],
  openGraph: {
    title: "QEVN TOWN — Living Digital World",
    description: "Step into QEVN's 3D town: buildings, AI lab, shipped products, and culture dispatches.",
    type: "website",
    siteName: "QEVN Town",
  },
  twitter: {
    card: "summary_large_image",
    title: "QEVN TOWN — Living Digital World",
    description: "Don't browse QEVN. Enter QEVN.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="h-full w-full bg-[#0A0A0A] text-[#F7F7F2] overflow-hidden select-none">
        {children}
      </body>
    </html>
  );
}
