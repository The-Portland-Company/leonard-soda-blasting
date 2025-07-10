import { Metadata } from 'next'
import { getPage, getGlobalSettings } from '@/lib/directus-server'
import GalleryClient from '@/components/pages/GalleryClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('gallery');
  const settings = await getGlobalSettings();
  
  return {
    title: page?.meta_title || settings?.site_title || 'Gallery - Leonard Soda Blasting',
    description: page?.meta_description || settings?.site_description || 'View our gallery of soda blasting projects.',
  }
}

export default async function Gallery() {
  const [page, settings] = await Promise.all([
    getPage('gallery'),
    getGlobalSettings()
  ]);

  return (
    <GalleryClient 
      page={page} 
      settings={settings}
    />
  );
}