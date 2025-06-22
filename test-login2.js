async function testLogin() {
  const fetch = (await import('node-fetch')).default;
  try {
    console.log('Testing login with:');
    console.log('Email: agency@theportlandcompany.com');
    console.log('Password: J9u76asecdst!');
    console.log('');
    
    const response = await fetch('http://127.0.0.1:8055/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'agency@theportlandcompany.com',
        password: 'J9u76asecdst!'
      })
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Response:', data);
      console.log('Access token:', data.data?.access_token ? 'Received' : 'Not received');
    } else {
      console.log('❌ Login failed:');
      console.log('Status:', response.status);
      console.log('Response:', data);
    }
    
  } catch (error) {
    console.log('❌ Network error:');
    console.error(error.message);
  }
}

testLogin();