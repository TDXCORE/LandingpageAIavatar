import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle } from "lucide-react";

interface PricingPlansProps {
  onOpenModal: () => void;
}

export const PricingPlans = ({ onOpenModal }: PricingPlansProps) => {
  const plans = [
    {
      name: "Starter",
      badge: "Prueba de concepto",
      description: "Perfecto para validar el concepto y casos de uso básicos",
      features: [
        "Setup e implementación incluida",
        "1 avatar especializado",
        "Hasta 1,000 interacciones/mes",
        "Integración básica (CRM/WhatsApp)",
        "Soporte técnico estándar",
        "Métricas básicas de performance",
        "Demo funcional en 72 horas"
      ],
      highlight: false,
      cta: "Solicitar cotización"
    },
    {
      name: "Professional",
      badge: "Más popular",
      description: "Solución completa para empresas medianas con múltiples casos de uso",
      features: [
        "Todo lo de Starter +",
        "Hasta 3 avatares especializados",
        "Hasta 10,000 interacciones/mes",
        "Integraciones avanzadas (APIs custom)",
        "Orquestación multiagente",
        "Handoff inteligente a humanos",
        "Dashboard de analytics avanzado",
        "Soporte prioritario 24/7",
        "Training y onboarding incluido"
      ],
      highlight: true,
      cta: "Más popular"
    },
    {
      name: "Enterprise",
      badge: "Escalabilidad total",
      description: "Solución enterprise con escalabilidad ilimitada y compliance completo",
      features: [
        "Todo lo de Professional +",
        "Avatares ilimitados",
        "Interacciones sin límite",
        "Arquitectura dedicada",
        "Compliance y certificaciones",
        "Custom ML models",
        "Multi-tenant y white-label",
        "SLA 99.9% garantizado",
        "Customer Success Manager",
        "Desarrollo de features custom"
      ],
      highlight: false,
      cta: "Contactar ventas"
    }
  ];

  const handleWhatsAppClick = (planName: string) => {
    const phone = "573001234567";
    const message = encodeURIComponent(`[AI_AVATAR] Hola! Me interesa el plan ${planName}. ¿Podemos hablar sobre pricing y implementación?`);
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    
    // Track event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'cta_click_whatsapp', {
        event_category: 'pricing',
        event_label: `plan_${planName.toLowerCase()}`
      });
    }
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Planes</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              flexibles
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Desde pruebas de concepto hasta implementaciones enterprise con escalabilidad total
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-subtle rounded-full border border-border/50">
            <span className="text-sm text-muted-foreground">
              💡 Setup inicial + Suscripción mensual + Pay-per-use
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative group transition-all duration-300 ${
                plan.highlight 
                  ? 'scale-105 shadow-glow-primary bg-gradient-subtle border-primary/30' 
                  : 'hover:scale-105 hover:shadow-glow-secondary bg-gradient-subtle border-border/50'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-primary text-white px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center space-y-4 pb-8">
                {!plan.highlight && (
                  <Badge variant="outline" className="w-fit mx-auto">
                    {plan.badge}
                  </Badge>
                )}
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 space-y-3">
                  <Button 
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.highlight
                        ? 'bg-gradient-primary hover:opacity-90 text-white'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => handleWhatsAppClick(plan.name)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {plan.cta}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full py-3 rounded-xl"
                    onClick={onOpenModal}
                  >
                    Demo personalizado
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">🚀 Setup Rápido</h4>
            <p className="text-sm text-muted-foreground">
              Demo funcional en 72 horas, MVP completo en 15 días
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">💰 Sin Sorpresas</h4>
            <p className="text-sm text-muted-foreground">
              Pricing transparente: setup + suscripción + uso real
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">🔄 Escalabilidad</h4>
            <p className="text-sm text-muted-foreground">
              Crece con tu negocio, desde startup hasta enterprise
            </p>
          </div>
        </div>

        {/* Custom Solutions */}
        <div className="mt-16 bg-gradient-subtle rounded-2xl p-8 border border-border/50 text-center">
          <h3 className="text-2xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ¿Necesitas algo diferente?
            </span>
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Creamos soluciones completamente personalizadas para casos de uso únicos, 
            integraciones complejas o requisitos de compliance específicos
          </p>
          <Button 
            className="bg-gradient-primary hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl"
            onClick={() => handleWhatsAppClick("Solución Custom")}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Hablar sobre solución custom
          </Button>
        </div>
      </div>
    </section>
  );
};