import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to track page views in React Router SPA
 * This ensures Facebook Pixel fires on route changes
 */
export const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Track page view on route change
    if (typeof window !== 'undefined' && window.fbq) {
      // Wait a bit for the page to render
      setTimeout(() => {
        window.fbq('track', 'PageView');
        console.log('Facebook Pixel: PageView tracked for', location.pathname);
      }, 100);
    }
  }, [location.pathname, location.search]);
  
  return null;
};