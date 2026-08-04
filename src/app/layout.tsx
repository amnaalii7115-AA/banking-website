import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";

import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),

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
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },

  openGraph: {
    title: "YourBank | Digital Banking Solutions",

    description:
      "Secure and personalized banking solutions for individuals and businesses.",

    type: "website",
    siteName: "YourBank",

    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "YourBank logo",
      },
    ],
  },

  twitter: {
    card: "summary",

    title: "YourBank | Digital Banking Solutions",

    description:
      "Secure and personalized banking solutions for individuals and businesses.",

    images: ["/icon.png"],
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
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className={lexend.className}>
        {children}
      </body>
    </html>
  );
}