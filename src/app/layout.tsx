import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter, Outfit, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { StoreProvider } from "@/providers/StoreProvider";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
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
          className={`${interSans.variable} ${outfitSans.variable} ${geistMono.variable} antialiased`}
        >
          <StoreProvider>
            <main className="mx-auto max-w-screen-2xl">{children}</main>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
