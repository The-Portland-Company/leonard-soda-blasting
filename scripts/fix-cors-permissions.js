const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function setupPublicPermissions() {
  try {
    console.log('Setting up public permissions for Directus...');
    
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    const headers = { Authorization: `Bearer ${token}` };
    
    // Get or create Public role
    let publicRole;
    try {
      const rolesResponse = await axios.get(`${DIRECTUS_URL}/roles?filter[name][_eq]=Public`, { headers });
      if (rolesResponse.data.data.length > 0) {
        publicRole = rolesResponse.data.data[0];
        console.log('Found existing Public role:', publicRole.id);
      } else {
        throw new Error('No public role found');
      }
    } catch (error) {
      console.log('Creating Public role...');
      const createRoleResponse = await axios.post(`${DIRECTUS_URL}/roles`, {
        name: 'Public',
        icon: 'public',
        description: 'Public access role',
        public: true
      }, { headers });
      publicRole = createRoleResponse.data.data;
      console.log('Created Public role:', publicRole.id);
    }
    
    // Set up public permissions
    const collections = ['pages', 'navigation', 'settings', 'services', 'testimonials'];
    
    for (const collection of collections) {
      try {
        console.log(`Setting up public read permission for ${collection}...`);
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          role: publicRole.id,
          collection: collection,
          action: 'read',
          permissions: {},
          validation: {},
          presets: {},
          fields: ['*']
        }, { headers });
        console.log(`✓ Public read permission set for ${collection}`);
      } catch (error) {
        if (error.response?.status === 400) {
          console.log(`Permission already exists for ${collection}`);
        } else {
          console.error(`Error setting permission for ${collection}:`, error.response?.data || error.message);
        }
      }
    }
    
    // Test the permissions
    console.log('\nTesting public access...');
    const testResponse = await axios.get(`${DIRECTUS_URL}/items/settings`);
    console.log('✓ Public access working!');
    
  } catch (error) {
    console.error('Error setting up permissions:', error.response?.data || error.message);
  }
}

setupPublicPermissions();