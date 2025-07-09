const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function setupPoliciesAndPermissions() {
  try {
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Logged in as admin');

    // Get the Public role
    const rolesResponse = await axios.get(`${DIRECTUS_URL}/roles`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const publicRole = rolesResponse.data.data.find(role => role.name === 'Public');
    if (!publicRole) {
      console.error('❌ Public role not found');
      return;
    }
    
    console.log(`🔍 Public role ID: ${publicRole.id}`);

    // Create a public access policy
    let publicPolicyId;
    try {
      const policyResponse = await axios.post(`${DIRECTUS_URL}/policies`, {
        name: 'Public Access Policy',
        description: 'Allows public read access to content collections',
        admin_access: false,
        app_access: false,
        icon: 'public'
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      publicPolicyId = policyResponse.data.data.id;
      console.log(`✅ Created public policy: ${publicPolicyId}`);
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
        // Policy already exists, get it
        const policiesResponse = await axios.get(`${DIRECTUS_URL}/policies?filter[name][_eq]=Public Access Policy`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        publicPolicyId = policiesResponse.data.data[0]?.id;
        console.log(`⚠️  Public policy already exists: ${publicPolicyId}`);
      } else {
        console.error('❌ Failed to create policy:', error.response?.data || error.message);
        return;
      }
    }

    // Assign policy to Public role
    try {
      await axios.patch(`${DIRECTUS_URL}/roles/${publicRole.id}`, {
        policies: [publicPolicyId]
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Assigned policy to Public role');
    } catch (error) {
      console.log('⚠️  Policy assignment may have failed or already exists');
    }

    // Create permissions for each collection
    const collections = ['pages', 'navigation', 'settings', 'services', 'testimonials'];
    
    for (const collection of collections) {
      try {
        const permissionData = {
          policy: publicPolicyId,
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
        
        console.log(`✅ Created read permission for ${collection}`);
      } catch (error) {
        if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️  Permission for ${collection} already exists`);
        } else {
          console.error(`❌ Failed to create permission for ${collection}:`, error.response?.data?.errors?.[0]?.message || error.message);
        }
      }
    }

    // Wait a moment for permissions to propagate
    await new Promise(resolve => setTimeout(resolve, 2000));

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

    // Test a specific page
    try {
      const homePageResponse = await axios.get(`${DIRECTUS_URL}/items/pages?filter[slug][_eq]=home&limit=1`);
      if (homePageResponse.data.data.length > 0) {
        console.log(`✅ Home page accessible with title: "${homePageResponse.data.data[0].title}"`);
      }
    } catch (error) {
      console.log(`❌ Home page test failed: ${error.response?.status}`);
    }

    console.log('\n✅ Policies and permissions setup complete!');
    console.log('🌐 You can now access the collections publicly at:');
    console.log(`  • Pages: ${DIRECTUS_URL}/items/pages`);
    console.log(`  • Navigation: ${DIRECTUS_URL}/items/navigation`);
    console.log(`  • Settings: ${DIRECTUS_URL}/items/settings`);
    console.log(`  • Services: ${DIRECTUS_URL}/items/services`);
    console.log(`  • Admin panel: ${DIRECTUS_URL}/admin`);
    
  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data || error.message);
  }
}

setupPoliciesAndPermissions();