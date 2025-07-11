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
      <body>
        <Providers>
          <Header navigation={navigation} siteTitle={settings?.site_title} />
          {children}
          {/* Footer */}
          <Box as="footer" bg="gray.900" color="white" py={4} textAlign="center">
            <Container maxW="container.xl">
              <VStack spacing={2}>
                <Text fontSize="sm">
                  © {new Date().getFullYear()} Leonard Soda Blasting. All rights reserved.
                </Text>
                <Link href={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/admin`} isExternal>
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
