import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('http://172.171.199.162:3000'),
  title: "Kids Coloring Book - Creative Digital Art for Children",
  description: "A fun and interactive digital coloring book for kids! Choose from beautiful templates, pick your favorite colors, and create amazing artwork with easy-to-use tools.",
  keywords: "kids coloring book, children coloring app, digital coloring, creative art for kids, online coloring pages, educational games",
  authors: [{ name: "Coloring Book App" }],
  creator: "Coloring Book App",
  publisher: "Coloring Book App",
  robots: "index, follow",
  category: "Education",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kids-coloring-book.app",
    siteName: "Kids Coloring Book",
    title: "Kids Coloring Book - Creative Digital Art for Children",
    description: "A fun and interactive digital coloring book for kids! Choose from beautiful templates, pick your favorite colors, and create amazing artwork.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kids Coloring Book - Creative Digital Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@coloringbookapp",
    creator: "@coloringbookapp",
    title: "Kids Coloring Book - Creative Digital Art for Children",
    description: "A fun and interactive digital coloring book for kids! Choose from beautiful templates and create amazing artwork.",
    images: ["/twitter-image.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Kids Coloring Book",
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#3B82F6" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
