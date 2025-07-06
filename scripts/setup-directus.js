const { createDirectus, rest, authentication, readUsers, updateUser, createCollection, createField, createItem } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

async function setupDirectus() {
  try {
    // Login with correct admin credentials  
    await client.login('agency@theportlandcompany.com', 'J9u76asecdst!');
    
    console.log('Logged in successfully');
    
    console.log('Admin user updated');
    
    // Create Pages collection
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
      },
      schema: {
        name: 'pages'
      }
    }));
    
    // Add fields to Pages
    const pageFields = [
      { field: 'id', type: 'integer', meta: { interface: 'input', readonly: true, hidden: true }, schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'status', type: 'string', meta: { interface: 'select-dropdown', options: { choices: [{ text: 'Published', value: 'published' }, { text: 'Draft', value: 'draft' }] }, width: 'half' }, schema: { default_value: 'draft' } },
      { field: 'sort', type: 'integer', meta: { interface: 'input', hidden: true }, schema: {} },
      { field: 'user_created', type: 'uuid', meta: { interface: 'select-dropdown-m2o', options: { template: '{{avatar.$thumbnail}} {{first_name}} {{last_name}}' }, readonly: true, hidden: true, width: 'half' }, schema: {} },
      { field: 'date_created', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true, width: 'half' }, schema: {} },
      { field: 'user_updated', type: 'uuid', meta: { interface: 'select-dropdown-m2o', options: { template: '{{avatar.$thumbnail}} {{first_name}} {{last_name}}' }, readonly: true, hidden: true, width: 'half' }, schema: {} },
      { field: 'date_updated', type: 'timestamp', meta: { interface: 'datetime', readonly: true, hidden: true, width: 'half' }, schema: {} },
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full', required: true }, schema: {} },
      { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half', required: true, note: 'URL slug for the page' }, schema: {} },
      { field: 'page_type', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [{ text: 'Home', value: 'home' }, { text: 'About', value: 'about' }, { text: 'Services', value: 'services' }, { text: 'Gallery', value: 'gallery' }, { text: 'Contact', value: 'contact' }] } }, schema: {} },
      { field: 'meta_title', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
      { field: 'meta_description', type: 'text', meta: { interface: 'input-multiline', width: 'half' }, schema: {} },
      { field: 'hero_title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: {} },
      { field: 'hero_subtitle', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: {} },
      { field: 'hero_image', type: 'uuid', meta: { interface: 'file-image', width: 'half' }, schema: {} },
      { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full' }, schema: {} },
      { field: 'gallery_images', type: 'json', meta: { interface: 'list', width: 'full' }, schema: {} }
    ];
    
    for (const field of pageFields) {
      await client.request(createField('pages', field));
    }
    
    console.log('Pages collection created');
    
    // Create Global Settings collection
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
    
    // Add fields to Global Settings
    const settingsFields = [
      { field: 'id', type: 'integer', meta: { interface: 'input', readonly: true, hidden: true }, schema: { is_primary_key: true, has_auto_increment: true } },
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
    }
    
    console.log('Global Settings collection created');
    
    // Create Navigation collection
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
    
    // Add fields to Navigation
    const navFields = [
      { field: 'id', type: 'integer', meta: { interface: 'input', readonly: true, hidden: true }, schema: { is_primary_key: true, has_auto_increment: true } },
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
    }
    
    console.log('Navigation collection created');
    
    // Create initial global settings
    await client.request(createItem('global_settings', {
      site_title: 'Leonard Soda Blasting',
      tagline: 'Professional Soda Blasting Services',
      phone: '(555) 123-4567',
      email: 'agency@theportlandcompany.com',
      address: '17035 Kasserman Drive\\nBend, Oregon 97707'
    }));
    
    console.log('Initial global settings created');
    
    console.log('Directus setup completed successfully!');
    
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setupDirectus();