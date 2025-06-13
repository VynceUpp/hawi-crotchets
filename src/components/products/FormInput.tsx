
import { CheckCircle, AlertCircle } from 'lucide-react';

// Form Input Component
interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  [key: string]: any;
}

export const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = '',
  ...props 
}: FormInputProps) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${className}`}
      {...props}
    />
  </div>
);

// Form Textarea Component
interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
  className?: string;
}

export const FormTextarea = ({ 
  label, 
  name, 
  placeholder, 
  value, 
  onChange, 
  rows = 3,
  required = false,
  className = '' 
}: FormTextareaProps) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-vertical ${className}`}
    />
  </div>
);

// Form Checkbox Component
interface FormCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description?: string;
}

export const FormCheckbox = ({ label, name, checked, onChange, description }: FormCheckboxProps) => (
  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
    <input
      id={name}
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-900 cursor-pointer">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  </div>
);

// Section Card Component
interface SectionCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const SectionCard = ({ title, icon: Icon, children, className = '' }: SectionCardProps) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
    <div className="flex items-center space-x-3 p-6 border-b border-gray-100">
      <div className="p-2 bg-indigo-100 rounded-lg">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    </div>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

// Alert Message Component
interface AlertMessageProps {
  type: 'success' | 'error';
  message: string;
}

export const AlertMessage = ({ type, message }: AlertMessageProps) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };
  
  const Icon = type === 'success' ? CheckCircle : AlertCircle;
  
  return (
    <div className={`flex items-center space-x-3 p-4 border rounded-lg ${styles[type]}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};