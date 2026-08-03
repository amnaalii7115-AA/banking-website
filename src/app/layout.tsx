import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YourBank",
  description: "Empowering your financial journey",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lexend.className}>
        {children}
      </body>
    </html>
  );
}