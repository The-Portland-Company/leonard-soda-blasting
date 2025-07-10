import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import AutomotiveClient from '@/components/pages/AutomotiveClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('automotive-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'Automotive Soda Blasting',
    description: page?.meta_description || 'Professional automotive soda blasting services for cars, trucks, and motorcycles. Safe paint removal without damage.',
  }
}

export default async function AutomotivePage() {
  const page = await getPage('automotive-soda-blasting');

  return (
    <AutomotiveClient 
      page={page} 
    />
  );
}