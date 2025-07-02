const { createDirectus, rest, authentication, readFields, createField, readPermissions, createPermission, readRoles } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function fixPermissionsAndFields() {
  try {
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('✅ Logged in successfully');
    
    // First, add missing fields to pages collection
    console.log('Checking pages collection fields...');
    try {
      const pagesFields = await client.request(readFields('pages'));
      const pagesFieldNames = pagesFields.map(f => f.field);
      
      const requiredFields = [
        { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true } },
        { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'draft' } },
        { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
        { field: 'title', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
        { field: 'page_type', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'Home', value: 'home' }, { text: 'About', value: 'about' }, { text: 'Services', value: 'services' }, { text: 'Gallery', value: 'gallery' }, { text: 'Contact', value: 'contact' }] } } },
        { field: 'meta_title', type: 'string', meta: { interface: 'input', width: 'half' } },
        { field: 'meta_description', type: 'text', meta: { interface: 'input-multiline', width: 'half' } },
        { field: 'hero_title', type: 'string', meta: { interface: 'input', width: 'full' } },
        { field: 'hero_subtitle', type: 'text', meta: { interface: 'input-multiline', width: 'full' } },
        { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full' } }
      ];
      
      for (const field of requiredFields) {
        if (!pagesFieldNames.includes(field.field)) {
          await client.request(createField('pages', field));
          console.log(`  ✅ Added field to pages: ${field.field}`);
        } else {
          console.log(`  📋 Field ${field.field} already exists in pages`);
        }
      }
    } catch (err) {
      console.log('Error checking pages fields:', err.message);
    }
    
    // Add missing fields to navigation collection
    console.log('Checking navigation collection fields...');
    try {
      const navFields = await client.request(readFields('navigation'));
      const navFieldNames = navFields.map(f => f.field);
      
      const requiredNavFields = [
        { field: 'label', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
        { field: 'url', type: 'string', meta: { interface: 'input', width: 'half' } },
        { field: 'target', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'Same Window', value: '_self' }, { text: 'New Window', value: '_blank' }] } }, schema: { default_value: '_self' } }
      ];
      
      for (const field of requiredNavFields) {
        if (!navFieldNames.includes(field.field)) {
          await client.request(createField('navigation', field));
          console.log(`  ✅ Added field to navigation: ${field.field}`);
        } else {
          console.log(`  📋 Field ${field.field} already exists in navigation`);
        }
      }
    } catch (err) {
      console.log('Error checking navigation fields:', err.message);
    }
    
    // Get admin role ID
    console.log('Setting up permissions...');
    const roles = await client.request(readRoles());
    const adminRole = roles.find(role => role.name === 'Administrator' || role.admin_access === true);
    
    if (!adminRole) {
      console.log('❌ Could not find admin role');
      return;
    }
    
    console.log(`Found admin role: ${adminRole.id}`);
    
    // Set permissions for all collections
    const collections = ['pages', 'global_settings', 'navigation'];
    const actions = ['create', 'read', 'update', 'delete'];
    
    for (const collection of collections) {
      for (const action of actions) {
        try {
          await client.request(createPermission({
            role: adminRole.id,
            collection: collection,
            action: action,
            permissions: {},
            fields: ['*']
          }));
          console.log(`  ✅ Set ${action} permission for ${collection}`);
        } catch (err) {
          if (err.message && err.message.includes('already exists')) {
            console.log(`  📋 ${action} permission for ${collection} already exists`);
          } else {
            console.log(`  ⚠️ Could not set ${action} permission for ${collection}: ${err.message}`);
          }
        }
      }
    }
    
    // Set public read permissions
    const publicRole = roles.find(role => role.name === 'Public' || role.name === '$public');
    if (publicRole) {
      console.log(`Setting public read permissions with role: ${publicRole.id}`);
      for (const collection of collections) {
        try {
          await client.request(createPermission({
            role: publicRole.id,
            collection: collection,
            action: 'read',
            permissions: {},
            fields: ['*']
          }));
          console.log(`  ✅ Set public read permission for ${collection}`);
        } catch (err) {
          if (err.message && err.message.includes('already exists')) {
            console.log(`  📋 Public read permission for ${collection} already exists`);
          } else {
            console.log(`  ⚠️ Could not set public read permission for ${collection}: ${err.message}`);
          }
        }
      }
    } else {
      console.log('⚠️ Could not find public role');
    }
    
    console.log('🎉 Permissions and fields setup completed!');
    console.log('\nYou should now be able to:');
    console.log('- Access Pages collection in Directus admin');
    console.log('- Access Navigation collection in Directus admin');
    console.log('- Create and edit content in both collections');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    if (error.errors) {
      console.error('Error details:', error.errors);
    }
  }
}

fixPermissionsAndFields();