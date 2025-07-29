// Debug utilities for Facebook Pixel
export const debugPixel = () => {
  if (typeof window === 'undefined') {
    console.log('❌ Window not available (SSR)');
    return;
  }

  console.log('🔍 Facebook Pixel Debug Information:');
  console.log('-----------------------------------');
  
  // Check if fbq function exists
  if (window.fbq) {
    console.log('✅ fbq function exists');
    
    // Check if pixel is initialized
    if (window._fbq) {
      console.log('✅ _fbq object exists (pixel initialized)');
    } else {
      console.log('❌ _fbq object missing');
    }
  } else {
    console.log('❌ fbq function not found');
  }
  
  // Check for Facebook Pixel script
  const fbScript = document.querySelector('script[src*="fbevents.js"]');
  if (fbScript) {
    console.log('✅ Facebook Pixel script loaded');
  } else {
    console.log('❌ Facebook Pixel script not found');
  }
  
  // Check current URL
  console.log('🌐 Current URL:', window.location.href);
  
  // Check for ad blockers (common issue)
  const testImg = new Image();
  testImg.onload = () => console.log('✅ No ad blocker detected');
  testImg.onerror = () => console.log('⚠️  Possible ad blocker detected');
  testImg.src = 'https://www.facebook.com/tr?id=test&ev=PageView&noscript=1';
};

// Test event function
export const testPixelEvent = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    console.log('🧪 Testing Facebook Pixel event...');
    window.fbq('track', 'PageView');
    console.log('✅ Test PageView event sent');
  } else {
    console.log('❌ Cannot test - fbq not available');
  }
};

// Domain verification helper
export const verifyDomain = () => {
  const domain = window.location.hostname;
  console.log('🏠 Current domain:', domain);
  
  // Check if domain looks correct
  if (domain.includes('localhost') || domain.includes('127.0.0.1')) {
    console.log('⚠️  Running on localhost - some features may not work in production');
  } else if (domain.includes('vercel.app') || domain.includes('netlify.app')) {
    console.log('✅ Running on deployment platform');
  } else {
    console.log('✅ Running on custom domain');
  }
};