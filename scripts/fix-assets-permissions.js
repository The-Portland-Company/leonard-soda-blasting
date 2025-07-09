const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8574';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function fixAssetsPermissions() {
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

    // Get existing policies
    const policiesResponse = await axios.get(`${DIRECTUS_URL}/policies`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('📋 Available policies:', policiesResponse.data.data.length);

    // Check if we need to create a policy for public access
    let publicPolicy = policiesResponse.data.data.find(policy => policy.name === 'Public Assets');
    
    if (!publicPolicy) {
      // Create a policy for public asset access
      const policyData = {
        name: 'Public Assets',
        icon: 'public',
        description: 'Public access to assets',
        ip_access: null,
        enforce_tfa: false,
        admin_access: false,
        app_access: false
      };

      const policyResponse = await axios.post(`${DIRECTUS_URL}/policies`, policyData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      publicPolicy = policyResponse.data.data;
      console.log(`✅ Created public assets policy: ${publicPolicy.id}`);
    }

    // Set up permissions for directus_files collection (needed for assets)
    const collections = ['directus_files'];
    
    for (const collection of collections) {
      try {
        const permissionData = {
          policy: publicPolicy.id,
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

    // Assign the policy to the public role
    try {
      const accessData = {
        policy: publicPolicy.id,
        role: publicRoleId
      };

      const accessResponse = await axios.post(`${DIRECTUS_URL}/access`, accessData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log(`✅ Assigned policy to public role`);
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
        console.log(`⚠️  Policy already assigned to public role`);
      } else {
        console.error(`❌ Failed to assign policy to role:`, error.response?.data?.errors?.[0]?.message || error.message);
      }
    }

    // Test the asset access
    console.log('\n🧪 Testing asset access...');
    
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/assets/c3b703ce-6825-4c66-84c2-7f116b3e0552`);
      console.log(`✅ Asset access working: ${testResponse.status}`);
    } catch (error) {
      console.log(`❌ Asset access failed: ${error.response?.status} - ${error.response?.data?.errors?.[0]?.message || 'Access denied'}`);
    }

    console.log('\n✅ Assets permission setup complete!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data || error.message);
  }
}

fixAssetsPermissions();