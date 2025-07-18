import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const LogHomeClient = dynamic(() => import('@/components/pages/LogHomeClient'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('log-home-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'Log Home Soda Blasting',
    description: page?.meta_description || 'Professional log home soda blasting services. Gentle restoration of log homes and cabins without damage.',
  }
}

export default async function LogHomePage() {
  const page = await getPage('log-home-soda-blasting');

  return (
    <LogHomeClient 
      page={page} 
    />
  );
}