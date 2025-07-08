import { z } from 'zod';

// Esquema de validación para el formulario de leads
export const leadFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  phone: z.string().min(10, 'Por favor ingresa un número de teléfono válido')
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Esquema para el modal (campos con nombres diferentes)
export const leadModalSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Por favor ingresa un email válido'),
  telefono: z.string().min(10, 'Por favor ingresa un número de teléfono válido')
});

export type LeadModalData = z.infer<typeof leadModalSchema>;