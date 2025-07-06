const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function fixAccessWithId() {
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

    // Get user and admin details
    const userQuery = await client.query(`
      SELECT id FROM directus_users 
      WHERE email = 'agency@theportlandcompany.com'
    `);
    
    const adminRoleQuery = await client.query(`
      SELECT id FROM directus_roles WHERE name = 'Administrator'
    `);
    
    const adminPolicyQuery = await client.query(`
      SELECT id FROM directus_policies WHERE name = 'Administrator'
    `);

    const userId = userQuery.rows[0].id;
    const adminRoleId = adminRoleQuery.rows[0].id;
    const adminPolicyId = adminPolicyQuery.rows[0].id;
    
    console.log('User ID:', userId);
    console.log('Admin Role ID:', adminRoleId);
    console.log('Admin Policy ID:', adminPolicyId);

    // Generate a UUID for the access record
    const accessId = uuidv4();
    
    // Add access to admin policy with ID
    try {
      await client.query(`
        INSERT INTO directus_access (id, "user", "role", "policy")
        VALUES ($1, $2, $3, $4)
      `, [accessId, userId, adminRoleId, adminPolicyId]);
      console.log('✅ Added user access to Administrator policy with ID');
    } catch (err) {
      if (err.message.includes('duplicate key') || err.message.includes('already exists')) {
        console.log('✅ User already has access to Administrator policy');
      } else {
        console.log('⚠️ Access insert error:', err.message);
      }
    }

    // Verify access was created
    const verifyAccess = await client.query(`
      SELECT * FROM directus_access 
      WHERE "user" = $1 AND "policy" = $2
    `, [userId, adminPolicyId]);
    
    console.log(`User now has ${verifyAccess.rows.length} access entries for admin policy`);

    console.log('🎉 User access with ID fixed!');
    console.log('Please completely log out of Directus (close browser tab) and log back in.');
    console.log('Then try accessing Navigation again.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixAccessWithId();