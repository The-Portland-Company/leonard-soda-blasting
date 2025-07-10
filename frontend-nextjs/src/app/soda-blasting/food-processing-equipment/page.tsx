import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import FoodProcessingClient from '@/components/pages/FoodProcessingClient'

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