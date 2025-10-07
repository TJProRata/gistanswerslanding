import Link from "next/link";
import Image from "next/image";
import { Linkedin, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-grimace text-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Logo Section */}
        <div className="pt-36 pb-44">
          <Link href="/">
            <Image
              src="https://gist.ai/wp-content/uploads/2025/09/logo-footer.png"
              alt="Gist AI"
              width={135}
              height={40}
              className="mb-8"
            />
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-16 pb-24">
          {/* Column 1 - Info & Support */}
          <div className="space-y-6">
            <p className="text-[#9f88bc] mb-5">
              Gist is ethically designed<br />
              and built by{" "}
              <a
                href="https://prorata.ai"
                target="_blank"
                rel="noopener"
                className="text-white hover:text-[#9f88bc] transition-colors"
              >
                ProRata.ai
              </a>
            </p>

            <Link
              href="#contact-us"
              className="block text-lg font-semibold hover:text-[#9f88bc] transition-colors"
            >
              Contact us
            </Link>

            <a
              href="mailto:support@gist.ai"
              className="block text-lg font-semibold mb-14 hover:text-[#9f88bc] transition-colors"
            >
              Support
            </a>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://bsky.app/profile/prorata.ai"
                target="_blank"
                rel="noopener"
                className="hover:opacity-70 transition-opacity"
                aria-label="Bluesky"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.3,4.2c2.3,1.7,4.8,5.3,5.7,7.2.9-1.9,3.4-5.4,5.7-7.2,1.7-1.3,4.3-2.2,4.3.9s-.4,5.2-.6,5.9c-.7,2.6-3.3,3.2-5.6,2.8,4,.7,5.1,3,2.9,5.3-5,5.2-6.7-2.8-6.7-2.8,0,0-1.7,8-6.7,2.8-2.2-2.3-1.2-4.6,2.9-5.3-2.3.4-4.9-.3-5.6-2.8-.2-.7-.6-5.3-.6-5.9,0-3.1,2.7-2.1,4.3-.9h0Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/prorataai/"
                target="_blank"
                rel="noopener"
                className="hover:opacity-70 transition-opacity"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/@ProRataai"
                target="_blank"
                rel="noopener"
                className="hover:opacity-70 transition-opacity"
                aria-label="YouTube"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="https://x.com/prorata_ai"
                target="_blank"
                rel="noopener"
                className="hover:opacity-70 transition-opacity"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div className="space-y-6">
            <p className="text-[#ffffff54] text-sm font-semibold">Products</p>

            <Link
              href="/answers"
              className="block text-xl font-semibold hover:text-[#9f88bc] transition-colors"
            >
              Gist Answers™
            </Link>

            <Link
              href="/ads"
              className="block text-xl font-semibold hover:text-[#9f88bc] transition-colors"
            >
              Gist Ads™
            </Link>

            <Link
              href="#contact-us"
              className="block text-xl font-semibold hover:text-[#9f88bc] transition-colors"
            >
              Gist Attribution™
            </Link>
          </div>

          {/* Column 3 - Legal */}
          <div className="space-y-6">
            <p className="text-[#ffffff54] text-sm">
              © 2025 ProrataAI, Inc.<br />
              All rights reserved.
            </p>

            <Link
              href="/terms"
              className="block text-sm font-semibold hover:text-[#9f88bc] transition-colors"
            >
              Terms of use
            </Link>

            <Link
              href="/privacy"
              className="block text-sm font-semibold hover:text-[#9f88bc] transition-colors"
            >
              Privacy policy
            </Link>

            <Link
              href="/consumer-choices"
              className="block text-sm font-semibold hover:text-[#9f88bc] transition-colors"
            >
              Consumer choices
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
