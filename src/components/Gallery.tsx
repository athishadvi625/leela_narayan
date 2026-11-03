import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryImageItem } from '../types';

interface GalleryProps {
  images: GalleryImageItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Performances', 'Temple Sevas', 'Events', 'Students', 'Honors'];

  const filteredImages = images.filter((img) => {
    if (activeCategory === 'All') return true;
    return img.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <section id="gallery" className="py-24 bg-[#FAF7F2] border-b border-[#E8E0D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
              Visual Showcase
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11]">
              Photo Gallery & Stage Moments
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-sans">
              Moments of devotion, recital brilliance, and student celebrations captured across prominent venues.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-[#E8E0D2] shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#3B0D11] text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento / Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => {
                const originalIndex = images.findIndex((i) => i.id === img.id);
                setLightboxIndex(originalIndex);
              }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E8E0D2] shadow-xs hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                <img
                  src={img.src}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#23060A]/90 via-[#23060A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#EAC665]">
                  {img.category}
                </span>
                <h3 className="font-serif text-xl font-bold mt-1 text-white">
                  {img.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 mt-1">
                  {img.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#EAC665]">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Full Photo</span>
                </div>
              </div>

              {/* Default Quiet Footer */}
              <div className="p-4 bg-white border-t border-[#E8E0D2]">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E6E1A]">
                  {img.category}
                </div>
                <div className="font-serif text-base font-bold text-[#3B0D11] truncate mt-0.5">
                  {img.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="text-center text-white mt-4 space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#EAC665]">
                {images[lightboxIndex].category} · Photo {lightboxIndex + 1} of {images.length}
              </span>
              <h4 className="font-serif text-2xl font-bold">
                {images[lightboxIndex].title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
                {images[lightboxIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
