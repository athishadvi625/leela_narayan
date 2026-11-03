import React from 'react';
import { Music, ArrowUp, Instagram, Youtube, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { ArtistContact } from '../types';

interface FooterProps {
  contact: ArtistContact;
}

export const Footer: React.FC<FooterProps> = ({ contact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#23060A] text-white border-t border-[#3B0D11] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-[#3B0D11] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center">
                <Music className="w-5 h-5 text-[#EAC665]" />
              </div>
              <span className="font-serif tracking-widest text-2xl font-bold uppercase text-white">
                Leela Narayan
              </span>
            </div>
            <p className="text-xs font-semibold tracking-wider uppercase text-[#EAC665]">
              Leela Narayan School of Performing Arts (LNSOPA)
            </p>
            <p className="text-sm text-stone-300 leading-relaxed max-w-md font-sans">
              Dedicated to preserving the sacred traditions of Carnatic classical vocal, Devaranamas, and devotional music, while cultivating authentic confidence, stage presence, and aesthetic joy in every learner.
            </p>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#EAC665] hover:text-[#23060A] text-stone-300 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={contact.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#EAC665] hover:text-[#23060A] text-stone-300 flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#EAC665] hover:text-[#23060A] text-stone-300 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#EAC665] hover:text-[#23060A] text-stone-300 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#EAC665]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300 font-medium">
              <li>
                <a href="#about" className="hover:text-white transition-colors">About & Bio</a>
              </li>
              <li>
                <a href="#academy" className="hover:text-white transition-colors">LNSOPA Academy Programs</a>
              </li>
              <li>
                <a href="#performances" className="hover:text-white transition-colors">Concerts & Temple Sevas</a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">Upcoming Workshops</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Photo Gallery</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact & Admissions</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#EAC665]">
              Academy Studio
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EAC665] shrink-0 mt-0.5" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#EAC665] shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#EAC665] shrink-0" />
                <a href={`tel:${contact.whatsapp}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-stone-400">
              <span>Classes conducted offline in Bengaluru & online via Zoom globally across all time zones.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            &copy; {new Date().getFullYear()} Leela Narayan. All rights reserved. Leela Narayan School of Performing Arts.
          </div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#EAC665]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
