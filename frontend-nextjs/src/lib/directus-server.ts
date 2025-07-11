import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';
import { Schema, GlobalSettings, Navigation, Page, Testimonial } from './directus';

const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL;

if (!directusUrl) {
  console.error('NEXT_PUBLIC_DIRECTUS_URL is not set in the environment variables.');
  throw new Error('NEXT_PUBLIC_DIRECTUS_URL is not set in the environment variables.');
}

const directus = createDirectus<Schema>(directusUrl).with(rest());

export const getGlobalSettings = async (): Promise<GlobalSettings | null> => {
  try {
    console.log('Fetching global settings from:', directusUrl);
    const settings = await directus.request(readSingleton('settings'));
    console.log('Global settings fetched:', settings);
    return settings;
  } catch (error) {
    console.error('Error fetching global settings:', error);
    return null;
  }
};

export const getNavigation = async (): Promise<Navigation[]> => {
  try {
    console.log('Fetching navigation from:', directusUrl);
    const navigation = await directus.request(readItems('navigation'));
    console.log('Navigation fetched:', navigation);
    return navigation;
  } catch (error) {
    console.error('Error fetching navigation:', error);
    return [];
  }
};

export const getPage = async (slug: string): Promise<Page | null> => {
  try {
    console.log(`Fetching page with slug ${slug} from:`, directusUrl);
    const pages = await directus.request(readItems('pages', {
      filter: {
        slug: { _eq: slug }
      }
    }));
    console.log(`Page with slug ${slug} fetched:`, pages[0]);
    return pages[0] || null;
  } catch (error) {
    console.error(`Error fetching page with slug ${slug}:`, error);
    return null;
  }
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    console.log('Fetching testimonials from:', directusUrl);
    const testimonials = await directus.request(readItems('testimonials'));
    console.log('Testimonials fetched:', testimonials);
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};
