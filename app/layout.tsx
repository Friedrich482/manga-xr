import "./globals.css";

import Footer from "@/components/Footer";
import GoBackToTopButton from "@/components/GoBackToTopButton";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import ThemeProvider from "./provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MangaXR",
  description: "An Next JS application for reading manga",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      style={{ scrollBehavior: "smooth" }}
    >
      <body
        className={`${inter.className} flex w-svw flex-col items-center justify-center overflow-x-hidden bg-default-white pt-[5.5rem] transition duration-300 ease-in-out dark:bg-default-black`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header className="w-full">
            <Navbar />
          </header>
          {children}
          <Footer />
          <div className="fixed bottom-16 flex w-svw items-center justify-end">
            <GoBackToTopButton />
          </div>
          <div>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};
export default RootLayout;
