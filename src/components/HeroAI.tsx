import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, MessageCircle } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import EmbeddedTypeformLeadForm from "./EmbeddedTypeformLeadForm";
import { trackLead } from "@/lib/facebook-pixel";

interface HeroAIProps {
  onOpenModal?: () => void;
}

export const HeroAI = ({ onOpenModal }: HeroAIProps = {}) => {
  // Load the vturb-smartplayer script and create video element automatically
  useEffect(() => {
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      // Insert the exact HTML code provided
      videoContainer.innerHTML = `
        <vturb-smartplayer id="vid-688b9823472c92b73bbbec89" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>
      `;
      
      // Load the script
      const existingScript = document.querySelector('script[src*="converteai.net"]');
      if (!existingScript) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://scripts.converteai.net/68e9c115-6aaf-44f0-b760-49aac229e708/players/688b9823472c92b73bbbec89/v4/player.js";
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, []);

  const scrollToTypeform = () => {
    const typeform = document.querySelector('[data-testid="typeform"]');
    if (typeform) {
      typeform.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleWhatsAppClick = () => {
    // Track Facebook Pixel event
    trackLead('Hero WhatsApp Button', 'engagement');

    // Track Google Analytics event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click_whatsapp', {
        event_category: 'engagement',
        event_label: 'hero_whatsapp_primary'
      });
    }

    // Scroll to typeform instead of opening WhatsApp
    scrollToTypeform();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/95" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-primary rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Hero Title Section - Always First */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-subtle rounded-full border border-border/50 mb-6">
            <span className="text-sm font-medium text-primary">🚀 TDX AI Avatar</span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI Avatar Interactivo
            </span>
            <br />
            <span className="text-foreground">
              para cualquier caso de uso
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Vende, atiende y cobra en tiempo real con un solo avatar, integrado a tu stack.
          </p>
        </div>

        {/* VSL Section - Second */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <div className="max-w-4xl mx-auto">
            <div 
              id="video-container"
              className="aspect-video bg-secondary rounded-lg sm:rounded-xl"
              style={{ 
                position: 'relative',
                width: '100%',
                height: '100%'
              }}
            >
              {/* Video player will be injected here by useEffect */}
            </div>
          </div>
        </div>

        {/* Buttons Section - Third */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Button 
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-primary hover:opacity-90 text-white font-bold py-3 sm:py-4 px-4 sm:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
              size="lg"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Habla con nuestro agente por WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                // Track Facebook Pixel event
                trackLead('Hero Demo Button', 'engagement');
                scrollToTypeform();
              }}
              className="py-3 sm:py-4 px-4 sm:px-8 rounded-xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-300 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Quiero mi demo en 72 horas</span>
              <span className="sm:hidden">Demo en 72h</span>
            </Button>
          </div>

          {/* Value Bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-8">
            {[
              "Demo en 72 horas • MVP en 15 días",
              "Soporte L1, ventas y cobranzas 24/7",
              "Integración con CRM, ERP, WhatsApp, VoIP",
              "Seguridad enterprise y observabilidad"
            ].map((bullet, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-center">
                <div className="w-2 h-2 bg-gradient-primary rounded-full flex-shrink-0" />
                <span className="text-xs sm:text-sm text-muted-foreground">{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Form Section - Fourth */}
        <div className="max-w-3xl mx-auto px-4 sm:px-0">
          <EmbeddedTypeformLeadForm />
        </div>
      </div>
    </section>
  );
};