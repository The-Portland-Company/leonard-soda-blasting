const { Client } = require('pg');
require('dotenv').config();

async function createNavigationTable() {
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

    // Create navigation table
    await client.query(`
      CREATE TABLE navigation (
        id SERIAL PRIMARY KEY,
        status VARCHAR(255) DEFAULT 'published',
        sort INTEGER,
        label VARCHAR(255) NOT NULL,
        url VARCHAR(255),
        target VARCHAR(10) DEFAULT '_self',
        user_created UUID REFERENCES directus_users(id),
        date_created TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        user_updated UUID REFERENCES directus_users(id),
        date_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);
    
    console.log('✅ Navigation table created');

    // Insert some initial navigation data
    await client.query(`
      INSERT INTO navigation (label, url, status, sort) VALUES
      ('Home', '/', 'published', 1),
      ('About Soda Blasting', '/about-soda-blasting', 'published', 2),
      ('Services', '/services', 'published', 3),
      ('Gallery', '/gallery', 'published', 4),
      ('Contact', '/contact', 'published', 5)
    `);
    
    console.log('✅ Initial navigation items created');

    // Get Administrator policy for permissions
    const policyResult = await client.query(`
      SELECT id FROM directus_policies 
      WHERE name = 'Administrator'
      LIMIT 1
    `);
    
    if (policyResult.rows.length > 0) {
      const adminPolicyId = policyResult.rows[0].id;
      console.log('Found Administrator policy:', adminPolicyId);

      // Set permissions for navigation collection
      const actions = ['create', 'read', 'update', 'delete'];
      
      for (const action of actions) {
        await client.query(`
          INSERT INTO directus_permissions (policy, collection, action, permissions, fields)
          VALUES ($1, 'navigation', $2, '{}', '*')
        `, [adminPolicyId, action]);
        
        console.log(`✅ Set ${action} permission for navigation`);
      }
    }

    console.log('🎉 Navigation table and permissions created successfully!');
    console.log('Now try accessing Navigation in the Directus admin interface.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

createNavigationTable();