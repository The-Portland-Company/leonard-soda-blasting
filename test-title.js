// Simple test to check if the title is being set correctly
// Run this in the browser console

console.log('Current page title:', document.title);

// Wait a moment and check again
setTimeout(() => {
  console.log('Page title after 2 seconds:', document.title);
}, 2000);

setTimeout(() => {
  console.log('Page title after 5 seconds:', document.title);
}, 5000);

// Check if the PageTitle component is working
const titleElements = document.querySelectorAll('title');
console.log('Number of title elements:', titleElements.length);
titleElements.forEach((el, index) => {
  console.log(`Title element ${index}:`, el.textContent);
});