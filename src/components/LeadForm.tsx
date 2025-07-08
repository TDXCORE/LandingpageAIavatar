import { useForm } from '@tanstack/react-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneField } from "@/components/ui/phone-field";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import type { Value } from 'react-phone-number-input';

interface LeadFormProps {
  className?: string;
}

export const LeadForm = ({ className = "" }: LeadFormProps) => {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '+57' as Value,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch('/api/create-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: value.name,
            email: value.email,
            phone: value.phone || '',
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          console.log('Contact created successfully:', result.contactId);
          toast.success('¡Perfecto! Te contactaremos pronto para tu prueba gratuita.');
          form.reset();
        } else {
          console.error('API Error:', result);
          toast.error(result.error || 'Error al crear el contacto. Intenta nuevamente.');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('Error de conexión. Verifica tu internet e intenta nuevamente.');
      }
    },
  });

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

        <form onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'El nombre es requerido';
                  if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Nombre completo
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Tu nombre"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all"
                  />
                  {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'El email es requerido';
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor ingresa un email válido';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email corporativo
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@empresa.com"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all"
                  />
                  {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-red-500">{String(field.state.meta.errors[0])}</p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'El número de teléfono es requerido';
                if (typeof value === 'string' && value.length < 10) return 'Por favor ingresa un número válido';
                return undefined;
              }
            }}
          >
            {(field) => (
              <PhoneField
                field={field}
                label="Número de teléfono"
                placeholder="Ingresa tu número de teléfono"
                description="Selecciona tu país y escribe tu número completo"
                defaultCountry="CO"
              />
            )}
          </form.Field>

          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
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
            )}
          </form.Subscribe>

          <p className="text-center text-sm text-muted-foreground">
            Al enviar este formulario, aceptas que te contactemos para programar tu demostración gratuita.
          </p>
        </form>
      </div>
    </div>
  );
};