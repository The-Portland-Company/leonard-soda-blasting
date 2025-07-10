import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import AboutSodaBlastingClient from '@/components/pages/AboutSodaBlastingClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'About Soda Blasting',
    description: page?.meta_description || 'Learn about eco-friendly soda blasting process and its benefits.',
  }
}

export default async function AboutSodaBlastingPage() {
  const page = await getPage('about-soda-blasting');

  return (
    <AboutSodaBlastingClient 
      page={page} 
    />
  );
}