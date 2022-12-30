import React from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';

export default function Layout({ language, handleSetLanguage, children }) {
	return (
		<>
			<Header></Header>
			{children}
			<Footer language={language}></Footer>
		</>
	);
}
