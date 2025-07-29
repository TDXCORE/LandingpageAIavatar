import { useEffect } from 'react';
import { initializeFacebookPixel } from '@/lib/facebook-pixel';
import { debugPixel, verifyDomain } from '@/lib/pixel-debug';

const FACEBOOK_PIXEL_ID = '1751285369095891';

export const FacebookPixelProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Initialize Facebook Pixel on app load
    initializeFacebookPixel(FACEBOOK_PIXEL_ID);
    
    // Debug information (only in development)
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        debugPixel();
        verifyDomain();
      }, 1000);
    }
  }, []);

  return <>{children}</>;
};