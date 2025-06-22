const { Client } = require('pg');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function updateAdmin() {
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

    // Hash the password
    const hashedPassword = await bcrypt.hash('J9u76asecdst!', 10);

    // Get the first user (should be admin)
    const userResult = await client.query(`
      SELECT id FROM directus_users 
      LIMIT 1
    `);
    
    if (userResult.rows.length === 0) {
      console.error('No admin user found');
      return;
    }
    
    const adminId = userResult.rows[0].id;
    console.log('Found admin user with ID:', adminId);

    // Update the admin user
    const result = await client.query(`
      UPDATE directus_users 
      SET email = $1, password = $2 
      WHERE id = $3
    `, ['agency@theportlandcompany.com', hashedPassword, adminId]);

    console.log('Admin user updated successfully');
    console.log('Email: agency@theportlandcompany.com');
    console.log('Password: J9u76asecdst!');

  } catch (error) {
    console.error('Error updating admin user:', error);
  } finally {
    await client.end();
  }
}

updateAdmin();