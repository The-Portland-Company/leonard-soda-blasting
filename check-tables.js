const { Client } = require('pg');
require('dotenv').config();

async function checkTables() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: (process.env.DB_HOST && process.env.DB_HOST.includes('supabase.co')) ? { rejectUnauthorized: false } : false
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // List all tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE '%directus%' OR table_name IN ('pages', 'navigation', 'global_settings')
      ORDER BY table_name;
    `);

    console.log('\n📋 Directus-related tables:');
    result.rows.forEach(row => {
      console.log(`  - ${row.table_name}`);
    });

    // Check if pages collection exists in directus_collections
    const collectionsCheck = await client.query(`
      SELECT collection FROM directus_collections 
      WHERE collection IN ('pages', 'navigation', 'global_settings')
    `);

    console.log('\n📋 Directus collections:');
    collectionsCheck.rows.forEach(row => {
      console.log(`  - ${row.collection}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkTables();