import React from 'react';

interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'warning';
}

export const Alert: React.FC<AlertProps> = ({ 
  title, 
  children, 
  variant = 'default' 
}) => {
  const baseStyles = "rounded-lg p-4 mb-4";
  const variantStyles = {
    default: "bg-blue-50 text-blue-800",
    warning: "bg-yellow-50 text-yellow-800"
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]}`}>
      {title && (
        <h3 className="font-medium mb-2">{title}</h3>
      )}
      <div className="text-sm">{children}</div>
    </div>
  );
};

export const AlertTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-medium mb-2">{children}</h3>
);

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="text-sm">{children}</div>
);