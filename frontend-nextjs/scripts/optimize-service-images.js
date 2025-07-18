const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const SIZES = {
  mobile: 354,    // Service cards on mobile
  tablet: 400,    // Medium screens
  desktop: 600    // Large screens
};

const SERVICE_IMAGES = [
  'automotive-1.webp',
  'fire-damage.webp',
  'food-processing-equipment.webp',
  'boat-1.webp',
  'commercial.webp',
  'log-homes.webp',
  'aircraft.webp'
];

async function optimizeImages() {
  const publicDir = path.join(__dirname, '../public/assets/images');
  
  console.log('🎯 Creating optimized service card images...\n');
  
  for (const image of SERVICE_IMAGES) {
    const inputPath = path.join(publicDir, image);
    const basename = path.basename(image, '.webp');
    
    try {
      // Check if source file exists
      await fs.access(inputPath);
      
      console.log(`📸 Processing ${image}:`);
      
      for (const [sizeName, size] of Object.entries(SIZES)) {
        const outputPath = path.join(publicDir, `${basename}-${size}.webp`);
        
        await sharp(inputPath)
          .resize(size, size, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ 
            quality: sizeName === 'mobile' ? 75 : 80,
            effort: 6
          })
          .toFile(outputPath);
        
        const stats = await fs.stat(outputPath);
        const sizeKB = (stats.size / 1024).toFixed(1);
        console.log(`  ✅ ${sizeName} (${size}x${size}): ${sizeKB}KB`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`  ❌ Error processing ${image}: ${error.message}`);
    }
  }
  
  console.log('✨ Image optimization complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Update components to use responsive image loading');
  console.log('2. Test performance improvements with Lighthouse');
  console.log('3. Commit optimized images to repository');
}

// Run the optimization
optimizeImages().catch(console.error);