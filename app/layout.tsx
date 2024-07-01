import "./globals.css";

import type { Children } from "@/types/layout-types";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
import ThemeProvider from "./provider";

import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import GoBackToTopButton from "@/components/GoBackToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manga-R",
  description: "An Next JS application for reading manga",
};
const RootLayout = ({ children }: Children) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      style={{ scrollBehavior: "smooth" }}
    >
      <body
        className={`${inter.className} flex w-svw flex-col items-center justify-center overflow-x-hidden bg-default-white transition duration-300 ease-in-out dark:bg-default-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="mb-2 w-full">
            <Navbar />
          </header>
          {children}
          <Footer />
        </ThemeProvider>
        <div className="fixed bottom-16 flex w-svw items-center justify-end">
          <GoBackToTopButton />
        </div>
        <div>
          <Toaster />
        </div>
      </body>
    </html>
  );
};
export default RootLayout;
