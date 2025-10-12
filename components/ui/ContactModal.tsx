"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const submitContact = useMutation(api.contacts.submitContact);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    websiteUrl: "",
    interests: [] as string[],
    message: "",
    receiveUpdates: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleCheckboxChange = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Submit to Convex
      await submitContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        organization: formData.organization,
        websiteUrl: formData.websiteUrl,
        interests: formData.interests,
        message: formData.message || undefined,
        receiveUpdates: formData.receiveUpdates,
      });

      setSubmitted(true);

      // Track form submission in Amplitude
      if (typeof window !== 'undefined' && (window as any).amplitude) {
        console.log('📊 Amplitude Event:', 'Contact Form Submitted');
        (window as any).amplitude.track('Contact Form Submitted', {
          email: formData.email,
          organization: formData.organization,
          interests: formData.interests,
          site: 'gistanswers'
        });
      }

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          organization: "",
          websiteUrl: "",
          interests: [],
          message: "",
          receiveUpdates: false,
        });
        onClose();
      }, 2000);
    } catch (err) {
      let errorMessage = "Failed to submit contact form. Please try again.";

      if (err instanceof Error) {
        const match = err.message.match(/Uncaught Error: (.+?) at /);
        if (match && match[1]) {
          errorMessage = match[1];
        } else {
          errorMessage = err.message.split('\n')[0].replace(/^\[CONVEX.*?\]\s*/, '');
        }
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative bg-[#F5F5F5] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8 md:p-12">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
                  Looking to reach us? We'd love to hear from you.
                </h2>
                <p className="text-lg text-gray-700">
                  Learn more about our AI-powered search, advertising, and attribution solutions.
                </p>
              </div>

              {/* Form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1: First Name & Last Name */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">
                        First name*
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900">
                        Last name*
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                        Email*
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Row 3: Organization & Website URL */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="organization" className="block mb-2 text-sm font-medium text-gray-900">
                        Organization*
                      </label>
                      <input
                        id="organization"
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="websiteUrl" className="block mb-2 text-sm font-medium text-gray-900">
                        Website URL*
                      </label>
                      <input
                        id="websiteUrl"
                        type="url"
                        required
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Interests Checkboxes */}
                  <div>
                    <label className="block mb-3 text-sm font-medium text-gray-900">
                      I'm interested in: *
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        "Content licensing",
                        "Gist Ads (marketers)",
                        "Gist Ads (publishers)",
                        "Gist Answers",
                        "Gist Attribution",
                        "Other",
                      ].map((interest) => (
                        <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest)}
                            onChange={() => handleCheckboxChange(interest)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                            disabled={isSubmitting}
                          />
                          <span className="text-sm text-gray-900">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Receive Updates Checkbox */}
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.receiveUpdates}
                        onChange={(e) => setFormData({ ...formData, receiveUpdates: e.target.checked })}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 cursor-pointer"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-gray-900">Receive update emails from ProRata</span>
                    </label>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>

                  {/* Press Inquiries Footer */}
                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-sm text-gray-700">
                      For press inquiries:{" "}
                      <a
                        href="mailto:media@prorata.ai"
                        className="text-gray-900 font-semibold hover:underline"
                      >
                        media@prorata.ai
                      </a>
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <p className="text-2xl font-semibold text-purple-600 mb-2">Thank you!</p>
                  <p className="text-gray-700">We'll be in touch soon.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
