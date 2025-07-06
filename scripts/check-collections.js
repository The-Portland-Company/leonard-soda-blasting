const { createDirectus, rest, authentication, readCollections } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function checkCollections() {
  try {
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('Logged in successfully');
    
    const collections = await client.request(readCollections());
    
    console.log('Existing collections:');
    collections.forEach(collection => {
      console.log(`- ${collection.collection} (${collection.meta?.note || 'No description'})`);
    });
    
    // Check if our collections exist
    const ourCollections = ['pages', 'global_settings', 'navigation'];
    const existingOurs = collections.filter(c => ourCollections.includes(c.collection));
    
    console.log('\nOur collections status:');
    ourCollections.forEach(name => {
      const exists = existingOurs.find(c => c.collection === name);
      console.log(`- ${name}: ${exists ? 'EXISTS' : 'MISSING'}`);
    });

  } catch (error) {
    console.error('Error checking collections:', error);
  }
}

checkCollections();