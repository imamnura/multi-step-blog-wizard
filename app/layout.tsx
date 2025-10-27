import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { PostsProvider } from "@/context/PostsContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ui/ThemeToggle";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased neutral-bg-white text-black [data-theme=dark]:neutral-bg-black [data-theme=dark]:text-white`}
      >
        <ThemeProvider>
          <PostsProvider>
            <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur transition-colors [data-theme=dark]:bg-neutral-900/70 [data-theme=dark]:border-neutral-800 [data-theme=dark]:text-neutral-100">
              <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
                <Link href="/" className="text-lg font-semibold">
                  Blog Wizard
                </Link>
                <nav className="flex gap-3 text-sm">
                  <Link
                    href="/"
                    className="rounded-lg px-3 py-1 hover:bg-neural-100 [data-theme=dark]:hover:bg-neutral-800"
                  >
                    Home
                  </Link>
                  <Link
                    href="/new"
                    className="rounded-lg bg-black px-3 py-1 text-white hover:opacity-90 [data-theme=dark]:hover:bg-white [data-theme=dark]:hover:text-black"
                  >
                    New Post
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </header>
            <main className="mx-auto max-w-5xl p-4 md:p-8 [data-theme=dark]:bg-neutral-900 [data-theme=dark]:text-neutral-100 transition-colors">
              {children}
            </main>
            <footer className="mt-12 border-t p-6 text-center text-sm text-neutral-600 transition-colors [data-theme=dark]:border-neutral-800 [data-theme=dark]:text-neutral-400">
              © {new Date().getFullYear()} Blog Wizard
            </footer>
          </PostsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
