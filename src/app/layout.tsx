import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "sonner";

const late = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Kommu",
  description: "App sync communication develop by candydev",
};

export const revalidate = 0

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={late.className}>
        <main> {children}</main>
        <Toaster />
      </body>
    </html>
  );
}
