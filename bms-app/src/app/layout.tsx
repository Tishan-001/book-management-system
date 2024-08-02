import type { Metadata } from "next";
import { MainLayout } from "@/layout";
import { Inter } from "next/font/google";
import 'slick-carousel/slick/slick.css';
import '@/styles/globals.css';
import '@/styles/react-slick.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Space",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
