import { useState } from "react";
import { useForm } from '@tanstack/react-form';
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CustomPhoneInput } from "@/components/ui/custom-phone-input";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const leadModalSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Por favor ingresa un email válido"),
  phone: z.string().min(10, "El número de teléfono debe tener al menos 10 caracteres"),
});

type LeadModalData = z.infer<typeof leadModalSchema>;

const steps = [
  {
    id: 'name',
    title: '¿Cuál es tu nombre?',
    subtitle: 'Empecemos con tu nombre completo',
    field: 'name' as keyof LeadModalData,
    placeholder: 'Tu nombre',
    type: 'text'
  },
  {
    id: 'email',
    title: '¿Cuál es tu email?',
    subtitle: 'Usaremos este email para enviarte información',
    field: 'email' as keyof LeadModalData,
    placeholder: 'tu@empresa.com',
    type: 'email'
  },
  {
    id: 'phone',
    title: '¿Cuál es tu número de teléfono?',
    subtitle: 'Te contactaremos para agendar tu demo',
    field: 'phone' as keyof LeadModalData,
    placeholder: 'Tu número de teléfono',
    type: 'phone'
  }
];

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadModal = ({ isOpen, onClose }: LeadModalProps) => {
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
        console.log('Enviando datos modal:', value);
        
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

        console.log('Response status modal:', response.status);
        
        const result = await response.json();
        console.log('Response data modal:', result);
        
        if (response.ok && result.success) {
          setIsCompleted(true);
          toast.success('¡Perfecto! Te contactaremos pronto para tu prueba gratuita.');
          setTimeout(() => {
            onClose();
            setCurrentStep(0);
            setIsCompleted(false);
            form.reset();
          }, 3000);
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
    const fieldSchema = leadModalSchema.shape[currentStepData.field];
    
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

  const handleClose = () => {
    onClose();
    setCurrentStep(0);
    setIsCompleted(false);
    form.reset();
  };

  if (isCompleted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-background border-border">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
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
          </motion.div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-background border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
              Prueba AI Avatar Interactivo Gratis
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            Configura tu agente de voz en menos de 24 horas
          </p>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="mb-6">
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
              className="space-y-4"
            >
              {/* Question */}
              <div className="text-center space-y-2">
                <h4 className="text-lg font-bold text-foreground">
                  {currentStepData.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {currentStepData.subtitle}
                </p>
              </div>

              {/* Input Field */}
              <div className="space-y-3">
                <form.Field
                  name={currentStepData.field}
                  validators={{
                    onChange: ({ value }) => {
                      try {
                        leadModalSchema.shape[currentStepData.field].parse(value);
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
                          className="bg-secondary/50 border-border focus:border-primary"
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
              <div className="flex justify-between items-center pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : isLastStep ? (
                    "Enviar"
                  ) : (
                    <>
                      Siguiente
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-xs text-muted-foreground">
          Presiona <kbd className="px-2 py-1 bg-muted/30 rounded">Enter</kbd> para continuar
        </div>
      </DialogContent>
    </Dialog>
  );
};