import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-24 bg-white border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
            Student & Parent Experiences
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11]">
            Voices of Trust & Transformation
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Hear from parents and adult learners whose musical passion blossomed through Leela&apos;s mentorship at LNSOPA.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] shadow-xs hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div className="space-y-4">
                {/* Rating stars & Quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4AF37]/40 group-hover:text-[#D4AF37] transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-stone-700 italic leading-relaxed font-serif">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author & Course Metadata */}
              <div className="pt-6 mt-6 border-t border-[#E8E0D2] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3B0D11] text-[#EAC665] flex items-center justify-center font-serif font-bold text-base shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-serif font-bold text-base text-[#3B0D11] truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5 flex-wrap">
                    <span>{item.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#8E6E1A] font-medium">{item.course}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust summary strip */}
        <div className="mt-16 p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B0D11]/10 text-[#3B0D11] flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#B89028]" />
            </div>
            <div>
              <span className="font-bold text-[#3B0D11] text-sm sm:text-base block">
                Nurturing 500+ Musicians of All Ages
              </span>
              <span className="text-xs text-stone-600">
                100% focused on authentic vocal resonance, shruti fidelity, and stage joy.
              </span>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#3B0D11] text-white hover:bg-[#54141A] transition-colors whitespace-nowrap"
          >
            Join Our Learning Family
          </a>
        </div>
      </div>
    </section>
  );
};
