const fs = require('fs');
const path = require('path');

console.log('🔄 Applying dynamic imports to remaining service pages...\n');

const servicePages = [
  'airplane-soda-blasting/page.tsx',
  'boat-and-marine-soda-blasting/page.tsx', 
  'fire-and-water-damage-restoration-soda-blasting/page.tsx',
  'food-processing-equipment/page.tsx',
  'log-home-soda-blasting/page.tsx'
];

const basePath = path.join(__dirname, '../src/app/soda-blasting');

servicePages.forEach(servicePage => {
  const filePath = path.join(basePath, servicePage);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Extract the component name from the import
      const importMatch = content.match(/import (\w+) from '@\/components\/pages\/(\w+)'/);
      if (importMatch) {
        const componentName = importMatch[1];
        const componentFile = importMatch[2];
        
        // Replace the import with dynamic import
        const oldImport = `import { Metadata } from 'next'
import { getPage } from '@/lib/directus-server'
import ${componentName} from '@/components/pages/${componentFile}'`;

        const newImport = `import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { getPage } from '@/lib/directus-server'

const ${componentName} = dynamic(() => import('@/components/pages/${componentFile}'), {
  loading: () => <div>Loading...</div>,
  ssr: true
})`;

        content = content.replace(oldImport, newImport);
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Applied dynamic import to: ${servicePage}`);
      } else {
        console.log(`⚠️ Could not find component import in: ${servicePage}`);
      }
    } catch (error) {
      console.log(`❌ Error processing ${servicePage}: ${error.message}`);
    }
  } else {
    console.log(`⚠️ File not found: ${servicePage}`);
  }
});

console.log('\n🎯 Dynamic imports applied! This should reduce initial bundle sizes.');
console.log('Each service page will now load its component code on-demand.');