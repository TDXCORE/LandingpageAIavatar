import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomPhoneInput } from "@/components/ui/custom-phone-input";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const leadFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  phone: z.string().min(10, "El número de teléfono debe tener al menos 10 caracteres"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const steps = [
  {
    id: 'name',
    title: '¿Cuál es tu nombre?',
    subtitle: 'Empecemos con tu nombre completo',
    field: 'name' as keyof LeadFormData,
    placeholder: 'Tu nombre',
    type: 'text'
  },
  {
    id: 'email',
    title: '¿Cuál es tu email?',
    subtitle: 'Usaremos este email para enviarte información',
    field: 'email' as keyof LeadFormData,
    placeholder: 'tu@empresa.com',
    type: 'email'
  },
  {
    id: 'phone',
    title: '¿Cuál es tu número de teléfono?',
    subtitle: 'Te contactaremos para agendar tu demo',
    field: 'phone' as keyof LeadFormData,
    placeholder: 'Tu número de teléfono',
    type: 'phone'
  }
];

interface EmbeddedTypeformLeadFormProps {
  onSubmit?: (data: LeadFormData) => void;
  className?: string;
}

export default function EmbeddedTypeformLeadForm({ onSubmit, className = "" }: EmbeddedTypeformLeadFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '+57'
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        console.log('Enviando datos:', value);
        
        const response = await fetch('/api/create-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: value.name,
            email: value.email,
            phone: value.phone,
          }),
        });

        console.log('Response status:', response.status);
        
        const result = await response.json();
        console.log('Response data:', result);
        
        if (response.ok && result.success) {
          setIsCompleted(true);
          toast.success('¡Perfecto! Te contactaremos pronto para tu prueba gratuita.');
          onSubmit?.(value);
        } else {
          throw new Error(result.error || result.message || 'Failed to submit form');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error(`Error: ${error.message || 'Error al enviar el formulario. Intenta nuevamente.'}`);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = async () => {
    // Get current field value
    const fieldValue = form.getFieldValue(currentStepData.field);
    const fieldSchema = leadFormSchema.shape[currentStepData.field];
    
    try {
      fieldSchema.parse(fieldValue);
      
      if (isLastStep) {
        form.handleSubmit();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSubmitting) {
      e.preventDefault();
      handleNext();
    }
  };

  if (isCompleted) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-subtle rounded-2xl p-8 border border-border/50 shadow-glow-primary ${className}`}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ¡Gracias!
            </span>
          </h3>
          <p className="text-muted-foreground">
            Tu información ha sido enviada exitosamente. Te contactaremos pronto para agendar tu demo gratuita.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className={`bg-gradient-subtle rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-border/50 shadow-glow-primary ${className}`}>
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Prueba AI Avatar Interactivo Gratis
          </span>
        </h3>
        <p className="text-muted-foreground text-base sm:text-lg px-2">
          Agenda tu demostración personalizada y descubre cómo AI Avatar Interactivo puede transformar tu negocio
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Paso {currentStep + 1} de {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2">
          <motion.div
            className="bg-gradient-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Question */}
            <div className="text-center space-y-2 px-2">
              <h4 className="text-xl sm:text-2xl font-bold text-foreground">
                {currentStepData.title}
              </h4>
              <p className="text-sm sm:text-base text-muted-foreground">
                {currentStepData.subtitle}
              </p>
            </div>

            {/* Input Field */}
            <div className="space-y-3 sm:space-y-4">
              <form.Field
                name={currentStepData.field}
                validators={{
                  onChange: ({ value }) => {
                    try {
                      leadFormSchema.shape[currentStepData.field].parse(value);
                      return undefined;
                    } catch (error) {
                      if (error instanceof z.ZodError) {
                        return error.errors[0].message;
                      }
                      return 'Invalid value';
                    }
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    
                    {currentStepData.type === 'phone' ? (
                      <CustomPhoneInput
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(value) => field.handleChange(value)}
                        onBlur={field.handleBlur}
                        placeholder={currentStepData.placeholder}
                        className="w-full"
                        autoFocus={false}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleKeyPress(e);
                          }
                        }}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={currentStepData.type}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder={currentStepData.placeholder}
                        className="bg-input border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-all h-11 sm:h-12 text-base"
                        autoFocus={false}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleKeyPress(e);
                          }
                        }}
                      />
                    )}
                    
                    {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-red-500">
                        {String(field.state.meta.errors[0])}
                      </p>
                    )}
                  </div>
                )}
              </form.Field>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Anterior
              </Button>

              <Button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-1 sm:gap-2 bg-gradient-primary hover:opacity-90 text-white font-bold py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 text-sm sm:text-base min-w-[100px] justify-center"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : isLastStep ? (
                  "Enviar"
                ) : (
                  <>
                    Siguiente
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </form>

      {/* Footer */}
      <div className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-muted-foreground px-2">
        <span className="hidden sm:inline">Presiona <kbd className="px-2 py-1 bg-muted/30 rounded">Enter</kbd> para continuar</span>
        <span className="sm:hidden">Presiona Enter para continuar</span>
      </div>
    </div>
  );
}