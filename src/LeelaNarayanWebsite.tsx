/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * LeelaNarayanWebsite.tsx
 * Complete, standalone portfolio & academy website for Leela Narayan.
 */

import React, { useState } from 'react';
import { siteData } from './siteData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pillars } from './components/Pillars';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { Performances } from './components/Performances';
import { RagaRoom } from './components/RagaRoom';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Events } from './components/Events';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { EnrollmentModal } from './components/EnrollmentModal';
import { Footer } from './components/Footer';
import { DownloadHelper } from './components/DownloadHelper';

export const LeelaNarayanWebsite: React.FC = () => {
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);

  const handleOpenEnrollment = (courseNameOrId?: string) => {
    setSelectedCourse(courseNameOrId);
    setEnrollmentModalOpen(true);
  };

  const handleCloseEnrollment = () => {
    setEnrollmentModalOpen(false);
    setSelectedCourse(undefined);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans flex flex-col selection:bg-[#B89028] selection:text-white">
      {/* 3-Zone Navigation Header */}
      <Header onOpenEnrollment={() => handleOpenEnrollment()} />

      <main className="flex-grow">
        {/* Hero Section with Split View, Real Photo & Tanpura Drone */}
        <Hero
          artistInfo={siteData.artistInfo}
          stats={siteData.stats}
          onOpenEnrollment={() => handleOpenEnrollment()}
        />

        {/* 3 Pillars of Leela's Musical Artistry */}
        <Pillars pillars={siteData.threePillars} />

        {/* Detailed Biography, Lineage & Areas of Expertise */}
        <About
          artistInfo={siteData.artistInfo}
          areasOfExpertise={siteData.areasOfExpertise}
        />

        {/* LNSOPA Academy Courses & Learning Journey */}
        <Courses
          courses={siteData.musicClasses}
          onOpenEnrollment={handleOpenEnrollment}
        />

        {/* Performances, Temple Sevas & Honors Timeline */}
        <Performances
          achievements={siteData.achievements}
          culturalEventsSection={siteData.culturalEventsSection}
        />

        {/* Interactive Classical Raga Sanctuary & Sound Synthesis */}
        <RagaRoom />

        {/* Photo Gallery & Stage Moments with Lightbox */}
        <Gallery images={siteData.galleryImages} />

        {/* Student & Parent Testimonials */}
        <Testimonials testimonials={siteData.testimonials} />

        {/* Upcoming Workshops & Showcases */}
        <Events
          events={siteData.upcomingEvents}
          onOpenEnrollment={handleOpenEnrollment}
        />

        {/* Frequently Asked Questions */}
        <Faq faqs={siteData.faqs} />

        {/* Connect, Inquire & Registration Form */}
        <Contact
          contact={siteData.artistInfo.contact}
          preselectedCourse={selectedCourse}
        />
      </main>

      {/* Global Enrollment Modal */}
      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={handleCloseEnrollment}
        prefilledProgram={selectedCourse}
        contact={siteData.artistInfo.contact}
      />

      {/* Save to Local Drive Helper */}
      <DownloadHelper />

      {/* Footer */}
      <Footer contact={siteData.artistInfo.contact} />
    </div>
  );
};

export default LeelaNarayanWebsite;
