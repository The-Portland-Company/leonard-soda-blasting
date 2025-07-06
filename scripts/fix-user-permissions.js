const { Client } = require('pg');
require('dotenv').config();

async function fixUserPermissions() {
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

    // Check user details
    const userQuery = await client.query(`
      SELECT id, email, role, status 
      FROM directus_users 
      WHERE email = 'agency@theportlandcompany.com'
    `);
    
    if (userQuery.rows.length === 0) {
      console.error('❌ User not found');
      return;
    }
    
    const user = userQuery.rows[0];
    console.log('User details:', user);

    // Check role details
    const roleQuery = await client.query(`
      SELECT id, name 
      FROM directus_roles 
      WHERE id = $1
    `, [user.role]);
    
    if (roleQuery.rows.length > 0) {
      console.log('User role:', roleQuery.rows[0]);
    }

    // Check if user has access policies
    const accessQuery = await client.query(`
      SELECT a.*, p.name as policy_name, r.name as role_name
      FROM directus_access a
      LEFT JOIN directus_policies p ON a.policy = p.id
      LEFT JOIN directus_roles r ON a.role = r.id
      WHERE a.user = $1
    `, [user.id]);
    
    console.log(`User access policies (${accessQuery.rows.length} found):`);
    accessQuery.rows.forEach(access => {
      console.log(`  Policy: ${access.policy_name} (${access.policy}), Role: ${access.role_name}`);
    });

    // Get Administrator role and policy
    const adminRoleQuery = await client.query(`
      SELECT id FROM directus_roles WHERE name = 'Administrator'
    `);
    
    const adminPolicyQuery = await client.query(`
      SELECT id FROM directus_policies WHERE name = 'Administrator'
    `);

    if (adminRoleQuery.rows.length === 0 || adminPolicyQuery.rows.length === 0) {
      console.error('❌ Administrator role or policy not found');
      return;
    }

    const adminRoleId = adminRoleQuery.rows[0].id;
    const adminPolicyId = adminPolicyQuery.rows[0].id;
    
    console.log('Admin role ID:', adminRoleId);
    console.log('Admin policy ID:', adminPolicyId);

    // Ensure user has admin role
    if (user.role !== adminRoleId) {
      await client.query(`
        UPDATE directus_users 
        SET role = $1 
        WHERE id = $2
      `, [adminRoleId, user.id]);
      console.log('✅ Updated user role to Administrator');
    } else {
      console.log('✅ User already has Administrator role');
    }

    // Ensure user has access to admin policy
    const existingAccess = accessQuery.rows.find(a => a.policy === adminPolicyId);
    if (!existingAccess) {
      await client.query(`
        INSERT INTO directus_access (user, role, policy)
        VALUES ($1, $2, $3)
        ON CONFLICT DO NOTHING
      `, [user.id, adminRoleId, adminPolicyId]);
      console.log('✅ Added user access to Administrator policy');
    } else {
      console.log('✅ User already has access to Administrator policy');
    }

    // Ensure user status is active
    if (user.status !== 'active') {
      await client.query(`
        UPDATE directus_users 
        SET status = 'active' 
        WHERE id = $1
      `, [user.id]);
      console.log('✅ Updated user status to active');
    } else {
      console.log('✅ User status is already active');
    }

    console.log('🎉 User permissions fixed!');
    console.log('Try logging out and back in to Directus, then access Navigation again.');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

fixUserPermissions();