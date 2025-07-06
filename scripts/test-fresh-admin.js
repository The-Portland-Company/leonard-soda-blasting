const { Client } = require('pg');
require('dotenv').config();

async function testFreshAdmin() {
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

    // Check what admin user was created
    const users = await client.query(`
      SELECT id, email, first_name, last_name, status, role 
      FROM directus_users
    `);
    
    console.log('Users in database:');
    users.rows.forEach(user => {
      console.log(`  ${user.email} - Status: ${user.status} - Role: ${user.role}`);
    });

    // Check if there are any collections yet
    const collections = await client.query(`
      SELECT collection, hidden FROM directus_collections 
      WHERE collection NOT LIKE 'directus_%'
    `);
    
    console.log(`\nCustom collections (${collections.rows.length}):`);
    collections.rows.forEach(col => {
      console.log(`  ${col.collection} - Hidden: ${col.hidden}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

testFreshAdmin();