// Analytics utilities for tracking events across the AI Avatar landing page

export interface AnalyticsEvent {
  name: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface LeadData {
  lead_id?: string;
  session_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  video_progress?: number;
  device: string;
  country?: string;
  use_case?: string;
}

class Analytics {
  private sessionId: string;
  private leadId: string | null = null;
  private utmParams: Record<string, string> = {};

  constructor() {
    this.sessionId = this.generateSessionId();
    this.parseUTMParams();
    this.initializeAnalytics();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private parseUTMParams(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid', 'fbclid'];
    
    utmKeys.forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        this.utmParams[key] = value;
      }
    });
  }

  private initializeAnalytics(): void {
    // Track initial page view
    this.trackEvent({
      name: 'view_landing',
      category: 'engagement',
      label: 'ai_avatar_landing'
    });
  }

  private getDeviceType(): string {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent)) {
      return 'mobile';
    } else if (/tablet|ipad/.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  }

  private getCountryFromTimezone(): string {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Simple mapping for Latin American countries
      const timezoneCountryMap: Record<string, string> = {
        'America/Bogota': 'CO',
        'America/Mexico_City': 'MX',
        'America/Argentina/Buenos_Aires': 'AR',
        'America/Santiago': 'CL',
        'America/Lima': 'PE',
        'America/Caracas': 'VE',
        'America/Guayaquil': 'EC',
        'America/La_Paz': 'BO',
        'America/Asuncion': 'PY',
        'America/Montevideo': 'UY'
      };
      return timezoneCountryMap[timezone] || 'UNKNOWN';
    } catch {
      return 'UNKNOWN';
    }
  }

  public setLeadId(leadId: string): void {
    this.leadId = leadId;
  }

  public trackEvent(event: AnalyticsEvent): void {
    const eventData = {
      ...event,
      session_id: this.sessionId,
      lead_id: this.leadId,
      device: this.getDeviceType(),
      country: this.getCountryFromTimezone(),
      timestamp: new Date().toISOString(),
      ...this.utmParams,
      ...event.custom_parameters
    };

    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.name, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameters: eventData
      });
    }

    // Send to Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CustomEvent', {
        event_name: event.name,
        event_category: event.category,
        ...eventData
      });
    }

    // Send to LinkedIn Insight Tag
    if (typeof window !== 'undefined' && window.lintrk) {
      window.lintrk('track', {
        conversion_id: event.name,
        ...eventData
      });
    }

    // Send to backend for storage
    this.sendToBackend(eventData);
  }

  private async sendToBackend(eventData: any): Promise<void> {
    try {
      await fetch('/api/track-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      console.warn('Failed to send analytics event to backend:', error);
    }
  }

  // Video tracking methods
  public trackVideoStart(videoId: string = 'ai_avatar_demo'): void {
    this.trackEvent({
      name: 'video_start',
      category: 'video',
      label: videoId
    });
  }

  public trackVideoProgress(percentage: number, videoId: string = 'ai_avatar_demo'): void {
    this.trackEvent({
      name: `video_progress_${percentage}`,
      category: 'video',
      label: videoId,
      value: percentage
    });
  }

  public trackVideoComplete(videoId: string = 'ai_avatar_demo'): void {
    this.trackEvent({
      name: 'video_complete',
      category: 'video',
      label: videoId,
      value: 100
    });
  }

  // CTA tracking methods
  public trackWhatsAppClick(source: string, useCase?: string): void {
    this.trackEvent({
      name: 'cta_click_whatsapp',
      category: 'engagement',
      label: source,
      custom_parameters: {
        use_case: useCase,
        scroll_position: Math.round((window.scrollY / document.body.scrollHeight) * 100)
      }
    });
  }

  public trackTypeformSubmit(formData: any): void {
    this.trackEvent({
      name: 'typeform_submit',
      category: 'lead_generation',
      label: 'ai_avatar_form',
      custom_parameters: {
        form_data: formData
      }
    });
  }

  public trackMeetingBooked(meetingData: any): void {
    this.trackEvent({
      name: 'meeting_booked',
      category: 'conversion',
      label: 'demo_scheduled',
      custom_parameters: meetingData
    });
  }

  public trackDemo72hRequest(): void {
    this.trackEvent({
      name: 'demo_72h_requested',
      category: 'conversion',
      label: 'fast_demo'
    });
  }

  public trackMVP15dRequest(): void {
    this.trackEvent({
      name: 'mvp_15d_requested',
      category: 'conversion',
      label: 'mvp_request'
    });
  }

  // Lead qualification tracking
  public trackQualifiedMQL(leadData: LeadData): void {
    this.trackEvent({
      name: 'wa_qualified_mql',
      category: 'lead_qualification',
      label: 'marketing_qualified',
      custom_parameters: leadData
    });
  }

  public trackWhatsAppChatStarted(): void {
    this.trackEvent({
      name: 'wa_chat_started',
      category: 'engagement',
      label: 'whatsapp_initiated'
    });
  }

  // Utility method to get current analytics data
  public getAnalyticsData(): LeadData {
    return {
      session_id: this.sessionId,
      lead_id: this.leadId,
      device: this.getDeviceType(),
      country: this.getCountryFromTimezone(),
      ...this.utmParams
    };
  }
}

// Global analytics instance
export const analytics = typeof window !== 'undefined' ? new Analytics() : null;

// Extend window object for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    lintrk: (...args: any[]) => void;
  }
}