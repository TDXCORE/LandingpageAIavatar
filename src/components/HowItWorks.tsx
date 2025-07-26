import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Play, 
  MessageSquare, 
  UserCheck, 
  Calendar, 
  Rocket,
  ArrowRight
} from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Play,
      title: "Ver",
      description: "Observa nuestro AI Avatar en acción en el video demo",
      detail: "Conoce las capacidades de respuesta en tiempo real y casos de uso específicos para tu industria",
      color: "text-blue-500"
    },
    {
      icon: MessageSquare,
      title: "Chatear",
      description: "Habla directamente con nuestro agente de IA por WhatsApp",
      detail: "Nuestro agente califica tu necesidad y te conecta con el especialista adecuado",
      color: "text-green-500"
    },
    {
      icon: UserCheck,
      title: "Calificar",
      description: "Evaluamos tu caso de uso y requisitos técnicos",
      detail: "Análisis BANT y definición de scope técnico para tu avatar personalizado",
      color: "text-yellow-500"
    },
    {
      icon: Calendar,
      title: "Demo en 72h",
      description: "Agenda tu demostración funcional personalizada",
      detail: "Demo en vivo con tu caso de uso específico y métricas de performance esperadas",
      color: "text-purple-500"
    },
    {
      icon: Rocket,
      title: "MVP en 15 días",
      description: "Implementación y lanzamiento de tu avatar",
      detail: "Entrega de MVP funcional con integración básica y métricas de monitoreo",
      color: "text-orange-500"
    }
  ];

  return (
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Cómo</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              funciona
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De la primera conversación a tu avatar funcionando en producción en menos de 3 semanas
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary transform -translate-y-1/2" />
            
            <div className="flex justify-between items-center relative">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center group">
                    {/* Step Card */}
                    <Card className="w-80 mb-8 bg-gradient-subtle border-border/50 hover:shadow-glow-primary transition-all duration-300 group-hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-full bg-secondary/50 ${step.color} flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">
                          {step.description}
                        </p>
                        <p className="text-xs text-muted-foreground/80">
                          {step.detail}
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Timeline Point */}
                    <div className={`w-4 h-4 rounded-full bg-background border-4 ${step.color.replace('text-', 'border-')} z-10`} />
                    
                    {/* Step Number */}
                    <div className="mt-4 text-2xl font-bold text-muted-foreground/30">
                      0{index + 1}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Steps */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full bg-secondary/50 ${step.color} flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <Card className="flex-1 bg-gradient-subtle border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-muted-foreground/30">
                        0{index + 1}
                      </span>
                      <h3 className="text-xl font-bold">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      {step.detail}
                    </p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-muted-foreground/50 self-center lg:hidden" />
                )}
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 space-y-6">
          <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ¿Listo para empezar?
              </span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Inicia el proceso ahora y ten tu primer avatar funcionando en menos de 72 horas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-gradient-primary hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl"
                onClick={() => {
                  const phone = "573001234567";
                  const message = encodeURIComponent("[AI_AVATAR] Quiero empezar con mi demo en 72 horas");
                  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                }}
              >
                Empezar ahora por WhatsApp
              </Button>
              <Button variant="outline" className="py-3 px-8 rounded-xl">
                Agendar llamada de discovery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};