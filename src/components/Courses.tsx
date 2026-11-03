import React, { useState } from 'react';
import { Music, BookOpen, Heart, Radio, Sparkles, Check, ChevronRight } from 'lucide-react';
import { MusicClassItem } from '../types';

interface CoursesProps {
  courses: MusicClassItem[];
  onOpenEnrollment: (courseId?: string) => void;
}

export const Courses: React.FC<CoursesProps> = ({ courses, onOpenEnrollment }) => {
  const [selectedFormat, setSelectedFormat] = useState<'all' | 'online' | 'offline'>('all');

  const getIcon = (id: string) => {
    switch (id) {
      case 'carnatic':
        return <Music className="w-5 h-5 text-[#B89028]" />;
      case 'devaranama':
        return <Heart className="w-5 h-5 text-[#B89028]" />;
      case 'bhajans':
        return <Sparkles className="w-5 h-5 text-[#B89028]" />;
      case 'light-music':
        return <BookOpen className="w-5 h-5 text-[#B89028]" />;
      case 'voice-culture':
        return <Radio className="w-5 h-5 text-[#B89028]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#B89028]" />;
    }
  };

  const filteredCourses = courses.filter((c) => {
    if (selectedFormat === 'online') return c.format.toLowerCase().includes('online');
    if (selectedFormat === 'offline') return c.format.toLowerCase().includes('offline');
    return true;
  });

  const steps = [
    { step: '01', title: 'Learn Foundations', desc: 'Master swaras, foundational abhyasa gana, and correct pitch alignment.' },
    { step: '02', title: 'Refine & Culture', desc: 'Develop vocal stamina, akaara sadhana, breath control, and gamakas.' },
    { step: '03', title: 'Build Poise', desc: 'Gain confidence through group choir sessions, bhajans, and practice recitals.' },
    { step: '04', title: 'Perform on Stage', desc: 'Showcase your talent in public student concerts, temple sevas, and festivals.' },
  ];

  return (
    <section id="academy" className="py-24 bg-white border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
            Leela Narayan School of Performing Arts (LNSOPA)
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11]">
            Music Classes & Curriculum
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Learn • Practice • Perform • Grow. Comprehensive online & in-studio classical music training designed for beginners, children, adults, and performing aspirants.
          </p>

          {/* Interactive Filter Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2">
            <div className="inline-flex items-center p-1 bg-[#FAF7F2] rounded-xl border border-[#E8E0D2]">
              <button
                onClick={() => setSelectedFormat('all')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedFormat === 'all'
                    ? 'bg-[#3B0D11] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Formats
              </button>
              <button
                onClick={() => setSelectedFormat('online')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedFormat === 'online'
                    ? 'bg-[#3B0D11] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Online Classes (Global)
              </button>
              <button
                onClick={() => setSelectedFormat('offline')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedFormat === 'offline'
                    ? 'bg-[#3B0D11] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                In-Studio (Bengaluru)
              </button>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] p-7 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#E8E0D2] shadow-2xs flex items-center justify-center transition-transform group-hover:scale-110">
                    {getIcon(course.id)}
                  </div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-500">
                    {course.format}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#3B0D11] group-hover:text-[#54141A] transition-colors">
                    {course.title}
                  </h3>
                  <div className="text-xs font-medium text-[#8E6E1A] mt-1">
                    {course.levels}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {course.desc}
                </p>

                {/* Curriculum Bullet Points */}
                <div className="pt-3 border-t border-[#E8E0D2]/70 space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                    Curriculum Highlights
                  </span>
                  {course.details.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#B89028] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-[#E8E0D2]">
                <button
                  onClick={() => onOpenEnrollment(course.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide uppercase bg-white hover:bg-[#3B0D11] text-[#3B0D11] hover:text-white border border-[#E8E0D2] shadow-2xs hover:shadow-sm transition-all cursor-pointer group/btn"
                >
                  <span>Enroll in this Program</span>
                  <ChevronRight className="w-4 h-4 text-[#B89028] group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Student Learning Journey Strip */}
        <div className="mt-20 pt-16 border-t border-[#E8E0D2]">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
              The Pedagogical Journey
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B0D11]">
              From First Swara to Confident Stage Performance
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              A step-by-step pathway emphasizing genuine vocal discipline, stage presence, and aesthetic joy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] relative space-y-3"
              >
                <div className="font-serif text-3xl font-bold text-[#D4AF37] tabular-nums">
                  {item.step}
                </div>
                <h4 className="font-serif text-lg font-bold text-[#3B0D11]">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
