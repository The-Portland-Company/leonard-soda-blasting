const { Client } = require('pg');
require('dotenv').config();

async function checkRolesPolicies() {
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

    // Check roles
    const roles = await client.query(`SELECT * FROM directus_roles`);
    console.log('Roles:');
    roles.rows.forEach(role => {
      console.log(`  ${role.id}: ${role.name}`);
    });

    // Check policies
    const policies = await client.query(`SELECT * FROM directus_policies`);
    console.log('\nPolicies:');
    policies.rows.forEach(policy => {
      console.log(`  ${policy.id}: ${policy.name} (role: ${policy.role})`);
    });

    // Check what permissions exist for pages (working collection)
    const pagesPerms = await client.query(`
      SELECT p.*, pol.name as policy_name 
      FROM directus_permissions p 
      LEFT JOIN directus_policies pol ON p.policy = pol.id
      WHERE p.collection = 'pages'
      LIMIT 5
    `);
    
    console.log('\nPages permissions:');
    pagesPerms.rows.forEach(perm => {
      console.log(`  ${perm.action} - Policy: ${perm.policy_name} (${perm.policy})`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkRolesPolicies();