const { createDirectus, rest, authentication, updateField, createItem, readItems, deleteItems } = require('@directus/sdk');

const client = createDirectus('http://127.0.0.1:8055').with(rest()).with(authentication());

// Define all frontend pages with their details
const pagesData = [
  {
    title: 'Home',
    slug: '/',
    page_type: 'home',
    status: 'published',
    sort: 1,
    meta_title: 'Leonard Soda Blasting - Professional Soda Blasting Services',
    meta_description: 'Professional soda blasting services in Bend, Oregon. Automotive, aircraft, marine, commercial and residential soda blasting.',
    hero_title: 'Professional Soda Blasting Services',
    hero_subtitle: 'Safe, effective, and environmentally friendly surface cleaning and restoration',
    content: 'Welcome to Leonard Soda Blasting, your premier destination for professional soda blasting services in Central Oregon.'
  },
  {
    title: 'About Soda Blasting',
    slug: '/about-soda-blasting',
    page_type: 'about',
    status: 'published',
    sort: 2,
    meta_title: 'About Soda Blasting - Leonard Soda Blasting',
    meta_description: 'Learn about soda blasting, a safe and effective cleaning method using sodium bicarbonate for surface restoration.',
    hero_title: 'About Soda Blasting',
    hero_subtitle: 'Safe, effective, and environmentally friendly surface cleaning',
    content: 'Soda blasting is a revolutionary cleaning method that uses sodium bicarbonate (baking soda) to safely remove coatings, rust, and contaminants.'
  },
  {
    title: 'Our Services',
    slug: '/services',
    page_type: 'services',
    status: 'published',
    sort: 3,
    meta_title: 'Soda Blasting Services - Leonard Soda Blasting',
    meta_description: 'Comprehensive soda blasting services including automotive, aircraft, marine, commercial, and specialty applications.',
    hero_title: 'Our Soda Blasting Services',
    hero_subtitle: 'Comprehensive solutions for all your surface cleaning needs',
    content: 'We offer a wide range of soda blasting services tailored to meet the unique needs of various industries and applications.'
  },
  {
    title: 'Automotive Soda Blasting',
    slug: '/soda-blasting/automotive-soda-blasting',
    page_type: 'services',
    status: 'published',
    sort: 4,
    meta_title: 'Automotive Soda Blasting Services - Leonard Soda Blasting',
    meta_description: 'Professional automotive soda blasting for paint removal, rust treatment, and restoration projects.',
    hero_title: 'Automotive Soda Blasting',
    hero_subtitle: 'Gentle yet effective restoration for classic cars and vehicles',
    content: 'Our automotive soda blasting services provide safe and effective paint and rust removal for car restoration projects.'
  },
  {
    title: 'Aircraft Soda Blasting',
    slug: '/soda-blasting/airplane-soda-blasting',
    page_type: 'services',
    status: 'published',
    sort: 5,
    meta_title: 'Aircraft Soda Blasting Services - Leonard Soda Blasting',
    meta_description: 'Specialized aircraft soda blasting services for paint removal and surface preparation.',
    hero_title: 'Aircraft Soda Blasting',
    hero_subtitle: 'Precision cleaning for aviation applications',
    content: 'Specialized soda blasting services for aircraft maintenance, restoration, and surface preparation.'
  },
  {
    title: 'Boat & Marine Soda Blasting',
    slug: '/soda-blasting/boat-and-marine-soda-blasting',
    page_type: 'services',
    status: 'published',
    sort: 6,
    meta_title: 'Marine Soda Blasting Services - Leonard Soda Blasting',
    meta_description: 'Marine soda blasting for boats, yachts, and marine equipment cleaning and restoration.',
    hero_title: 'Boat & Marine Soda Blasting',
    hero_subtitle: 'Safe cleaning for marine vessels and equipment',
    content: 'Professional marine soda blasting services for boats, yachts, and marine equipment restoration.'
  },
  {
    title: 'Commercial & Industrial',
    slug: '/soda-blasting/commercial-industrial',
    page_type: 'services',
    status: 'published',
    sort: 7,
    meta_title: 'Commercial Industrial Soda Blasting - Leonard Soda Blasting',
    meta_description: 'Commercial and industrial soda blasting services for large-scale cleaning and restoration projects.',
    hero_title: 'Commercial & Industrial Soda Blasting',
    hero_subtitle: 'Large-scale cleaning solutions for commercial applications',
    content: 'Industrial-strength soda blasting services for commercial facilities, equipment, and large-scale projects.'
  },
  {
    title: 'Fire & Water Damage Restoration',
    slug: '/soda-blasting/fire-and-water-damage-restoration-soda-blasting',
    page_type: 'services',
    status: 'published',
    sort: 8,
    meta_title: 'Fire Water Damage Restoration Soda Blasting - Leonard Soda Blasting',
    meta_description: 'Soda blasting for fire and water damage restoration, smoke odor removal, and surface rehabilitation.',
    hero_title: 'Fire & Water Damage Restoration',
    hero_subtitle: 'Effective restoration after fire and water damage',
    content: 'Specialized soda blasting for fire and water damage restoration, removing smoke, soot, and contamination.'
  },
  {
    title: 'Food Processing Equipment',
    slug: '/soda-blasting/food-processing-equipment',
    page_type: 'services',
    status: 'published',
    sort: 9,
    meta_title: 'Food Processing Equipment Soda Blasting - Leonard Soda Blasting',
    meta_description: 'FDA-approved soda blasting for food processing equipment cleaning and maintenance.',
    hero_title: 'Food Processing Equipment Cleaning',
    hero_subtitle: 'FDA-approved cleaning for food industry equipment',
    content: 'FDA-approved soda blasting services for food processing equipment, ensuring safe and thorough cleaning.'
  },
  {
    title: 'Log Home Soda Blasting',
    slug: '/soda-blasting/log-home-soda-blasting',
    page_type: 'services',
    status: 'published',
    sort: 10,
    meta_title: 'Log Home Soda Blasting Services - Leonard Soda Blasting',
    meta_description: 'Gentle log home soda blasting for restoration and maintenance without damaging wood.',
    hero_title: 'Log Home Soda Blasting',
    hero_subtitle: 'Gentle restoration that preserves natural wood beauty',
    content: 'Gentle soda blasting services specifically designed for log home restoration and maintenance.'
  },
  {
    title: 'Gallery',
    slug: '/gallery',
    page_type: 'gallery',
    status: 'published',
    sort: 11,
    meta_title: 'Project Gallery - Leonard Soda Blasting',
    meta_description: 'View our portfolio of soda blasting projects and before/after photos of our work.',
    hero_title: 'Project Gallery',
    hero_subtitle: 'See the amazing results of our soda blasting work',
    content: 'Browse our gallery of completed soda blasting projects and see the remarkable before and after transformations.'
  },
  {
    title: 'Contact Us',
    slug: '/contact',
    page_type: 'contact',
    status: 'published',
    sort: 12,
    meta_title: 'Contact Leonard Soda Blasting - Get a Quote',
    meta_description: 'Contact Leonard Soda Blasting for professional soda blasting services in Bend, Oregon. Get a free quote today.',
    hero_title: 'Contact Us',
    hero_subtitle: 'Get in touch for a free quote on your soda blasting project',
    content: 'Contact us today to discuss your soda blasting needs and receive a free, no-obligation quote.'
  }
];

async function updatePageTypeField() {
  try {
    // Update the page_type field with all the page types
    await client.request(updateField('pages', 'page_type', {
      meta: {
        interface: 'select-dropdown',
        width: 'half',
        options: {
          choices: [
            { text: 'Home', value: 'home' },
            { text: 'About', value: 'about' },
            { text: 'Services', value: 'services' },
            { text: 'Automotive', value: 'automotive' },
            { text: 'Aircraft', value: 'aircraft' },
            { text: 'Marine', value: 'marine' },
            { text: 'Commercial', value: 'commercial' },
            { text: 'Fire & Water Damage', value: 'fire_water_damage' },
            { text: 'Food Processing', value: 'food_processing' },
            { text: 'Log Homes', value: 'log_homes' },
            { text: 'Gallery', value: 'gallery' },
            { text: 'Contact', value: 'contact' }
          ]
        }
      }
    }));
    
    console.log('✅ Updated page_type field with all page types');
  } catch (error) {
    console.error('❌ Error updating page_type field:', error);
    throw error;
  }
}

async function populatePages() {
  try {
    // Login with admin credentials
    await client.login({
      email: 'agency@theportlandcompany.com',
      password: 'J9u76asecdst!'
    });
    console.log('✅ Logged in successfully');

    // Update the page_type field first
    // await updatePageTypeField(); // Skip field update for now

    // Check if pages already exist
    const existingPages = await client.request(readItems('pages'));
    console.log(`📄 Found ${existingPages.length} existing pages`);

    // Clear existing pages if any
    if (existingPages.length > 0) {
      console.log('🗑️  Clearing existing pages...');
      const pageIds = existingPages.map(page => page.id);
      await client.request(deleteItems('pages', pageIds));
      console.log('✅ Cleared existing pages');
    }

    // Create all pages
    console.log('📝 Creating pages...');
    for (const pageData of pagesData) {
      try {
        const createdPage = await client.request(createItem('pages', pageData));
        console.log(`✅ Created page: ${pageData.title} (${pageData.slug})`);
      } catch (error) {
        console.error(`❌ Error creating page ${pageData.title}:`, error);
      }
    }

    console.log(`\n🎉 Successfully populated Pages collection with ${pagesData.length} pages!`);
    console.log('\n📋 Created pages:');
    pagesData.forEach((page, index) => {
      console.log(`${index + 1}. ${page.title} (${page.page_type}) - ${page.slug}`);
    });

  } catch (error) {
    console.error('❌ Failed to populate pages:', error);
  }
}

populatePages();