import { useState, useEffect } from 'react';
import { readItems, readSingleton } from '@directus/sdk';
import { directus, Page, GlobalSettings, Navigation, fallbackData } from '../lib/directus';

export function useGlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettings>(fallbackData.globalSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const result = await directus.request(readSingleton('global_settings'));
        setSettings(result);
      } catch (err) {
        console.warn('Failed to fetch global settings, using fallback:', err);
        setError('Using fallback data');
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, []);

  return { settings, loading, error };
}

export function useNavigation() {
  const [navigation, setNavigation] = useState<Navigation[]>(fallbackData.navigation);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        const result = await directus.request(
          readItems('navigation', {
            filter: { status: { _eq: 'published' } },
            sort: ['sort']
          })
        );
        setNavigation(result);
      } catch (err) {
        console.warn('Failed to fetch navigation, using fallback:', err);
        setError('Using fallback data');
      } finally {
        setLoading(false);
      }
    }

    fetchNavigation();
  }, []);

  return { navigation, loading, error };
}

export function usePage(slug: string) {
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        const result = await directus.request(
          readItems('pages', {
            filter: { 
              slug: { _eq: slug },
              status: { _eq: 'published' }
            },
            limit: 1
          })
        );
        
        if (result.length > 0) {
          setPage(result[0]);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        console.warn('Failed to fetch page, creating fallback:', err);
        // Create fallback page data based on slug
        setPage({
          id: 0,
          status: 'published',
          title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
          slug,
          page_type: slug as any,
          hero_title: `Welcome to ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')}`,
          content: 'This page is using fallback content. Please configure in Directus CMS.'
        });
        setError('Using fallback data');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  return { page, loading, error };
}

export function usePages(pageType?: string) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        const filter: any = { status: { _eq: 'published' } };
        if (pageType) {
          filter.page_type = { _eq: pageType };
        }

        const result = await directus.request(
          readItems('pages', {
            filter,
            sort: ['sort', 'title']
          })
        );
        setPages(result);
      } catch (err) {
        console.warn('Failed to fetch pages, using empty array:', err);
        setError('Failed to fetch pages');
      } finally {
        setLoading(false);
      }
    }

    fetchPages();
  }, [pageType]);

  return { pages, loading, error };
}