import { createContext, useState } from 'react';
import detectBrowserLanguage from 'detect-browser-language';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const languageDefault = process.browser ? detectBrowserLanguage() : null;
	console.log('🚀 ~ LanguageProvider ~ languageDefault', languageDefault);
	const listLanguage = ['zh-TW', 'zh-CN'];
	const isLanguageCN = listLanguage.includes(languageDefault);

	let languageStoredInLocalStorage = process.browser
		? localStorage.getItem('language')
		: null;

	const [language, setLanguage] = useState(
		languageStoredInLocalStorage
			? languageStoredInLocalStorage
			: isLanguageCN
			? 'cn'
			: languageDefault == 'vi'
			? 'vn'
			: 'en'
	);
	console.log('🚀 ~ LanguageProvider ~ language', language);

	// const [language, setLanguage] = useState(
	// 	localStorage.getItem('language') || 'en'
	// );

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export default LanguageContext;
