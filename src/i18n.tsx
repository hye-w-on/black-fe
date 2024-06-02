import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './locales/common.json';

export enum languageCode {
  KO = 'ko',
  EN = 'en',
}

i18n.use(initReactI18next).init({
  resources: { ...translation },
  fallbackLng: languageCode.KO,
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
