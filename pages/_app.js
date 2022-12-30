import detectBrowserLanguage from 'detect-browser-language';
import { useState } from 'react';
import { Provider } from 'react-redux';
import Layout from '../layouts/Layout';
import Main from '../layouts/Main';
import store from '../redux';

import 'swiper/css/grid';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import '../styles/globals.scss';
import Head from 'next/head';

import icon from '../public/icon.svg';

export default function App({ Component, pageProps }) {
	const languageDefault = process.browser ? detectBrowserLanguage() : null;
	const listLanguage = ['zh-TW', 'zh-CN'];
	const isLanguageCN = listLanguage.includes(languageDefault);

	let languageStoredInLocalStorage = process.browser
		? localStorage.getItem('language')
		: null;

	let [language, setLanguage] = useState('En');
	// languageStoredInLocalStorage
	// 	? languageStoredInLocalStorage
	// 	: isLanguageCN
	// 	? 'Cn':

	console.log('🚀 ~ App ~ language', language);
	return (
		<>
			<Head>
				<link rel="icon" href={icon.src} />
			</Head>
			<Provider store={store}>
				<Main
					language={language}
					handleSetLanguage={(language) => {
						setLanguage(language);
						storeLanguageInLocalStorage(language);
					}}
				>
					<Component language={language} {...pageProps} />
				</Main>
			</Provider>
		</>
	);
}
