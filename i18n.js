import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// import English from './public/lang/en/home.json';
// import Vietnamese from './public/lang/vi/home.json';
import HttpApi from 'i18next-http-backend';

// const resources = {
// 	en: {
// 		translation: English,
// 	},
// 	vn: {
// 		translation: Vietnamese,
// 	},
// };

i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(HttpApi)
	.init({
		// resources,
		supportedLngs: ['en', 'vn', 'cn'],
		fallbackLng: 'en',
		// lng: 'en',
		detection: {
			order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
			caches: ['cookie'],
		},
		backend: {
			loadPath: './lang/{{lng}}/translation.json',
		},
		// keySeparator: false,
		// interpolation: {
		// 	escapeValue: false,
		// },
	});

export default i18n;
