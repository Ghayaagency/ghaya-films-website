import type { Metadata } from "next";
import { body, display, arabic, brandon } from "@/lib/fonts";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import GrainOverlay from "@/components/GrainOverlay";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghaya Films",
  description:
    "Ghaya means passion and purpose. A production house exploring human stories, from documentary to social-first content.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${arabic.variable} ${brandon.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-navy-deep text-cream">
        <GrainOverlay />
        <CustomCursor />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
