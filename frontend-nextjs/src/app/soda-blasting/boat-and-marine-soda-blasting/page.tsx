import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const BoatMarineClient = dynamic(() => import('@/components/pages/BoatMarineClient'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})

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