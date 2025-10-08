"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

interface AccordionItemType {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: AccordionItemType[];
  allowMultiple?: boolean;
}

export default function FAQAccordion({ items, allowMultiple = true }: FAQAccordionProps) {
  if (allowMultiple) {
    return (
      <Accordion type="multiple" defaultValue={["item-0"]} className="space-y-0">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border-t border-[#8c888c] border-b-0"
          >
            <AccordionTrigger className="w-full text-left py-4 px-4 flex items-center justify-between gap-4 hover:bg-grey/50 transition-colors hover:no-underline">
              <h4 className="text-2xl md:text-3xl font-semibold pr-4">
                {item.question}
              </h4>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-10 pt-0">
              <p className="text-lg leading-relaxed">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible defaultValue="item-0" className="space-y-0">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-t border-[#8c888c] border-b-0"
        >
          <AccordionTrigger className="w-full text-left py-4 px-4 flex items-center justify-between gap-4 hover:bg-grey/50 transition-colors hover:no-underline">
            <h4 className="text-2xl md:text-3xl font-semibold pr-4">
              {item.question}
            </h4>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-10 pt-0">
            <p className="text-lg leading-relaxed">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
