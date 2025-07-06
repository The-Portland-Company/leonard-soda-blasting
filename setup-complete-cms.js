const { Client } = require('pg');
const axios = require('axios');

const DIRECTUS_URL = 'http://localhost:8055';
const ADMIN_EMAIL = 'agency@theportlandcompany.com';
const ADMIN_PASSWORD = 'J9u76asecdst!';

class DirectusSetup {
  constructor() {
    this.client = null;
    this.token = null;
  }

  async connectToDatabase() {
    this.client = new Client({
      host: 'db.atwkxobvycujkkeqzelp.supabase.co',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false }
    });
    
    await this.client.connect();
    console.log('✅ Connected to database');
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

  async createCollection(collectionData) {
    try {
      const response = await axios.post(`${DIRECTUS_URL}/collections`, collectionData, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Created collection: ${collectionData.collection}`);
      return response.data.data;
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('already exists')) {
        console.log(`⚠️  Collection ${collectionData.collection} already exists, skipping`);
        return null;
      }
      console.error(`❌ Failed to create collection ${collectionData.collection}:`, error.response?.data || error.message);
      throw error;
    }
  }

  async createField(collection, fieldData) {
    try {
      const response = await axios.post(`${DIRECTUS_URL}/fields/${collection}`, fieldData, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`✅ Created field: ${collection}.${fieldData.field}`);
      return response.data.data;
    } catch (error) {
      if (error.response?.data?.errors?.[0]?.message?.includes('already exists')) {
        console.log(`⚠️  Field ${collection}.${fieldData.field} already exists, skipping`);
        return null;
      }
      console.error(`❌ Failed to create field ${collection}.${fieldData.field}:`, error.response?.data || error.message);
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
      console.error(`❌ Failed to create permission:`, error.response?.data || error.message);
      throw error;
    }
  }

  async setupPagesCollection() {
    // Create Pages collection
    await this.createCollection({
      collection: 'pages',
      meta: {
        collection: 'pages',
        icon: 'article',
        note: 'Website pages with editable content',
        display_template: '{{title}}',
        hidden: false,
        singleton: false,
        translations: [
          {
            language: 'en-US',
            translation: 'Pages'
          }
        ]
      },
      schema: {
        name: 'pages'
      }
    });

    // Create fields for Pages collection
    const pageFields = [
      {
        field: 'id',
        type: 'integer',
        meta: {
          hidden: true,
          interface: 'input',
          readonly: true
        },
        schema: {
          is_primary_key: true,
          has_auto_increment: true
        }
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: 'Draft', value: 'draft' },
              { text: 'Published', value: 'published' },
              { text: 'Archived', value: 'archived' }
            ]
          }
        },
        schema: {
          is_nullable: false,
          default_value: 'draft'
        }
      },
      {
        field: 'title',
        type: 'string',
        meta: {
          width: 'full',
          interface: 'input',
          required: true
        },
        schema: {
          is_nullable: false
        }
      },
      {
        field: 'slug',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input',
          required: true,
          note: 'URL slug for the page'
        },
        schema: {
          is_nullable: false,
          is_unique: true
        }
      },
      {
        field: 'meta_title',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input',
          note: 'SEO title tag'
        }
      },
      {
        field: 'meta_description',
        type: 'text',
        meta: {
          width: 'full',
          interface: 'input-multiline',
          note: 'SEO meta description'
        }
      },
      {
        field: 'hero_title',
        type: 'string',
        meta: {
          width: 'full',
          interface: 'input',
          note: 'Main hero section title'
        }
      },
      {
        field: 'hero_subtitle',
        type: 'text',
        meta: {
          width: 'full',
          interface: 'input-multiline',
          note: 'Hero section subtitle/description'
        }
      },
      {
        field: 'hero_image',
        type: 'uuid',
        meta: {
          width: 'half',
          interface: 'file-image',
          note: 'Hero section background image'
        }
      },
      {
        field: 'hero_video',
        type: 'uuid',
        meta: {
          width: 'half',
          interface: 'file',
          note: 'Hero section background video'
        }
      },
      {
        field: 'content_sections',
        type: 'json',
        meta: {
          width: 'full',
          interface: 'list',
          note: 'Editable content sections',
          options: {
            template: '{{type}}: {{title}}'
          }
        }
      },
      {
        field: 'date_created',
        type: 'timestamp',
        meta: {
          width: 'half',
          interface: 'datetime',
          readonly: true,
          hidden: true,
          special: ['date-created']
        }
      },
      {
        field: 'date_updated',
        type: 'timestamp',
        meta: {
          width: 'half',
          interface: 'datetime',
          readonly: true,
          hidden: true,
          special: ['date-updated']
        }
      }
    ];

    for (const field of pageFields) {
      await this.createField('pages', field);
    }
  }

  async setupNavigationCollection() {
    // Create Navigation collection
    await this.createCollection({
      collection: 'navigation',
      meta: {
        collection: 'navigation',
        icon: 'menu',
        note: 'Website navigation menu items',
        display_template: '{{label}}',
        hidden: false,
        singleton: false,
        translations: [
          {
            language: 'en-US',
            translation: 'Navigation'
          }
        ]
      },
      schema: {
        name: 'navigation'
      }
    });

    // Create fields for Navigation collection
    const navFields = [
      {
        field: 'id',
        type: 'integer',
        meta: {
          hidden: true,
          interface: 'input',
          readonly: true
        },
        schema: {
          is_primary_key: true,
          has_auto_increment: true
        }
      },
      {
        field: 'sort',
        type: 'integer',
        meta: {
          width: 'half',
          interface: 'input',
          hidden: true
        }
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: 'Active', value: 'active' },
              { text: 'Inactive', value: 'inactive' }
            ]
          }
        },
        schema: {
          is_nullable: false,
          default_value: 'active'
        }
      },
      {
        field: 'label',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input',
          required: true
        },
        schema: {
          is_nullable: false
        }
      },
      {
        field: 'url',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'parent_id',
        type: 'integer',
        meta: {
          width: 'half',
          interface: 'select-dropdown-m2o',
          note: 'Parent menu item for dropdown menus'
        }
      },
      {
        field: 'target',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: 'Same Window', value: '_self' },
              { text: 'New Window', value: '_blank' }
            ]
          }
        },
        schema: {
          default_value: '_self'
        }
      },
      {
        field: 'icon',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input',
          note: 'Icon class or name'
        }
      }
    ];

    for (const field of navFields) {
      await this.createField('navigation', field);
    }
  }

  async setupSettingsCollection() {
    // Create Settings collection (singleton)
    await this.createCollection({
      collection: 'settings',
      meta: {
        collection: 'settings',
        icon: 'settings',
        note: 'Global website settings',
        singleton: true,
        hidden: false,
        translations: [
          {
            language: 'en-US',
            translation: 'Settings'
          }
        ]
      },
      schema: {
        name: 'settings'
      }
    });

    // Create fields for Settings collection
    const settingsFields = [
      {
        field: 'id',
        type: 'integer',
        meta: {
          hidden: true,
          interface: 'input',
          readonly: true
        },
        schema: {
          is_primary_key: true,
          has_auto_increment: true
        }
      },
      {
        field: 'site_title',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input',
          required: true
        },
        schema: {
          is_nullable: false,
          default_value: 'Leonard Soda Blasting'
        }
      },
      {
        field: 'site_tagline',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'site_description',
        type: 'text',
        meta: {
          width: 'full',
          interface: 'input-multiline'
        }
      },
      {
        field: 'phone_number',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'email',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'address',
        type: 'text',
        meta: {
          width: 'full',
          interface: 'input-multiline'
        }
      },
      {
        field: 'business_hours',
        type: 'text',
        meta: {
          width: 'full',
          interface: 'input-multiline'
        }
      },
      {
        field: 'social_facebook',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'social_instagram',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'social_linkedin',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'google_analytics_id',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'logo',
        type: 'uuid',
        meta: {
          width: 'half',
          interface: 'file-image'
        }
      },
      {
        field: 'favicon',
        type: 'uuid',
        meta: {
          width: 'half',
          interface: 'file-image'
        }
      }
    ];

    for (const field of settingsFields) {
      await this.createField('settings', field);
    }
  }

  async setupServicesCollection() {
    // Create Services collection
    await this.createCollection({
      collection: 'services',
      meta: {
        collection: 'services',
        icon: 'build',
        note: 'Service pages and offerings',
        display_template: '{{title}}',
        hidden: false,
        singleton: false,
        translations: [
          {
            language: 'en-US',
            translation: 'Services'
          }
        ]
      },
      schema: {
        name: 'services'
      }
    });

    // Create fields for Services collection
    const serviceFields = [
      {
        field: 'id',
        type: 'integer',
        meta: {
          hidden: true,
          interface: 'input',
          readonly: true
        },
        schema: {
          is_primary_key: true,
          has_auto_increment: true
        }
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: 'Draft', value: 'draft' },
              { text: 'Published', value: 'published' },
              { text: 'Archived', value: 'archived' }
            ]
          }
        },
        schema: {
          is_nullable: false,
          default_value: 'draft'
        }
      },
      {
        field: 'title',
        type: 'string',
        meta: {
          width: 'full',
          interface: 'input',
          required: true
        },
        schema: {
          is_nullable: false
        }
      },
      {
        field: 'slug',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input',
          required: true
        },
        schema: {
          is_nullable: false,
          is_unique: true
        }
      },
      {
        field: 'description',
        type: 'text',
        meta: {
          width: 'full',
          interface: 'input-rich-text-html'
        }
      },
      {
        field: 'featured_image',
        type: 'uuid',
        meta: {
          width: 'half',
          interface: 'file-image'
        }
      },
      {
        field: 'gallery',
        type: 'json',
        meta: {
          width: 'full',
          interface: 'files',
          note: 'Service gallery images'
        }
      },
      {
        field: 'features',
        type: 'json',
        meta: {
          width: 'full',
          interface: 'tags',
          note: 'Service features/benefits'
        }
      },
      {
        field: 'applications',
        type: 'json',
        meta: {
          width: 'full',
          interface: 'tags',
          note: 'Service applications'
        }
      },
      {
        field: 'sort_order',
        type: 'integer',
        meta: {
          width: 'half',
          interface: 'input'
        }
      }
    ];

    for (const field of serviceFields) {
      await this.createField('services', field);
    }
  }

  async setupTestimonialsCollection() {
    // Create Testimonials collection
    await this.createCollection({
      collection: 'testimonials',
      meta: {
        collection: 'testimonials',
        icon: 'format_quote',
        note: 'Customer testimonials and reviews',
        display_template: '{{client_name}}',
        hidden: false,
        singleton: false,
        translations: [
          {
            language: 'en-US',
            translation: 'Testimonials'
          }
        ]
      },
      schema: {
        name: 'testimonials'
      }
    });

    // Create fields for Testimonials collection
    const testimonialFields = [
      {
        field: 'id',
        type: 'integer',
        meta: {
          hidden: true,
          interface: 'input',
          readonly: true
        },
        schema: {
          is_primary_key: true,
          has_auto_increment: true
        }
      },
      {
        field: 'status',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: 'Draft', value: 'draft' },
              { text: 'Published', value: 'published' },
              { text: 'Archived', value: 'archived' }
            ]
          }
        },
        schema: {
          is_nullable: false,
          default_value: 'draft'
        }
      },
      {
        field: 'quote',
        type: 'text',
        meta: {
          width: 'full',
          interface: 'input-multiline',
          required: true
        },
        schema: {
          is_nullable: false
        }
      },
      {
        field: 'client_name',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input',
          required: true
        },
        schema: {
          is_nullable: false
        }
      },
      {
        field: 'client_title',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'client_company',
        type: 'string',
        meta: {
          width: 'half',
          interface: 'input'
        }
      },
      {
        field: 'rating',
        type: 'integer',
        meta: {
          width: 'half',
          interface: 'select-dropdown',
          options: {
            choices: [
              { text: '5 Stars', value: 5 },
              { text: '4 Stars', value: 4 },
              { text: '3 Stars', value: 3 },
              { text: '2 Stars', value: 2 },
              { text: '1 Star', value: 1 }
            ]
          }
        }
      },
      {
        field: 'featured',
        type: 'boolean',
        meta: {
          width: 'half',
          interface: 'boolean'
        },
        schema: {
          default_value: false
        }
      }
    ];

    for (const field of testimonialFields) {
      await this.createField('testimonials', field);
    }
  }

  async setupPublicPermissions() {
    // Get the public role ID
    const publicRoleResponse = await axios.get(`${DIRECTUS_URL}/roles?filter[name][_eq]=Public`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    
    const publicRoleId = publicRoleResponse.data.data[0]?.id;
    
    if (!publicRoleId) {
      console.log('❌ Public role not found');
      return;
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
        content_sections: JSON.stringify([
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
            content: 'Soda blasting is a method of removing surface contaminants and coatings by using sodium bicarbonate (baking soda). Compressed air from specialized blasting machine propels particles against the surface to be cleaned.'
          },
          {
            type: 'testimonial',
            title: 'Client Testimonial',
            content: 'Leonard Soda Blasting has been our go-to contractor for restoration projects. Their expertise and eco-friendly approach make them invaluable to our team.'
          }
        ])
      },
      {
        title: 'About Soda Blasting',
        slug: 'about-soda-blasting',
        status: 'published',
        meta_title: 'About Soda Blasting - Eco-Friendly Surface Cleaning',
        meta_description: 'Learn about soda blasting, an eco-friendly surface cleaning method using sodium bicarbonate.',
        hero_title: 'About Soda Blasting',
        hero_subtitle: 'The safe, eco-friendly way to clean and strip surfaces.'
      },
      {
        title: 'Services',
        slug: 'services',
        status: 'published',
        meta_title: 'Soda Blasting Services - Commercial, Automotive, Marine',
        meta_description: 'Professional soda blasting services for commercial, automotive, marine, aircraft, and industrial applications.',
        hero_title: 'Our Services',
        hero_subtitle: 'Professional soda blasting solutions for every industry.'
      },
      {
        title: 'Gallery',
        slug: 'gallery',
        status: 'published',
        meta_title: 'Gallery - Soda Blasting Before & After Photos',
        meta_description: 'View our gallery of soda blasting projects showing dramatic before and after transformations.',
        hero_title: 'Our Work',
        hero_subtitle: 'See the amazing transformations we achieve with soda blasting.'
      },
      {
        title: 'Contact',
        slug: 'contact',
        status: 'published',
        meta_title: 'Contact Leonard Soda Blasting - Get a Free Quote',
        meta_description: 'Contact Leonard Soda Blasting for a free quote on your cleaning and stripping project.',
        hero_title: 'Contact Us',
        hero_subtitle: 'Get a free quote for your soda blasting project.'
      }
    ];

    for (const page of samplePages) {
      try {
        await axios.post(`${DIRECTUS_URL}/items/pages`, page, {
          headers: { 'Authorization': `Bearer ${this.token}` }
        });
        console.log(`✅ Created page: ${page.title}`);
      } catch (error) {
        console.error(`❌ Failed to create page ${page.title}:`, error.response?.data || error.message);
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
        console.error(`❌ Failed to create nav item ${navItem.label}:`, error.response?.data || error.message);
      }
    }

    // Insert sample settings
    const sampleSettings = {
      site_title: 'Leonard Soda Blasting',
      site_tagline: '100% Eco-Friendly Cleaning and Stripping',
      site_description: 'Professional eco-friendly soda blasting services for automotive, aircraft, marine, commercial and industrial cleaning.',
      phone_number: '(555) 123-4567',
      email: 'info@leonardsodablasting.com',
      address: '123 Industrial Way, Portland, OR 97201',
      business_hours: 'Monday - Friday: 8:00 AM - 5:00 PM\nSaturday: 9:00 AM - 3:00 PM\nSunday: Closed',
      social_instagram: 'https://www.instagram.com/leonardsodablasting/'
    };

    try {
      await axios.post(`${DIRECTUS_URL}/items/settings`, sampleSettings, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      console.log('✅ Created settings');
    } catch (error) {
      console.error('❌ Failed to create settings:', error.response?.data || error.message);
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
      console.error('❌ Failed to create testimonial:', error.response?.data || error.message);
    }
  }

  async run() {
    try {
      console.log('🚀 Starting complete Directus CMS setup...');
      
      await this.connectToDatabase();
      await this.loginToDirectus();
      
      console.log('\n📦 Creating collections...');
      await this.setupPagesCollection();
      await this.setupNavigationCollection();
      await this.setupSettingsCollection();
      await this.setupServicesCollection();
      await this.setupTestimonialsCollection();
      
      console.log('\n🔐 Setting up permissions...');
      await this.setupPublicPermissions();
      
      console.log('\n🌱 Inserting sample data...');
      await this.insertSampleData();
      
      console.log('\n✅ Complete CMS setup finished!');
      console.log('\n📋 Collections created:');
      console.log('  • Pages - Website pages with editable content');
      console.log('  • Navigation - Menu management');
      console.log('  • Settings - Global site settings');
      console.log('  • Services - Service offerings');
      console.log('  • Testimonials - Customer reviews');
      console.log('\n🌐 Access your admin panel at: http://localhost:8055/admin');
      
    } catch (error) {
      console.error('❌ Setup failed:', error.message);
    } finally {
      if (this.client) {
        await this.client.end();
      }
    }
  }
}

// Run the setup
const setup = new DirectusSetup();
setup.run().catch(console.error);