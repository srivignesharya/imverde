'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  magnetic?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      magnetic = true,
      disabled,
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const prefersReducedMotion = useReducedMotion();

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || prefersReducedMotion || disabled || isLoading) return;
      const target = buttonRef.current;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Limit magnetic pull distance to 8px max
      const distanceX = (e.clientX - centerX) * 0.22;
      const distanceY = (e.clientY - centerY) * 0.22;

      setPosition({ x: distanceX, y: distanceY });
      if (onMouseMove) onMouseMove(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPosition({ x: 0, y: 0 });
      if (onMouseLeave) onMouseLeave(e);
    };

    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active shadow-sm shadow-primary/20',
      secondary:
        'bg-surface text-foreground border border-surface-border hover:bg-surface-hover active:bg-surface-active',
      outline:
        'border border-primary/20 text-foreground hover:border-primary/50 hover:bg-primary-muted',
      ghost:
        'text-foreground hover:bg-primary-muted active:bg-primary-muted/80',
      danger:
        'bg-accent-danger text-white hover:bg-red-700 active:bg-red-800',
    };

    const sizeStyles = {
      sm: 'h-9 px-4 text-xs tracking-wide rounded-full',
      md: 'h-12 px-6 text-sm font-medium tracking-tight rounded-full',
      lg: 'h-14 px-8 text-base font-medium tracking-tight rounded-full',
    };

    return (
      <motion.button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        disabled={disabled || isLoading}
        animate={prefersReducedMotion ? undefined : { x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          'relative inline-flex items-center justify-center font-body select-none transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...(props as any)}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-current" />
            <span className="opacity-90">{children}</span>
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

