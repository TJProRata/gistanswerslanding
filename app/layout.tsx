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

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1082318440728929');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{display: 'none'}}
            src="https://www.facebook.com/tr?id=1082318440728929&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* TVScientific Pixel */}
        <Script id="tvscientific-pixel" strategy="afterInteractive">
          {`
            (function () {
              var p, s, d, w;
              d = document;
              w = window.location;
              p = d.createElement("IMG");
              s = w.protocol + "//tvspix.com/t.png?&t=" + (new Date).getTime() + "&l=tvscientific-pix-o-21b0ba9e-3013-4fd3-bdee-8b53298efcd4&u3=" + encodeURIComponent(w.href);
              p.setAttribute("src", s);
              p.setAttribute("height", "0");
              p.setAttribute("width", "0");
              p.setAttribute("alt", "");
              p.style.setProperty("display", "none");
              p.style.setProperty("position", "absolute");
              p.style.setProperty("visibility", "hidden");
              d.body.appendChild(p);
            })();
          `}
        </Script>
        {/* End TVScientific Pixel */}

        {/* Widget Script */}
        <script src="https://widget-deploy-hazel.vercel.app/widget.js" defer></script>
      </head>
      <body className="font-inter antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
