require('dotenv').config({ path: '../.env' });
require('dotenv').config({ path: '../backend/.env' });

const config = {
  // Development URLs
  directusAdminUrl: process.env.SCRIPT_DIRECTUS_ADMIN_URL || process.env.DIRECTUS_ADMIN_URL || 'http://localhost:8055',
  directusUrl: process.env.SCRIPT_DIRECTUS_URL || process.env.DIRECTUS_URL || 'http://localhost:8574',
  frontendUrl: process.env.SCRIPT_FRONTEND_URL || process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // API credentials
  adminEmail: process.env.DIRECTUS_ADMIN_EMAIL || 'admin@example.com',
  adminPassword: process.env.DIRECTUS_ADMIN_PASSWORD || 'password',
  
  // Database
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 5432,
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'password',
  dbName: process.env.DB_DATABASE || 'postgres',
  
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development' || !process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
};

module.exports = config;