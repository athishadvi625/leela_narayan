import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { UpcomingEventItem } from '../types';

interface EventsProps {
  events: UpcomingEventItem[];
  onOpenEnrollment: (courseTitle?: string) => void;
}

export const Events: React.FC<EventsProps> = ({ events, onOpenEnrollment }) => {
  return (
    <section id="events" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
              Masterclasses & Showcases
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11]">
              Upcoming Events & Workshops
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans">
              Join interactive music workshops, annual student stage recitals, and cultural celebrations in Bengaluru and online.
            </p>
          </div>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-8 rounded-2xl bg-white border border-[#E8E0D2] shadow-xs hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8E6E1A] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E8E0D2]">
                    {evt.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#B89028]" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#3B0D11] group-hover:text-[#54141A] transition-colors leading-snug">
                  {evt.name}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {evt.desc}
                </p>

                <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B89028] shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#B89028] shrink-0" />
                    <span className="truncate">{evt.venue}, {evt.city}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-[#8E6E1A] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Limited Seats
                </span>
                <button
                  onClick={() => onOpenEnrollment(evt.name)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-[#3B0D11] hover:bg-[#54141A] transition-colors cursor-pointer"
                >
                  <span>Reserve Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#EAC665]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
