import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const CommercialIndustrialClient = dynamic(() => import('@/components/pages/CommercialIndustrialClient'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})

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