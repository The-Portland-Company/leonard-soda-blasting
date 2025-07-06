const { Client } = require('pg');
require('dotenv').config();

async function debugNavigationIssue() {
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

    // Check if navigation collection exists in directus_collections
    const collectionQuery = await client.query(`
      SELECT collection, icon, note, hidden, singleton, sort_field 
      FROM directus_collections 
      WHERE collection IN ('navigation', 'pages', 'global_settings')
      ORDER BY collection
    `);
    
    console.log('Collections in directus_collections:');
    collectionQuery.rows.forEach(row => {
      console.log(`  ${row.collection}: hidden=${row.hidden}, singleton=${row.singleton}, icon=${row.icon}`);
    });

    // Check if navigation table actually exists
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name IN ('navigation', 'pages', 'global_settings')
      AND table_schema = 'public'
    `);
    
    console.log('\nActual tables that exist:');
    tableCheck.rows.forEach(row => {
      console.log(`  ${row.table_name}`);
    });

    // Check navigation table structure if it exists
    if (tableCheck.rows.some(row => row.table_name === 'navigation')) {
      const navStructure = await client.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'navigation'
        ORDER BY ordinal_position
      `);
      
      console.log('\nNavigation table structure:');
      navStructure.rows.forEach(row => {
        console.log(`  ${row.column_name} (${row.data_type}) - nullable: ${row.is_nullable}`);
      });

      // Check if there's any data in navigation table
      const navData = await client.query(`SELECT COUNT(*) as count FROM navigation`);
      console.log(`Navigation table has ${navData.rows[0].count} records`);
    } else {
      console.log('\n❌ Navigation table does not exist!');
    }

    // Check permissions for navigation
    const permQuery = await client.query(`
      SELECT p.*, pol.name as policy_name
      FROM directus_permissions p
      LEFT JOIN directus_policies pol ON p.policy = pol.id
      WHERE p.collection = 'navigation'
    `);
    
    console.log(`\nPermissions for navigation (${permQuery.rows.length} found):`);
    permQuery.rows.forEach(row => {
      console.log(`  ${row.action} - Policy: ${row.policy_name} - Fields: ${row.fields}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

debugNavigationIssue();