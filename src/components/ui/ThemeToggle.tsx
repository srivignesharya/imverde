'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from './Button';

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check local storage or prefers-color-scheme
    const stored = localStorage.getItem('imverde-theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('imverde-theme', nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      magnetic={false}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={className}
    >
      {theme === 'light' ? (
        <span className="flex items-center gap-1.5">
          <Moon className="w-3.5 h-3.5 text-sage" />
          <span className="text-xs">Dark</span>
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amber" />
          <span className="text-xs">Light</span>
        </span>
      )}
    </Button>
  );
}

