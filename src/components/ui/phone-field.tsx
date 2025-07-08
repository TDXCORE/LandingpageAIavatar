import { Label } from "@/components/ui/label";
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import type { Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../phone-input.css';

interface PhoneFieldProps {
  field: any;
  label: string;
  placeholder?: string;
  description?: string;
  defaultCountry?: string;
  className?: string;
}

export const PhoneField = ({
  field,
  label,
  placeholder = "Ingresa tu número de teléfono",
  description,
  defaultCountry = "CO",
  className = ""
}: PhoneFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={field.name} className="text-foreground font-medium">
        {label}
      </Label>
      <PhoneInput
        id={field.name}
        value={field.state.value as Value}
        onChange={field.handleChange}
        defaultCountry={defaultCountry}
        placeholder={placeholder}
        className="react-phone-number-input"
        international={true}
        withCountryCallingCode={true}
        displayInitialValueAsLocalNumber={false}
        addInternationalOption={false}
        style={{
          '--PhoneInputCountryFlag-height': '1.2em',
          '--PhoneInputCountrySelectArrow-color': '#6b7280',
          '--PhoneInput-color--focus': '#0ea5e9',
        } as React.CSSProperties}
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {field.state.meta.errors && field.state.meta.errors.length > 0 && (
        <p className="text-sm text-red-500">{field.state.meta.errors[0]}</p>
      )}
    </div>
  );
};