import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthCheck from "@/component/authCheck.component";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Notes",
  description: "Organize your thoughts with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCheck />
        {children}
      </body>
    </html>
  );
}
