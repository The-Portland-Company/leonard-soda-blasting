const { Client } = require('pg');
require('dotenv').config();

async function fixNavigationPermissions() {
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

    // Get Administrator policy
    const policyResult = await client.query(`
      SELECT id FROM directus_policies 
      WHERE name = 'Administrator'
      LIMIT 1
    `);
    
    if (policyResult.rows.length === 0) {
      console.error('❌ No Administrator policy found');
      return;
    }
    
    const adminPolicyId = policyResult.rows[0].id;
    console.log('Found Administrator policy:', adminPolicyId);

    // Set permissions for navigation collection
    const actions = ['create', 'read', 'update', 'delete'];
    
    for (const action of actions) {
      try {
        await client.query(`
          INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
          VALUES ($1, 'navigation', $2, '{}', '*')
          ON CONFLICT (policy, collection, action) DO UPDATE SET
          permissions = '{}',
          fields = '*'
        `, [adminPolicyId, action]);
        
        console.log(`✅ Set ${action} permission for navigation`);
      } catch (err) {
        console.log(`⚠️ Permission ${action} for navigation:`, err.message);
      }
    }

    // Set permissions for pages collection too (in case it's missing)
    for (const action of actions) {
      try {
        await client.query(`
          INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
          VALUES ($1, 'pages', $2, '{}', '*')
          ON CONFLICT (policy, collection, action) DO UPDATE SET
          permissions = '{}',
          fields = '*'
        `, [adminPolicyId, action]);
        
        console.log(`✅ Set ${action} permission for pages`);
      } catch (err) {
        console.log(`⚠️ Permission ${action} for pages:`, err.message);
      }
    }

    // Set permissions for global_settings collection
    for (const action of actions) {
      try {
        await client.query(`
          INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
          VALUES ($1, 'global_settings', $2, '{}', '*')
          ON CONFLICT (policy, collection, action) DO UPDATE SET
          permissions = '{}',
          fields = '*'
        `, [adminPolicyId, action]);
        
        console.log(`✅ Set ${action} permission for global_settings`);
      } catch (err) {
        console.log(`⚠️ Permission ${action} for global_settings:`, err.message);
      }
    }

    console.log('🎉 Permissions fixed!');
    console.log('Try refreshing the Directus admin interface at http://localhost:8055/admin');
    console.log('Navigation should now be clickable in the sidebar.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixNavigationPermissions();