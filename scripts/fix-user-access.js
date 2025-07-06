const { Client } = require('pg');
require('dotenv').config();

async function fixUserAccess() {
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

    // Check current access
    const currentAccess = await client.query(`
      SELECT * FROM directus_access 
      WHERE "user" = $1
    `, [userId]);
    
    console.log(`User has ${currentAccess.rows.length} access entries`);

    // Add access to admin policy
    try {
      await client.query(`
        INSERT INTO directus_access ("user", "role", "policy")
        VALUES ($1, $2, $3)
      `, [userId, adminRoleId, adminPolicyId]);
      console.log('✅ Added user access to Administrator policy');
    } catch (err) {
      if (err.message.includes('duplicate key')) {
        console.log('✅ User already has access to Administrator policy');
      } else {
        console.log('⚠️ Access insert error:', err.message);
      }
    }

    // Also ensure we have a basic read permission on all our collections
    const collections = ['navigation', 'pages', 'global_settings'];
    
    for (const collection of collections) {
      // Check if read permission exists
      const existingPerm = await client.query(`
        SELECT id FROM directus_permissions 
        WHERE policy = $1 AND collection = $2 AND action = 'read'
      `, [adminPolicyId, collection]);
      
      if (existingPerm.rows.length === 0) {
        await client.query(`
          INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
          VALUES ($1, $2, 'read', '{}', '*')
        `, [adminPolicyId, collection]);
        console.log(`✅ Added read permission for ${collection}`);
      } else {
        console.log(`✅ Read permission exists for ${collection}`);
      }
    }

    console.log('🎉 User access fixed!');
    console.log('Please log out of Directus and log back in, then try accessing Navigation.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixUserAccess();