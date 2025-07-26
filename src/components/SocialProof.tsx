import { motion } from "framer-motion";

export const SocialProof = () => {
  const clients = [
    { name: "TechCorp", logo: "/placeholder.svg" },
    { name: "InnovateSoft", logo: "/placeholder.svg" },
    { name: "DataDriven", logo: "/placeholder.svg" },
    { name: "CloudFirst", logo: "/placeholder.svg" },
    { name: "AIVentures", logo: "/placeholder.svg" },
    { name: "ScaleUp", logo: "/placeholder.svg" }
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-muted-foreground mb-8">
            Empresas que ya confían en TDX AI Avatar
          </p>
        </div>
        
        <div className="overflow-hidden">
          <motion.div 
            className="flex items-center justify-center gap-12 lg:gap-16"
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {clients.map((client, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-32 h-16 bg-muted/20 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {client.name}
                </span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div 
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-32 h-16 bg-muted/20 rounded-lg flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {client.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              &lt;800ms
            </div>
            <p className="text-sm text-muted-foreground">Latencia promedio</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              72h
            </div>
            <p className="text-sm text-muted-foreground">Demo funcional</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              15 días
            </div>
            <p className="text-sm text-muted-foreground">MVP completo</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <p className="text-sm text-muted-foreground">Disponibilidad</p>
          </div>
        </div>
      </div>
    </section>
  );
};