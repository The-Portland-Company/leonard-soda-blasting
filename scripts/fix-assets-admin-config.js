const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8574';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function fixAssetsAdminConfig() {
  try {
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Logged in as admin');

    // Check current settings
    console.log('\n🔍 Checking current configuration...');
    
    // Get current policies
    const policiesResponse = await axios.get(`${DIRECTUS_URL}/policies`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('📋 Current policies:');
    policiesResponse.data.data.forEach(policy => {
      console.log(`  - ${policy.name} (${policy.id})`);
    });

    // Get current permissions
    const permissionsResponse = await axios.get(`${DIRECTUS_URL}/permissions`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('\n📋 Current permissions for directus_files:');
    const filePermissions = permissionsResponse.data.data.filter(p => p.collection === 'directus_files');
    filePermissions.forEach(perm => {
      console.log(`  - Action: ${perm.action}, Policy: ${perm.policy}, Role: ${perm.role}`);
    });

    // Get current access assignments
    const accessResponse = await axios.get(`${DIRECTUS_URL}/access`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('\n📋 Current access assignments:');
    accessResponse.data.data.forEach(access => {
      console.log(`  - Policy: ${access.policy}, Role: ${access.role}`);
    });

    // Check if Public role has the right access
    const publicRoleId = '1c6e3a8a-f325-4126-90d7-344e6c2e1c01';
    const publicAccess = accessResponse.data.data.filter(a => a.role === publicRoleId);
    console.log(`\n🔍 Public role access policies: ${publicAccess.length}`);

    // Find or create a public asset policy that allows anonymous access
    let publicAssetPolicy = policiesResponse.data.data.find(policy => 
      policy.name === 'Public Assets' || policy.name === 'Public'
    );

    if (!publicAssetPolicy) {
      console.log('\n❌ No suitable public policy found. Creating one...');
      
      const policyData = {
        name: 'Public Asset Access',
        icon: 'public',
        description: 'Allows public access to assets without authentication',
        ip_access: null,
        enforce_tfa: false,
        admin_access: false,
        app_access: false
      };

      const policyResponse = await axios.post(`${DIRECTUS_URL}/policies`, policyData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      publicAssetPolicy = policyResponse.data.data;
      console.log(`✅ Created public asset policy: ${publicAssetPolicy.id}`);
    } else {
      console.log(`✅ Found existing public policy: ${publicAssetPolicy.name} (${publicAssetPolicy.id})`);
    }

    // Check if directus_files permission exists for this policy
    const existingFilePermission = filePermissions.find(p => 
      p.policy === publicAssetPolicy.id && p.action === 'read'
    );

    if (!existingFilePermission) {
      console.log('\n📝 Creating read permission for directus_files...');
      
      const permissionData = {
        policy: publicAssetPolicy.id,
        collection: 'directus_files',
        action: 'read',
        permissions: null,
        validation: null,
        presets: null,
        fields: ['*']
      };

      const permResponse = await axios.post(`${DIRECTUS_URL}/permissions`, permissionData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log(`✅ Created read permission for directus_files`);
    } else {
      console.log(`✅ Read permission for directus_files already exists`);
    }

    // Make sure this policy is assigned to public role
    const existingAccess = publicAccess.find(a => a.policy === publicAssetPolicy.id);
    
    if (!existingAccess) {
      console.log('\n🔗 Assigning policy to public role...');
      
      const accessData = {
        policy: publicAssetPolicy.id,
        role: publicRoleId
      };

      const accessResp = await axios.post(`${DIRECTUS_URL}/access`, accessData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log(`✅ Assigned policy to public role`);
    } else {
      console.log(`✅ Policy already assigned to public role`);
    }

    // Test anonymous access to assets
    console.log('\n🧪 Testing anonymous asset access...');
    
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/assets/c3b703ce-6825-4c66-84c2-7f116b3e0552`);
      console.log(`✅ Asset access working: ${testResponse.status}`);
    } catch (error) {
      console.log(`❌ Asset access still failing: ${error.response?.status} - ${error.response?.data?.errors?.[0]?.message || 'Access denied'}`);
      
      // Try to troubleshoot
      console.log('\n🔧 Troubleshooting asset access...');
      
      // Check if we need to set up a special asset access permission for null role (anonymous)
      try {
        const anonPermissionData = {
          policy: null,
          role: null,
          collection: 'directus_files',
          action: 'read',
          permissions: null,
          validation: null,
          presets: null,
          fields: ['*']
        };

        const anonPermResponse = await axios.post(`${DIRECTUS_URL}/permissions`, anonPermissionData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log(`✅ Created anonymous read permission for directus_files`);
        
        // Test again
        const retestResponse = await axios.get(`${DIRECTUS_URL}/assets/c3b703ce-6825-4c66-84c2-7f116b3e0552`);
        console.log(`✅ Asset access now working: ${retestResponse.status}`);
        
      } catch (anonError) {
        if (anonError.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️  Anonymous permission already exists`);
        } else {
          console.log(`❌ Failed to create anonymous permission: ${anonError.response?.data?.errors?.[0]?.message || anonError.message}`);
        }
      }
    }

    console.log('\n✅ Asset configuration complete!');
    console.log('\n📝 Summary:');
    console.log('- Admin panel: http://localhost:8574/admin');
    console.log('- Test asset: http://localhost:8574/assets/c3b703ce-6825-4c66-84c2-7f116b3e0552');
    console.log('- Frontend: http://localhost:3574');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data || error.message);
  }
}

fixAssetsAdminConfig();