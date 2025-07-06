const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function debugPermissions() {
  try {
    console.log('Debugging permissions...');
    
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    const headers = { Authorization: `Bearer ${token}` };
    
    // Get all roles
    const rolesResponse = await axios.get(`${DIRECTUS_URL}/roles`, { headers });
    console.log('Roles:', rolesResponse.data.data.map(r => ({ id: r.id, name: r.name, public: r.public })));
    
    // Get all permissions
    const permissionsResponse = await axios.get(`${DIRECTUS_URL}/permissions`, { headers });
    const permissions = permissionsResponse.data.data;
    
    console.log('\\nAll permissions:');
    permissions.forEach(p => {
      console.log(`- ${p.collection} | ${p.action} | Role: ${p.role} | ID: ${p.id}`);
    });
    
    // Get all policies (new in Directus 11)
    try {
      const policiesResponse = await axios.get(`${DIRECTUS_URL}/policies`, { headers });
      console.log('\\nPolicies:', policiesResponse.data.data);
    } catch (error) {
      console.log('\\nNo policies endpoint or error:', error.response?.status);
    }
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

debugPermissions();