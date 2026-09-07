'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ShopBranding, ThemeMode } from '@archery/types';

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  isDark: true,
  isLight: false,
});

export interface ThemeProviderProps {
  branding?: ShopBranding;
  defaultTheme?: ThemeMode;
  children: React.ReactNode;
}

export function ThemeProvider({ branding, defaultTheme = 'dark', children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  const primary = branding?.primaryColor || '#059669';
  const accent = branding?.accentColor || '#F59E0B';

  const applyTheme = useCallback((mode: ThemeMode) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    root.classList.add(mode);
    root.setAttribute('data-theme', mode);
    root.style.colorScheme = mode;
  }, []);

  // Initialize theme from localStorage or system preference on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('archerhub_theme') as ThemeMode | null;
      if (saved === 'light' || saved === 'dark') {
        setThemeState(saved);
        applyTheme(saved);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initial = prefersDark ? 'dark' : 'light';
        setThemeState(initial);
        applyTheme(initial);
      }
    } catch {
      applyTheme(defaultTheme);
    }
  }, [applyTheme, defaultTheme]);

  // Apply branding variables
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.style.setProperty('--brand-primary', primary);
      root.style.setProperty('--brand-accent', accent);
    }
  }, [primary, accent]);

  // Listen for storage events across tabs or components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'archerhub_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
        applyTheme(e.newValue);
      }
    };

    const handleCustomChange = (e: CustomEvent<ThemeMode>) => {
      if (e.detail === 'light' || e.detail === 'dark') {
        setThemeState(e.detail);
        applyTheme(e.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('archerhub_theme_change' as any, handleCustomChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('archerhub_theme_change' as any, handleCustomChange);
    };
  }, [applyTheme]);

  const setTheme = useCallback(
    (newTheme: ThemeMode) => {
      setThemeState(newTheme);
      applyTheme(newTheme);
      try {
        localStorage.setItem('archerhub_theme', newTheme);
        window.dispatchEvent(new CustomEvent('archerhub_theme_change', { detail: newTheme }));
      } catch {
        // LocalStorage disabled or quota exceeded
      }
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === 'dark',
        isLight: theme === 'light',
      }}
    >
      <div
        style={
          {
            '--brand-primary': primary,
            '--brand-accent': accent,
          } as React.CSSProperties
        }
        className="contents"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  return context;
}
