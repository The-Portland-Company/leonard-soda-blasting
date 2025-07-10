import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import AircraftClient from '@/components/pages/AircraftClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('airplane-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'Aircraft Soda Blasting',
    description: page?.meta_description || 'Professional aircraft soda blasting services. Safe paint removal for planes and aviation equipment without surface damage.',
  }
}

export default async function AircraftPage() {
  const page = await getPage('airplane-soda-blasting');

  return (
    <AircraftClient 
      page={page} 
    />
  );
}