const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

class DirectusPermissionsAndData {
  constructor() {
    this.token = null;
  }

  async loginToDirectus() {
    try {
      const response = await axios.post(`${DIRECTUS_URL}/auth/login`, {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });
      
      this.token = response.data.data.access_token;
      console.log('✅ Logged into Directus');
    } catch (error) {
      console.error('❌ Failed to login to Directus:', error.response?.data || error.message);
      throw error;
    }
  }

  async createPermission(permissionData) {
    try {
      const response = await axios.post(`${DIRECTUS_URL}/permissions`, permissionData, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Created permission for ${permissionData.collection}`);
      return response.data.data;
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
        console.log(`⚠️  Permission for ${permissionData.collection} already exists, skipping`);
        return null;
      }
      console.error(`❌ Failed to create permission:`, error.response?.data || error.message);
    }
  }

  async setupPublicPermissions() {
    console.log('🔐 Setting up public permissions...');
    
    // Get the public role ID
    const publicRoleResponse = await axios.get(`${DIRECTUS_URL}/roles?filter[name][_eq]=Public`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    
    let publicRoleId = publicRoleResponse.data.data[0]?.id;
    
    if (!publicRoleId) {
      console.log('🆕 Creating Public role...');
      const createRoleResponse = await axios.post(`${DIRECTUS_URL}/roles`, {
        name: 'Public',
        icon: 'public',
        description: 'Public access role',
        ip_access: null,
        enforce_tfa: false,
        admin_access: false,
        app_access: false
      }, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      publicRoleId = createRoleResponse.data.data.id;
      console.log('✅ Created Public role');
    }

    const collections = ['pages', 'navigation', 'settings', 'services', 'testimonials'];
    
    for (const collection of collections) {
      await this.createPermission({
        role: publicRoleId,
        collection: collection,
        action: 'read',
        permissions: {},
        validation: {},
        presets: {},
        fields: ['*']
      });
    }
  }

  async insertSampleData() {
    console.log('🌱 Inserting sample data...');
    
    // Insert sample pages
    const samplePages = [
      {
        title: 'Home',
        slug: 'home',
        status: 'published',
        meta_title: 'Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping',
        meta_description: 'Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning.',
        hero_title: '100% Eco-Friendly Cleaning and Stripping',
        hero_subtitle: 'Professional soda blasting services using safe, non-toxic sodium bicarbonate.',
        content_sections: [
          {
            type: 'hero',
            title: '100% Eco-Friendly Cleaning and Stripping',
            content: 'Professional soda blasting services using safe, non-toxic sodium bicarbonate.'
          },
          {
            type: 'services_grid',
            title: 'Our Services',
            content: 'We provide professional soda blasting services across multiple industries.'
          },
          {
            type: 'about_process',
            title: 'How does soda blasting work?',
            content: 'Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned. As the sodium bicarbonate particles come in contact with the surface, it removes the contaminant or coating.'
          },
          {
            type: 'latest_work',
            title: 'Latest Work',
            content: 'Follow us on Instagram to see our latest projects and the amazing transformations we achieve with eco-friendly soda blasting.'
          },
          {
            type: 'testimonial',
            title: 'Client Testimonial',
            content: 'Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team.'
          }
        ]
      },
      {
        title: 'About Soda Blasting',
        slug: 'about-soda-blasting',
        status: 'published',
        meta_title: 'About Soda Blasting - Eco-Friendly Surface Cleaning',
        meta_description: 'Learn about soda blasting, an eco-friendly surface cleaning method using sodium bicarbonate.',
        hero_title: 'About Soda Blasting',
        hero_subtitle: 'The safe, eco-friendly way to clean and strip surfaces.',
        content_sections: [
          {
            type: 'hero',
            title: 'About Soda Blasting',
            content: 'Learn about our eco-friendly surface cleaning process.'
          },
          {
            type: 'process_explanation',
            title: 'What is Soda Blasting?',
            content: 'Soda blasting is a revolutionary surface cleaning method that uses sodium bicarbonate (baking soda) to safely remove contaminants, coatings, and buildup from various surfaces without causing damage.'
          }
        ]
      },
      {
        title: 'Services',
        slug: 'services',
        status: 'published',
        meta_title: 'Soda Blasting Services - Commercial, Automotive, Marine',
        meta_description: 'Professional soda blasting services for commercial, automotive, marine, aircraft, and industrial applications.',
        hero_title: 'Our Services',
        hero_subtitle: 'Professional soda blasting solutions for every industry.',
        content_sections: [
          {
            type: 'hero',
            title: 'Our Services',
            content: 'Professional soda blasting solutions for every industry.'
          },
          {
            type: 'services_list',
            title: 'Service Categories',
            content: 'We offer specialized soda blasting services across multiple industries.'
          }
        ]
      },
      {
        title: 'Gallery',
        slug: 'gallery',
        status: 'published',
        meta_title: 'Gallery - Soda Blasting Before & After Photos',
        meta_description: 'View our gallery of soda blasting projects showing dramatic before and after transformations.',
        hero_title: 'Our Work',
        hero_subtitle: 'See the amazing transformations we achieve with soda blasting.',
        content_sections: [
          {
            type: 'hero',
            title: 'Our Work',
            content: 'See the amazing transformations we achieve with soda blasting.'
          },
          {
            type: 'gallery_grid',
            title: 'Project Gallery',
            content: 'Browse our portfolio of successful soda blasting projects.'
          }
        ]
      },
      {
        title: 'Contact',
        slug: 'contact',
        status: 'published',
        meta_title: 'Contact Leonard Soda Blasting - Get a Free Quote',
        meta_description: 'Contact Leonard Soda Blasting for a free quote on your cleaning and stripping project.',
        hero_title: 'Contact Us',
        hero_subtitle: 'Get a free quote for your soda blasting project.',
        content_sections: [
          {
            type: 'hero',
            title: 'Contact Us',
            content: 'Get a free quote for your soda blasting project.'
          },
          {
            type: 'contact_form',
            title: 'Get in Touch',
            content: 'Fill out the form below or give us a call to discuss your project.'
          }
        ]
      }
    ];

    for (const page of samplePages) {
      try {
        await axios.post(`${DIRECTUS_URL}/items/pages`, page, {
          headers: { 'Authorization': `Bearer ${this.token}` }
        });
        console.log(`✅ Created page: ${page.title}`);
      } catch (error) {
        if (error.response?.data?.errors?.[0]?.message?.includes('duplicate')) {
          console.log(`⚠️  Page ${page.title} already exists, skipping`);
        } else {
          console.error(`❌ Failed to create page ${page.title}:`, error.response?.data || error.message);
        }
      }
    }

    // Insert sample navigation
    const sampleNavigation = [
      { label: 'Home', url: '/', sort: 1, status: 'active' },
      { label: 'About', url: '/about-soda-blasting', sort: 2, status: 'active' },
      { label: 'Services', url: '/services', sort: 3, status: 'active' },
      { label: 'Gallery', url: '/gallery', sort: 4, status: 'active' },
      { label: 'Contact', url: '/contact', sort: 5, status: 'active' }
    ];

    for (const navItem of sampleNavigation) {
      try {
        await axios.post(`${DIRECTUS_URL}/items/navigation`, navItem, {
          headers: { 'Authorization': `Bearer ${this.token}` }
        });
        console.log(`✅ Created nav item: ${navItem.label}`);
      } catch (error) {
        console.log(`⚠️  Nav item ${navItem.label} may already exist, skipping`);
      }
    }

    // Insert sample settings
    const sampleSettings = {
      site_title: 'Leonard Soda Blasting',
      site_tagline: '100% Eco-Friendly Cleaning and Stripping',
      site_description: 'Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning.',
      phone_number: '(503) 555-0123',
      email: 'info@leonardsodablasting.com',
      address: '123 Industrial Way\nPortland, OR 97201',
      business_hours: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 3:00 PM\nSunday: Closed',
      social_instagram: 'https://www.instagram.com/leonardsodablasting/'
    };

    try {
      await axios.post(`${DIRECTUS_URL}/items/settings`, sampleSettings, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      console.log('✅ Created settings');
    } catch (error) {
      console.log('⚠️  Settings may already exist, skipping');
    }

    // Insert sample services
    const sampleServices = [
      {
        title: 'Commercial & Industrial',
        slug: 'commercial-industrial',
        status: 'published',
        description: 'Professional media blasting services for warehouses, wastewater treatment facilities, parking garages, machinery and equipment cleaning.',
        features: ['Licensed contractor since 1989', 'Industrial grade equipment', 'Safety compliant processes', 'Scheduled completion', 'Professional manpower'],
        applications: ['Warehouse cleaning', 'Machinery degreasing', 'Parking garage restoration', 'Equipment maintenance', 'Facility preparation'],
        sort_order: 1
      },
      {
        title: 'Automotive',
        slug: 'automotive',
        status: 'published',
        description: 'Leonard Soda Blasting has the expertise car enthusiasts desire and the automotive industry demands.',
        features: ['Paint removal without warping', 'Rust elimination', 'Chrome restoration', 'Engine cleaning', 'Frame restoration'],
        applications: ['Classic car restoration', 'Paint stripping', 'Rust removal', 'Chrome polishing', 'Engine bay cleaning'],
        sort_order: 2
      },
      {
        title: 'Aircraft',
        slug: 'aircraft',
        status: 'published',
        description: 'Professional aircraft cleaning and maintenance services using eco-friendly soda blasting techniques.',
        features: ['FAA approved processes', 'Precision cleaning', 'No surface damage', 'Environmentally safe', 'Certified technicians'],
        applications: ['Paint stripping', 'Corrosion removal', 'Surface preparation', 'Maintenance cleaning', 'Restoration work'],
        sort_order: 3
      },
      {
        title: 'Marine & Boat',
        slug: 'marine-boat',
        status: 'published',
        description: 'One of the primary reasons for stripping a boat is blisters, which are usually caused by osmotic intrusion of water into the hull.',
        features: ['Hull cleaning', 'Antifouling removal', 'Gel coat restoration', 'Blister repair prep', 'Eco-friendly process'],
        applications: ['Hull stripping', 'Antifouling removal', 'Gel coat preparation', 'Blister repair', 'Bottom paint removal'],
        sort_order: 4
      },
      {
        title: 'Fire & Water Damage',
        slug: 'fire-water-damage',
        status: 'published',
        description: 'After a fire, the last thing you want to worry about is more damage and toxins from the cleanup process itself.',
        features: ['Soot removal', 'Smoke damage cleanup', 'Structural cleaning', 'Safe process', 'Insurance approved'],
        applications: ['Soot removal', 'Smoke damage', 'Water damage cleanup', 'Structural restoration', 'Content cleaning'],
        sort_order: 5
      },
      {
        title: 'Food Processing Equipment',
        slug: 'food-processing-equipment',
        status: 'published',
        description: 'Consider how much easier it would be to clean your food equipment with a safe, non-hazardous cleaning process.',
        features: ['FDA approved', 'Food-grade safe', 'No chemical residue', 'Equipment-friendly', 'Minimal downtime'],
        applications: ['Ovens and baking equipment', 'Processing machinery', 'Conveyor systems', 'Storage tanks', 'Production lines'],
        sort_order: 6
      }
    ];

    for (const service of sampleServices) {
      try {
        await axios.post(`${DIRECTUS_URL}/items/services`, service, {
          headers: { 'Authorization': `Bearer ${this.token}` }
        });
        console.log(`✅ Created service: ${service.title}`);
      } catch (error) {
        console.log(`⚠️  Service ${service.title} may already exist, skipping`);
      }
    }

    // Insert sample testimonial
    const sampleTestimonial = {
      quote: 'Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team.',
      client_name: 'Jim Clarke',
      client_title: 'President',
      client_company: 'Northwest Restoration',
      rating: 5,
      featured: true,
      status: 'published'
    };

    try {
      await axios.post(`${DIRECTUS_URL}/items/testimonials`, sampleTestimonial, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      console.log('✅ Created testimonial');
    } catch (error) {
      console.log('⚠️  Testimonial may already exist, skipping');
    }
  }

  async run() {
    try {
      console.log('🚀 Setting up permissions and sample data...');
      
      await this.loginToDirectus();
      await this.setupPublicPermissions();
      await this.insertSampleData();
      
      console.log('\n✅ Setup completed successfully!');
      console.log('\n📋 What was created:');
      console.log('  • Public permissions for all collections');
      console.log('  • Sample pages with editable content sections');
      console.log('  • Navigation menu items');
      console.log('  • Global site settings');
      console.log('  • Service offerings');
      console.log('  • Customer testimonial');
      console.log('\n🌐 Test the API:');
      console.log('  • Pages: http://localhost:8055/items/pages');
      console.log('  • Navigation: http://localhost:8055/items/navigation');
      console.log('  • Settings: http://localhost:8055/items/settings');
      console.log('  • Services: http://localhost:8055/items/services');
      console.log('  • Admin panel: http://localhost:8055/admin');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
    }
  }
}

// Run the setup
const setup = new DirectusPermissionsAndData();
setup.run().catch(console.error);