import React, { Children, Fragment } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';

const Main = ({ language, handleSetLanguage, children }) => {
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
