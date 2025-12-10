"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border rounded-lg overflow-hidden transition-all"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-5 py-4 flex items-center justify-between hover:bg-muted/40 transition-colors text-left"
          >
            <span className="text-sm font-medium text-foreground">
              {item.question}
            </span>
            <ChevronDownIcon
              className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 py-3 bg-muted/20 border-t">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
