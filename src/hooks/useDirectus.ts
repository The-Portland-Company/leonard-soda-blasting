import { useState, useEffect } from 'react';
import { Page, GlobalSettings, Navigation, fallbackData } from '../lib/directus';

export function useGlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettings>(fallbackData.globalSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const directusUrl = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8055';
        const response = await fetch(`${directusUrl}/items/global_settings`);
        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            setSettings(result.data[0] as GlobalSettings);
          }
        }
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
        const directusUrl = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8055';
        const response = await fetch(`${directusUrl}/items/navigation?filter[status][_eq]=published&sort=sort`);
        if (response.ok) {
          const result = await response.json();
          setNavigation(result.data as Navigation[]);
        }
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
        const directusUrl = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8055';
        const response = await fetch(`${directusUrl}/items/pages?filter[slug][_eq]=${slug}&filter[status][_eq]=published&limit=1`);
        if (response.ok) {
          const result = await response.json();
          if (result.data && result.data.length > 0) {
            setPage(result.data[0] as Page);
          } else {
            setError('Page not found');
          }
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
        const directusUrl = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8055';
        let url = `${directusUrl}/items/pages?filter[status][_eq]=published&sort=sort,title`;
        
        if (pageType) {
          url += `&filter[page_type][_eq]=${pageType}`;
        }
        
        const response = await fetch(url);
        if (response.ok) {
          const result = await response.json();
          setPages(result.data as Page[]);
        }
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