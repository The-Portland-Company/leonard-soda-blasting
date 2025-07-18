import type { Metadata } from 'next';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getGlobalSettings, getNavigation } from '@/lib/directus-server';
import { Arvo } from 'next/font/google';

const arvo = Arvo({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-arvo',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();
  return {
    title: settings?.site_title || 'Leonard Soda Blasting',
    description: settings?.site_description || 'Professional eco-friendly soda blasting services for cleaning and restoration.',
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getGlobalSettings();
  const navigation = await getNavigation();

  return (
    <html lang="en" className={arvo.variable}>
      <head>
        {/* Preload critical font files */}
        <link 
          rel="preload" 
          href="/_next/static/media/eae1008d0a7c1eaf-s.p.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preload" 
          href="/_next/static/media/0460ac3f200db590-s.p.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        {/* Preload CSS file with high priority - only in production */}
        {process.env.NODE_ENV === 'production' && (
          <link 
            rel="preload" 
            href="/_next/static/css/6d8fd683660c2b1a.css" 
            as="style"
          />
        )}
        {/* Inline critical font CSS to prevent render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face{
              font-family:Arvo;
              font-style:normal;
              font-weight:400;
              font-display:swap;
              src:url(/_next/static/media/eae1008d0a7c1eaf-s.p.woff2) format("woff2");
              unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd
            }
            @font-face{
              font-family:Arvo;
              font-style:normal;
              font-weight:700;
              font-display:swap;
              src:url(/_next/static/media/0460ac3f200db590-s.p.woff2) format("woff2");
              unicode-range:u+00??,u+0131,u+0152-0153,u+02bb-02bc,u+02c6,u+02da,u+02dc,u+0304,u+0308,u+0329,u+2000-206f,u+20ac,u+2122,u+2191,u+2193,u+2212,u+2215,u+feff,u+fffd
            }
            @font-face{
              font-family:Arvo Fallback;
              src:local("Times New Roman");
              ascent-override:79.95%;
              descent-override:20.56%;
              line-gap-override:2.23%;
              size-adjust:120.19%
            }
            .__className_5e4f48{
              font-family:Arvo,Arvo Fallback;
              font-style:normal
            }
            .__variable_5e4f48{
              --font-arvo:"Arvo","Arvo Fallback"
            }
          `
        }} />
        {/* Prevent legacy script errors - Must run immediately */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Comprehensive legacy script error prevention
            (function() {
              // Create gform_1 element to prevent errors
              if (!document.getElementById('gform_1')) {
                var dummyForm = document.createElement('div');
                dummyForm.id = 'gform_1';
                dummyForm.style.display = 'none';
                document.head.appendChild(dummyForm);
                
                // Add dummy addEventListener method
                dummyForm.addEventListener = function() {
                  console.warn('Prevented gform_1 addEventListener call');
                  return false;
                };
              }
              
              // Override document methods before any scripts load
              var originalQuerySelector = document.querySelector;
              document.querySelector = function(selector) {
                if (selector === '#gform_1') {
                  var element = originalQuerySelector.call(this, selector);
                  if (!element) {
                    console.warn('gform_1 element requested but not found - returning dummy element');
                    return document.getElementById('gform_1') || { 
                      addEventListener: function() { return false; },
                      style: {},
                      className: ''
                    };
                  }
                  return element;
                }
                return originalQuerySelector.call(this, selector);
              };
              
              // Override getElementById for gform_1
              var originalGetElementById = document.getElementById;
              document.getElementById = function(id) {
                if (id === 'gform_1') {
                  var element = originalGetElementById.call(this, id);
                  if (!element) {
                    console.warn('gform_1 requested via getElementById - returning dummy element');
                    return { 
                      addEventListener: function() { 
                        console.warn('Dummy gform_1 addEventListener called'); 
                        return false; 
                      },
                      style: {},
                      className: '',
                      submit: function() { return false; }
                    };
                  }
                  return element;
                }
                return originalGetElementById.call(this, id);
              };
              
              // Global error handler for any missed errors
              window.addEventListener('error', function(e) {
                if (e.message && (e.message.includes('gform') || e.message.includes("null is not an object"))) {
                  console.warn('Suppressed legacy script error:', e.message);
                  e.preventDefault();
                  return false;
                }
              }, true); // Use capture phase
              
              // Protect against script execution errors
              window.onerror = function(msg, url, lineNo, columnNo, error) {
                if (msg && (msg.includes('gform') || msg.includes("null is not an object"))) {
                  console.warn('Caught script error:', msg);
                  return true; // Prevent default error handling
                }
                return false;
              };
              
            })();
          `
        }} />
      </head>
      <body>
        <Providers>
          <Header navigation={navigation} siteTitle={settings?.site_title} />
          {children}
          <Footer settings={settings} />
        </Providers>
      </body>
    </html>
  );
}
