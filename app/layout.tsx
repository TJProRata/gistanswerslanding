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

        {/* Amplitude Analytics */}
        <Script id="amplitude-init" strategy="afterInteractive">
          {`
            !function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:{}};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-+EO59vL/X7v6VE2s6/F4HxfHlK0nDUVWKVg8K9oUlvffAeeaShVBmbORTC2D3UF+",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-2.7.2-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];s.parentNode.insertBefore(n,s);for(var o=function(){return this._q=[],this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=0;a<i.length;a++)r.Identify.prototype[i[a]]=o;for(var u=function(){this._q=[];return this},c=["setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],p=0;p<c.length;p++)r.Revenue.prototype[c[p]]=u;var l=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],d=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];for(var v=0;v<l.length;v++)r[l[v]]=function(e){return function(){r._q.push({name:e,args:Array.prototype.slice.call(arguments,0)})}}(l[v]);for(var f=0;f<d.length;f++)r[d[f]]=function(e){return function(){r._q.push({name:e,args:Array.prototype.slice.call(arguments,0)})}}(d[f]);e.amplitude=r}}(window,document);

            amplitude.init('19e735be5fa8c1ba8413eec5978b65e4', {
              defaultTracking: {
                pageViews: true
              }
            });
          `}
        </Script>

        {/* Widget Script */}
        <script src="https://widget-deploy-hazel.vercel.app/widget.js" defer></script>
      </head>
      <body className="font-inter antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
