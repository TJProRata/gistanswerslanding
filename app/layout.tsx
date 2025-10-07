import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gist Answers — Customized AI search & engagement tools",
  description: "Transform your website with Gist Answers: customizable AI-powered search and engagement tools designed for publishers and content creators to enhance user engagement and create new revenue streams.",
  openGraph: {
    title: "Gist Answers — Customized AI search & engagement tools",
    description: "Transform your website with Gist Answers: customizable AI-powered search and engagement tools designed for publishers and content creators to enhance user engagement and create new revenue streams.",
    url: "https://gist.ai/answers/",
    siteName: "Gist AI",
    images: [
      {
        url: "https://gist.ai/wp-content/uploads/2025/09/OGshare-OS.png",
        width: 1200,
        height: 630,
        alt: "Gist Answers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://gist.ai/wp-content/uploads/2025/09/OGshare-OS.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17630115188"
          strategy="afterInteractive"
        />
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17630115188');
          `}
        </Script>
      </head>
      <body className="font-inter antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
