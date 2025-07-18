import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const AboutSodaBlastingClient = dynamic(() => import('@/components/pages/AboutSodaBlastingClient'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('about-soda-blasting');
  
  return {
    title: page?.meta_title || page?.title || 'About Soda Blasting',
    description: page?.meta_description || 'Learn about eco-friendly soda blasting process and its benefits.',
  }
}

export default async function AboutSodaBlastingPage() {
  const page = await getPage('about-soda-blasting');

  return (
    <AboutSodaBlastingClient 
      page={page} 
    />
  );
}