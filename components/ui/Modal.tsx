"use client";

import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { motion } from "framer-motion";
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
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);
  const [oauthSuccess, setOauthSuccess] = useState(false);

  const { signIn } = useAuthActions();
  const addToWaitlist = useMutation(api.waitlist.addGist);

  // Handle OAuth return - show spinner then success animation
  useEffect(() => {
    const oauthIntent = localStorage.getItem('gist_oauth_intent');
    if (oauthIntent) {
      localStorage.removeItem('gist_oauth_intent');
      setIsProcessingOAuth(true);

      // Stage 1: Show spinner for 1 second
      setTimeout(() => {
        setIsProcessingOAuth(false);
        setOauthSuccess(true);

        // Stage 2: Show checkmark for 2 seconds, then close
        setTimeout(() => {
          setOauthSuccess(false);
          onClose();
        }, 2000);
      }, 1000);
    }
  }, [onClose]);

  useEffect(() => {
    // Show modal if explicitly open OR if we have submitted state OR processing OAuth or showing OAuth success
    const shouldShowModal = isOpen || submitted || isProcessingOAuth || oauthSuccess;

    if (shouldShowModal) {
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
  }, [isOpen, submitted, isProcessingOAuth, oauthSuccess]);

  const handleGoogleSignIn = () => {
    // Track Google OAuth button click
    if (typeof window !== 'undefined' && (window as any).amplitude) {
      console.log('📊 Amplitude Event:', 'Google OAuth Button Clicked');
      (window as any).amplitude.track('Google OAuth Button Clicked', {
        site: 'gistanswers'
      });
    }

    // Set OAuth intent in localStorage before redirect
    localStorage.setItem('gist_oauth_intent', 'true');

    void signIn("google", { redirectTo: window.location.origin });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Track Continue button click (email signup attempt)
    if (typeof window !== 'undefined' && (window as any).amplitude) {
      console.log('📊 Amplitude Event:', 'Continue Button Clicked', { email: email, method: 'email' });
      (window as any).amplitude.track('Continue Button Clicked', {
        email: email,
        method: 'email',
        site: 'gistanswers'
      });
    }

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
        (window as any).fbq('trackCustom', 'Waitlist');
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

      // Track form submission in Amplitude
      if (typeof window !== 'undefined' && (window as any).amplitude) {
        console.log('📊 Amplitude Event:', 'Join Waitlist Submitted', { email: email, method: 'Email' });
        (window as any).amplitude.track('Join Waitlist Submitted', {
          email: email,
          method: 'email',
          site: 'gistanswers'
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

  // Show modal if explicitly open OR if we have a submitted state OR processing OAuth or showing OAuth success
  if (!isOpen && !submitted && !isProcessingOAuth && !oauthSuccess) return null;

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
            <p className="text-black">Be the first to know when we launch!</p>
          </div>

          {/* Form */}
          {isProcessingOAuth ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-xl font-semibold text-gray-900">Processing your signup...</p>
            </div>
          ) : oauthSuccess ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4"
              >
                <Check className="w-12 h-12 text-white" strokeWidth={3} />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-gray-900"
              >
                Success! You're on the list.
              </motion.p>
            </div>
          ) : !submitted ? (
            <>
              {/* Google Button */}
              <button
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>

              {/* OR Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-600">Or</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  disabled={isSubmitting}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 placeholder-gray-400"
                />

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Continuing..." : "Continue"}
                </button>
              </form>
            </>
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
