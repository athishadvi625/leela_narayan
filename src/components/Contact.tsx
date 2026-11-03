import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';
import { ArtistContact } from '../types';

interface ContactProps {
  contact: ArtistContact;
  preselectedCourse?: string;
}

export const Contact: React.FC<ContactProps> = ({ contact, preselectedCourse }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredClass: preselectedCourse || 'Carnatic Vocal',
    mode: 'Online (Zoom / Google Meet)',
    city: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const subject = encodeURIComponent(`Music Registration Inquiry - ${formData.preferredClass} (${formData.fullName})`);
    const body = encodeURIComponent(
      `Hello Leela Narayan,\n\nI would like to register/inquire about music classes with LNSOPA.\n\n` +
      `Name: ${formData.fullName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Program: ${formData.preferredClass}\n` +
      `Mode: ${formData.mode}\n` +
      `City: ${formData.city}\n\n` +
      `Message: ${formData.message || 'I am interested in starting my musical journey!'}\n`
    );

    // Trigger mailto link
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Leela, I am interested in registering for your music classes / booking a recital.\n` +
      `Name: ${formData.fullName || 'Prospective Student'}\n` +
      `Program: ${formData.preferredClass}\n` +
      `Mode: ${formData.mode}\n` +
      `Location: ${formData.city || 'Bengaluru'}\n` +
      `Phone: ${formData.phone}`
    );
    window.open(`https://wa.me/${contact.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Details & Academy Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-[#8E6E1A]">
                Connect & Enroll
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B0D11] leading-tight">
                Begin Your Musical Journey
              </h2>
              <p className="text-sm sm:text-base text-stone-600 font-sans leading-relaxed">
                Whether you are enrolling your child, restarting your personal musical sadhana as an adult, or inviting Leela for a classical recital or cultural anchoring, we welcome your inquiry.
              </p>
            </div>

            {/* Direct Cards */}
            <div className="space-y-4">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E8E0D2] shadow-2xs hover:border-[#D4AF37] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#3B0D11] flex items-center justify-center shrink-0 border border-[#E8E0D2] group-hover:bg-[#3B0D11] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Official Email
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#3B0D11]">
                    {contact.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${contact.whatsapp}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E8E0D2] shadow-2xs hover:border-[#D4AF37] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#3B0D11] flex items-center justify-center shrink-0 border border-[#E8E0D2] group-hover:bg-[#3B0D11] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Phone & WhatsApp
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#3B0D11]">
                    {contact.phone}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#E8E0D2] shadow-2xs">
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#3B0D11] flex items-center justify-center shrink-0 border border-[#E8E0D2]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Studio Headquarters
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#3B0D11]">
                    Bengaluru, Karnataka, India
                  </div>
                  <div className="text-xs text-stone-500">
                    Online worldwide via Zoom & In-Studio sessions
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Connect */}
            <div className="p-6 rounded-2xl bg-[#3B0D11] text-white space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#EAC665]">
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200">
                Prefer a quick chat? Message Leela directly on WhatsApp with your questions about class timings and levels.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E0D2] shadow-sm space-y-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#8E6E1A]">
                Class Registration & Recital Bookings
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B0D11] mt-1">
                Send an Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Please fill out your details below. We typically respond within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-emerald-900">
                  Thank You for Reaching Out!
                </h4>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Your inquiry has been formulated. If your email client did not automatically open, you can also send a direct WhatsApp message using the button on the left!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-900 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] focus:ring-1 focus:ring-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] focus:ring-1 focus:ring-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] focus:ring-1 focus:ring-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, Karnataka"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] focus:ring-1 focus:ring-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Program of Interest *
                    </label>
                    <select
                      value={formData.preferredClass}
                      onChange={(e) => setFormData({ ...formData, preferredClass: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] focus:ring-1 focus:ring-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                    >
                      <option value="Carnatic Vocal">Carnatic Classical Vocal</option>
                      <option value="Devaranama & Dasara Pada">Devaranama & Dasara Padas</option>
                      <option value="Bhajans & Devotional Music">Bhajans & Devotional Music</option>
                      <option value="Light Music / Bhavageethe">Light Music / Bhavageethe</option>
                      <option value="Voice Culture & Pitch Alignment">Voice Culture & Pitch Alignment</option>
                      <option value="Stage Performance & Mic Technique">Stage Performance & Mic Technique</option>
                      <option value="Concert Booking / Anchoring">Concert Booking / Event Anchoring</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Preferred Mode *
                    </label>
                    <select
                      value={formData.mode}
                      onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] focus:ring-1 focus:ring-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden"
                    >
                      <option value="Online (Zoom / Google Meet)">Online (Zoom / Google Meet)</option>
                      <option value="In-Studio (Bengaluru)">In-Studio (Bengaluru)</option>
                      <option value="Flexible / Either">Flexible / Either</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Your Musical Background or Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the learner's age, prior experience (if any), goals, or concert inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E8E0D2] focus:border-[#3B0D11] focus:ring-1 focus:ring-[#3B0D11] text-sm text-stone-800 bg-[#FAF7F2] outline-hidden resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-[#3B0D11] hover:bg-[#54141A] shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#EAC665]" />
                    <span>{submitting ? 'Preparing Email...' : 'Submit Inquiry via Email'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#25D366] hover:text-white bg-white hover:bg-[#25D366] border border-[#25D366] transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
