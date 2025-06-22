import { createDirectus, rest, staticToken } from '@directus/sdk';

export interface Page {
  id: number;
  status: 'published' | 'draft';
  title: string;
  slug: string;
  page_type: 'home' | 'about' | 'services' | 'gallery' | 'contact';
  meta_title?: string;
  meta_description?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  content?: string;
  gallery_images?: any[];
}

export interface GlobalSettings {
  id: number;
  site_title: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  logo?: string;
  favicon?: string;
}

export interface Navigation {
  id: number;
  status: 'published' | 'draft';
  label: string;
  url?: string;
  page?: number;
  parent?: number;
  target: '_self' | '_blank';
  sort: number;
}

export interface Schema {
  pages: Page[];
  global_settings: GlobalSettings;
  navigation: Navigation[];
}

const directusUrl = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8055';

// Create Directus client
export const directus = createDirectus<Schema>(directusUrl)
  .with(rest());

// Fallback data for development
export const fallbackData = {
  globalSettings: {
    id: 1,
    site_title: 'Leonard Soda Blasting',
    tagline: 'Professional Soda Blasting Services',
    phone: '(555) 123-4567',
    email: 'agency@theportlandcompany.com',
    address: '17035 Kasserman Drive\nBend, Oregon 97707'
  },
  navigation: [
    { id: 1, status: 'published' as const, label: 'Home', url: '/', target: '_self' as const, sort: 1 },
    { id: 2, status: 'published' as const, label: 'About', url: '/about', target: '_self' as const, sort: 2 },
    { id: 3, status: 'published' as const, label: 'Services', url: '/services', target: '_self' as const, sort: 3 },
    { id: 4, status: 'published' as const, label: 'Automotive', url: '/automotive', target: '_self' as const, sort: 4 },
    { id: 5, status: 'published' as const, label: 'Aircraft', url: '/aircraft', target: '_self' as const, sort: 5 },
    { id: 6, status: 'published' as const, label: 'Boat/Marine', url: '/boat-marine', target: '_self' as const, sort: 6 },
    { id: 7, status: 'published' as const, label: 'Commercial', url: '/commercial-industrial', target: '_self' as const, sort: 7 },
    { id: 8, status: 'published' as const, label: 'Fire/Water Damage', url: '/fire-water-damage', target: '_self' as const, sort: 8 },
    { id: 9, status: 'published' as const, label: 'Food Processing', url: '/food-processing-equipment', target: '_self' as const, sort: 9 },
    { id: 10, status: 'published' as const, label: 'Log Homes', url: '/log-homes', target: '_self' as const, sort: 10 },
    { id: 11, status: 'published' as const, label: 'Gallery', url: '/gallery', target: '_self' as const, sort: 11 },
    { id: 12, status: 'published' as const, label: 'Contact', url: '/contact', target: '_self' as const, sort: 12 }
  ]
};