import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import BoatMarineClient from '@/components/pages/BoatMarineClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('boat-and-marine-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'Boat & Marine Soda Blasting',
    description: page?.meta_description || 'Professional boat and marine soda blasting services. Safe paint removal for boats, yachts, and marine equipment.',
  }
}

export default async function BoatMarinePage() {
  const page = await getPage('boat-and-marine-soda-blasting');

  return (
    <BoatMarineClient 
      page={page} 
    />
  );
}