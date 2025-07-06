const argon2 = require('argon2');
const { Client } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

async function createNewAdmin() {
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

    // Delete the existing problematic user
    await client.query(`
      DELETE FROM directus_users 
      WHERE email = 'agency@theportlandcompany.com'
    `);
    console.log('✅ Deleted existing user');

    // Get admin role
    const roleResult = await client.query(`
      SELECT id FROM directus_roles WHERE name = 'Administrator'
    `);
    const adminRoleId = roleResult.rows[0].id;

    // Get admin policy  
    const policyResult = await client.query(`
      SELECT id FROM directus_policies WHERE name = 'Administrator'
    `);
    const adminPolicyId = policyResult.rows[0].id;

    // Hash password
    const hashedPassword = await argon2.hash('J9u76asecdst!');
    
    // Create new admin user with UUID
    const userId = uuidv4();
    await client.query(`
      INSERT INTO directus_users (
        id, first_name, last_name, email, password, role, status
      ) VALUES (
        $1, 'Admin', 'User', 'agency@theportlandcompany.com', $2, $3, 'active'
      )
    `, [userId, hashedPassword, adminRoleId]);
    
    console.log('✅ Created new admin user with ID:', userId);

    // Create access record
    const accessId = uuidv4();
    await client.query(`
      INSERT INTO directus_access (id, "user", "role", "policy")
      VALUES ($1, $2, $3, $4)
    `, [accessId, userId, adminRoleId, adminPolicyId]);
    
    console.log('✅ Created access record');

    // Ensure all permissions exist for our collections
    const collections = ['navigation', 'pages', 'global_settings'];
    const actions = ['create', 'read', 'update', 'delete'];
    
    for (const collection of collections) {
      for (const action of actions) {
        await client.query(`
          INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
          VALUES ($1, $2, $3, '{}', '*')
          ON CONFLICT DO NOTHING
        `, [adminPolicyId, collection, action]);
      }
      console.log(`✅ Ensured permissions for ${collection}`);
    }

    console.log('🎉 New admin user created successfully!');
    console.log('Login credentials:');
    console.log('  Email: agency@theportlandcompany.com');
    console.log('  Password: J9u76asecdst!');
    console.log('');
    console.log('Please go to http://localhost:8055/admin and login with these credentials.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

createNewAdmin();