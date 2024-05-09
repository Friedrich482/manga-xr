import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { Children } from "./global";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manga Reading App",
  description: "An Next JS application for reading manga",
};

const RootLayout = ({ children }: Children) => {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
};
export default RootLayout;
