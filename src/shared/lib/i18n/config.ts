import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruTranslations from '../../locales/ru.json';
import enTranslations from '../../locales/en.json';

const getLanguageFromStorage = (): 'ru' | 'en' => {
  try {
    const stored = localStorage.getItem('language');
    if (stored === 'ru' || stored === 'en') {
      return stored;
    }
  } catch (e) {
    // ignore
  }
  return 'ru';
};

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ruTranslations },
    en: { translation: enTranslations },
  },
  lng: getLanguageFromStorage(),
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
