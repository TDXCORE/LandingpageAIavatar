import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "¿Pueden integrarse con mi CRM actual?",
      answer: "Sí, absolutamente. Nuestros avatares se integran con más de 200 sistemas diferentes incluyendo Salesforce, HubSpot, Pipedrive, Microsoft Dynamics y muchos más. Si tu CRM no está en nuestra lista, construimos el conector personalizado sin costo adicional. Usamos APIs REST, webhooks y microservicios para garantizar una integración robusta y en tiempo real."
    },
    {
      question: "¿Qué latencia real logran en producción?",
      answer: "Nuestro objetivo es mantener latencias por debajo de 800ms extremo a extremo, y en producción típicamente logramos entre 400-600ms. Esto incluye procesamiento de voz, análisis de intent, consulta a sistemas externos y síntesis de respuesta. La latencia exacta depende de factores como ubicación geográfica, calidad de red y complejidad de las integraciones."
    },
    {
      question: "¿Cumplen con las políticas de datos y privacidad?",
      answer: "Sí, cumplimos con GDPR, LOPD, HIPAA, PCI DSS y otras normativas según tu industria. Implementamos cifrado AES-256 en tránsito y reposo, arquitectura zero-trust, logs inmutables y PII masking automático. Todos nuestros sistemas están auditados y certificados para uso enterprise con los más altos estándares de seguridad."
    },
    {
      question: "¿Pueden hacer un piloto rápido para validar la tecnología?",
      answer: "¡Por supuesto! Nuestro proceso está diseñado específicamente para validación rápida: demo funcional en 72 horas y MVP completo en 15 días. El piloto incluye tu caso de uso específico, integración básica con tus sistemas y métricas reales de performance. Esto te permite validar el ROI antes de cualquier compromiso mayor."
    },
    {
      question: "¿Cómo funciona el pricing y qué está incluido?",
      answer: "Nuestro modelo tiene tres componentes: (1) Setup inicial que incluye implementación, training y configuración, (2) Suscripción mensual basada en el plan elegido, y (3) Consumo variable por interacciones reales. Incluimos soporte técnico, actualizaciones, monitoreo 24/7 y métricas avanzadas. Sin costos ocultos ni sorpresas."
    },
    {
      question: "¿Qué pasa si el avatar no puede resolver una consulta?",
      answer: "Implementamos handoff inteligente automático. Cuando el avatar detecta que no puede resolver la consulta (por complejidad, emoción del usuario, o políticas predefinidas), transfiere automáticamente a un agente humano con todo el contexto de la conversación. El tiempo promedio de escalado es menor a 10 segundos."
    },
    {
      question: "¿Pueden manejar múltiples idiomas y acentos regionales?",
      answer: "Sí, nuestros avatares soportan más de 40 idiomas y están entrenados específicamente para acentos regionales latinoamericanos. Incluimos español colombiano, mexicano, argentino, chileno, y otros dialectos. También manejamos code-switching (cambio de idioma en la misma conversación) y jerga local específica de cada país."
    },
    {
      question: "¿Qué nivel de personalización permiten?",
      answer: "Personalización completa: desde la personalidad y tono del avatar hasta workflows complejos específicos de tu negocio. Puedes definir scripts, respuestas, escalado, integraciones con sistemas propietarios, y métricas custom. Para clientes enterprise, incluso desarrollamos modelos de IA completamente personalizados para casos de uso únicos."
    },
    {
      question: "¿Cómo garantizan la disponibilidad y el uptime?",
      answer: "Ofrecemos SLA de 99.9% con arquitectura multi-región, redundancia automática y failover instantáneo. Nuestro stack cloud-native incluye auto-scaling, load balancing inteligente y monitoreo proactivo 24/7. En caso de incidentes, tenemos protocolos de respuesta en menos de 5 minutos con comunicación transparente."
    },
    {
      question: "¿Qué métricas y analytics proporcionan?",
      answer: "Dashboard completo con métricas de negocio y técnicas: tasa de resolución, tiempo promedio de respuesta, satisfacción del usuario (NPS), intent detection accuracy, costos por interacción, y ROI calculado. También incluimos analytics predictivos para optimización continua y alertas proactivas para anomalías."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Preguntas</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              frecuentes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Respuestas técnicas y comerciales sobre implementación, seguridad, integración y ROI
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gradient-subtle rounded-xl border border-border/50 px-6 py-2"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional Support */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/50 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ¿Tienes más preguntas?
              </span>
            </h3>
            <p className="text-muted-foreground mb-6">
              Nuestro equipo técnico está disponible para resolver dudas específicas sobre tu caso de uso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-primary hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
                onClick={() => {
                  const phone = "573001234567";
                  const message = encodeURIComponent("[AI_AVATAR] Tengo preguntas técnicas sobre la implementación de avatares de IA");
                  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                }}
              >
                Preguntas por WhatsApp
              </button>
              <button className="border border-border hover:border-primary/60 py-3 px-6 rounded-xl transition-all duration-300">
                Agendar consulta técnica
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};