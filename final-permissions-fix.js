const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function finalPermissionsFix() {
  try {
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Logged in as admin');

    // Get all policies
    const policiesResponse = await axios.get(`${DIRECTUS_URL}/policies`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('📋 Available policies:');
    policiesResponse.data.data.forEach(policy => {
      console.log(`  - ${policy.name} (${policy.id})`);
    });

    // Find or create a public policy
    let publicPolicy = policiesResponse.data.data.find(p => p.name === 'Public Access Policy');
    
    if (!publicPolicy) {
      const createPolicyResponse = await axios.post(`${DIRECTUS_URL}/policies`, {
        name: 'Public Access Policy',
        description: 'Allows public read access to website content',
        admin_access: false,
        app_access: false,
        enforce_tfa: false
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      publicPolicy = createPolicyResponse.data.data;
      console.log('✅ Created public policy');
    } else {
      console.log('✅ Found existing public policy');
    }

    // Create permissions for each collection with the policy
    const collections = ['pages', 'navigation', 'settings', 'services', 'testimonials'];
    
    for (const collection of collections) {
      try {
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          policy: publicPolicy.id,
          collection: collection,
          action: 'read',
          permissions: {},
          validation: {},
          presets: {},
          fields: ['*']
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`✅ Created policy permission for ${collection}`);
      } catch (error) {
        if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️  Policy permission for ${collection} already exists`);
        } else {
          console.error(`❌ Failed to create policy permission for ${collection}:`, error.response?.data?.errors?.[0]?.message);
        }
      }
    }

    // Also try creating permissions for null role (anonymous access)
    console.log('\n🔧 Setting up anonymous access permissions...');
    
    for (const collection of collections) {
      try {
        await axios.post(`${DIRECTUS_URL}/permissions`, {
          role: null, // null = anonymous/public access
          policy: publicPolicy.id,
          collection: collection,
          action: 'read',
          permissions: {},
          validation: {},
          presets: {},
          fields: ['*']
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log(`✅ Created anonymous permission for ${collection}`);
      } catch (error) {
        if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️  Anonymous permission for ${collection} already exists`);
        } else {
          console.error(`❌ Failed to create anonymous permission for ${collection}:`, error.response?.data?.errors?.[0]?.message);
        }
      }
    }

    // Test public access
    console.log('\n🧪 Testing public access after permissions fix...');
    
    for (const collection of collections) {
      try {
        const testResponse = await axios.get(`${DIRECTUS_URL}/items/${collection}?limit=1`);
        const count = collection === 'settings' ? 'singleton' : testResponse.data.data.length;
        console.log(`✅ ${collection}: accessible (${count} items)`);
      } catch (error) {
        console.log(`❌ ${collection}: ${error.response?.status} - still blocked`);
      }
    }

    // Test specific endpoints that the frontend uses
    console.log('\n🧪 Testing specific frontend endpoints...');
    
    const testEndpoints = [
      '/items/pages?filter[slug][_eq]=home&filter[status][_eq]=published&limit=1',
      '/items/navigation?filter[status][_eq]=active&sort=sort',
      '/items/settings',
      '/items/services?filter[status][_eq]=published&sort=sort_order,title',
      '/items/testimonials?filter[status][_eq]=published&filter[featured][_eq]=true'
    ];

    for (const endpoint of testEndpoints) {
      try {
        const response = await axios.get(`${DIRECTUS_URL}${endpoint}`);
        console.log(`✅ ${endpoint}: accessible`);
      } catch (error) {
        console.log(`❌ ${endpoint}: ${error.response?.status} - blocked`);
      }
    }

    console.log('\n✅ Permissions fix completed!');
    
  } catch (error) {
    console.error('❌ Permissions fix failed:', error.response?.data || error.message);
  }
}

finalPermissionsFix();