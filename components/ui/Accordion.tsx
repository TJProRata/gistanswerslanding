"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = true }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div key={index} className="border-t border-[#8c888c]">
            <button
              onClick={() => toggleItem(index)}
              className="w-full text-left py-4 px-4 flex items-center justify-between gap-4 hover:bg-grey/50 transition-colors"
            >
              <h4 className="text-2xl md:text-3xl font-semibold pr-4">
                {item.question}
              </h4>
              <ChevronDown
                className={cn(
                  "w-6 h-6 flex-shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-4 pb-10">
                <p className="text-lg leading-relaxed">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
