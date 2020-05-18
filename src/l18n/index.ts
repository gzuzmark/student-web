import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './es';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
	es,
};

i18n.use(initReactI18next).init({
	resources,
	lng: 'es',
	keySeparator: false,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
