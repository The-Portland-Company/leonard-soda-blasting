const fs = require('fs').promises;
const path = require('path');

async function verifyOptimization() {
  const imagesDir = path.join(__dirname, '../public/assets/images');
  const serviceImages = [
    'automotive-1', 'fire-damage', 'food-processing-equipment',
    'boat-1', 'commercial', 'log-homes', 'aircraft'
  ];
  
  console.log('📊 WebP Optimization Verification Report\n');
  console.log('========================================\n');
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const image of serviceImages) {
    console.log(`📸 ${image}:`);
    
    try {
      // Check original WebP
      const originalPath = path.join(imagesDir, `${image}.webp`);
      const originalStats = await fs.stat(originalPath);
      const originalKB = (originalStats.size / 1024).toFixed(1);
      
      // Check optimized versions
      const sizes = {
        mobile: `${image}-354.webp`,
        tablet: `${image}-400.webp`,
        desktop: `${image}-600.webp`
      };
      
      console.log(`  Original: ${originalKB}KB`);
      
      for (const [sizeName, filename] of Object.entries(sizes)) {
        const optimizedPath = path.join(imagesDir, filename);
        try {
          const stats = await fs.stat(optimizedPath);
          const sizeKB = (stats.size / 1024).toFixed(1);
          const savings = ((1 - stats.size / originalStats.size) * 100).toFixed(1);
          
          console.log(`  ${sizeName}: ${sizeKB}KB (${savings}% smaller)`);
          
          if (sizeName === 'mobile') {
            totalOriginalSize += originalStats.size;
            totalOptimizedSize += stats.size;
          }
        } catch (error) {
          console.log(`  ${sizeName}: ❌ Not found`);
        }
      }
    } catch (error) {
      console.log(`  ❌ Original not found`);
    }
    
    console.log('');
  }
  
  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  const savedKB = ((totalOriginalSize - totalOptimizedSize) / 1024).toFixed(1);
  
  console.log('📈 Summary:');
  console.log(`  Total original size: ${(totalOriginalSize / 1024).toFixed(1)}KB`);
  console.log(`  Total mobile size: ${(totalOptimizedSize / 1024).toFixed(1)}KB`);
  console.log(`  Total savings: ${savedKB}KB (${totalSavings}%)`);
  console.log('\n✅ Expected performance improvements:');
  console.log('  - Faster initial page load');
  console.log('  - Better LCP scores');
  console.log('  - Reduced bandwidth usage');
  console.log('  - Improved mobile performance');
}

verifyOptimization().catch(console.error);