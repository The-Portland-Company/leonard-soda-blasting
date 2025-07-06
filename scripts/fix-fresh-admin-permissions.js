const { Client } = require('pg');
require('dotenv').config();

async function fixFreshAdminPermissions() {
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

    // Get the admin user
    const userQuery = await client.query(`
      SELECT id, role FROM directus_users 
      WHERE email = 'agency@theportlandcompany.com'
    `);
    
    if (userQuery.rows.length === 0) {
      console.error('❌ Admin user not found');
      return;
    }
    
    const userId = userQuery.rows[0].id;
    const userRoleId = userQuery.rows[0].role;
    console.log('Admin user ID:', userId);
    console.log('Admin role ID:', userRoleId);

    // Check if admin role exists and get policy
    const roleQuery = await client.query(`
      SELECT * FROM directus_roles WHERE id = $1
    `, [userRoleId]);
    
    if (roleQuery.rows.length === 0) {
      console.error('❌ Admin role not found');
      return;
    }
    
    const role = roleQuery.rows[0];
    console.log('Role name:', role.name);

    // Get the admin policy (should exist from bootstrap)
    const policyQuery = await client.query(`
      SELECT id FROM directus_policies WHERE name = 'Administrator'
    `);
    
    if (policyQuery.rows.length === 0) {
      console.error('❌ Administrator policy not found');
      return;
    }
    
    const adminPolicyId = policyQuery.rows[0].id;
    console.log('Admin policy ID:', adminPolicyId);

    // Check if user has access to admin policy
    const accessQuery = await client.query(`
      SELECT * FROM directus_access WHERE "user" = $1
    `, [userId]);
    
    console.log(`User has ${accessQuery.rows.length} access entries`);

    // If no access, create one
    if (accessQuery.rows.length === 0) {
      const { v4: uuidv4 } = require('uuid');
      const accessId = uuidv4();
      
      await client.query(`
        INSERT INTO directus_access (id, "user", "role", "policy")
        VALUES ($1, $2, $3, $4)
      `, [accessId, userId, userRoleId, adminPolicyId]);
      
      console.log('✅ Created access record for admin user');
    } else {
      console.log('✅ User already has access records');
    }

    // Check permissions for collections management
    const collectionPermQuery = await client.query(`
      SELECT * FROM directus_permissions 
      WHERE policy = $1 AND collection = 'directus_collections'
    `, [adminPolicyId]);
    
    console.log(`Found ${collectionPermQuery.rows.length} permissions for directus_collections`);

    // Add permissions for managing collections if missing
    const systemCollections = ['directus_collections', 'directus_fields', 'directus_permissions'];
    const actions = ['create', 'read', 'update', 'delete'];
    
    for (const collection of systemCollections) {
      for (const action of actions) {
        try {
          await client.query(`
            INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
            VALUES ($1, $2, $3, '{}', '*')
            ON CONFLICT DO NOTHING
          `, [adminPolicyId, collection, action]);
          
          console.log(`✅ Ensured ${action} permission for ${collection}`);
        } catch (err) {
          console.log(`⚠️ Error setting permission ${action}/${collection}:`, err.message);
        }
      }
    }

    console.log('🎉 Admin permissions fixed!');
    console.log('Now the admin user should be able to create collections.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixFreshAdminPermissions();