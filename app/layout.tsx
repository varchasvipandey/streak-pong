import type { Metadata } from "next";

import { globalFont } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Streak Pong",
  description:
    "Non-stop PvP Ping-Pong event. Build your streak and join the leaderboard! Let your upcoming opponents spectate you. It's like Gulag of Ping-Pong.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={globalFont.className}>{children}</body>
    </html>
  );
}
