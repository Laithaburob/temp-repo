
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI-Enhanced LMS Platform",
  description: "Modern Learning Management System with AI Features",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`min-h-screen antialiased bg-background ${geist.className}`}>
        {children}
      </body>
    </html>
  );
}
