import { PlayCircle, Clock, CheckCircle, Calendar } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: PlayCircle,
      title: "Inicio Inmediato",
      description: "Configura tu agente en una conversación de 15 minutos. Define objetivos, tono y casos de uso específicos.",
      time: "15 min",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Activación 24-48h",
      description: "Nuestro equipo entrena a Mati AI con tu información y realiza pruebas de calidad antes del lanzamiento.",
      time: "24-48h",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CheckCircle,
      title: "Personalización No-Code",
      description: "Ajusta respuestas, horarios y flujos desde un dashboard intuitivo. Sin programación necesaria.",
      time: "5 min",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Calendar,
      title: "Integraciones Automáticas",
      description: "Conecta con tu CRM, calendario y herramientas existentes. Sincronización bidireccional incluida.",
      time: "Automático",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Cómo Funciona
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De cero a agente de voz profesional en menos de 48 horas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0" />
                )}
                
                <div className="relative bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/30 transition-all duration-300 group">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold text-background">
                    {index + 1}
                  </div>

                  {/* Icon with gradient */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 bg-accent/50 rounded-lg px-3 py-1 text-sm">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-accent-foreground">{step.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-background/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-border/50">
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold">
                ¿Listo para empezar?
              </p>
              <p className="text-muted-foreground text-sm">
                La configuración es gratuita y sin compromiso
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">🚀</span>
              <span className="text-2xl">⚡</span>
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};