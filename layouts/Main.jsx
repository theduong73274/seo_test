import React, { Fragment } from 'react';
import Footer from './footer/Footer';

import Header from './header/Header';

const Main = ({ language, children }) => {
	const changeLanguage = (lng) => {
		console.log('🚀 ~ changeLanguage ~ lng', lng);
	};

	return (
		<Fragment>
			<Header
				language={language}
				// handleSetLanguage={changeLanguage}
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
