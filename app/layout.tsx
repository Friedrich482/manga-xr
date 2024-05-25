export const revalidate = 1800;

import "./globals.css";

import type { Children } from "@/types/layout-types";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import ThemeProvider from "./provider";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manga-R",
  description: "An Next JS application for reading manga",
};

const RootLayout = ({ children }: Children) => {
  return (
    <html lang="en" suppressHydrationWarning={true} className="">
      <body
        className={`${inter.className} flex flex-col items-center justify-center overflow-x-hidden bg-default-white transition duration-300 ease-in-out dark:bg-default-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="mb-2 w-full">
            <Navbar />
          </header>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
