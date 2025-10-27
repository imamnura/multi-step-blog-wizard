import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { PostsProvider } from "@/context/PostsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Wizard",
  description: "Multi step blog creation wizard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased neutral-bg-white text-black dark:neutral-bg-black dark:text-white`}
      >
        <PostsProvider>
          <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
              <Link href="/" className="text-lg font-semibold">
                Blog Wizard
              </Link>
              <nav className="flex gap-3 text-sm">
                <Link
                  href="/"
                  className="rounded-lg px-3 py-1 hover:bg-neural-100"
                >
                  Home
                </Link>
                <Link
                  href="/new"
                  className="rounded-lg bg-black px-3 py-1 text-white hover:opacity-90"
                >
                  New Post
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl p-4 md:p-8">{children}</main>
          <footer className="mt-12 border-t p-6 text-center text-sm text-neutral-600">
            © {new Date().getFullYear()} Blog Wizard
          </footer>
        </PostsProvider>
      </body>
    </html>
  );
}
