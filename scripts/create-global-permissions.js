const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function createGlobalPermissions() {
  try {
    console.log('Creating global public permissions...');
    
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    const headers = { Authorization: `Bearer ${token}` };
    
    // Delete existing permissions first
    console.log('Deleting existing permissions...');
    for (let i = 1; i <= 15; i++) {
      try {
        await axios.delete(`${DIRECTUS_URL}/permissions/${i}`, { headers });
        console.log(`Deleted permission ${i}`);
      } catch (error) {
        // Permission might not exist
      }
    }
    
    // Create new global permissions (role: null = public access)
    const collections = ['pages', 'navigation', 'settings', 'services', 'testimonials'];
    
    for (const collection of collections) {
      try {
        console.log(`Creating global permission for ${collection}...`);
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          collection: collection,
          action: 'read',
          role: null,  // null = public access
          permissions: null,
          validation: null,
          presets: null,
          fields: '*'
        }, { headers });
        console.log(`✓ Created global permission for ${collection}`);
      } catch (error) {
        console.error(`Error creating permission for ${collection}:`, error.response?.data || error.message);
      }
    }
    
    // Test public access
    console.log('\\nTesting public access...');
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/items/settings`);
      console.log('✓ Public access working!');
      console.log('Settings data:', testResponse.data.data ? 'Found settings' : 'No settings data');
    } catch (error) {
      console.error('Still getting error:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

createGlobalPermissions();