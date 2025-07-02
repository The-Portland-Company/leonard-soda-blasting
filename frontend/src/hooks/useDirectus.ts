import { useState, useEffect } from 'react';
import { Page, GlobalSettings, Navigation, Service, Testimonial, directus } from '../lib/directus';

// Token refresh utility
async function refreshToken(): Promise<string | null> {
  try {
    const response = await fetch('http://localhost:8055/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'agency@theportlandcompany.com',
        password: 'J9u76asecdst!'
      })
    });
    const data = await response.json();
    return data.data?.access_token || null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
}

// Enhanced fetch with token refresh
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const directusUrl = process.env.REACT_APP_DIRECTUS_URL || 'http://localhost:8055';
  let token = process.env.REACT_APP_DIRECTUS_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1ZDJjOWU3LThkMzAtNGZhOS04ZTY3LTA0Mzc4ZjNlNTNiYyIsInJvbGUiOiIyY2Q4ZjY2NC0zYTM2LTRmMTItOGFhZC1iZDRkNmMwZWEwYmUiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOnRydWUsImlhdCI6MTc1MTQyODI3NCwiZXhwIjoxNzUxNDI5MTc0LCJpc3MiOiJkaXJlY3R1cyJ9.goOfLu9d9Yka8fFQyq7oOrt2Z5T3Wz_1VL7jDnk86qw';
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  let response = await fetch(`${directusUrl}${url}`, {
    ...options,
    headers
  });
  
  // If token expired, refresh and retry
  if (response.status === 401) {
    console.log('Token expired, refreshing...');
    const newToken = await refreshToken();
    if (newToken) {
      headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(`${directusUrl}${url}`, {
        ...options,
        headers
      });
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
        const response = await fetchWithAuth('/items/settings');
        const data = await response.json();
        console.log('Settings response:', data);
        if (data.data) {
          // Settings is a singleton, so it returns an object, not an array
          setSettings(Array.isArray(data.data) ? data.data[0] : data.data);
        }
      } catch (err) {
        console.error('Settings fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch settings');
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
        const response = await fetchWithAuth('/items/navigation');
        const data = await response.json();
        setNavigation(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch navigation');
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
        const response = await fetchWithAuth(`/items/pages?filter[slug][_eq]=${slug}&limit=1`);
        const data = await response.json();
        if (data.data && data.data.length > 0) {
          setPage(data.data[0]);
        } else {
          setPage(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page');
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
        const response = await fetchWithAuth(`/items/pages${filterQuery}`);
        const data = await response.json();
        setPages(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pages');
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
        const response = await fetchWithAuth('/items/services');
        const data = await response.json();
        setServices(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch services');
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
        const response = await fetchWithAuth('/items/testimonials');
        console.log('Testimonials response status:', response.status);
        const data = await response.json();
        console.log('Testimonials response data:', data);
        setTestimonials(data.data || []);
      } catch (err) {
        console.error('Testimonials fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  return { testimonials, loading, error };
}