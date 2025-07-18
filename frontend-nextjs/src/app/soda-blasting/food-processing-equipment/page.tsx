import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const FoodProcessingClient = dynamic(() => import('@/components/pages/FoodProcessingClient'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('food-processing-equipment');
  
  return {
    title: page?.meta_title || page?.title || 'Food Processing Equipment Soda Blasting',
    description: page?.meta_description || 'Professional soda blasting services for food processing equipment. Safe, food-grade cleaning and restoration.',
  }
}

export default async function FoodProcessingPage() {
  const page = await getPage('food-processing-equipment');

  return (
    <FoodProcessingClient 
      page={page} 
    />
  );
}