import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const UseCases = () => {
  const [activeTab, setActiveTab] = useState("ecommerce");

  const useCases = {
    ecommerce: {
      title: "E-commerce",
      description: "Convierte visitantes en compradores y mejora el post-venta",
      metrics: "↑ 45% conversión en carrito abandonado",
      story: "Cuando un cliente llama por un pedido, AI Avatar Interactivo consulta el estado en tiempo real, ofrece tracking y puede procesar cambios o devoluciones automáticamente.",
      features: ["Consulta de pedidos 24/7", "Gestión de devoluciones", "Recuperación de carritos", "Upselling inteligente"]
    },
    reception: {
      title: "Recepción Virtual",
      description: "Filtra llamadas y agenda citas como una recepcionista experta",
      metrics: "↑ 60% citas confirmadas",
      story: "Los clientes llaman y AI Avatar Interactivo les saluda por nombre, consulta disponibilidad en tu calendario real y agenda la cita perfecta según preferencias y urgencia.",
      features: ["Agenda inteligente", "Filtrado de llamadas", "Recordatorios automáticos", "Reprogramación flexible"]
    },
    support: {
      title: "Atención 24/7",
      description: "Soporte técnico que nunca duerme y escala con tu crecimiento",
      metrics: "↓ 70% tickets de soporte",
      story: "AI Avatar Interactivo resuelve consultas frecuentes, recopila información detallada para casos complejos y transfiere con contexto completo al especialista correcto.",
      features: ["Resolución automática", "Escalamiento inteligente", "Base de conocimiento", "Métricas de satisfacción"]
    },
    leads: {
      title: "Cualificación Leads",
      description: "Identifica oportunidades reales y programa demos de calidad",
      metrics: "↑ 80% leads cualificados",
      story: "Cada lead que llama es evaluado automáticamente. AI Avatar Interactivo hace las preguntas correctas, detecta el nivel de interés y agenda demos solo con prospects de alta conversión.",
      features: ["Scoring automático", "Preguntas dinámicas", "CRM sincronizado", "Follow-up programado"]
    },
    appointments: {
      title: "Gestión Citas",
      description: "Optimiza tu calendario y reduce no-shows dramáticamente",
      metrics: "↓ 85% no-shows",
      story: "Desde confirmación hasta reprogramación, AI Avatar Interactivo mantiene tu calendario perfecto con recordatorios personalizados y gestión proactiva de cambios.",
      features: ["Confirmación automática", "Recordatorios personalizados", "Reprogramación inteligente", "Listas de espera"]
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Casos de Uso
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre cómo AI Avatar Interactivo transforma diferentes industrias y necesidades
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-12 bg-secondary/50 h-auto p-2">
            {Object.entries(useCases).map(([key, useCase]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-foreground text-sm py-3 px-4"
              >
                {useCase.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(useCases).map(([key, useCase]) => (
            <TabsContent key={key} value={key}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-xl text-muted-foreground mb-4">
                      {useCase.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-primary/10 rounded-lg px-4 py-2 border border-primary/20">
                      <span className="text-primary font-semibold">{useCase.metrics}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-subtle rounded-xl p-6 border border-border/50">
                    <h4 className="font-semibold mb-3 text-primary">Historia Real</h4>
                    <p className="text-muted-foreground leading-relaxed italic">
                      "{useCase.story}"
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Características Clave</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {useCase.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-accent/30 rounded-lg">
                          <div className="w-2 h-2 bg-gradient-primary rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual representation */}
                <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/50">
                  <div className="aspect-square bg-secondary/30 rounded-xl flex items-center justify-center border-2 border-dashed border-border/30">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full mx-auto flex items-center justify-center">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <p className="text-muted-foreground">
                        Simulación interactiva
                        <br />
                        <span className="text-sm">Próximamente</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};