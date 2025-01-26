import i18n, { LanguageDetectorModule, init, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import cnTranslations from './locales/cn.json';
import hiTranslations from './locales/hi.json';
import tlTranslations from './locales/tl.json';
import frTranslations from './locales/fr.json';
import { PreferencesStore } from '../store';

const languages: Resource = {
  en: { translation: enTranslations },
  cn: { translation: cnTranslations },
  hi: { translation: hiTranslations },
  tl: { translation: tlTranslations },
  fr: { translation: frTranslations }
};


const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => {
    const lang = PreferencesStore.preferences.language;
    return lang;
  },
};

i18n
.use(languageDetector)
.use(initReactI18next)
init({
  fallbackLng: 'en',
  resources: languages,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
