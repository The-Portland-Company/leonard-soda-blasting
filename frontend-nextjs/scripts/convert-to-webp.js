const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets/images');
const QUALITY_SETTINGS = {
  webp: 80,
  avif: 75
};

async function convertAllImages() {
  console.log('🔄 Starting image conversion to WebP and AVIF...');
  
  try {
    const files = await fs.readdir(ASSETS_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    console.log(`📁 Found ${imageFiles.length} images to convert`);

    const conversions = [];

    for (const file of imageFiles) {
      const inputPath = path.join(ASSETS_DIR, file);
      const baseName = path.parse(file).name;
      
      // Convert to WebP
      const webpPath = path.join(ASSETS_DIR, `${baseName}.webp`);
      conversions.push(
        sharp(inputPath)
          .webp({ quality: QUALITY_SETTINGS.webp })
          .toFile(webpPath)
          .then(() => console.log(`✅ Created: ${baseName}.webp`))
          .catch(err => console.error(`❌ Failed to create ${baseName}.webp:`, err.message))
      );

      // Convert to AVIF (next-gen format)
      const avifPath = path.join(ASSETS_DIR, `${baseName}.avif`);
      conversions.push(
        sharp(inputPath)
          .avif({ quality: QUALITY_SETTINGS.avif })
          .toFile(avifPath)
          .then(() => console.log(`✅ Created: ${baseName}.avif`))
          .catch(err => console.error(`❌ Failed to create ${baseName}.avif:`, err.message))
      );
    }

    await Promise.all(conversions);

    // Generate size comparison report
    await generateSizeReport(imageFiles);

    console.log('🎉 Image conversion completed successfully!');
    
  } catch (error) {
    console.error('💥 Error during conversion:', error.message);
    process.exit(1);
  }
}

async function generateSizeReport(imageFiles) {
  console.log('\n📊 Size Comparison Report:');
  console.log('─'.repeat(80));
  
  let totalOriginal = 0;
  let totalWebP = 0;
  let totalAVIF = 0;

  for (const file of imageFiles) {
    const baseName = path.parse(file).name;
    
    try {
      const originalPath = path.join(ASSETS_DIR, file);
      const webpPath = path.join(ASSETS_DIR, `${baseName}.webp`);
      const avifPath = path.join(ASSETS_DIR, `${baseName}.avif`);

      const [originalStat, webpStat, avifStat] = await Promise.all([
        fs.stat(originalPath),
        fs.stat(webpPath).catch(() => null),
        fs.stat(avifPath).catch(() => null)
      ]);

      const originalSize = originalStat.size;
      const webpSize = webpStat ? webpStat.size : 0;
      const avifSize = avifStat ? avifStat.size : 0;

      totalOriginal += originalSize;
      totalWebP += webpSize;
      totalAVIF += avifSize;

      const webpSavings = webpSize ? Math.round((1 - webpSize / originalSize) * 100) : 0;
      const avifSavings = avifSize ? Math.round((1 - avifSize / originalSize) * 100) : 0;

      console.log(`${baseName.padEnd(25)} | ${formatBytes(originalSize).padEnd(8)} | ${formatBytes(webpSize).padEnd(8)} (${webpSavings}%) | ${formatBytes(avifSize).padEnd(8)} (${avifSavings}%)`);
    } catch (error) {
      console.log(`${baseName.padEnd(25)} | Error reading file sizes`);
    }
  }

  console.log('─'.repeat(80));
  const totalWebPSavings = Math.round((1 - totalWebP / totalOriginal) * 100);
  const totalAVIFSavings = Math.round((1 - totalAVIF / totalOriginal) * 100);
  
  console.log(`${'TOTAL'.padEnd(25)} | ${formatBytes(totalOriginal).padEnd(8)} | ${formatBytes(totalWebP).padEnd(8)} (${totalWebPSavings}%) | ${formatBytes(totalAVIF).padEnd(8)} (${totalAVIFSavings}%)`);
  console.log(`\n💾 Bandwidth savings: WebP ${formatBytes(totalOriginal - totalWebP)}, AVIF ${formatBytes(totalOriginal - totalAVIF)}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Run the conversion
if (require.main === module) {
  convertAllImages();
}

module.exports = { convertAllImages };