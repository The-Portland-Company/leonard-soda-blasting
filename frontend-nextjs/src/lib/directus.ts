import { createDirectus, rest } from '@directus/sdk';
import { config } from './config';

export interface ContentSection {
  type: string;
  title: string;
  content: string;
  [key: string]: unknown;
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
  content?: string;
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
  ccb_number?: string;
  service_areas?: string;
  compliance_certifications?: string;
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
  gallery?: unknown[];
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
  settings: GlobalSettings;
  navigation: Navigation[];
  services: Service[];
  testimonials: Testimonial[];
}

// Create Directus client
export const directus = createDirectus<Schema>(config.directusUrl)
  .with(rest());

// Helper function to get file URL - Railway workaround for ephemeral storage
export const getFileUrl = (fileId: string): string => {
  if (!fileId) return '';
  
  // Railway ephemeral storage workaround - use static assets from repo
  const staticAssets: { [key: string]: string } = {
    '359082da-6bf6-4a78-adfd-709e37692e33': '/assets/images/automotive-1.jpg',
    '7a0552d9-cfee-4e04-b6c7-f5105360b843': '/assets/images/fire-damage.jpg',
    '914108af-d022-485e-9236-c83d1d40bf53': '/assets/images/food-processing-equipment.jpg',
    'c1836ea8-d75d-4f70-aada-5854bbce79b5': '/assets/images/boat-1.jpg',
    'c3b703ce-6825-4c66-84c2-7f116b3e0552': '/assets/images/commercial.jpg',
    'dde5eeeb-f19c-414a-8dd7-03db20f8ea5e': '/assets/images/log-homes.jpg',
    'e9d11ac5-a277-4183-ac6a-16fde4667359': '/assets/images/aircraft.jpg'
  };
  
  // Return static asset path if available, otherwise try assets endpoint
  return staticAssets[fileId] || `${config.directusUrl}/assets/${fileId}`;
};

