import { createContext } from 'react';

export interface ThemeContext {
  themes: string[];
  forcedTheme?: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme?: string | undefined;
  systemTheme?: 'dark' | 'light' | undefined;
}

export const ThemeContext = createContext<ThemeContext | null>(null);
