const { Client } = require('pg');
require('dotenv').config();

async function resetAndSetupDirectus() {
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
    console.log('Connected to database');

    // Drop all Directus tables to start fresh
    const tables = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename LIKE 'directus_%'
    `);

    console.log(`Dropping ${tables.rows.length} Directus tables...`);
    for (const table of tables.rows) {
      await client.query(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`);
      console.log(`Dropped ${table.tablename}`);
    }

    // Also drop our custom tables
    const customTables = ['navigation', 'pages', 'global_settings'];
    for (const table of customTables) {
      await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
      console.log(`Dropped ${table}`);
    }

    console.log('✅ All tables dropped. Now run: npx directus bootstrap');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

resetAndSetupDirectus();