"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  useEffect(() => {
    // Track Lead conversion for Meta Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    // Track conversion for Google Ads
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17630115188/Hn0UCLTHr6gbEPTq2NZB',
        'value': 1.0,
        'currency': 'USD'
      });
    }

    // Track Lead conversion for Amplitude
    if (typeof window !== 'undefined' && (window as any).amplitude) {
      (window as any).amplitude.track('Thank You Page Viewed', {
        site: 'gistanswers'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-12 py-8">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://gist.ai/wp-content/uploads/2025/09/gist-logo-dark-TM.svg"
              alt="Gist AI"
              width={82}
              height={31}
              priority
            />
          </Link>
        </div>
      </header>

      {/* Success Content */}
      <main className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-8"
          >
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </motion.div>

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
              Thank You!
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              You're on the waitlist. We'll be in touch soon.
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
