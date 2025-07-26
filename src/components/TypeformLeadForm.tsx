import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneField } from "@/components/ui/phone-field";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const leadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

const steps = [
  {
    id: 'name',
    title: 'What\'s your name?',
    subtitle: 'Let\'s start with your full name',
    field: 'name' as keyof LeadFormData,
    placeholder: 'Enter your full name',
    type: 'text'
  },
  {
    id: 'email',
    title: 'What\'s your email?',
    subtitle: 'We\'ll use this to send you updates',
    field: 'email' as keyof LeadFormData,
    placeholder: 'Enter your email address',
    type: 'email'
  },
  {
    id: 'phone',
    title: 'What\'s your phone number?',
    subtitle: 'We\'ll use this to contact you',
    field: 'phone' as keyof LeadFormData,
    placeholder: 'Enter your phone number',
    type: 'phone'
  }
];

interface TypeformLeadFormProps {
  onSubmit?: (data: LeadFormData) => void;
}

export default function TypeformLeadForm({ onSubmit }: TypeformLeadFormProps) {
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
        const response = await fetch('/api/create-contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }

        const result = await response.json();
        
        if (result.success) {
          setIsCompleted(true);
          toast.success('Thank you! Your information has been submitted successfully.');
          onSubmit?.(value);
        } else {
          throw new Error(result.message || 'Failed to submit form');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        toast.error('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    validatorAdapter: zodValidator(),
  });

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = async () => {
    const field = form.getFieldInfo(currentStepData.field);
    
    // Validate current field
    const fieldValue = field.getValue();
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
        className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center p-4"
      >
        <div className="max-w-md w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Thank you!</h2>
          <p className="text-muted-foreground text-lg">
            Your information has been submitted successfully. We'll be in touch soon!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
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
              className="space-y-8"
            >
              {/* Question */}
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-foreground">
                  {currentStepData.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {currentStepData.subtitle}
                </p>
              </div>

              {/* Input Field */}
              <div className="space-y-4">
                <form.Field
                  name={currentStepData.field}
                  validators={{
                    onChange: leadFormSchema.shape[currentStepData.field],
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name} className="text-base font-medium">
                        {currentStepData.title}
                      </Label>
                      
                      {currentStepData.type === 'phone' ? (
                        <PhoneField
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(value) => field.handleChange(value || '')}
                          onBlur={field.handleBlur}
                          placeholder={currentStepData.placeholder}
                          className="w-full h-14 text-lg"
                          autoFocus={false}
                          onKeyPress={handleKeyPress}
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
                          className="w-full h-14 text-lg"
                          autoFocus={false}
                          onKeyPress={handleKeyPress}
                        />
                      )}
                      
                      {field.state.meta.errors && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-8">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : isLastStep ? (
                    "Submit"
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </form>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> to continue
        </div>
      </div>
    </div>
  );
}