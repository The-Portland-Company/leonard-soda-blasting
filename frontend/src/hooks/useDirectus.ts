import { useState, useEffect } from 'react';
import { Page, GlobalSettings, Navigation, Service, Testimonial } from '../lib/directus';

// Simple fetch without authentication for public access
async function fetchPublic(url: string, options: RequestInit = {}): Promise<Response> {
  const directusUrl = process.env.REACT_APP_DIRECTUS_URL;
  
  if (!directusUrl) {
    throw new Error('REACT_APP_DIRECTUS_URL environment variable is not set');
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };
  
  const response = await fetch(`${directusUrl}${url}`, {
    ...options,
    headers
  });
  
  if (!response.ok) {
    console.error(`API request failed: ${response.status} ${response.statusText} for ${url}`);
    if (response.status === 403) {
      console.error('403 Forbidden - Check Directus public permissions for this collection');
    }
  }
  
  return response;
}

export function useGlobalSettings() {
  const [settings, setSettings] = useState<GlobalSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const response = await fetchPublic('/items/settings');
        const data = await response.json();
        console.log('Settings response:', data);
        if (data.data) {
          // Settings is a singleton, so it returns an object, not an array
          setSettings(Array.isArray(data.data) ? data.data[0] : data.data);
        }
      } catch (err) {
        console.error('Settings fetch error:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  return { settings, loading, error };
}

export function useNavigation() {
  const [navigation, setNavigation] = useState<Navigation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNavigation() {
      try {
        setLoading(true);
        const response = await fetchPublic('/items/navigation');
        const data = await response.json();
        setNavigation(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
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
        setLoading(true);
        const response = await fetchPublic(`/items/pages?filter[slug][_eq]=${slug}&limit=1&fields=*,services_cards.image,services_cards.title,services_cards.text,services_cards.service_page`);
        const data = await response.json();
        console.log(`[DEBUG] usePage(${slug}) response:`, data);
        if (data.data && data.data.length > 0) {
          const pageData = data.data[0];
          console.log(`[DEBUG] Page data for ${slug}:`, {
            title: pageData.title,
            seo_title: pageData.seo_title,
            page_title: pageData.page_title,
            meta_title: pageData.meta_title
          });
          setPage(pageData);
        } else {
          console.log(`[DEBUG] No page data found for slug: ${slug}`);
          setPage(null);
        }
      } catch (err) {
        console.error(`[DEBUG] usePage(${slug}) error:`, err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
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
        setLoading(true);
        const filterQuery = pageType ? `?filter[page_type][_eq]=${pageType}` : '';
        const response = await fetchPublic(`/items/pages${filterQuery}`);
        const data = await response.json();
        setPages(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchPages();
  }, [pageType]);

  return { pages, loading, error };
}

export function useServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const response = await fetchPublic('/items/services');
        const data = await response.json();
        setServices(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return { services, loading, error };
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        setLoading(true);
        const response = await fetchPublic('/items/testimonials');
        console.log('Testimonials response status:', response.status);
        const data = await response.json();
        console.log('Testimonials response data:', data);
        setTestimonials(data.data || []);
      } catch (err) {
        console.error('Testimonials fetch error:', err);
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}