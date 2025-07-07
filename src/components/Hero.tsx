import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { LeadForm } from "./LeadForm";

interface HeroProps {
  onOpenModal: () => void;
}

export const Hero = ({ onOpenModal }: HeroProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-primary rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center max-w-6xl">
        <div className="space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Mati AI
              </span>
              <br />
              <span className="text-foreground">
                habla por ti
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Agenda las reuniones que hoy se te escapan
            </p>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Agente de voz 24/7 que responde en &lt;1s, transfiere en vivo y convierte llamadas en citas automáticamente
            </p>
          </div>

          {/* VSL Section */}
          <div className="relative max-w-4xl mx-auto">
            {!isVideoPlaying ? (
              <div 
                className="relative bg-gradient-subtle rounded-2xl p-8 cursor-pointer group hover:scale-105 transition-all duration-300 shadow-glow-primary"
                onClick={() => setIsVideoPlaying(true)}
              >
                <div className="aspect-video bg-secondary/50 rounded-xl flex items-center justify-center border border-border/50">
                  <div className="text-center space-y-4">
                    <PlayCircle className="w-16 h-16 text-primary mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-lg font-medium">Ver Mati AI en acción</p>
                    <p className="text-sm text-muted-foreground">Descubre cómo transformamos tus llamadas en reuniones • 3 min</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">VSL Player - Integración pendiente</p>
              </div>
            )}
          </div>

          {/* Lead Form - Always visible below VSL */}
          <div className="mt-12 max-w-2xl mx-auto">
            <LeadForm />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl"
              onClick={onOpenModal}
              className="w-full sm:w-auto"
            >
              Probar Mati AI →
            </Button>
            
            <Button 
              variant="outline" 
              size="xl"
              className="w-full sm:w-auto"
            >
              Agendar Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Empresas que ya confían en Mati AI
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-24 h-12 bg-muted/20 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};