import type { Theme } from '../../shared/lib/redux/slices/settingSlices'
import i18n from '../../shared/lib/i18n/config'
import type { RootState } from '../../shared/lib/redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

 export const ThemeManager = () => {
  const theme = useSelector((state: RootState) => state.settings.theme) as Theme;

  useEffect(() => {
    const root = document.documentElement;
    const apply = (t: Theme) => {
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = t === 'dark' ? true : t === 'light' ? false : prefersDark;
      if (isDark) root.classList.add('dark');
      else root.classList.remove('dark');
    };

    apply(theme);

    const mql = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const handler = () => {
      if (theme === 'system') apply(theme);
    };

    if (mql) {
      if (mql.addEventListener) mql.addEventListener('change', handler);
      else mql.addListener(handler as any);
    }

    return () => {
      if (mql) {
        if (mql.removeEventListener) mql.removeEventListener('change', handler);
        else mql.removeListener(handler as any);
      }
    };
  }, [theme]);

  return null;
};

export const LanguageSync = () => {
  const language = useSelector((state: RootState) => state.settings.language);
  
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
  
  return null;
};