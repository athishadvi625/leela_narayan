import React from 'react';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { ArtistInfo } from '../types';

interface AboutProps {
  artistInfo: ArtistInfo;
  areasOfExpertise: string[];
}

export const About: React.FC<AboutProps> = ({ artistInfo, areasOfExpertise }) => {
  return (
    <section id="about" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image & Revered Lineage */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E8E0D2] shadow-lg group">
              <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src="/images/leela-award-stage.jpg"
                  alt="Leela Narayan receiving cultural honor on stage"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white border-t border-[#E8E0D2]">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#8E6E1A]">
                  Stage Recognition
                </div>
                <div className="font-serif text-lg font-bold text-[#3B0D11] mt-0.5">
                  Concert Honors & Cultural Recognition
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Felicitated for contributions to Carnatic classical music and cultural education in Bengaluru.
                </p>
              </div>
            </div>

            {/* Revered Guru Quote Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#3B0D11] text-white space-y-4 relative overflow-hidden shadow-md">
              <Quote className="w-10 h-10 text-[#EAC665]/30 absolute top-4 right-4" />
              <p className="font-serif italic text-lg sm:text-xl text-[#F7DF94] leading-relaxed relative z-10">
                &ldquo;Every musical journey begins with a Guru who inspires, guides and shapes the artist.&rdquo;
              </p>
              <div className="pt-2 border-t border-white/10 text-xs text-stone-300">
                <span className="font-semibold text-white uppercase tracking-wider block">
                  Guru-Shishya Tradition
                </span>
                <span>Over 10 years of intensive classical sadhana under revered Karnataka masters</span>
              </div>
            </div>
          </div>

          {/* Right Column: In-depth Biography & Narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
                Biography & Artistic Vision
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11] leading-tight text-balance">
                Devotion to the Divine Art of Carnatic Sangeetha
              </h2>
            </div>

            {/* In-depth Prose Bio */}
            <div className="space-y-4 text-stone-700 font-sans leading-relaxed text-base sm:text-lg">
              {artistInfo.bio.map((paragraph, idx) => (
                <p key={idx} className="text-stone-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Areas of Expertise - Clean Unboxed Typography */}
            <div className="pt-6 border-t border-[#E8E0D2]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#B89028]" />
                <h3 className="font-serif text-xl font-bold text-[#3B0D11]">
                  Specialized Musical Disciplines
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {areasOfExpertise.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E8E0D2] shadow-2xs hover:border-[#D4AF37] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#8E6E1A] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-stone-800">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Callout */}
            <div className="p-6 rounded-2xl bg-white border border-[#E8E0D2] space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#3B0D11]">
                Empowering Adults, Women & Young Aspirants
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Leela firmly dismantles the notion that classical music can only be started in early childhood.
                Her patient, modular training allows working professionals, homemakers, and eager beginners
                to find their authentic vocal register, master shruti alignment, and sing with joy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
