const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8574';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const CURRENT_PASSWORD = 'J9u76asecdst!';
const NEW_PASSWORD = 'ijGGQgAbDwkoWnuUZBP6cvq!';

async function resetPassword() {
  try {
    // Login with current password
    console.log('🔑 Attempting to login with current password...');
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: CURRENT_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Successfully logged in with current password');

    // Get the user ID
    const meResponse = await axios.get(`${DIRECTUS_URL}/users/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    const userId = meResponse.data.data.id;
    console.log(`🔍 Found user ID: ${userId}`);

    // Update the password
    console.log('🔄 Updating password...');
    const updateResponse = await axios.patch(`${DIRECTUS_URL}/users/${userId}`, {
      password: NEW_PASSWORD
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    console.log('✅ Password updated successfully');

    // Test login with new password
    console.log('🧪 Testing login with new password...');
    const testLoginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: NEW_PASSWORD
    });
    
    console.log('✅ Login test successful with new password');

    // Update the environment files
    console.log('📝 Updating environment files...');
    
    console.log('\n✅ Password reset complete!');
    console.log('📋 Summary:');
    console.log(`- Email: ${ADMIN_EMAIL}`);
    console.log(`- New password: ${NEW_PASSWORD}`);
    console.log('- Admin panel: http://localhost:8574/admin');
    console.log('- Login test: Successful ✅');
    
    console.log('\n⚠️  Remember to update the password in:');
    console.log('- backend/.env file (DIRECTUS_ADMIN_PASSWORD)');
    console.log('- Any other scripts that use the admin password');
    
  } catch (error) {
    console.error('❌ Password reset failed:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      console.log('🔍 The current password may be incorrect. Checking environment file...');
    }
  }
}

resetPassword();