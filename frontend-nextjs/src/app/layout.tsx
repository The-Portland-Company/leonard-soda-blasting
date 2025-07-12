import type { Metadata } from 'next';
import { Providers } from './providers';
import Header from '@/components/Header';
import { getGlobalSettings, getNavigation } from '@/lib/directus-server';
import { Arvo } from 'next/font/google';
import { Box, Container, VStack, Text, Link, Button } from '@chakra-ui/react';

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
      </head>
      <body>
        <Providers>
          <Header navigation={navigation} siteTitle={settings?.site_title} />
          {children}
          {/* Footer */}
          <Box as="footer" bg="gray.900" color="white" py={4} textAlign="center">
            <Container maxW="container.xl">
              <VStack gap={2}>
                <Text fontSize="sm">
                  © {new Date().getFullYear()} Leonard Soda Blasting. All rights reserved.
                </Text>
                <Link href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/admin`} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" colorScheme="green">
                    Admin Login
                  </Button>
                </Link>
              </VStack>
            </Container>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
