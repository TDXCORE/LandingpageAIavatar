/// <reference types="vite/client" />

// Facebook Pixel global declarations
declare global {
  interface Window {
    fbq: (action: string, event: string, parameters?: Record<string, any>) => void;
    _fbq: any;
  }
}
