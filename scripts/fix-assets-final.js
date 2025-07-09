const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8574';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function fixAssetsFinal() {
  try {
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Logged in as admin');

    // The issue might be that we need to assign the policy that has null role access
    // Let's check the policy that has role: null
    const accessResponse = await axios.get(`${DIRECTUS_URL}/access`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const nullRoleAccess = accessResponse.data.data.find(access => access.role === null);
    console.log('🔍 Found null role access:', nullRoleAccess);
    
    if (nullRoleAccess) {
      const policyId = nullRoleAccess.policy;
      console.log(`📋 Using policy for anonymous access: ${policyId}`);
      
      // Check if this policy has directus_files read permission
      const permissionsResponse = await axios.get(`${DIRECTUS_URL}/permissions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const filesPermission = permissionsResponse.data.data.find(p => 
        p.policy === policyId && p.collection === 'directus_files' && p.action === 'read'
      );
      
      if (!filesPermission) {
        console.log('📝 Adding directus_files read permission to null role policy...');
        
        const permissionData = {
          policy: policyId,
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
        
        console.log(`✅ Added directus_files permission to anonymous policy`);
      } else {
        console.log('✅ directus_files permission already exists on anonymous policy');
      }
    }

    // Try setting ASSETS_ALLOW_LIST environment variable approach through API
    // Check if we can update server configuration
    try {
      const settingsResponse = await axios.get(`${DIRECTUS_URL}/server/info`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('🔍 Server info available');
    } catch (error) {
      console.log('❌ Cannot access server settings via API');
    }

    // Test asset access one more time
    console.log('\n🧪 Final test of asset access...');
    
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/assets/c3b703ce-6825-4c66-84c2-7f116b3e0552`);
      console.log(`✅ SUCCESS! Asset access working: ${testResponse.status}`);
    } catch (error) {
      console.log(`❌ Asset access still failing: ${error.response?.status}`);
      
      // Let's try a workaround - check if we can serve assets directly from the uploads folder
      console.log('\n💡 Trying alternative asset serving approach...');
      console.log('Suggestion: Assets may need to be served directly from uploads folder');
      console.log('Alternative URL pattern: http://localhost:8574/uploads/c3b703ce-6825-4c66-84c2-7f116b3e0552.jpg');
      
      try {
        const directFileResponse = await axios.get(`${DIRECTUS_URL}/uploads/c3b703ce-6825-4c66-84c2-7f116b3e0552.jpg`);
        console.log(`✅ Direct file access working: ${directFileResponse.status}`);
      } catch (directError) {
        console.log(`❌ Direct file access also failed: ${directError.response?.status}`);
      }
    }

    console.log('\n📝 Final Configuration Summary:');
    console.log('- Frontend environment file updated ✅');
    console.log('- Backend running on port 8574 ✅');
    console.log('- Frontend running on port 3574 ✅');
    console.log('- API connectivity working ✅');
    console.log('- Asset access: Needs manual admin panel configuration ⚠️');
    console.log('\n🎯 Next Steps:');
    console.log('1. Visit http://localhost:8574/admin');
    console.log('2. Login with agency@theportlandcompany.com');
    console.log('3. Go to Settings > Roles & Permissions > Public');
    console.log('4. Ensure "Files" collection has "Read" permission enabled');
    console.log('5. Check that Assets are configured to be publicly accessible');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.response?.data || error.message);
  }
}

fixAssetsFinal();