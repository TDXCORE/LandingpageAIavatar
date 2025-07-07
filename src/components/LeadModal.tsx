import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "", 
    telefono: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Integrate with Chatwoot API
      console.log("Lead data:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Close modal on success
      onClose();
      setFormData({ nombre: "", email: "", telefono: "" });
      
      // Show success message (could be a toast)
      alert("¡Gracias! Nos pondremos en contacto contigo pronto para configurar tu demo de Mati AI.");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un error. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Prueba Mati AI Gratis
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Configura tu agente de voz en menos de 24 horas
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre completo</Label>
            <Input
              id="nombre"
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              className="bg-secondary/50 border-border focus:border-primary"
              placeholder="Tu nombre"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email empresarial</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="bg-secondary/50 border-border focus:border-primary"
              placeholder="tu@empresa.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              type="tel"
              required
              value={formData.telefono}
              onChange={(e) => handleInputChange("telefono", e.target.value)}
              className="bg-secondary/50 border-border focus:border-primary"
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? "Configurando..." : "Empezar Prueba Gratis"}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Sin compromiso • Configuración en 24-48h • Soporte incluido
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};