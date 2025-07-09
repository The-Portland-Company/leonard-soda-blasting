const { Client } = require('pg');
require('dotenv').config();

async function addPagesDirectly() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_HOST.includes('supabase.co') ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Check if pages table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'pages'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      console.log('❌ Pages table does not exist');
      return;
    }
    
    console.log('✅ Pages table exists');

    // Clear existing pages
    await client.query('DELETE FROM pages');
    console.log('🗑️ Cleared existing pages');

    // Add sample pages directly to database
    const samplePages = [
      {
        title: 'Home',
        slug: '/',
        page_type: 'home',
        status: 'published',
        hero_title: 'Leonard Soda Blasting',
        hero_subtitle: 'Professional Soda Blasting Services',
        content: 'Welcome to Leonard Soda Blasting'
      },
      {
        title: 'About Soda Blasting', 
        slug: '/about-soda-blasting',
        page_type: 'about',
        status: 'published',
        hero_title: 'About Soda Blasting',
        hero_subtitle: 'Safe and effective cleaning method',
        content: 'Learn about our soda blasting process'
      },
      {
        title: 'Our Services',
        slug: '/services', 
        page_type: 'services',
        status: 'published',
        hero_title: 'Our Services',
        hero_subtitle: 'Comprehensive soda blasting solutions',
        content: 'We offer a wide range of services'
      }
    ];

    for (const page of samplePages) {
      const result = await client.query(`
        INSERT INTO pages (title, slug, page_type, status, hero_title, hero_subtitle, content, sort)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, title
      `, [
        page.title,
        page.slug,
        page.page_type,
        page.status,
        page.hero_title,
        page.hero_subtitle,
        page.content,
        samplePages.indexOf(page) + 1
      ]);
      
      console.log(`✅ Created page: ${result.rows[0].title} (ID: ${result.rows[0].id})`);
    }

    // Verify pages were created
    const countResult = await client.query('SELECT COUNT(*) FROM pages');
    console.log(`\n📊 Total pages in database: ${countResult.rows[0].count}`);

    // Show all pages
    const allPages = await client.query('SELECT id, title, slug, status FROM pages ORDER BY sort');
    console.log('\n📋 All pages:');
    allPages.rows.forEach(page => {
      console.log(`  ${page.id}: ${page.title} (${page.slug}) - ${page.status}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

addPagesDirectly();