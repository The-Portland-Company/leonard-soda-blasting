function getOptionalEnvVar(name: string, defaultValue: string): string {
  return process.env[name] || defaultValue;
}

export interface AppConfig {
  frontendUrl: string;
  directusUrl: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  adminEmail: string;
  isDevelopment: boolean;
}

export const config: AppConfig = {
  frontendUrl: getOptionalEnvVar('NEXT_PUBLIC_FRONTEND_URL', 'http://localhost:3000'),
  directusUrl: getOptionalEnvVar('NEXT_PUBLIC_DIRECTUS_URL', 'http://localhost:8574'),
  supabaseUrl: getOptionalEnvVar('NEXT_PUBLIC_SUPABASE_URL', 'https://wqqouhawtmibmvcdkypw.supabase.co'),
  supabaseAnonKey: getOptionalEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', ''),
  adminEmail: getOptionalEnvVar('NEXT_PUBLIC_ADMIN_EMAIL', 'info@leonardsodablasting.com'),
  isDevelopment: process.env.NODE_ENV === 'development',
};

export function validateConfig(): void {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];

  const missing = requiredVars.filter(name => !process.env[name]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

// Runtime configuration validation can be called manually if needed