const fs = require('fs').promises;
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../src/components');

async function findAndFixImageReferences() {
  console.log('🔍 Scanning for image references to convert to WebP...');
  
  try {
    const files = await getAllTsxFiles(COMPONENTS_DIR);
    console.log(`📁 Found ${files.length} component files to process`);
    
    let totalReplacements = 0;
    
    for (const file of files) {
      const replacements = await processFile(file);
      totalReplacements += replacements;
    }
    
    console.log(`\n✅ Conversion complete! Made ${totalReplacements} replacements across all files.`);
    console.log('\n🚀 Next steps:');
    console.log('1. Test the application locally');
    console.log('2. Verify WebP images are loading in browser Network tab');
    console.log('3. Run git add . && git commit if everything looks good');
    
  } catch (error) {
    console.error('💥 Error during conversion:', error.message);
    process.exit(1);
  }
}

async function getAllTsxFiles(dir) {
  const files = [];
  
  async function scanDirectory(currentDir) {
    const items = await fs.readdir(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = await fs.stat(fullPath);
      
      if (stat.isDirectory()) {
        await scanDirectory(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }
  
  await scanDirectory(dir);
  return files;
}

async function processFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8');
  let modified = content;
  let replacements = 0;
  
  // Pattern to find image references
  const patterns = [
    // src="/assets/images/filename.jpg"
    {
      regex: /src="\/assets\/images\/([^"]+)\.jpg"/g,
      replacement: 'src="/assets/images/$1.webp"',
      description: 'Image src attributes'
    },
    // bgImage="url('/assets/images/filename.jpg')"
    {
      regex: /bgImage="url\('\/assets\/images\/([^']+)\.jpg'\)"/g,
      replacement: 'bgImage="url(\'/assets/images/$1.webp\')"',
      description: 'Background image URLs'
    },
    // backgroundImage: "url('/assets/images/filename.jpg')"
    {
      regex: /backgroundImage:\s*"url\('\/assets\/images\/([^']+)\.jpg'\)"/g,
      replacement: 'backgroundImage: "url(\'/assets/images/$1.webp\')"',
      description: 'CSS background images'
    }
  ];
  
  for (const pattern of patterns) {
    const matches = [...content.matchAll(pattern.regex)];
    if (matches.length > 0) {
      modified = modified.replace(pattern.regex, pattern.replacement);
      replacements += matches.length;
      console.log(`  ✅ ${matches.length} ${pattern.description} replacements in ${path.basename(filePath)}`);
    }
  }
  
  // Save file if changes were made
  if (replacements > 0) {
    await fs.writeFile(filePath, modified, 'utf8');
    console.log(`📝 Updated: ${path.relative(process.cwd(), filePath)}`);
  }
  
  return replacements;
}

// Run the conversion
if (require.main === module) {
  findAndFixImageReferences();
}

module.exports = { findAndFixImageReferences };