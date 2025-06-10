import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/globals.css";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SyncoHR",
  description: "Your complete HR solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${interSans.variable} ${jetBrainsMono.variable} ${outfitSans.variable} flex min-h-dvh flex-col antialiased`}
        >
          <Navbar />
          <main className="mx-auto max-w-screen-xl flex-1 space-y-16 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
