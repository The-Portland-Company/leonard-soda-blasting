const puppeteer = require('puppeteer');

async function testGalleryPage() {
  console.log('🧪 Testing gallery page for gform_1 errors...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    devtools: true,
    slowMo: 1000
  });
  
  const page = await browser.newPage();
  
  // Capture console messages
  const consoleMessages = [];
  const errorMessages = [];
  
  page.on('console', msg => {
    const text = msg.text();
    consoleMessages.push(text);
    console.log(`📝 Console: ${text}`);
  });
  
  page.on('error', err => {
    errorMessages.push(err.message);
    console.log(`❌ Page Error: ${err.message}`);
  });
  
  page.on('pageerror', err => {
    errorMessages.push(err.message);
    console.log(`💥 Script Error: ${err.message}`);
  });
  
  try {
    console.log('🌐 Loading gallery page...');
    await page.goto('http://localhost:3000/gallery', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for page to fully load
    await page.waitForTimeout(3000);
    
    // Check if gform_1 element exists
    const gformExists = await page.evaluate(() => {
      return document.getElementById('gform_1') !== null;
    });
    
    console.log(`\n📊 Test Results:`);
    console.log(`  gform_1 element exists: ${gformExists ? '✅ Yes' : '❌ No'}`);
    console.log(`  Console messages: ${consoleMessages.length}`);
    console.log(`  Error messages: ${errorMessages.length}`);
    
    // Look for specific gform errors
    const gformErrors = errorMessages.filter(msg => 
      msg.includes('gform') || 
      msg.includes('null is not an object') ||
      msg.includes('addEventListener')
    );
    
    if (gformErrors.length > 0) {
      console.log(`\n🚨 Found ${gformErrors.length} gform-related errors:`);
      gformErrors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`);
      });
    } else {
      console.log(`\n✅ No gform errors detected!`);
    }
    
    // Check protection messages
    const protectionMessages = consoleMessages.filter(msg => 
      msg.includes('Gallery:') || 
      msg.includes('gform_1') ||
      msg.includes('Prevented')
    );
    
    if (protectionMessages.length > 0) {
      console.log(`\n🛡️ Protection script messages:`);
      protectionMessages.forEach((msg, i) => {
        console.log(`  ${i + 1}. ${msg}`);
      });
    }
    
  } catch (error) {
    console.log(`❌ Test failed: ${error.message}`);
  } finally {
    await browser.close();
  }
}

// Only run if puppeteer is available
if (require.resolve('puppeteer')) {
  testGalleryPage().catch(console.error);
} else {
  console.log('⚠️ Puppeteer not available. Install with: npm install puppeteer');
  console.log('📝 Manual test: Open browser dev tools and check /gallery for errors');
}