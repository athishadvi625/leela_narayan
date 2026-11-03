import React, { useState } from 'react';
import { Award, Calendar, Sparkles, MapPin } from 'lucide-react';
import { AchievementItem } from '../types';

interface PerformancesProps {
  achievements: AchievementItem[];
  culturalEventsSection: {
    title: string;
    subtitle: string;
    text: string;
  };
}

export const Performances: React.FC<PerformancesProps> = ({
  achievements,
  culturalEventsSection,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Performance', 'Festival', 'Academy'];

  const filtered = achievements.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section id="performances" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
              Stage, Seva & Recognition
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11]">
              Performances & Key Milestones
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans">
              From sacred temple sevas at Tirumala & Srisailam to prestigious state festivals and student award showcases.
            </p>
          </div>

          {/* Interactive Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E8E0D2] shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3B0D11] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline / Milestone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-[#E8E0D2] overflow-hidden hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* Image Banner */}
              <div className="aspect-[16/10] overflow-hidden bg-stone-100 relative">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#3B0D11]/90 backdrop-blur-sm text-[#F7DF94] px-3 py-1 rounded-full text-xs font-semibold tracking-wider font-mono">
                  {item.year}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-stone-800 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider">
                  {item.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#8E6E1A] font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.org}</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#3B0D11] group-hover:text-[#54141A] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#B89028]" />
                    Featured Event
                  </span>
                  <span className="font-medium text-[#3B0D11]">Bengaluru & Spiritual Sevas</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Events Spotlight */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-[#3B0D11] text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#EAC665]">
              {culturalEventsSection.subtitle}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {culturalEventsSection.title}
            </h3>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-sans">
              {culturalEventsSection.text}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </div>
    </section>
  );
};
