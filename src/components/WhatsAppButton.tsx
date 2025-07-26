import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    // Get current page context
    const currentPath = window.location.pathname;
    const scrollPosition = Math.round((window.scrollY / document.body.scrollHeight) * 100);
    
    // Build context message
    let contextMessage = "[AI_AVATAR] Hola! Vengo de la landing page de AI Avatar Interactivo de TDX";
    
    if (scrollPosition > 75) {
      contextMessage += " y he visto toda la información";
    } else if (scrollPosition > 50) {
      contextMessage += " y me interesan los casos de uso";
    } else if (scrollPosition > 25) {
      contextMessage += " y quiero conocer más detalles";
    }
    
    contextMessage += ". ¿Podemos hablar sobre cómo pueden ayudarme?";

    // WhatsApp deep link with context
    const phone = "573001234567"; // Replace with actual number
    const message = encodeURIComponent(contextMessage);
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click_whatsapp', {
        event_category: 'engagement',
        event_label: 'floating_button',
        value: scrollPosition
      });
    }
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleWhatsAppClick}
            className="flex-1 bg-gradient-primary hover:opacity-90 text-white font-bold py-3 rounded-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Hablar por WhatsApp
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="px-4 py-3 rounded-xl"
            onClick={() => {
              // Scroll to form or open modal
              const form = document.querySelector('[data-testid="typeform"]');
              if (form) {
                form.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Demo
          </Button>
        </div>
      </div>

      {/* Desktop Floating Button */}
      <div className="hidden lg:block">
        {!isMinimized ? (
          <div className="fixed bottom-6 right-6 z-50 bg-gradient-subtle rounded-2xl border border-border/50 shadow-glow-primary p-6 max-w-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">TDX AI Assistant</p>
                  <p className="text-xs text-muted-foreground">En línea ahora</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              ¿Tienes preguntas sobre nuestros avatares de IA? Hablemos por WhatsApp 👋
            </p>
            
            <Button 
              onClick={handleWhatsAppClick}
              className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold py-2 rounded-xl"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Iniciar conversación
            </Button>
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Respuesta típica en &lt; 2 minutos
            </p>
          </div>
        ) : (
          <Button
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 text-white shadow-glow-primary"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>
    </>
  );
};