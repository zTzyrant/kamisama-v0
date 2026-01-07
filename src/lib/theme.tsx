import { createSignal, createEffect } from 'solid-js';

export type Theme = 'dark' | 'light' | 'rebel';

const getStoredTheme = (): Theme | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') as Theme;
  }
  return null;
};

const [theme, setTheme] = createSignal<Theme>((getStoredTheme() as Theme) || 'dark');

export const currentTheme = theme;

export const cycleTheme = () => {
  const themes: Theme[] = ['dark', 'light', 'rebel'];
  const nextIndex = (themes.indexOf(theme()) + 1) % themes.length;
  setTheme(themes[nextIndex]);
};

export const initTheme = () => {
  // Can be used to force re-sync if needed, but signal init handles the main case.
  const saved = getStoredTheme();
  if (saved && ['dark', 'light', 'rebel'].includes(saved)) {
    setTheme(saved);
  }
};

createEffect(() => {
  if (typeof window !== 'undefined') {
    const t = theme();
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);

    // Also handle tailwind 'dark' class for backward compatibility if needed
    if (t === 'dark' || t === 'rebel') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
});
