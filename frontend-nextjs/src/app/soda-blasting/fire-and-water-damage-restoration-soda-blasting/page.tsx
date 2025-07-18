import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const FireWaterDamageClient = dynamic(() => import('@/components/pages/FireWaterDamageClient'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('fire-and-water-damage-restoration-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'Fire & Water Damage Restoration Soda Blasting',
    description: page?.meta_description || 'Professional fire and water damage restoration using soda blasting. Safe removal of smoke, soot, and water damage.',
  }
}

export default async function FireWaterDamagePage() {
  const page = await getPage('fire-and-water-damage-restoration-soda-blasting');

  return (
    <FireWaterDamageClient 
      page={page} 
    />
  );
}