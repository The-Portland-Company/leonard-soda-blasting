const { createDirectus, rest, authentication, readItems } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function testCollections() {
  try {
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('✅ Logged in successfully');
    
    // Test pages collection
    console.log('\n📄 Testing pages collection...');
    try {
      const pages = await client.request(readItems('pages'));
      console.log(`✅ Pages accessible - found ${pages.length} items`);
      if (pages.length > 0) {
        console.log('Sample page:', pages[0]);
      }
    } catch (err) {
      console.log('❌ Pages error:', err.message);
      if (err.errors) {
        console.log('Error details:', err.errors);
      }
    }
    
    // Test global_settings
    console.log('\n⚙️ Testing global_settings...');
    try {
      const settings = await client.request(readItems('global_settings'));
      console.log(`✅ Global settings accessible - found ${settings.length} items`);
      if (settings.length > 0) {
        console.log('Settings:', settings[0]);
      }
    } catch (err) {
      console.log('❌ Global settings error:', err.message);
    }
    
    // Test navigation
    console.log('\n🧭 Testing navigation...');
    try {
      const navigation = await client.request(readItems('navigation'));
      console.log(`✅ Navigation accessible - found ${navigation.length} items`);
      if (navigation.length > 0) {
        console.log('Sample nav item:', navigation[0]);
      }
    } catch (err) {
      console.log('❌ Navigation error:', err.message);
    }
    
  } catch (error) {
    console.error('❌ Login failed:', error);
  }
}

testCollections();