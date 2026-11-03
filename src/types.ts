export interface ArtistContact {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  youtube: string;
  facebook: string;
  linkedin: string;
}

export interface ArtistInfo {
  name: string;
  title: string;
  shortTitle: string;
  academyName: string;
  location: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTagline: string;
  bio: string[];
  contact: ArtistContact;
}

export interface StatItem {
  value: string;
  label: string;
  subtext?: string;
}

export interface PillarItem {
  title: string;
  subtitle: string;
  desc: string;
  icon: string;
}

export interface MusicClassItem {
  id: string;
  title: string;
  desc: string;
  levels: string;
  format: string;
  icon: string;
  details: string[];
}

export interface AchievementItem {
  id: number;
  year: string;
  title: string;
  org: string;
  category: string;
  desc: string;
  image: string;
}

export interface UpcomingEventItem {
  id: number;
  name: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  desc: string;
  category: string;
}

export interface GalleryImageItem {
  id: number;
  title: string;
  category: string;
  src: string;
  caption: string;
  highlight?: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  course: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteData {
  artistInfo: ArtistInfo;
  stats: StatItem[];
  threePillars: PillarItem[];
  areasOfExpertise: string[];
  teacherInfo: {
    philosophy?: string;
    quotes?: string[];
    [key: string]: unknown;
  };
  musicClasses: MusicClassItem[];
  whyLearnCards: Array<{ title: string; desc: string; icon?: string }>;
  studentSection: {
    title: string;
    subtitle: string;
    text: string;
    highlights: string[];
    journeySteps: Array<{ step: string; title: string; desc: string }>;
  };
  devotionalSection: {
    title: string;
    subtitle: string;
    desc: string;
    traditions: string[];
    devotionalHighlights: string[];
  };
  achievements: AchievementItem[];
  culturalEventsSection: {
    title: string;
    subtitle: string;
    text: string;
  };
  anchoringSection?: {
    title: string;
    subtitle: string;
    desc: string;
    highlights: string[];
  };
  upcomingEvents: UpcomingEventItem[];
  galleryImages: GalleryImageItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
}
