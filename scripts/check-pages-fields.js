const { createDirectus, rest, authentication, readFields } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function checkPagesFields() {
  try {
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('✅ Logged in successfully');
    
    console.log('📄 Checking pages collection fields...');
    const fields = await client.request(readFields('pages'));
    
    console.log(`Found ${fields.length} fields in pages collection:`);
    fields.forEach(field => {
      console.log(`- ${field.field} (${field.type}) - ${field.meta?.interface || 'no interface'}`);
    });
    
    // Check if sort field exists
    const sortField = fields.find(f => f.field === 'sort');
    if (!sortField) {
      console.log('\n❌ SORT field is missing!');
    } else {
      console.log('\n✅ Sort field exists');
    }
    
  } catch (error) {
    console.error('❌ Failed:', error.message);
    if (error.errors) {
      console.error('Error details:', error.errors);
    }
  }
}

checkPagesFields();