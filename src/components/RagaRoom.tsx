import React, { useState } from 'react';
import { Music, Play, Square, Sparkles, Volume2 } from 'lucide-react';

interface Raga {
  id: string;
  name: string;
  melakarta: string;
  mood: string;
  arohana: string;
  avarohana: string;
  swaraFreqs: number[]; // frequencies for Sa, Ri, Ga, Ma, Pa, Dha, Ni, Sa
  description: string;
  recommendedTime: string;
}

const RAGAS: Raga[] = [
  {
    id: 'mayamalavagowla',
    name: 'Mayamalavagowla',
    melakarta: '15th Melakarta Raga',
    mood: 'Peaceful, Devotional, Dawn Awakening',
    arohana: 'S R₁ G₃ M₁ P D₁ N₃ Ṡ',
    avarohana: 'Ṡ N₃ D₁ P M₁ G₃ R₁ S',
    // Root D = 146.83 Hz. Sa=146.83, R1=156.6, G3=183.5, M1=195.8, P=220, D1=234.9, N3=275.3, Sa_high=293.66
    swaraFreqs: [146.83, 156.6, 183.5, 195.8, 220.0, 234.9, 275.3, 293.66],
    description: 'The foundation of Carnatic music. Introduced by Sri Purandara Dasa for abhyasa gana (basic exercises) due to its balanced microtones and symmetry.',
    recommendedTime: 'Brahma Muhurta / Early Morning',
  },
  {
    id: 'kalyani',
    name: 'Kalyani',
    melakarta: '65th Melakarta Raga (Mechakalyani)',
    mood: 'Grandeur, Auspiciousness, Spiritual Bliss',
    arohana: 'S R₂ G₃ M₂ P D₂ N₃ Ṡ',
    avarohana: 'Ṡ N₃ D₂ P M₂ G₃ R₂ S',
    swaraFreqs: [146.83, 165.0, 183.5, 207.6, 220.0, 247.0, 275.3, 293.66],
    description: 'One of the most expansive and regal ragas in Indian classical tradition. Frequently performed in major concert centerpieces and temple festivals.',
    recommendedTime: 'Evening / Sandhya Vandana',
  },
  {
    id: 'hamsadhwani',
    name: 'Hamsadhwani',
    melakarta: 'Janya of 29th Melakarta (Sankarabharanam)',
    mood: 'Joyous, Invigorating, Lord Ganesha Invocations',
    arohana: 'S R₂ G₃ P N₃ Ṡ',
    avarohana: 'Ṡ N₃ P G₃ R₂ S',
    swaraFreqs: [146.83, 165.0, 183.5, 220.0, 275.3, 293.66],
    description: 'Created by Ramaswami Dikshitar. Audava raga (5 notes) traditionally sung at the beginning of concerts to invoke Lord Ganesha with buoyant energy.',
    recommendedTime: 'Anytime / Auspicious Inaugurations',
  },
  {
    id: 'hindolam',
    name: 'Hindolam',
    melakarta: 'Janya of 20th Melakarta (Natabhairavi)',
    mood: 'Deep Bhakti, Introspective, Soul-stirring',
    arohana: 'S G₂ M₁ D₁ N₂ Ṡ',
    avarohana: 'Ṡ N₂ D₁ M₁ G₂ S',
    swaraFreqs: [146.83, 175.0, 195.8, 234.9, 262.0, 293.66],
    description: 'Pentatonic raga steeped in meditative devotion. Celebrated in beloved Devaranamas such as "Jagadodharana" and Annamacharya kritis.',
    recommendedTime: 'Late Evening / Night',
  },
];

export const RagaRoom: React.FC = () => {
  const [activeRaga, setActiveRaga] = useState<Raga>(RAGAS[0]);
  const [isPlayingScale, setIsPlayingScale] = useState(false);

  const playScale = (raga: Raga) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      setIsPlayingScale(true);

      const notes = [...raga.swaraFreqs, ...raga.swaraFreqs.slice().reverse().slice(1)];
      const stepDuration = 0.45;

      notes.forEach((freq, idx) => {
        const startTime = ctx.currentTime + idx * stepDuration;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        // Gentle envelope
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + stepDuration - 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + stepDuration);
      });

      const totalTime = notes.length * stepDuration;
      setTimeout(() => {
        setIsPlayingScale(false);
        ctx.close();
      }, totalTime * 1000);
    } catch {
      setIsPlayingScale(false);
    }
  };

  return (
    <section className="py-24 bg-white border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
            Interactive Academy Experience
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11]">
            The Classical Raga Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-sans">
            Explore foundational Carnatic ragas taught at LNSOPA. Listen to pure swara scales synthesized directly in your browser.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Raga Selector Column */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block px-1">
              Select a Raga
            </span>
            {RAGAS.map((raga) => {
              const isSelected = activeRaga.id === raga.id;
              return (
                <button
                  key={raga.id}
                  onClick={() => setActiveRaga(raga)}
                  className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#3B0D11] text-white border-[#3B0D11] shadow-sm'
                      : 'bg-[#FAF7F2] text-stone-800 border-[#E8E0D2] hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg font-bold">
                      {raga.name}
                    </span>
                    <span
                      className={`text-[11px] font-mono uppercase tracking-wider ${
                        isSelected ? 'text-[#EAC665]' : 'text-[#8E6E1A]'
                      }`}
                    >
                      {raga.melakarta.split(' ')[0]}
                    </span>
                  </div>
                  <div
                    className={`text-xs mt-1 truncate ${
                      isSelected ? 'text-stone-300' : 'text-stone-500'
                    }`}
                  >
                    {raga.mood}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Raga Card Column */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-2xl bg-[#FAF7F2] border border-[#E8E0D2] shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E0D2] pb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8E6E1A] block">
                  {activeRaga.melakarta}
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#3B0D11] mt-0.5">
                  Raga {activeRaga.name}
                </h3>
              </div>

              {/* Play Swara Scale Button */}
              <button
                onClick={() => playScale(activeRaga)}
                disabled={isPlayingScale}
                className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer ${
                  isPlayingScale
                    ? 'bg-[#8E6E1A] text-white cursor-wait'
                    : 'bg-[#3B0D11] hover:bg-[#54141A] text-white'
                }`}
              >
                {isPlayingScale ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current animate-pulse text-[#EAC665]" />
                    <span>Playing Swara Scale...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-[#EAC665]" />
                    <span>Listen to Arohana / Avarohana</span>
                  </>
                )}
              </button>
            </div>

            {/* Arohana / Avarohana Notation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#E8E0D2]">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  Arohana (Ascent)
                </div>
                <div className="font-serif text-xl font-bold text-[#3B0D11] tracking-wide">
                  {activeRaga.arohana}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8E0D2]">
                <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1">
                  Avarohana (Descent)
                </div>
                <div className="font-serif text-xl font-bold text-[#3B0D11] tracking-wide">
                  {activeRaga.avarohana}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Aesthetic Essence & Classical Significance
              </span>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans">
                {activeRaga.description}
              </p>
            </div>

            {/* Metadata Footer */}
            <div className="pt-4 border-t border-[#E8E0D2] flex flex-wrap items-center justify-between text-xs text-stone-600 gap-4">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#B89028]" />
                <span><strong>Bhava / Mood:</strong> {activeRaga.mood}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-[#8E6E1A]" />
                <span><strong>Traditional Kala:</strong> {activeRaga.recommendedTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
