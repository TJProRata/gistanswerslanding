"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  return (
    <>
      {/* Gradient section */}
      <section className="bg-gradient-hero rounded-3xl overflow-hidden mt-8 md:mt-24 mx-6 md:mx-12">
        <div className="grid md:grid-cols-2 gap-0 md:gap-8 items-center">
          {/* Content in gradient (all screens) */}
          <div className="p-6 md:p-8 lg:p-12 space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Engage your visitors with instant AI answers.
            </h1>

            <p className="text-base md:text-lg lg:text-xl max-w-md">
              Get custom AI search and engagement tools tailored to your content and
              enhanced by a library of 100s of trusted publications.
            </p>

            <div>
              <Button
                variant="gradient-icon"
                size="lg"
                onClick={onOpenModal}
                className="shadow-lg hover:shadow-xl"
              >
                Join Waitlist
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-full min-h-[200px] md:min-h-[500px] flex items-center md:items-end justify-center md:justify-end pb-0">
            <div className="relative w-full h-full flex items-end justify-end">
              <Image
                src="https://gist.ai/wp-content/uploads/2025/09/ask-anything2-fs8.png"
                alt="Ask anything interface"
                width={844}
                height={600}
                className="object-contain object-bottom w-3/4 sm:w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
