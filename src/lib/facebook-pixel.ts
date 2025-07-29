// Declare Facebook Pixel global type
declare global {
  interface Window {
    fbq: (action: string, event: string, parameters?: Record<string, any>) => void;
  }
}

// Facebook Pixel utility functions
export const trackFacebookPixelEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
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