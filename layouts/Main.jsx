import i18n from 'i18next';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import LanguageContext, {
	storeLanguageInLocalStorage,
} from '../contexts/language-context';
import Footer from './footer/Footer';

import Header from './header/Header';

const Main = ({ language, children }) => {
	// const { language, setLanguage } = useContext(LanguageContext);
	// const { language, setLanguage } = useState('en');
	// console.log('🚀 ~ Main ~ language', language);
	// const [cookie, setCookie] = useCookies(['NEXT_LOCALE']);
	// const router = useRouter();
	// const { locale } = router;
	// console.log('🚀 ~ Main ~ locale', locale);

	const changeLanguage = (lng) => {
		console.log('🚀 ~ changeLanguage ~ e', lng);
		// const languageValue = e.target.value;
		// i18n.changeLanguage(languageValue);
		// setLanguage(lng);
		i18n.changeLanguage(lng);
	};

	return (
		<Fragment>
			<Header
				language={language}
				handleSetLanguage={changeLanguage}
				// handleSetLanguage={(language) => {
				// 	setLanguage(language);
				// 	storeLanguageInLocalStorage(language);
				// }}
			></Header>
			{children}
			<Footer language={language}></Footer>
		</Fragment>
	);
};

export default Main;
