import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import FireWaterDamageClient from '@/components/pages/FireWaterDamageClient'

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