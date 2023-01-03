import React, { Fragment, useContext } from 'react';
import LanguageContext from '../contexts/language-context';
import Footer from './footer/Footer';

import Header from './header/Header';

const Main = ({ handleSetLanguage, children }) => {
	const { language, setLanguage } = useContext(LanguageContext);

	return (
		<Fragment>
			<Header
				language={language}
				handleSetLanguage={handleSetLanguage}
			></Header>
			{children}
			<Footer language={language}></Footer>
		</Fragment>
	);
};

export default Main;
