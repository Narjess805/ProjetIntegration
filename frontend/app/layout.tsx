import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: "NOIR // ACADEMIC COMMAND",
  description: "Next-generation institutional intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans h-full bg-[#050505] text-white antialiased selection:bg-primary/40`}>
        <div className="bg-grid" />
        <div className="bg-scanlines" />
        
        <div className="flex min-h-screen relative z-10">
          <Sidebar />
          <main className="flex-1 lg:pl-72 transition-all duration-500">
            <div className="max-w-7xl mx-auto px-6 py-8 lg:px-16 lg:py-16">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

