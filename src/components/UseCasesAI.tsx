import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Headphones, 
  DollarSign, 
  GraduationCap, 
  Heart, 
  Shield,
  Truck,
  Users
} from "lucide-react";

export const UseCasesAI = () => {
  const useCases = [
    {
      icon: TrendingUp,
      title: "Ventas",
      description: "Respuesta inmediata a leads, calificación automática y agendamiento de demos",
      kpi: "30-50% más demos agendadas",
      badge: "Alto Impacto",
      color: "text-green-500"
    },
    {
      icon: Headphones,
      title: "Soporte L1",
      description: "Resolución automática de tickets repetitivos con escalado inteligente",
      kpi: "Hasta 70% de tickets resueltos",
      badge: "Eficiencia",
      color: "text-blue-500"
    },
    {
      icon: DollarSign,
      title: "Cobranzas",
      description: "Recordatorios multicanal y negociación asistida para recuperación temprana",
      kpi: "Mejora recuperación temprana",
      badge: "ROI Inmediato",
      color: "text-yellow-500"
    },
    {
      icon: GraduationCap,
      title: "Educación",
      description: "Tutores virtuales 24/7 para onboarding y capacitación personalizada",
      kpi: "Reducción tiempo onboarding",
      badge: "Escalable",
      color: "text-purple-500"
    },
    {
      icon: Heart,
      title: "Salud",
      description: "Pre-triaje inteligente y agendamiento con cumplimiento normativo",
      kpi: "Optimización triaje médico",
      badge: "Regulado",
      color: "text-red-500"
    },
    {
      icon: Shield,
      title: "Banca/Seguros",
      description: "Cotización instantánea, pre-aprobación y KYC asistido",
      kpi: "Aceleración aprobaciones",
      badge: "Seguro",
      color: "text-indigo-500"
    },
    {
      icon: Truck,
      title: "Logística",
      description: "Tracking en tiempo real y gestión de incidencias automatizada",
      kpi: "Reducción consultas tracking",
      badge: "Operacional",
      color: "text-orange-500"
    },
    {
      icon: Users,
      title: "RRHH",
      description: "Reclutamiento inicial, onboarding y gestión de consultas internas",
      kpi: "Optimización procesos HR",
      badge: "Productividad",
      color: "text-cyan-500"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Casos de uso
            </span>{" "}
            <span className="text-foreground">de alto impacto</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Avatares de IA especializados para cada industria con métricas comprobadas de mejora
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-glow-primary transition-all duration-300 hover:scale-105 bg-gradient-subtle border-border/50 h-full"
              >
                <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-secondary/50 ${useCase.color}`}>
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <Badge variant="secondary" className="text-[10px] sm:text-xs">
                      {useCase.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                    {useCase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {useCase.description}
                  </CardDescription>
                  <div className="pt-2 sm:pt-3 border-t border-border/30">
                    <p className="text-xs sm:text-sm font-semibold text-primary">
                      📈 {useCase.kpi}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 px-4">
            ¿No encuentras tu caso de uso? Podemos crear un avatar personalizado para tu industria
          </p>
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-subtle rounded-lg sm:rounded-xl border border-border/50 mx-4">
            <span className="text-xs sm:text-sm text-muted-foreground text-center">
              💡 Consulta personalizada gratuita disponible
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};