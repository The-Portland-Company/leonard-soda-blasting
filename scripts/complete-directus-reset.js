const { Client } = require('pg');
const { execSync } = require('child_process');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

async function completeDirectusReset() {
  console.log('🚀 Starting complete Directus reset and setup...');
  
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Drop all Directus tables
    const tables = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND (tablename LIKE 'directus_%' OR tablename IN ('navigation', 'pages', 'global_settings'))
    `);

    console.log(`🗑️ Dropping ${tables.rows.length} tables...`);
    for (const table of tables.rows) {
      await client.query(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`);
      console.log(`  ✅ Dropped ${table.tablename}`);
    }

    await client.end();
    console.log('✅ Database reset complete');

    // Bootstrap Directus
    console.log('🔧 Running Directus bootstrap...');
    process.chdir(path.join(__dirname, 'backend'));
    execSync('npm run bootstrap', { stdio: 'inherit' });
    console.log('✅ Bootstrap complete');

    // Start Directus temporarily to create collections
    console.log('🚀 Starting Directus server...');
    const directusProcess = execSync('npm start &', { stdio: 'pipe' });
    
    // Wait for server to start
    console.log('⏳ Waiting for Directus to start...');
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Create collections via API
    console.log('📝 Creating collections...');
    await createCollectionsViaAPI();

    console.log('🎉 Complete setup finished successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Go to http://localhost:8055/admin');
    console.log('2. Login with: agency@theportlandcompany.com / J9u76asecdst!');
    console.log('3. Check the Pages collection');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  }
}

async function createCollectionsViaAPI() {
  const { createDirectus, rest, authentication, createCollection, createField, createItem } = require('@directus/sdk');
  const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

  try {
    // Login
    await client.login({
      email: 'agency@theportlandcompany.com',
      password: 'J9u76asecdst!'
    });
    console.log('✅ Logged into Directus API');

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
      { field: 'title', type: 'string', meta: { interface: 'input', width: 'full', required: true }, schema: {} },
      { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: {} },
      { field: 'page_type', type: 'string', meta: { interface: 'select-dropdown', width: 'half', options: { choices: [
        { text: 'Home', value: 'home' },
        { text: 'About', value: 'about' },
        { text: 'Services', value: 'services' },
        { text: 'Gallery', value: 'gallery' },
        { text: 'Contact', value: 'contact' }
      ] } }, schema: {} },
      { field: 'hero_title', type: 'string', meta: { interface: 'input', width: 'full' }, schema: {} },
      { field: 'hero_subtitle', type: 'text', meta: { interface: 'input-multiline', width: 'full' }, schema: {} },
      { field: 'content', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full' }, schema: {} }
    ];

    for (const field of pageFields) {
      await client.request(createField('pages', field));
    }
    console.log('✅ Pages collection created');

    // Add sample pages
    const samplePages = [
      {
        title: 'Home',
        slug: '/',
        page_type: 'home',
        status: 'published',
        sort: 1,
        hero_title: 'Leonard Soda Blasting',
        hero_subtitle: 'Professional Soda Blasting Services',
        content: '<p>Welcome to Leonard Soda Blasting, your premier destination for professional soda blasting services.</p>'
      },
      {
        title: 'About Soda Blasting',
        slug: '/about-soda-blasting',
        page_type: 'about',
        status: 'published',
        sort: 2,
        hero_title: 'About Soda Blasting',
        hero_subtitle: 'Safe and effective cleaning method',
        content: '<p>Learn about our soda blasting process and why it\'s the best choice for your project.</p>'
      },
      {
        title: 'Services',
        slug: '/services',
        page_type: 'services',
        status: 'published',
        sort: 3,
        hero_title: 'Our Services',
        hero_subtitle: 'Comprehensive soda blasting solutions',
        content: '<p>We offer a wide range of soda blasting services for various applications.</p>'
      }
    ];

    for (const page of samplePages) {
      await client.request(createItem('pages', page));
      console.log(`✅ Created page: ${page.title}`);
    }

  } catch (error) {
    console.log('❌ API Error:', error.message);
  }
}

completeDirectusReset();