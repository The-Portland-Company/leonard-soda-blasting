const { Client } = require('pg');
const path = require('path');

// Load environment from backend directory
require('dotenv').config({ path: path.join(__dirname, 'backend', '.env') });

async function simpleReset() {
  console.log('🚀 Starting Directus database reset...');
  
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { 
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // List existing Directus tables
    const tables = await client.query(`
      SELECT tablename FROM pg_tables 
      WHERE schemaname = 'public' 
      AND (tablename LIKE 'directus_%' OR tablename IN ('navigation', 'pages', 'global_settings'))
      ORDER BY tablename
    `);

    console.log(`\n📋 Found ${tables.rows.length} Directus-related tables:`);
    tables.rows.forEach(row => console.log(`  - ${row.tablename}`));

    if (tables.rows.length > 0) {
      console.log(`\n🗑️ Dropping ${tables.rows.length} tables...`);
      
      // Drop tables in the right order to avoid foreign key constraints
      for (const table of tables.rows) {
        try {
          await client.query(`DROP TABLE IF EXISTS "${table.tablename}" CASCADE`);
          console.log(`  ✅ Dropped ${table.tablename}`);
        } catch (error) {
          console.log(`  ⚠️ Could not drop ${table.tablename}: ${error.message}`);
        }
      }
    }

    console.log('\n✅ Database reset complete!');
    console.log('\nNext steps:');
    console.log('1. cd backend');
    console.log('2. npm run bootstrap');
    console.log('3. npm start');
    console.log('4. Go to http://localhost:8055/admin');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  simpleReset();
}

module.exports = simpleReset;