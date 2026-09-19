import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vimalraji.dev"),
  title: {
    default: "Vimal Raji — Senior Software Developer & Technical Lead",
    template: "%s · Vimal Raji",
  },
  description:
    "Vimal Raji is a Senior Software Developer & Technical Lead building scalable healthcare applications with .NET, React, AWS, and modern architecture.",
  keywords: [
    "Vimal Raji",
    "Senior Software Developer",
    "Technical Lead",
    ".NET Developer",
    "React Developer",
    "AWS",
    "Healthcare Software",
    "Full Stack Developer",
  ],
  authors: [{ name: "Vimal Raji" }],
  creator: "Vimal Raji",
  openGraph: {
    type: "website",
    title: "Vimal Raji — Senior Software Developer & Technical Lead",
    description:
      "Building scalable healthcare applications with .NET, React, AWS, and modern architecture.",
    siteName: "Vimal Raji Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vimal Raji — Senior Software Developer & Technical Lead",
    description:
      "Building scalable healthcare applications with .NET, React, AWS, and modern architecture.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <TooltipProvider delay={150}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
