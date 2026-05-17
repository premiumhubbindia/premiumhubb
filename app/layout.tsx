import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PremiumHubb",
  description:
    "Premium OTT, AI Tools, Music & Digital Subscription Marketplace",

  keywords: [
    "OTT subscriptions",
    "Netflix",
    "Spotify",
    "AI tools",
    "ChatGPT",
    "Premium subscriptions",
    "Prime Video",
    "YouTube Premium",
  ],

  authors: [
    {
      name: "PremiumHubb",
    },
  ],

  openGraph: {
    title: "PremiumHubb",
    description:
      "Premium OTT, Music, AI Tools & Digital Subscriptions",
    siteName: "PremiumHubb",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >

      <body className="min-h-full flex flex-col bg-black text-white overflow-x-hidden">

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,

            style: {
              background: "#18181b",
              color: "#fff",
              border:
                "1px solid #facc15",
              borderRadius: "18px",
              padding: "16px",
              fontWeight: "600",
            },

            success: {
              iconTheme: {
                primary: "#facc15",
                secondary: "#000",
              },
            },

            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />

        {children}

      </body>

    </html>
  );
}