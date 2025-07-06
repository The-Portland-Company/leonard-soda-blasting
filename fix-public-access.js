const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function fixPublicAccess() {
  try {
    console.log('Fixing public access for Directus...');
    
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    const headers = { Authorization: `Bearer ${token}` };
    
    // Get all permissions
    const permissionsResponse = await axios.get(`${DIRECTUS_URL}/permissions`, { headers });
    const permissions = permissionsResponse.data.data;
    
    console.log(`Found ${permissions.length} permissions`);
    
    // Find public role permissions
    const publicPermissions = permissions.filter(p => p.role === '1c6e3a8a-f325-4126-90d7-344e6c2e1c01');
    console.log(`Found ${publicPermissions.length} public permissions`);
    
    // Update each public permission to allow all fields
    for (const permission of publicPermissions) {
      if (permission.action === 'read') {
        console.log(`Updating permission for ${permission.collection}...`);
        
        try {
          await axios.patch(`${DIRECTUS_URL}/permissions/${permission.id}`, {
            permissions: null,
            validation: null,
            presets: null,
            fields: '*'
          }, { headers });
          console.log(`✓ Updated ${permission.collection}`);
        } catch (error) {
          console.error(`Error updating ${permission.collection}:`, error.response?.data || error.message);
        }
      }
    }
    
    // Test public access again
    console.log('\nTesting public access...');
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/items/settings`);
      console.log('✓ Public access working!');
      console.log('Settings data:', testResponse.data.data);
    } catch (error) {
      console.error('Still getting permission error:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

fixPublicAccess();