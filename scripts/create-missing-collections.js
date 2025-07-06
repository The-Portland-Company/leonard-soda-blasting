const { createDirectus, rest, authentication, createCollection, createField, createItem } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function createMissingCollections() {
  try {
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('✅ Logged in successfully');
    
    // Create Global Settings collection
    console.log('Creating Global Settings collection...');
    await client.request(createCollection({
      collection: 'global_settings',
      meta: {
        collection: 'global_settings',
        icon: 'settings',
        note: 'Global website settings',
        singleton: true,
        hidden: false
      },
      schema: {
        name: 'global_settings'
      }
    }));
    console.log('✅ Global Settings collection created');
    
    // Add fields to Global Settings (skip ID as it's auto-created)
    const settingsFields = [
      { field: 'site_title', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: {} },
      { field: 'tagline', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'phone', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'email', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'address', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: {} },
      { field: 'logo', type: 'uuid', meta: { interface: 'file-image', width: 'half' }, schema: {} },
      { field: 'favicon', type: 'uuid', meta: { interface: 'file-image', width: 'half' }, schema: {} }
    ];
    
    for (const field of settingsFields) {
      await client.request(createField('global_settings', field));
      console.log(`  ✅ Added field: ${field.field}`);
    }
    
    // Create Navigation collection
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
      },
      schema: {
        name: 'navigation'
      }
    }));
    console.log('✅ Navigation collection created');
    
    // Add fields to Navigation (skip ID as it's auto-created)
    const navFields = [
      { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'published' } },
      { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true }, schema: {} },
      { field: 'label', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: {} },
      { field: 'url', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'page', type: 'integer', meta: { interface: 'select-dropdown-m2o', width: 'half' }, schema: {} },
      { field: 'parent', type: 'integer', meta: { interface: 'select-dropdown-m2o', width: 'half' }, schema: {} },
      { field: 'target', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'Same Window', value: '_self' }, { text: 'New Window', value: '_blank' }] } }, schema: { default_value: '_self' } }
    ];
    
    for (const field of navFields) {
      await client.request(createField('navigation', field));
      console.log(`  ✅ Added field: ${field.field}`);
    }
    
    // Create initial global settings
    console.log('Creating initial global settings...');
    await client.request(createItem('global_settings', {
      site_title: 'Leonard Soda Blasting',
      tagline: 'Professional Soda Blasting Services',
      phone: '(555) 123-4567',
      email: 'agency@theportlandcompany.com',
      address: '17035 Kasserman Drive\\nBend, Oregon 97707'
    }));
    console.log('✅ Initial global settings created');
    
    // Create initial navigation items
    console.log('Creating initial navigation...');
    const navItems = [
      { label: 'Home', url: '/', status: 'published', sort: 1 },
      { label: 'About Soda Blasting', url: '/about-soda-blasting', status: 'published', sort: 2 },
      { label: 'Services', url: '/services', status: 'published', sort: 3 },
      { label: 'Gallery', url: '/gallery', status: 'published', sort: 4 },
      { label: 'Contact', url: '/contact', status: 'published', sort: 5 }
    ];
    
    for (const item of navItems) {
      await client.request(createItem('navigation', item));
      console.log(`  ✅ Created nav item: ${item.label}`);
    }
    
    console.log('🎉 All collections and initial data created successfully!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    if (error.errors) {
      console.error('Error details:', error.errors);
    }
  }
}

createMissingCollections();