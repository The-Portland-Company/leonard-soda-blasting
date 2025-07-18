import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const AutomotiveClient = dynamic(() => import('@/components/pages/AutomotiveClient'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})

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