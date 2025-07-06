const fetch = require('node-fetch');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

// Collections that need public READ access
const COLLECTIONS_TO_CONFIGURE = [
  'pages',
  'settings', 
  'navigation',
  'testimonials',
  'services'
];

async function getAdminToken() {
  console.log('🔐 Logging in as admin...');
  
  const response = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Login failed: ${data.errors?.[0]?.message || 'Unknown error'}`);
  }

  console.log('✅ Admin login successful');
  return data.data.access_token;
}

async function getBuiltInPublicPolicy(token) {
  console.log('🔍 Finding built-in Public policy...');
  
  const response = await fetch(`${DIRECTUS_URL}/policies`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`Failed to fetch policies: ${data.errors?.[0]?.message || 'Unknown error'}`);
  }

  // Look for the built-in public policy
  const publicPolicy = data.data.find(policy => 
    policy.name === '$t:public_label' || 
    policy.name === 'Public' ||
    policy.id === 'abf8a154-5b1c-4a46-ac9c-7300570f4f17'
  );
  
  if (!publicPolicy) {
    throw new Error('Built-in Public policy not found');
  }

  console.log(`✅ Found built-in Public policy: ${publicPolicy.name} (ID: ${publicPolicy.id})`);
  return publicPolicy.id;
}

async function addPermissionToPolicy(token, policyId, collection) {
  console.log(`📝 Adding READ permission for ${collection} to built-in Public policy`);
  
  const permission = {
    policy: policyId,
    collection: collection,
    action: 'read',
    permissions: {}, // Empty object means no restrictions (allow all)
    validation: {},  // Empty object means no validation restrictions
    presets: null,
    fields: ['*']    // Allow access to all fields
  };

  const response = await fetch(`${DIRECTUS_URL}/permissions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(permission)
  });

  if (response.ok) {
    console.log(`✅ Added READ permission for: ${collection}`);
    return true;
  } else {
    const data = await response.json();
    if (data.errors?.[0]?.message?.includes('already exists') || 
        data.errors?.[0]?.message?.includes('duplicate')) {
      console.log(`ℹ️  READ permission already exists for: ${collection}`);
      return true;
    } else {
      console.log(`⚠️  Could not add permission for ${collection}: ${data.errors?.[0]?.message || 'Unknown error'}`);
      return false;
    }
  }
}

async function testPublicAccess() {
  console.log('\n🧪 Testing public API access...');
  
  let successCount = 0;
  for (const collection of COLLECTIONS_TO_CONFIGURE) {
    try {
      const response = await fetch(`${DIRECTUS_URL}/items/${collection}`);
      const status = response.status;
      
      if (status === 200) {
        console.log(`✅ ${collection}: Public access working (200)`);
        successCount++;
      } else if (status === 403) {
        console.log(`❌ ${collection}: Still forbidden (403)`);
      } else if (status === 404) {
        console.log(`⚠️  ${collection}: Collection not found (404) - may need to be created`);
      } else {
        console.log(`⚠️  ${collection}: Unexpected status (${status})`);
      }
    } catch (error) {
      console.log(`❌ ${collection}: Error - ${error.message}`);
    }
  }

  console.log(`\n📊 Public access results: ${successCount}/${COLLECTIONS_TO_CONFIGURE.length} collections accessible`);
  return successCount;
}

async function main() {
  try {
    console.log('🚀 Using built-in Public policy for permissions...\n');

    const token = await getAdminToken();
    const publicPolicyId = await getBuiltInPublicPolicy(token);
    
    // Add permissions for each collection to the built-in Public policy
    let successCount = 0;
    for (const collection of COLLECTIONS_TO_CONFIGURE) {
      const success = await addPermissionToPolicy(token, publicPolicyId, collection);
      if (success) successCount++;
    }

    console.log(`\n📊 Results: ${successCount}/${COLLECTIONS_TO_CONFIGURE.length} permissions configured`);

    if (successCount > 0) {
      console.log('\n🎉 Public permissions configuration completed!');
      
      const accessCount = await testPublicAccess();
      
      if (accessCount > 0) {
        console.log('\n🎯 Success! Your frontend should now be able to access Directus data.');
        console.log('\nTest with: curl http://localhost:8055/items/settings');
      } else {
        console.log('\n⚠️  Permissions were created but public access is still not working.');
        console.log('The collections may not exist yet, or there may be other configuration issues.');
      }
    } else {
      console.log('\n❌ No permissions were successfully configured');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

if (require.main === module) {
  main();
}