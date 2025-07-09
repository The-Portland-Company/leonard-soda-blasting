// Test script to check if meta description is being set by React Helmet
// Run this in the browser console after the page loads

console.log('Checking meta description...');

// Wait for page to load completely
setTimeout(() => {
  const metaDescription = document.querySelector('meta[name="description"]');
  
  if (metaDescription) {
    console.log('✅ Meta description found:', metaDescription.getAttribute('content'));
  } else {
    console.log('❌ No meta description found');
  }
  
  // Check all meta tags
  const allMeta = document.querySelectorAll('meta');
  console.log('All meta tags:', Array.from(allMeta).map(m => ({
    name: m.getAttribute('name'), 
    content: m.getAttribute('content')
  })));
  
  // Check if React Helmet is working
  const title = document.title;
  console.log('Document title:', title);
  
}, 3000);