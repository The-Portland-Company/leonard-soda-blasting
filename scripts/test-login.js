const { createDirectus, rest, authentication } = require('@directus/sdk');

const client = createDirectus('http://localhost:8055').with(rest()).with(authentication());

async function testLogin() {
  try {
    console.log('Testing login with:');
    console.log('Email: agency@theportlandcompany.com');
    console.log('Password: J9u76asecdst!');
    console.log('');
    
    const result = await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('✅ Login successful!');
    console.log('Access token received:', result.access_token ? 'Yes' : 'No');
    
    // Test getting user info
    const user = await client.request({
      method: 'GET',
      path: '/users/me'
    });
    
    console.log('✅ User info retrieved:');
    console.log('- ID:', user.id);
    console.log('- Email:', user.email);
    console.log('- First Name:', user.first_name);
    console.log('- Last Name:', user.last_name);
    console.log('- Role:', user.role);
    
  } catch (error) {
    console.log('❌ Login failed:');
    console.error(error.message);
    if (error.errors) {
      console.log('Error details:', error.errors);
    }
  }
}

testLogin();