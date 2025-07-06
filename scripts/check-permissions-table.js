const { Client } = require('pg');
require('dotenv').config();

async function checkPermissionsTable() {
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

    // Check permissions table structure
    const permissionsSchema = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'directus_permissions'
      ORDER BY ordinal_position
    `);
    
    console.log('directus_permissions table structure:');
    permissionsSchema.rows.forEach(row => {
      console.log(`  ${row.column_name} (${row.data_type})`);
    });

    // Check existing permissions
    const existingPerms = await client.query(`
      SELECT * FROM directus_permissions 
      WHERE collection = 'navigation'
      LIMIT 5
    `);
    
    console.log(`\nFound ${existingPerms.rows.length} permissions for navigation:`);
    existingPerms.rows.forEach(row => {
      console.log('  Permission:', row);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkPermissionsTable();