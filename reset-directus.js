const { Client } = require('pg');
require('dotenv').config();

async function resetDirectus() {
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

    // Get all Directus tables
    const tables = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND tablename LIKE 'directus_%'
    `);

    console.log(`Found ${tables.rows.length} Directus tables to drop`);

    // Drop all Directus tables
    for (const table of tables.rows) {
      try {
        await client.query(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`);
        console.log(`Dropped table: ${table.tablename}`);
      } catch (err) {
        console.log(`Error dropping ${table.tablename}:`, err.message);
      }
    }

    console.log('Directus tables reset completed');
  } catch (error) {
    console.error('Error resetting Directus:', error);
  } finally {
    await client.end();
  }
}

resetDirectus();