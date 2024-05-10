import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { Children } from "./global";

import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manga-R",
  description: "An Next JS application for reading manga",
};
import "./globals.css";
const RootLayout = ({ children }: Children) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="mb-2">
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
};
export default RootLayout;
