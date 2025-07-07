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
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-muted-foreground">De</span>{" "}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Dolores
            </span>{" "}
            <span className="text-muted-foreground">a</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Soluciones
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforma cada problema de atención al cliente en una oportunidad de crecimiento
          </p>
        </div>

        <div className="grid gap-6 max-w-5xl mx-auto">
          {comparisons.map((item, index) => (
            <div 
              key={index}
              className="grid md:grid-cols-2 gap-6 bg-gradient-subtle rounded-2xl p-8 border border-border/50"
            >
              {/* Problem */}
              <div className="flex items-start gap-4 p-6 bg-red-500/10 rounded-xl border border-red-500/20">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-100 mb-2">Antes</h3>
                  <p className="text-red-200/80">{item.problem}</p>
                </div>
              </div>

              {/* Solution */}
              <div className="flex items-start gap-4 p-6 bg-primary/10 rounded-xl border border-primary/20">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Con Mati AI</h3>
                  <p className="text-primary-foreground/80">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 bg-gradient-subtle rounded-2xl px-8 py-6 border border-border/50">
            <div className="text-left">
              <p className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Hasta 80% menos costes operativos
              </p>
              <p className="text-muted-foreground">
                Mientras mejoras la experiencia del cliente
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};