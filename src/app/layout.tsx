import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "StreakIt",
  description: "Track your daily progress here!! Maintain your streak!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  category: "Productivity",
  keywords: ["streak", "progress", "daily", "track", "habit"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
