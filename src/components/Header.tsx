import React, { useState, useEffect } from 'react';
import { Menu, X, Music, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenEnrollment: (courseId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnrollment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Academy', href: '#academy' },
    { label: 'Performances', href: '#performances' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-b border-[#E8E0D2]'
          : 'bg-[#FAF7F2]/80 backdrop-blur-sm border-b border-[#E8E0D2]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-slate-900 whitespace-nowrap shrink-0"
        >
          <div className="w-9 h-9 rounded-full bg-[#3B0D11] text-[#D4AF37] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
            <Music className="w-4 h-4 text-[#EAC665]" />
          </div>
          <span className="font-serif tracking-widest text-xl sm:text-2xl font-bold text-[#3B0D11] uppercase">
            Leela Narayan
          </span>
        </a>

        {/* Zone 2: Clean Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide uppercase text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative py-1 transition-colors hover:text-[#3B0D11] whitespace-nowrap shrink-0 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B89028] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action CTA & Download */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/leela-narayan-website.zip"
            download="leela-narayan-website.zip"
            title="Download full website package (.zip) for local drive H:\leela narayan"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-[#E8E0D2] shadow-2xs hover:shadow-xs transition-all whitespace-nowrap shrink-0"
          >
            <span>💾 Download .ZIP</span>
          </a>

          <button
            onClick={() => onOpenEnrollment()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-white bg-[#3B0D11] hover:bg-[#54141A] shadow-xs hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EAC665]" />
            <span>Enroll / Inquire</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="lg:hidden p-2 rounded-lg text-stone-800 hover:text-[#3B0D11] hover:bg-stone-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8E0D2] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-stone-800 hover:text-[#3B0D11] py-1 border-b border-stone-200/50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnrollment();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold tracking-wider uppercase text-white bg-[#3B0D11] hover:bg-[#54141A] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#EAC665]" />
                Enroll / Inquire Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
