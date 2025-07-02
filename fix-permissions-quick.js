const { Client } = require('pg');
require('dotenv').config();

async function fixPermissions() {
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

    // Get admin role ID
    const roleResult = await client.query(`
      SELECT id FROM directus_roles 
      WHERE name = 'Administrator' OR admin_access = true
      LIMIT 1
    `);
    
    if (roleResult.rows.length === 0) {
      console.error('No admin role found');
      return;
    }
    
    const adminRoleId = roleResult.rows[0].id;
    console.log('Found admin role:', adminRoleId);

    // Set full permissions for admin on all our collections
    const collections = ['pages', 'global_settings', 'navigation'];
    const actions = ['create', 'read', 'update', 'delete'];
    
    for (const collection of collections) {
      for (const action of actions) {
        try {
          await client.query(`
            INSERT INTO directus_permissions (role, collection, action, permissions, fields)
            VALUES ($1, $2, $3, '{}', '["*"]')
            ON CONFLICT (role, collection, action) DO UPDATE SET
            permissions = '{}',
            fields = '["*"]'
          `, [adminRoleId, collection, action]);
          
          console.log(`✅ Set ${action} permission for ${collection}`);
        } catch (err) {
          console.log(`⚠️ Permission ${action}/${collection}:`, err.message);
        }
      }
    }

    // Get public role and set read permissions
    const publicRoleResult = await client.query(`
      SELECT id FROM directus_roles 
      WHERE name = 'Public' OR name = '$public'
      LIMIT 1
    `);
    
    if (publicRoleResult.rows.length > 0) {
      const publicRoleId = publicRoleResult.rows[0].id;
      console.log('Found public role:', publicRoleId);
      
      for (const collection of collections) {
        try {
          await client.query(`
            INSERT INTO directus_permissions (role, collection, action, permissions, fields)
            VALUES ($1, $2, 'read', '{}', '["*"]')
            ON CONFLICT (role, collection, action) DO UPDATE SET
            permissions = '{}',
            fields = '["*"]'
          `, [publicRoleId, collection]);
          
          console.log(`✅ Set public read permission for ${collection}`);
        } catch (err) {
          console.log(`⚠️ Public permission ${collection}:`, err.message);
        }
      }
    } else {
      console.log('⚠️ No public role found');
    }

    console.log('🎉 Permissions fixed!');

  } catch (error) {
    console.error('Error fixing permissions:', error);
  } finally {
    await client.end();
  }
}

fixPermissions();