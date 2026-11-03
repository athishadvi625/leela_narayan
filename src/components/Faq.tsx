import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

interface FaqProps {
  faqs: FaqItem[];
}

export const Faq: React.FC<FaqProps> = ({ faqs }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white border-b border-[#E8E0D2]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
            Clear Answers
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B0D11]">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Everything you need to know about joining Leela Narayan School of Performing Arts.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E8E0D2] bg-[#FAF7F2] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#B89028] shrink-0" />
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#3B0D11]">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#3B0D11]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm sm:text-base text-stone-700 leading-relaxed font-sans border-t border-[#E8E0D2]/50">
                    <p className="pl-8">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
