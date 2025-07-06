// Simple test to check if the title updates after page load
const http = require('http');

function testWithDelay() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        // Test the API first to ensure it's working
        const apiResponse = await fetch('http://localhost:8055/items/pages?filter[slug][_eq]=home&limit=1');
        const apiData = await apiResponse.json();
        
        console.log('=== API Test ===');
        console.log('API Status:', apiResponse.status);
        console.log('SEO Title from API:', apiData.data?.[0]?.seo_title);
        console.log('Page Title from API:', apiData.data?.[0]?.page_title);
        
        // Test the frontend
        const frontendResponse = await fetch('http://localhost:3000');
        const html = await frontendResponse.text();
        
        console.log('\n=== Frontend Test ===');
        console.log('Frontend Status:', frontendResponse.status);
        
        // Extract title from HTML
        const titleMatch = html.match(/<title>(.*?)<\/title>/);
        const staticTitle = titleMatch ? titleMatch[1] : 'No title found';
        
        console.log('Static HTML Title:', staticTitle);
        console.log('Expected Dynamic Title:', apiData.data?.[0]?.seo_title + ' - seo_title');
        
        // Check if debug mode is enabled
        const hasDebugEnv = html.includes('REACT_APP_DEBUG');
        console.log('Debug mode in HTML:', hasDebugEnv);
        
        resolve();
      } catch (error) {
        console.error('Test failed:', error);
        resolve();
      }
    }, 2000); // Wait 2 seconds for React to potentially update
  });
}

testWithDelay();