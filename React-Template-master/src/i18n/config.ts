import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import enTranslation from './en/translation.json';

i18n.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: { translation: enTranslation }
    }
});

// Function to change lanugage
export const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
};
