import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface LeadFormProps {
  className?: string;
}

export const LeadForm = ({ className = "" }: LeadFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call serverless function instead of direct API
      const response = await fetch('/api/create-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Contact created successfully:', result.contactId);
        toast.success('¡Perfecto! Te contactaremos pronto para tu prueba gratuita.');
        setFormData({ name: "", email: "", phone: "" });
      } else {
        console.error('API Error:', result);
        toast.error(result.error || 'Error al crear el contacto. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/50 shadow-glow-primary">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Prueba Mati AI Gratis
            </span>
          </h3>
          <p className="text-muted-foreground text-lg">
            Agenda tu demostración personalizada y descubre cómo Mati AI puede transformar tu negocio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Nombre completo
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email corporativo
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@empresa.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-foreground font-medium">
              Número de teléfono
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="300 123 4567"
              value={formData.phone}
              onChange={handleChange}
              required
              className="bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-primary hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              "Probar Ahora →"
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Al enviar este formulario, aceptas que te contactemos para programar tu demostración gratuita.
          </p>
        </form>
      </div>
    </div>
  );
};