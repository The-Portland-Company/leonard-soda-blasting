const { Client } = require('pg');
require('dotenv').config();

async function checkUser() {
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

    // Get user info
    const userResult = await client.query(`
      SELECT id, email, first_name, last_name, status, role 
      FROM directus_users 
      ORDER BY email
    `);

    console.log('Users in database:');
    userResult.rows.forEach(user => {
      console.log(`- ID: ${user.id}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Name: ${user.first_name} ${user.last_name}`);
      console.log(`  Status: ${user.status}`);
      console.log(`  Role: ${user.role}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await client.end();
  }
}

checkUser();