import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";

import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YourBank | Digital Banking Solutions",
    template: "%s | YourBank",
  },

  description:
    "YourBank provides secure, modern and personalized digital banking solutions for individuals and businesses.",

  applicationName: "YourBank",

  keywords: [
    "YourBank",
    "digital banking",
    "online banking",
    "personal banking",
    "business banking",
    "financial services",
  ],

  authors: [
    {
      name: "YourBank",
    },
  ],

  creator: "YourBank",
  publisher: "YourBank",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/icon.png",
  },

  openGraph: {
    title: "YourBank | Digital Banking Solutions",
    description:
      "Secure and personalized banking solutions for individuals and businesses.",
    type: "website",
    siteName: "YourBank",
  },

  twitter: {
    card: "summary",
    title: "YourBank | Digital Banking Solutions",
    description:
      "Secure and personalized banking solutions for individuals and businesses.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {
      media: "(prefers-color-scheme: dark)",
      color: "#191919",
    },
    {
      media: "(prefers-color-scheme: light)",
      color: "#f7f8f3",
    },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexend.className}>{children}</body>
    </html>
  );
}