"use client";

import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 md:px-12 py-8">
        <div className="flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
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

          {/* Right side - Contact Us */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenModal}
              className="px-6 py-3 border border-[#353535] text-[#353535] rounded-full font-semibold hover:bg-dark hover:text-white hover:border-dark transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
