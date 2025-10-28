import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harold Manzano - Portfolio",
  description: "Personal portfolio website showcasing experience, education, and projects",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-base">{children}</body>
    </html>
  );
}
