import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Wordmark } from "@/components/logo";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteHeader } from "@/components/site-header";

// Expressive display type with a quieter face for lessons and navigation.
const display = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap" });
const body = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"], display: "swap" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Investing, together | Free investing education",
  description: "Free, beginner-friendly investing education for women and girls.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          {/* The header reads the current path, so it needs a Suspense boundary. */}
          <Suspense fallback={<div className="h-16 border-b" />}>
            <SiteHeader />
          </Suspense>
          {children}
          <footer className="bg-hero text-white">
            <div className="mx-auto flex w-full max-w-6xl items-center px-6 py-8">
              <span className="flex items-center gap-2.5">
                <Wordmark />
              </span>
            </div>
          </footer>
        </MotionProvider>
      </body>
    </html>
  );
}
