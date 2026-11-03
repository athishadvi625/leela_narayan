import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowRight, Play, Award, Sparkles, MapPin } from 'lucide-react';
import { ArtistInfo, StatItem } from '../types';

interface HeroProps {
  artistInfo: ArtistInfo;
  stats: StatItem[];
  onOpenEnrollment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ artistInfo, stats, onOpenEnrollment }) => {
  const [isPlayingTanpura, setIsPlayingTanpura] = useState(false);
  const [audioRef] = useState(() => {
    // Web Audio API Tanpura Drone synthesizer (Sa - Pa - Sa harmonic drone)
    let ctx: AudioContext | null = null;
    let oscillators: OscillatorNode[] = [];
    let gainNode: GainNode | null = null;

    return {
      play: () => {
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          ctx = new AudioContextClass();
          gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNode.connect(ctx.destination);

          // C# / D pitch drone frequencies commonly used in Carnatic (Pa - Sa - Sa - Sa_low)
          const freqs = [146.83, 220.00, 293.66, 293.66]; // D3, A3, D4 harmonics
          oscillators = freqs.map((freq, idx) => {
            const osc = ctx!.createOscillator();
            osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
            osc.frequency.setValueAtTime(freq, ctx!.currentTime);
            // subtle chorus detune
            osc.detune.setValueAtTime((idx - 1.5) * 4, ctx!.currentTime);
            osc.connect(gainNode!);
            osc.start();
            return osc;
          });
        } catch {
          // ignore web audio limitations
        }
      },
      stop: () => {
        try {
          oscillators.forEach((osc) => osc.stop());
          oscillators = [];
          if (ctx && ctx.state !== 'closed') {
            ctx.close();
          }
        } catch {
          // ignore
        }
      },
    };
  });

  const toggleTanpura = () => {
    if (isPlayingTanpura) {
      audioRef.stop();
      setIsPlayingTanpura(false);
    } else {
      audioRef.play();
      setIsPlayingTanpura(true);
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#FAF8F5] to-[#FAF7F2]">
      {/* Subtle classical motif background accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-[#D4AF37]/8 via-[#3B0D11]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Clean Unboxed Kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8E6E1A]">
              <span>Carnatic Vocalist</span>
              <span aria-hidden="true">·</span>
              <span>Music Educator</span>
              <span aria-hidden="true">·</span>
              <span>Stage Anchor</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-[#B89028]" />
                Bengaluru
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#3B0D11] leading-[1.15] text-balance">
              Where Sacred Tradition Meets Voice, Confidence & Artistry.
            </h1>

            {/* Lead Narrative Copy */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-sans max-w-2xl">
              Empowering learners of all ages through disciplined Carnatic classical vocal music,
              sacred Devaranamas, soul-stirring Bhajans, and transformative stage performance training.
            </p>

            {/* Trust highlight */}
            <div className="p-4 rounded-xl bg-white/70 border border-[#E8E0D2] shadow-xs flex items-center gap-3 max-w-xl">
              <div className="w-10 h-10 rounded-lg bg-[#3B0D11]/10 text-[#3B0D11] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#B89028]" />
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-[#3B0D11] block">Founder & Principal Mentor</span>
                <span className="text-stone-600 font-medium">{artistInfo.academyName}</span>
              </div>
            </div>

            {/* CTAs & Sound Ambience Control */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenEnrollment}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-[#3B0D11] hover:bg-[#54141A] shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Academy Classes</span>
                <ArrowRight className="w-4 h-4 text-[#EAC665]" />
              </button>

              <a
                href="#performances"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#3B0D11] bg-white hover:bg-stone-50 border border-[#E8E0D2] shadow-xs transition-colors whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current text-[#B89028]" />
                <span>View Performances</span>
              </a>

              {/* Tanpura Drone Ambience Toggle */}
              <button
                onClick={toggleTanpura}
                title={isPlayingTanpura ? 'Mute Tanpura Shruti' : 'Play Tanpura Shruti drone'}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer border ${
                  isPlayingTanpura
                    ? 'bg-[#3B0D11] text-[#EAC665] border-[#3B0D11] shadow-xs animate-pulse'
                    : 'bg-[#FAF7F2] text-stone-700 hover:text-[#3B0D11] border-[#E8E0D2]'
                }`}
              >
                {isPlayingTanpura ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
                <span>{isPlayingTanpura ? 'Tanpura Playing (Shruti D)' : 'Tanpura Drone'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Media Container */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative golden ambient frame */}
              <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-[#D4AF37]/30 via-[#3B0D11]/20 to-[#EAC665]/20 blur-md opacity-80" />

              {/* Portrait Card */}
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E8E0D2] shadow-xl group">
                <div className="aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src="/images/leela-hero-performance.jpg"
                    alt="Leela Narayan performing live Carnatic vocal recital"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Scrim Overlay & Attribution */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#23060A]/90 via-[#23060A]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EAC665] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live Concert Recital</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold leading-tight">
                    Leela Narayan
                  </h2>
                  <p className="text-xs text-stone-300 font-sans mt-0.5">
                    Carnatic Vocal Recital · Bengaluru Cultural Stage
                  </p>
                </div>
              </div>

              {/* Floating trust badge */}
              <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-[#E8E0D2] shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#B89028]/15 text-[#8E6E1A] flex items-center justify-center font-serif font-bold text-lg">
                  🕉️
                </div>
                <div>
                  <div className="text-xs font-bold text-[#3B0D11] uppercase tracking-wide">
                    Guru-Shishya Parampara
                  </div>
                  <div className="text-[11px] text-stone-600">
                    Sacred Abhyasa Gana & Kritis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Stats Strip Below Hero Split */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#E8E0D2] grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11] tabular-nums tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-800 tracking-wide">
                {stat.label}
              </div>
              {stat.subtext && (
                <div className="text-[11px] text-stone-500 leading-snug">
                  {stat.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
