import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import StyledJsxRegistry from "./registry";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rachie's Cakes & Pastries",
  description:
    "Rachie's Cakes & Pastries delivers delicious, handcrafted treats for every occasion.",

  openGraph: {
    title: "Rachie's Cakes & Pastries",

    description:
      "Rachie's Cakes & Pastries delivers delicious, handcrafted treats for every occasion.",
    images: "/opengraph-image.png",
    type: "website",
    url: "https://rachie-cakes.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <Footer />
      </body>
    </html>
  );
}