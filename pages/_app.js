import { useState } from 'react';
import { Provider } from 'react-redux';
import Main from '../layouts/Main';
import store from '../redux';

import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import '../styles/globals.scss';

import { LanguageProvider } from '../contexts/language-context';
import icon from '../public/icon.svg';

export default function App({ Component, pageProps }) {
	// languageStoredInLocalStorage
	// 	? languageStoredInLocalStorage
	// 	: isLanguageCN
	// 	? 'Cn':
	const [language, setLanguage] = useState('en');

	// console.log('🚀 ~ App ~ language', language);
	return (
		<>
			<Head>
				<link rel="icon" href={icon.src} />
			</Head>
			<Provider store={store}>
				<LanguageProvider>
					<Main
						// language={language}
						handleSetLanguage={(language) => {
							setLanguage(language);
							// storeLanguageInLocalStorage(language);
						}}
					>
						<Component language={language} {...pageProps} />
					</Main>
				</LanguageProvider>
			</Provider>
		</>
	);
}
