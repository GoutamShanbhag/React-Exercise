import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enTranslation from './en/translation.json';
import fnTranslation from './fr/translation.json';

i18n.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: { translation: enTranslation },
        fr: { translation: fnTranslation }
    }
});

export type SupportedLanguage = 'en' | 'fr';

// Function to change language
export const changeLanguage = (language: SupportedLanguage): void => {
    i18n.changeLanguage(language);
};
