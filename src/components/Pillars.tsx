import React from 'react';
import { Mic, BookOpen, Radio } from 'lucide-react';
import { PillarItem } from '../types';

interface PillarsProps {
  pillars: PillarItem[];
}

export const Pillars: React.FC<PillarsProps> = ({ pillars }) => {
  const getIcon = (title: string) => {
    if (title.toLowerCase().includes('educator') || title.toLowerCase().includes('founder')) {
      return <BookOpen className="w-6 h-6 text-[#B89028]" />;
    }
    if (title.toLowerCase().includes('anchor') || title.toLowerCase().includes('speaker')) {
      return <Radio className="w-6 h-6 text-[#B89028]" />;
    }
    return <Mic className="w-6 h-6 text-[#B89028]" />;
  };

  return (
    <section className="py-20 bg-white border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
            Multifaceted Artistry
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B0D11] text-balance">
            The Three Pillars of Leela&apos;s Musical Journey
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Bridging rigorous classical devotion, empathetic music mentorship, and charismatic stage presence.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] hover:border-[#D4AF37]/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E8E0D2] shadow-xs flex items-center justify-center transition-transform group-hover:scale-110">
                  {getIcon(pillar.title)}
                </div>

                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-[#8E6E1A] block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#3B0D11] mt-1 group-hover:text-[#54141A] transition-colors">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8E0D2]/70 flex items-center justify-between text-xs text-[#8E6E1A] font-medium">
                <span>Domain Focus</span>
                <span className="font-mono text-stone-400">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
