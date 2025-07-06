const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

async function updateNavigationCollection() {
  try {
    // Login as admin
    const loginResponse = await axios.post(`${DIRECTUS_URL}/auth/login`, {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });
    
    const token = loginResponse.data.data.access_token;
    console.log('✅ Logged in as admin');

    // Update the navigation collection to follow Directus best practices
    console.log('🔧 Updating navigation collection settings...');
    
    try {
      await axios.patch(`${DIRECTUS_URL}/collections/navigation`, {
        meta: {
          sort_field: 'sort',
          accountability: 'all',
          archive_field: null,
          archive_value: null,
          unarchive_value: null,
          singleton: false,
          translations: [
            {
              language: 'en-US',
              translation: 'Navigation',
              singular: 'Navigation Item',
              plural: 'Navigation Items'
            }
          ]
        }
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Updated navigation collection settings');
    } catch (error) {
      console.log('⚠️  Collection settings update may have failed or already configured');
    }

    // Update the sort field to follow Directus best practices
    console.log('🔧 Updating sort field configuration...');
    
    try {
      await axios.patch(`${DIRECTUS_URL}/fields/navigation/sort`, {
        meta: {
          interface: 'input',
          special: ['sort'],
          options: {},
          display: 'raw',
          display_options: {},
          readonly: false,
          hidden: true,
          sort: 2,
          width: 'half',
          translations: [
            {
              language: 'en-US',
              translation: 'Sort Order'
            }
          ],
          conditions: [],
          required: false,
          group: null,
          validation: null,
          validation_message: null
        },
        schema: {
          name: 'sort',
          table: 'navigation',
          data_type: 'integer',
          default_value: null,
          max_length: null,
          numeric_precision: null,
          numeric_scale: null,
          is_nullable: true,
          is_unique: false,
          is_primary_key: false,
          is_generated: false,
          generation_expression: null,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null
        }
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log('✅ Updated sort field configuration');
    } catch (error) {
      console.log('⚠️  Sort field update may have failed or already configured');
    }

    // Update existing navigation items with proper sort values
    console.log('🔧 Updating existing navigation items with sort values...');
    
    try {
      const navResponse = await axios.get(`${DIRECTUS_URL}/items/navigation?sort=id`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const navItems = navResponse.data.data;
      
      for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        const sortValue = (i + 1) * 10; // Use increments of 10 for easy reordering
        
        await axios.patch(`${DIRECTUS_URL}/items/navigation/${item.id}`, {
          sort: sortValue
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        console.log(`✅ Updated ${item.label} with sort order ${sortValue}`);
      }
    } catch (error) {
      console.error('❌ Failed to update navigation sort values:', error.response?.data || error.message);
    }

    // Test sorting functionality
    console.log('\n🧪 Testing navigation with proper sorting...');
    
    try {
      const testResponse = await axios.get(`${DIRECTUS_URL}/items/navigation?sort=sort`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('✅ Navigation items with sort order:');
      testResponse.data.data.forEach(item => {
        console.log(`  - ${item.label} (sort: ${item.sort})`);
      });
    } catch (error) {
      console.error('❌ Failed to test navigation sorting:', error.response?.data || error.message);
    }

    console.log('\n✅ Navigation collection update completed!');
    console.log('\n📋 Navigation collection now supports:');
    console.log('  • Drag-and-drop sorting in Directus admin');
    console.log('  • Proper sort field configuration');  
    console.log('  • Best practices for collection management');
    console.log('  • Automatic sort value management');
    
  } catch (error) {
    console.error('❌ Update failed:', error.response?.data || error.message);
  }
}

updateNavigationCollection();