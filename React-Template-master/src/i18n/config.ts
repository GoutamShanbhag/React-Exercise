import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import en_translation from './en/translation.json';
import fn_translation from './fr/translation.json';

i18n.use(initReactI18next).init({
    lng: 'en',
    resources: {
        en: { translation: en_translation },
        fr: { translation: fn_translation }
    }
});

// Function to change lanugage
export const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language);
};
