
import { Check, X } from "lucide-react";

export const ProblemSolution = () => {
  const comparisons = [
    {
      problem: "Colas telefónicas y clientes frustrados",
      solution: "Respuesta instantánea < 1 segundo"
    },
    {
      problem: "Costes de nómina crecientes", 
      solution: "Escalabilidad sin contratar personal"
    },
    {
      problem: "Seguimientos manuales que se olvidan",
      solution: "Follow-ups automáticos programados"
    },
    {
      problem: "Transferencias confusas entre equipos",
      solution: "Transferencia inteligente con contexto"
    },
    {
      problem: "Sin visibilidad de KPIs de conversación",
      solution: "Dashboard con insights en tiempo real"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-muted-foreground">De</span>{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Dolores
            </span>{" "}
            <span className="text-muted-foreground">a</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Soluciones
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforma cada problema de atención al cliente en una oportunidad de crecimiento
          </p>
        </div>

        <div className="space-y-4">
          {comparisons.map((item, index) => (
            <div 
              key={index}
              className="grid md:grid-cols-2 gap-4 bg-card/30 rounded-xl p-6 border border-border/30 hover:border-border/60 transition-colors"
            >
              {/* Problem */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-red-400" />
                </div>
                <p className="text-red-200/90 text-sm">{item.problem}</p>
              </div>

              {/* Solution */}
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                <p className="text-primary-foreground/90 text-sm font-medium">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-3 bg-gradient-subtle rounded-xl px-6 py-4 border border-border/30">
            <div className="text-center">
              <p className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Hasta 80% menos costes operativos
              </p>
              <p className="text-muted-foreground text-sm">
                Mientras mejoras la experiencia del cliente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
