import { Metadata } from 'next'
import { getPage, getGlobalSettings } from '@/lib/directus-server'
import ContactClient from '@/components/pages/ContactClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('contact');
  const settings = await getGlobalSettings();
  
  return {
    title: page?.meta_title || settings?.site_title || 'Contact - Leonard Soda Blasting',
    description: page?.meta_description || settings?.site_description || 'Contact Leonard Soda Blasting for professional soda blasting services.',
  }
}

export default async function Contact() {
  const [page, settings] = await Promise.all([
    getPage('contact'),
    getGlobalSettings()
  ]);

  return (
    <ContactClient 
      page={page} 
      settings={settings}
    />
  );
}