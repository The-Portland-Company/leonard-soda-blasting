import { Metadata } from 'next'
import { getPage, getGlobalSettings, getTestimonials } from '@/lib/directus-server'
import HomeClient from '@/components/pages/HomeClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('home');
  const settings = await getGlobalSettings();
  
  return {
    title: page?.meta_title || settings?.site_title || 'Leonard Soda Blasting',
    description: page?.meta_description || settings?.site_description || 'Professional eco-friendly soda blasting services for cleaning and restoration.',
  }
}

export default async function HomePage() {
  const [page, settings, testimonials] = await Promise.all([
    getPage('home'),
    getGlobalSettings(),
    getTestimonials()
  ]);

  return (
    <HomeClient 
      page={page} 
      settings={settings} 
      testimonials={testimonials} 
    />
  );
}