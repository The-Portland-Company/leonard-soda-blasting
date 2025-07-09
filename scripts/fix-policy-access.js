const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function fixPolicyAccess() {
  try {
    console.log('Fixing policy-based access...');
    
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    const headers = { Authorization: `Bearer ${token}` };
    
    // Get the Public Access Policy
    const policiesResponse = await axios.get(`${DIRECTUS_URL}/policies`, { headers });
    const publicPolicy = policiesResponse.data.data.find(p => p.name === 'Public Access Policy');
    
    if (!publicPolicy) {
      console.error('Public Access Policy not found');
      return;
    }
    
    console.log('Found Public Access Policy:', publicPolicy.id);
    
    // Update the policy to make it globally accessible (assign to public role)
    try {
      await axios.patch(`${DIRECTUS_URL}/policies/${publicPolicy.id}`, {
        admin_access: false,
        app_access: true,  // Allow app access for public
        roles: ['1c6e3a8a-f325-4126-90d7-344e6c2e1c01'], // Public role ID
        users: []
      }, { headers });
      console.log('✓ Updated Public Access Policy');
    } catch (error) {
      console.error('Error updating policy:', error.response?.data || error.message);
    }
    
    // Also update the Public role to make it actually public
    try {
      await axios.patch(`${DIRECTUS_URL}/roles/1c6e3a8a-f325-4126-90d7-344e6c2e1c01`, {
        public: true
      }, { headers });
      console.log('✓ Updated Public role to be public');
    } catch (error) {
      console.error('Error updating role:', error.response?.data || error.message);
    }
    
    // Test public access
    console.log('\\nTesting public access...');
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/items/settings`);
      console.log('✓ Public access working!');
      console.log('Settings data:', testResponse.data.data ? 'Found settings' : 'No settings data');
    } catch (error) {
      console.error('Still getting error:', error.response?.data || error.message);
    }
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

fixPolicyAccess();