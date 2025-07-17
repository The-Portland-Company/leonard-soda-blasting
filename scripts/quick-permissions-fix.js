const axios = require('axios');
const config = require('./config');

const DIRECTUS_URL = config.directusAdminUrl;
const ADMIN_EMAIL = config.adminEmail;
const ADMIN_PASSWORD = config.adminPassword;

async function quickPermissionsFix() {
  try {
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Logged in as admin');

    // Set permissions for null role (public access)
    const collections = ['pages', 'navigation', 'settings', 'services', 'testimonials'];
    
    for (const collection of collections) {
      try {
        // Try with null role for public access
        const permissionData = {
          role: null, // null = public access
          collection: collection,
          action: 'read',
          permissions: {},
          validation: {},
          presets: {},
          fields: ['*']
        };

        await axios.post(`${DIRECTUS_URL}/permissions`, permissionData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log(`✅ Created public permission for ${collection}`);
      } catch (error) {
        if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️  Permission for ${collection} already exists`);
        } else {
          console.error(`❌ Failed to create permission for ${collection}:`, error.response?.data?.errors?.[0]?.message || error.message);
        }
      }
    }

    // Test the endpoints
    console.log('\n🧪 Testing public access after fix...');
    
    for (const collection of collections) {
      try {
        const testResponse = await axios.get(`${DIRECTUS_URL}/items/${collection}?limit=1`);
        console.log(`✅ ${collection}: accessible (${testResponse.data.data?.length || 'singleton'} items)`);
      } catch (error) {
        console.log(`❌ ${collection}: ${error.response?.status} - still blocked`);
      }
    }

    console.log('\n✅ Permissions fix completed!');
    
  } catch (error) {
    console.error('❌ Fix failed:', error.response?.data || error.message);
  }
}

quickPermissionsFix();