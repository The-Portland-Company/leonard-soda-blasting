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
            // Gallery-specific AGGRESSIVE gform protection
            (function() {
              console.log('🎨 GALLERY PROTECTION: Starting gallery-specific gform protection');
              
              // Force create gform_1 immediately if it doesn't exist
              var existingForm = document.getElementById('gform_1');
              if (!existingForm) {
                console.log('🎨 GALLERY PROTECTION: Creating gallery-specific gform_1 element');
                var dummy = document.createElement('form');
                dummy.id = 'gform_1';
                dummy.className = 'gallery-gform-dummy';
                dummy.style.cssText = 'display:none!important;visibility:hidden!important;position:absolute!important;left:-9999px!important;';
                
                // Add comprehensive method coverage
                dummy.addEventListener = function(event, handler, options) { 
                  console.warn('🎨 GALLERY PROTECTION: Prevented gform_1 addEventListener for:', event);
                  return false; 
                };
                dummy.removeEventListener = function() { return false; };
                dummy.submit = function() { return false; };
                dummy.reset = function() { return false; };
                dummy.querySelector = function() { return null; };
                dummy.querySelectorAll = function() { return []; };
                
                // Insert into document immediately
                if (document.body) {
                  document.body.appendChild(dummy);
                } else if (document.documentElement) {
                  document.documentElement.appendChild(dummy);
                }
                
                console.log('🎨 GALLERY PROTECTION: Gallery gform_1 element created successfully');
              } else {
                console.log('🎨 GALLERY PROTECTION: gform_1 element already exists');
              }
              
              // Gallery-specific error suppression
              var galleryErrorCount = 0;
              var originalError = window.onerror;
              window.onerror = function(msg, url, lineNo, columnNo, error) {
                if (msg && msg.includes('gform') && url && url.includes('/gallery')) {
                  galleryErrorCount++;
                  console.warn('🎨 GALLERY PROTECTION: Suppressed gallery gform error #' + galleryErrorCount + ':', msg);
                  return true;
                }
                return originalError ? originalError.apply(this, arguments) : false;
              };
              
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