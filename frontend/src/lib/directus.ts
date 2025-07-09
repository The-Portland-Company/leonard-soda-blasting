import { createDirectus, rest } from '@directus/sdk';

export interface ContentSection {
  type: string;
  title: string;
  content: string;
  [key: string]: any;
}

export interface ServiceCard {
  title: string;
  text: string;
  image?: string;
  service_page?: number;
}

export interface Page {
  id: number;
  status: 'published' | 'draft' | 'archived';
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  hero_video?: string;
  content_sections?: ContentSection[];
  services_cards?: ServiceCard[];
  date_created?: string;
  date_updated?: string;
}

export interface GlobalSettings {
  id: number;
  site_title: string;
  site_tagline?: string;
  site_description?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  business_hours?: string;
  social_facebook?: string;
  social_instagram?: string;
  social_linkedin?: string;
  google_analytics_id?: string;
  logo?: string;
  favicon?: string;
}

export interface Navigation {
  id: number;
  status: 'active' | 'inactive';
  label: string;
  url?: string;
  parent_id?: number;
  target: '_self' | '_blank';
  icon?: string;
  sort?: number;
}

export interface Service {
  id: number;
  status: 'published' | 'draft' | 'archived';
  title: string;
  slug: string;
  description?: string;
  featured_image?: string;
  gallery?: any[];
  features?: string[];
  applications?: string[];
  sort_order?: number;
}

export interface Testimonial {
  id: number;
  status: 'published' | 'draft' | 'archived';
  quote: string;
  client_name: string;
}

export interface Schema {
  pages: Page[];
  settings: GlobalSettings[];
  navigation: Navigation[];
  services: Service[];
  testimonials: Testimonial[];
}

const directusUrl = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8574';

// Create Directus client
export const directus = createDirectus<Schema>(directusUrl)
  .with(rest());

