import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import CommercialIndustrialClient from '@/components/pages/CommercialIndustrialClient'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('commercial-industrial-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'Commercial & Industrial Soda Blasting',
    description: page?.meta_description || 'Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, and industrial equipment.',
  }
}

export default async function CommercialIndustrialPage() {
  const page = await getPage('commercial-industrial-soda-blasting');

  return (
    <CommercialIndustrialClient 
      page={page} 
    />
  );
}