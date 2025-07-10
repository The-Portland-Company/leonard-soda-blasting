import type { Metadata } from 'next';
import { Providers } from './providers';
import Header from '@/components/Header';
import PhoneNumber from '@/components/PhoneNumber';
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
      <body>
        <Providers>
          <Header navigation={navigation} siteTitle={settings?.site_title} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
