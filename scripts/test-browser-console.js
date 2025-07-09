// Test script to check browser console for debug logs
console.log('=== Browser Console Test ===');
console.log('Open http://localhost:3000 in browser and check console for:');
console.log('1. [DEBUG] usePage(home) response: {...}');
console.log('2. [DEBUG] Page data for home: {seo_title: "...", ...}');
console.log('3. [DEBUG] SEOHead props: {title: "...", finalTitle: "..."}');
console.log('');
console.log('Expected debug output should show:');
console.log('- seo_title with debug suffix: "Leonard Soda Blasting - Eco-Friendly Cleaning & Stripping - seo_title"');
console.log('- API data being received and processed');
console.log('');
console.log('If these logs are missing, the issue is:');
console.log('- Directus API not running or accessible');
console.log('- Environment variables not loading properly');
console.log('- React component not mounting or calling hooks');