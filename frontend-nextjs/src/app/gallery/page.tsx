import { Metadata } from 'next'
import { getPage, getGlobalSettings } from '@/lib/directus-server'
import GalleryClient from '@/components/pages/GalleryClient'
import Script from 'next/script'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage('gallery');
  const settings = await getGlobalSettings();
  
  return {
    title: page?.meta_title || settings?.site_title || 'Gallery - Leonard Soda Blasting',
    description: page?.meta_description || settings?.site_description || 'View our gallery of soda blasting projects.',
    other: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  }
}

export default async function Gallery() {
  const [page, settings] = await Promise.all([
    getPage('gallery'),
    getGlobalSettings()
  ]);

  return (
    <>
      <Script
        id="gallery-gform-protection"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Gallery-specific gform protection
            (function() {
              // Ensure gform_1 exists before any scripts try to access it
              if (typeof document !== 'undefined' && !document.getElementById('gform_1')) {
                console.log('Gallery: Creating dummy gform_1 element');
                var dummy = document.createElement('form');
                dummy.id = 'gform_1';
                dummy.style.display = 'none';
                dummy.addEventListener = function() { 
                  console.warn('Gallery: Prevented gform_1 addEventListener');
                  return false; 
                };
                document.body.appendChild(dummy);
              }
            })();
          `
        }}
      />
      <GalleryClient 
        page={page} 
        settings={settings}
      />
    </>
  );
}