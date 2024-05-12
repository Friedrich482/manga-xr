import "./globals.css";

import type { Children } from "@/types/layout-types";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import ThemeProvider from "./provider";

import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manga-R",
  description: "An Next JS application for reading manga",
};
import { useTheme } from "next-themes";

const RootLayout = ({ children }: Children) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="mb-2">
            <Navbar />
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
