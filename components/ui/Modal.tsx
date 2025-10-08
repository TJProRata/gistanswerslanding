"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToWaitlist = useMutation(api.waitlist.addGist);

  useEffect(() => {
    if (isOpen) {
      // Calculate scrollbar width before hiding it
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Prevent body scroll and compensate for scrollbar
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore body scroll and remove padding
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await addToWaitlist({ email });
      setSubmitted(true);

      // Track conversion for Google Ads
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17630115188/Hn0UCLTHr6gbEPTq2NZB',
          'value': 1.0,
          'currency': 'USD'
        });
      }

      // Track Waitlist conversion for Meta Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Waitlist');
      }

      // Track Lead conversion for TVScientific
      if (typeof window !== 'undefined') {
        (function (j: { orderId: string; lastTouchChannel: string }) {
          const l = 'tvscientific-pix-o-21b0ba9e-3013-4fd3-bdee-8b53298efcd4';
          const e = encodeURIComponent;
          const d = document;
          const w = window.location;
          const p = d.createElement("IMG");
          const s = w.protocol + '//tvspix.com/t.png?t=' + (new Date()).getTime() + '&l=' + l + '&u3=' + e(w.href) + '&u1=lead_generated&u4=' + e(j.orderId) + '&u5=' + e(j.lastTouchChannel);
          p.setAttribute("src", s);
          p.setAttribute("height", "0");
          p.setAttribute("width", "0");
          p.setAttribute("alt", "");
          p.style.display = 'none';
          p.style.position = 'fixed';
          d.body.appendChild(p);
        })({
          orderId: email,
          lastTouchChannel: "",
        });
      }

      setTimeout(() => {
        setEmail("");
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (err) {
      // Extract user-friendly error message from Convex error
      let errorMessage = "Failed to join waitlist. Please try again.";

      if (err instanceof Error) {
        // Parse Convex error format: "[CONVEX ...] Uncaught Error: MESSAGE at handler ..."
        const match = err.message.match(/Uncaught Error: (.+?) at /);
        if (match && match[1]) {
          errorMessage = match[1];
        } else {
          // Fallback: try to extract any meaningful message
          errorMessage = err.message.split('\n')[0].replace(/^\[CONVEX.*?\]\s*/, '');
        }
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl max-w-md w-full">
        <div className="p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-secondary hover:text-dark"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold mb-2">Join the Waitlist</h2>
            <p className="text-secondary">Be the first to know when we launch!</p>
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-grimace focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button
                type="submit"
                variant="gradient-icon"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          ) : (
            <div className="text-center py-8">
              <p className="text-xl font-semibold text-grimace">Thank you!</p>
              <p className="text-secondary mt-2">We'll be in touch soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
