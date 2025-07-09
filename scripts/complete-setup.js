const { createDirectus, rest, authentication, readCollections, readFields, createCollection, createField, createItem, readItems } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function completeSetup() {
  try {
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('✅ Logged in successfully');
    
    // Check existing collections
    const collections = await client.request(readCollections());
    const collectionNames = collections.map(c => c.collection);
    
    // Check if global_settings exists
    if (!collectionNames.includes('global_settings')) {
      console.log('Creating Global Settings collection...');
      await client.request(createCollection({
        collection: 'global_settings',
        meta: {
          collection: 'global_settings',
          icon: 'settings',
          note: 'Global website settings',
          singleton: true,
          hidden: false
        }
      }));
      console.log('✅ Global Settings collection created');
    } else {
      console.log('📋 Global Settings collection already exists');
    }
    
    // Add fields to Global Settings if missing
    try {
      const gsFields = await client.request(readFields('global_settings'));
      const gsFieldNames = gsFields.map(f => f.field);
      
      const settingsFields = [
        { field: 'site_title', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
        { field: 'tagline', type: 'string', meta: { interface: 'input', width: 'half' } },
        { field: 'phone', type: 'string', meta: { interface: 'input', width: 'half' } },
        { field: 'email', type: 'string', meta: { interface: 'input', width: 'half' } },
        { field: 'address', type: 'text', meta: { interface: 'input-multiline', width: 'full' } }
      ];
      
      for (const field of settingsFields) {
        if (!gsFieldNames.includes(field.field)) {
          await client.request(createField('global_settings', field));
          console.log(`  ✅ Added field: ${field.field}`);
        } else {
          console.log(`  📋 Field ${field.field} already exists`);
        }
      }
    } catch (err) {
      console.log('Error checking global_settings fields:', err.message);
    }
    
    // Check if navigation exists
    if (!collectionNames.includes('navigation')) {
      console.log('Creating Navigation collection...');
      await client.request(createCollection({
        collection: 'navigation',
        meta: {
          collection: 'navigation',
          icon: 'menu',
          note: 'Website navigation menu',
          display_template: '{{label}}',
          hidden: false,
          singleton: false,
          sort_field: 'sort'
        }
      }));
      console.log('✅ Navigation collection created');
    } else {
      console.log('📋 Navigation collection already exists');
    }
    
    // Add fields to Navigation if missing
    try {
      const navFields = await client.request(readFields('navigation'));
      const navFieldNames = navFields.map(f => f.field);
      
      const navigationFields = [
        { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'published' } },
        { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true } },
        { field: 'label', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
        { field: 'url', type: 'string', meta: { interface: 'input', width: 'half' } },
        { field: 'target', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'Same Window', value: '_self' }, { text: 'New Window', value: '_blank' }] } }, schema: { default_value: '_self' } }
      ];
      
      for (const field of navigationFields) {
        if (!navFieldNames.includes(field.field)) {
          await client.request(createField('navigation', field));
          console.log(`  ✅ Added field: ${field.field}`);
        } else {
          console.log(`  📋 Field ${field.field} already exists`);
        }
      }
    } catch (err) {
      console.log('Error checking navigation fields:', err.message);
    }
    
    // Create initial global settings if empty
    try {
      const settings = await client.request(readItems('global_settings'));
      if (!settings || settings.length === 0) {
        console.log('Creating initial global settings...');
        await client.request(createItem('global_settings', {
          site_title: 'Leonard Soda Blasting',
          tagline: 'Professional Soda Blasting Services',
          phone: '(555) 123-4567',
          email: 'agency@theportlandcompany.com',
          address: '17035 Kasserman Drive\nBend, Oregon 97707'
        }));
        console.log('✅ Initial global settings created');
      } else {
        console.log('📋 Global settings already exist');
      }
    } catch (err) {
      console.log('Could not check/create global settings:', err.message);
    }
    
    // Create initial navigation items if empty
    try {
      const navItems = await client.request(readItems('navigation'));
      if (!navItems || navItems.length === 0) {
        console.log('Creating initial navigation...');
        const initialNavItems = [
          { label: 'Home', url: '/', status: 'published', sort: 1 },
          { label: 'About Soda Blasting', url: '/about-soda-blasting', status: 'published', sort: 2 },
          { label: 'Services', url: '/services', status: 'published', sort: 3 },
          { label: 'Gallery', url: '/gallery', status: 'published', sort: 4 },
          { label: 'Contact', url: '/contact', status: 'published', sort: 5 }
        ];
        
        for (const item of initialNavItems) {
          await client.request(createItem('navigation', item));
          console.log(`  ✅ Created nav item: ${item.label}`);
        }
      } else {
        console.log('📋 Navigation items already exist');
      }
    } catch (err) {
      console.log('Could not check/create navigation items:', err.message);
    }
    
    console.log('🎉 Setup completed successfully!');
    console.log('\nYou can now access:');
    console.log('- Directus Admin: http://localhost:8055/admin');
    console.log('- Login: agency@theportlandcompany.com / J9u76asecdst!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    if (error.errors) {
      console.error('Error details:', error.errors);
    }
  }
}

completeSetup();