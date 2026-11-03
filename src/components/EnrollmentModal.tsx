import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Sparkles, Send, MessageSquare } from 'lucide-react';
import { ArtistContact } from '../types';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProgram?: string;
  contact: ArtistContact;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  prefilledProgram,
  contact,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    program: prefilledProgram || 'Carnatic Classical Vocal',
    mode: 'Online (Zoom / Google Meet)',
    city: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledProgram) {
      setFormData((prev) => ({ ...prev, program: prefilledProgram }));
    }
  }, [prefilledProgram]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Enrollment Request: ${formData.program} - ${formData.fullName}`);
    const body = encodeURIComponent(
      `Hello Leela Narayan,\n\nI want to enroll in ${formData.program}.\n\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Mode: ${formData.mode}\n` +
      `City: ${formData.city}\n` +
      `Notes: ${formData.message || 'Looking forward to learning!'}\n`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Leela, I would like to enroll in ${formData.program}.\n` +
      `Name: ${formData.fullName || 'Student'}\n` +
      `Phone: ${formData.phone}\n` +
      `Mode: ${formData.mode}\n` +
      `City: ${formData.city || 'Bengaluru'}`
    );
    window.open(`https://wa.me/${contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#E8E0D2] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#3B0D11] text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EAC665] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Leela Narayan School of Performing Arts</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold">
            Enroll in Music Program
          </h3>
          <p className="text-xs text-stone-200 mt-1">
            Online global batches & In-Studio classes in Bengaluru.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-2xl font-bold text-stone-800">
                Inquiry Prepared!
              </h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto">
                Your email client was triggered. You may also connect instantly on WhatsApp for faster confirmation.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] text-white hover:bg-[#20bd5a] transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Rao"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Selected Program *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                  >
                    <option value="Carnatic Classical Vocal">Carnatic Classical Vocal</option>
                    <option value="Devaranama & Dasara Pada">Devaranama & Dasara Padas</option>
                    <option value="Bhajans & Devotional Music">Bhajans & Devotional Music</option>
                    <option value="Light Music / Bhavageethe">Light Music / Bhavageethe</option>
                    <option value="Voice Culture & Pitch Alignment">Voice Culture & Pitch Alignment</option>
                    <option value="Stage Performance & Mic Technique">Stage Performance & Mic Technique</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Format *
                  </label>
                  <select
                    value={formData.mode}
                    onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                  >
                    <option value="Online (Zoom / Google Meet)">Online (Zoom / Google Meet)</option>
                    <option value="In-Studio (Bengaluru)">In-Studio (Bengaluru)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  City / Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bengaluru / San Jose / London"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Learner Age & Prior Experience
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. 10 years old beginner, or adult beginner looking to resume..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#3B0D11] hover:bg-[#54141A] text-white shadow-sm cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#EAC665]" />
                  <span>Submit Registration</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
