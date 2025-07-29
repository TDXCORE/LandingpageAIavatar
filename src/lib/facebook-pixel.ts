// Facebook Pixel utility functions
export const initializeFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;
  
  // Check if fbq already exists
  if (window.fbq) {
    console.log('Facebook Pixel already initialized');
    return;
  }
  
  // Initialize Facebook Pixel
  const fbq = function(...args: any[]) {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, args);
    } else {
      fbq.queue.push(args);
    }
  };
  
  if (!window._fbq) window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  
  // Load the Facebook Pixel script
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  }
  
  window.fbq = fbq;
  
  // Initialize with pixel ID
  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
  
  console.log('Facebook Pixel initialized with ID:', pixelId);
};

export const trackFacebookPixelEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
    console.log('Facebook Pixel Event:', eventName, parameters);
  } else {
    console.warn('Facebook Pixel not available');
  }
};

// Standard Facebook Pixel events for lead generation
export const trackPageView = () => {
  trackFacebookPixelEvent('PageView');
};

export const trackLead = (contentName: string, contentCategory?: string) => {
  trackFacebookPixelEvent('Lead', {
    content_name: contentName,
    content_category: contentCategory || 'engagement'
  });
};

export const trackCompleteRegistration = (contentName: string, value?: number) => {
  trackFacebookPixelEvent('CompleteRegistration', {
    content_name: contentName,
    value: value || 1,
    currency: 'USD'
  });
};

export const trackViewContent = (contentName: string, contentType?: string) => {
  trackFacebookPixelEvent('ViewContent', {
    content_name: contentName,
    content_type: contentType || 'page'
  });
};

export const trackInitiateCheckout = (contentName: string, value?: number) => {
  trackFacebookPixelEvent('InitiateCheckout', {
    content_name: contentName,
    value: value || 1,
    currency: 'USD'
  });
};