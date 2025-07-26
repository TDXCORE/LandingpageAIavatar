import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, MessageCircle } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import EmbeddedTypeformLeadForm from "./EmbeddedTypeformLeadForm";

interface HeroAIProps {
  onOpenModal: () => void;
}

export const HeroAI = ({ onOpenModal }: HeroAIProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleWhatsAppClick = () => {
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click_whatsapp', {
        event_category: 'engagement',
        event_label: 'hero_whatsapp_primary'
      });
    }

    // WhatsApp deep link with context
    const phone = "573001234567"; // Replace with actual number
    const message = encodeURIComponent("[AI_AVATAR] Hola! Vengo de la landing page y quiero conocer más sobre los avatares de IA en tiempo real de TDX.");
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
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

      <div className="relative z-10 container mx-auto px-6 text-center max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-left">
            {/* Headline */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-subtle rounded-full border border-border/50">
                <span className="text-sm font-medium text-primary">🚀 TDX AI Avatar</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Avatares de IA
                </span>
                <br />
                <span className="text-foreground">
                  en tiempo real
                </span>
                <br />
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl">
                  que convierten conversaciones en ventas
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">Latencia &lt; 800 ms</span>, integraciones sin límites y{" "}
                <span className="text-primary font-semibold">demos en 72 horas</span>.
              </p>

              <p className="text-lg text-muted-foreground">
                Lleva tu soporte, ventas y cobranzas al siguiente nivel con AI Avatar Interactivo de TDX.
              </p>
            </div>

            {/* Value Bullets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Demo en 72 horas • MVP en 15 días",
                "Soporte L1, ventas y cobranzas 24/7",
                "Integración con CRM, ERP, WhatsApp, VoIP",
                "Seguridad enterprise y observabilidad"
              ].map((bullet, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-primary rounded-full" />
                  <span className="text-sm text-muted-foreground">{bullet}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleWhatsAppClick}
                className="flex items-center gap-3 bg-gradient-primary hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                Habla con nuestro agente por WhatsApp
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={onOpenModal}
                className="py-4 px-8 rounded-xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-300"
              >
                Quiero mi demo en 72 horas
              </Button>
            </div>
          </div>

          {/* Right Column - VSL */}
          <div className="relative">
            {!isVideoPlaying ? (
              <div 
                className="relative bg-gradient-subtle rounded-2xl p-8 cursor-pointer group hover:scale-105 transition-all duration-300 shadow-glow-primary"
                onClick={() => setIsVideoPlaying(true)}
              >
                <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center border border-border/50">
                  <div className="text-center space-y-4">
                    <PlayCircle className="w-20 h-20 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <p className="text-xl font-medium mb-2">Ver AI Avatar en acción</p>
                      <p className="text-sm text-muted-foreground">
                        Descubre cómo los avatares de IA transforman tu negocio • 4 min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">VSL Player - AI Avatar Demo</p>
              </div>
            )}
          </div>
        </div>

        {/* Lead Form Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <EmbeddedTypeformLeadForm />
        </div>
      </div>
    </section>
  );
};