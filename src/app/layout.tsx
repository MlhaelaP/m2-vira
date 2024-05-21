import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import { Toast } from "./components/Toast";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import "./globals.css";
import { NextAuthProvider } from "./Providers";

const font = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "m2vira",
  description:
    "Elevate your wardrobe with our handpicked collection of trendy and timeless fashion pieces.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          font.className +
          " scrollbar-thin scrollbar-rounded-lg scrollbar-track-slate-300 scrollbar-thumb-slate-800"
        }
      >
        <NextAuthProvider>
          <div className="items-center">
            <Toast />
          </div>

          <NavBar />

          <main className="min-h-screen py-3 bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
            {children}
          </main>

          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
