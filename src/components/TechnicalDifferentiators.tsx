import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  Network, 
  BarChart3, 
  Globe, 
  Cpu,
  Lock,
  Workflow
} from "lucide-react";

export const TechnicalDifferentiators = () => {
  const differentiators = [
    {
      icon: Zap,
      title: "Latencia Sub-segundo",
      description: "Respuesta en tiempo real con interrupciones naturales y barge-in inteligente",
      technical: "< 800ms extremo a extremo",
      badge: "Performance",
      color: "text-yellow-500",
      features: [
        "WebRTC optimizado",
        "Edge computing",
        "Compresión adaptiva",
        "Predicción de intent"
      ]
    },
    {
      icon: Shield,
      title: "Seguridad Enterprise",
      description: "Cifrado end-to-end, control de acceso granular y auditoría completa",
      technical: "SOC2, ISO 27001, GDPR",
      badge: "Seguridad",
      color: "text-green-500",
      features: [
        "Cifrado AES-256",
        "Zero-trust architecture",
        "Logs inmutables",
        "PII masking"
      ]
    },
    {
      icon: Network,
      title: "Orquestación Multiagente",
      description: "Handoff inteligente entre agentes de IA y escalado automático a humanos",
      technical: "Event-driven architecture",
      badge: "Arquitectura",
      color: "text-blue-500",
      features: [
        "Context switching",
        "Load balancing",
        "Failover automático",
        "Session persistence"
      ]
    },
    {
      icon: BarChart3,
      title: "Observabilidad 360°",
      description: "Métricas en tiempo real de intención, éxito, costos y performance",
      technical: "OpenTelemetry compliant",
      badge: "Monitoreo",
      color: "text-purple-500",
      features: [
        "Real-time dashboards",
        "Custom alerts",
        "Business metrics",
        "Cost optimization"
      ]
    },
    {
      icon: Globe,
      title: "Integraciones Sin Límites",
      description: "APIs REST/GraphQL, webhooks, microservicios y conectores pre-built",
      technical: "200+ integraciones",
      badge: "Conectividad",
      color: "text-cyan-500",
      features: [
        "CRM/ERP connectors",
        "Webhook endpoints",
        "Custom APIs",
        "SDK disponible"
      ]
    },
    {
      icon: Cpu,
      title: "IA Multimodal",
      description: "Procesamiento simultáneo de voz, texto, imagen y video con contexto unificado",
      technical: "LLM + Computer Vision",
      badge: "AI/ML",
      color: "text-orange-500",
      features: [
        "NLP avanzado",
        "Speech synthesis",
        "Image recognition",
        "Sentiment analysis"
      ]
    },
    {
      icon: Lock,
      title: "Compliance Automático",
      description: "Cumplimiento automático de normativas financieras, salud y telecomunicaciones",
      technical: "Multi-industry ready",
      badge: "Regulatorio",
      color: "text-red-500",
      features: [
        "HIPAA compliant",
        "PCI DSS",
        "LOPD/GDPR",
        "Audit trails"
      ]
    },
    {
      icon: Workflow,
      title: "Microservicios Escalables",
      description: "Arquitectura cloud-native con auto-scaling y deployment zero-downtime",
      technical: "Kubernetes native",
      badge: "DevOps",
      color: "text-indigo-500",
      features: [
        "Container orchestration",
        "Blue-green deployment",
        "Auto-scaling",
        "Multi-cloud ready"
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Diferenciadores
            </span>{" "}
            <span className="text-foreground">técnicos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Arquitectura enterprise diseñada para las demandas más exigentes de latencia, seguridad y escala
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((diff, index) => {
            const IconComponent = diff.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-glow-primary transition-all duration-300 hover:scale-105 bg-gradient-subtle border-border/50 h-full"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-secondary/50 ${diff.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {diff.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                    {diff.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                    {diff.description}
                  </CardDescription>
                  
                  <div className="bg-secondary/30 rounded-lg p-3">
                    <p className="text-xs font-semibold text-primary mb-2">
                      🔧 {diff.technical}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {diff.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gradient-primary rounded-full" />
                        <span className="text-xs text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Technical Specs Section */}
        <div className="mt-16 bg-gradient-subtle rounded-2xl p-8 border border-border/50">
          <h3 className="text-2xl font-bold text-center mb-8">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Especificaciones técnicas
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-4">Performance</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Latencia: &lt; 800ms P99</p>
                <p>• Throughput: 10K+ concurrent</p>
                <p>• Uptime: 99.9% SLA</p>
                <p>• Response time: &lt; 100ms API</p>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-4">Escalabilidad</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Auto-scaling horizontal</p>
                <p>• Multi-region deployment</p>
                <p>• Load balancing inteligente</p>
                <p>• CDN global optimizado</p>
              </div>
            </div>
            
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-4">Integración</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• REST/GraphQL APIs</p>
                <p>• WebSocket real-time</p>
                <p>• Webhooks bidireccionales</p>
                <p>• SDK multi-lenguaje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};