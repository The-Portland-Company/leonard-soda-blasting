const axios = require('axios');

async function getToken() {
  try {
    const response = await axios.post('http://localhost:8055/auth/login', {
      email: 'agency@theportlandcompany.com',
      password: 'J9u76asecdst!'
    });
    
    console.log('Access Token:', response.data.data.access_token);
    console.log('Refresh Token:', response.data.data.refresh_token);
    
  } catch (error) {
    console.error('Failed to get token:', error.response?.data || error.message);
  }
}

getToken();