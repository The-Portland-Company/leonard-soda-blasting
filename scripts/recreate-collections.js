const { createDirectus, rest, authentication, createCollection, createField, createItem } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function recreateCollections() {
  try {
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    console.log('✅ Logged in successfully');
    
    // Create Pages collection
    console.log('Creating Pages collection...');
    await client.request(createCollection({
      collection: 'pages',
      meta: {
        collection: 'pages',
        icon: 'article',
        note: 'Website pages content',
        display_template: '{{title}}',
        hidden: false,
        singleton: false,
        sort_field: 'sort'
      }
    }));
    
    // Add fields to Pages
    const pageFields = [
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
      { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
      { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'draft' } },
      { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true } },
      { field: 'page_type', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'Home', value: 'home' }, { text: 'About', value: 'about' }, { text: 'Services', value: 'services' }, { text: 'Gallery', value: 'gallery' }, { text: 'Contact', value: 'contact' }] } } },
      { field: 'meta_title', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'meta_description', type: 'text', meta: { interface: 'input-multiline', width: 'half' } },
      { field: 'hero_title', type: 'string', meta: { interface: 'input', width: 'full' } },
      { field: 'hero_subtitle', type: 'text', meta: { interface: 'input-multiline', width: 'full' } },
      { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full' } }
    ];
    
    for (const field of pageFields) {
      await client.request(createField('pages', field));
      console.log(`  ✅ Added field to pages: ${field.field}`);
    }
    
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
      }
    }));
    
    // Add fields to Global Settings
    const settingsFields = [
      { field: 'site_title', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
      { field: 'tagline', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'phone', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'email', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'address', type: 'text', meta: { interface: 'input-multiline', width: 'full' } }
    ];
    
    for (const field of settingsFields) {
      await client.request(createField('global_settings', field));
      console.log(`  ✅ Added field to global_settings: ${field.field}`);
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
      }
    }));
    
    // Add fields to Navigation
    const navFields = [
      { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'published' } },
      { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true } },
      { field: 'label', type: 'string', meta: { interface: 'input', width: 'half', required: true } },
      { field: 'url', type: 'string', meta: { interface: 'input', width: 'half' } },
      { field: 'target', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'Same Window', value: '_self' }, { text: 'New Window', value: '_blank' }] } }, schema: { default_value: '_self' } }
    ];
    
    for (const field of navFields) {
      await client.request(createField('navigation', field));
      console.log(`  ✅ Added field to navigation: ${field.field}`);
    }
    
    // Create initial global settings
    console.log('Creating initial global settings...');
    await client.request(createItem('global_settings', {
      site_title: 'Leonard Soda Blasting',
      tagline: 'Professional Soda Blasting Services',
      phone: '(555) 123-4567',
      email: 'agency@theportlandcompany.com',
      address: '17035 Kasserman Drive\nBend, Oregon 97707'
    }));
    
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
    
    console.log('🎉 All collections recreated successfully!');
    console.log('Now try accessing the Navigation collection in Directus admin.');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    if (error.errors) {
      console.error('Error details:', error.errors);
    }
  }
}

recreateCollections();