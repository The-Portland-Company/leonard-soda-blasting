const { Client } = require('pg');
require('dotenv').config();

async function fixNavigationAccess() {
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

    // Check if navigation collection exists in directus_collections
    const collectionCheck = await client.query(`
      SELECT * FROM directus_collections WHERE collection = 'navigation'
    `);
    
    if (collectionCheck.rows.length === 0) {
      console.log('Navigation collection not found in directus_collections. Creating...');
      
      await client.query(`
        INSERT INTO directus_collections (collection, icon, note, display_template, hidden, singleton, sort_field)
        VALUES ('navigation', 'menu', 'Website navigation menu', '{{label}}', false, false, 'sort')
      `);
      
      console.log('✅ Navigation collection created in directus_collections');
    } else {
      console.log('📋 Navigation collection exists in directus_collections');
      
      // Update to ensure it's not hidden
      await client.query(`
        UPDATE directus_collections 
        SET hidden = false, singleton = false, sort_field = 'sort'
        WHERE collection = 'navigation'
      `);
      console.log('✅ Navigation collection updated (unhidden)');
    }

    // Get admin role
    const roleResult = await client.query(`
      SELECT id FROM directus_roles 
      WHERE name = 'Administrator'
      LIMIT 1
    `);
    
    if (roleResult.rows.length === 0) {
      console.error('❌ No admin role found');
      return;
    }
    
    const adminRoleId = roleResult.rows[0].id;
    console.log('Found admin role:', adminRoleId);

    // Set full permissions for admin on navigation collection
    const actions = ['create', 'read', 'update', 'delete'];
    
    for (const action of actions) {
      await client.query(`
        INSERT INTO directus_permissions (role, collection, action, permissions, fields)
        VALUES ($1, 'navigation', $2, '{}', '["*"]')
        ON CONFLICT (role, collection, action) DO UPDATE SET
        permissions = '{}',
        fields = '["*"]'
      `, [adminRoleId, action]);
      
      console.log(`✅ Set ${action} permission for navigation`);
    }

    // Check if navigation fields exist
    const fieldsCheck = await client.query(`
      SELECT field FROM directus_fields WHERE collection = 'navigation'
    `);
    
    console.log(`Found ${fieldsCheck.rows.length} fields in navigation collection:`);
    fieldsCheck.rows.forEach(row => {
      console.log(`  - ${row.field}`);
    });

    // Ensure basic fields exist
    const requiredFields = [
      { field: 'id', type: 'integer', interface: 'input', special: 'uuid' },
      { field: 'status', type: 'string', interface: 'select-dropdown' },
      { field: 'sort', type: 'integer', interface: 'input' },
      { field: 'label', type: 'string', interface: 'input' },
      { field: 'url', type: 'string', interface: 'input' }
    ];

    const existingFields = fieldsCheck.rows.map(row => row.field);

    for (const fieldDef of requiredFields) {
      if (!existingFields.includes(fieldDef.field)) {
        await client.query(`
          INSERT INTO directus_fields (collection, field, type, interface, special)
          VALUES ('navigation', $1, $2, $3, $4)
        `, [fieldDef.field, fieldDef.type, fieldDef.interface, fieldDef.special || null]);
        
        console.log(`✅ Added field: ${fieldDef.field}`);
      }
    }

    console.log('🎉 Navigation collection should now be accessible!');
    console.log('Try refreshing the Directus admin interface.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixNavigationAccess();