const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function fixPermissions() {
  try {
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Logged in as admin');

    // Get all roles
    const rolesResponse = await axios.get(`${DIRECTUS_URL}/roles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('📋 Available roles:');
    rolesResponse.data.data.forEach(role => {
      console.log(`  - ${role.name} (${role.id})`);
    });

    // Find the Public role (might be null for public access)
    const publicRole = rolesResponse.data.data.find(role => role.name === 'Public');
    const publicRoleId = publicRole ? publicRole.id : null;
    
    console.log(`\n🔍 Public role ID: ${publicRoleId || 'null (anonymous access)'}`);

    // Set up permissions for collections
    const collections = ['pages', 'navigation', 'settings', 'services', 'testimonials'];
    
    for (const collection of collections) {
      try {
        const permissionData = {
          role: publicRoleId, // null means public/anonymous access
          collection: collection,
          action: 'read',
          permissions: null,
          validation: null,
          presets: null,
          fields: ['*']
        };

        const response = await axios.post(`${DIRECTUS_URL}/permissions`, permissionData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log(`✅ Created public read permission for ${collection}`);
      } catch (error) {
        if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️  Permission for ${collection} already exists`);
        } else {
          console.error(`❌ Failed to create permission for ${collection}:`, error.response?.data?.errors?.[0]?.message || error.message);
        }
      }
    }

    // Test the permissions
    console.log('\n🧪 Testing public access...');
    
    for (const collection of collections) {
      try {
        const testResponse = await axios.get(`${DIRECTUS_URL}/items/${collection}?limit=1`);
        console.log(`✅ ${collection}: ${testResponse.data.data.length} items accessible`);
      } catch (error) {
        console.log(`❌ ${collection}: ${error.response?.status} - ${error.response?.data?.errors?.[0]?.message || 'Access denied'}`);
      }
    }

    console.log('\n✅ Permission setup complete!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data || error.message);
  }
}

fixPermissions();