import type { Metadata } from "next";
import { Poppins, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "@/components/HomePage/Header";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hawi Crotchets",
  description: "Made from sustainable, eco-friendly, re-cycled yarn",
  keywords: "handmade, crochet, sustainable, eco-friendly, recycled",
  themeColor: "#dcc0b4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${dancingScript.variable}`}>
      <body className="font-poppins antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
