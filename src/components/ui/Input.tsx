'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, leadingIcon, trailingIcon, disabled, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full flex flex-col space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs uppercase tracking-wider font-semibold text-muted-fg pl-1 select-none"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leadingIcon && (
            <div className="absolute left-4 flex items-center pointer-events-none text-muted-fg">
              {leadingIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={cn(
              'w-full h-12 bg-surface border border-surface-border rounded-2xl px-4 text-sm text-foreground placeholder:text-muted-fg/60 outline-none transition-all duration-200',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              leadingIcon && 'pl-11',
              trailingIcon && 'pr-11',
              error && 'border-accent-danger focus:border-accent-danger focus:ring-accent-danger/20',
              disabled && 'opacity-50 cursor-not-allowed bg-muted/30',
              className
            )}
            {...props}
          />

          {trailingIcon && (
            <div className="absolute right-4 flex items-center pointer-events-none text-muted-fg">
              {trailingIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="flex items-center gap-1.5 text-xs text-accent-danger pl-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-muted-fg pl-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

