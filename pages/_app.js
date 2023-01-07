import { appWithTranslation } from 'next-i18next';
import { Suspense } from 'react';
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

// import '../i18n';
import { useRouter } from 'next/router';
import icon from '../public/icon.svg';

// const languages = {
// 	vi: require('../public/lang/vi/home.json'),
// 	en: require('../public/lang/en/home.json'),
// };

function App({ Component, pageProps }) {
	const router = useRouter();
	const { locale: activeLocale } = router;
	const language = activeLocale || 'en';
	console.log('🚀 ~ activeLocale', activeLocale);
	// const [language, setLanguage] = useState('en');

	// const language = Cookies.get('i18next') || 'en';
	// console.log(Cookies.get('language'))
	// const router = useRouter();
	// const { locale, defaultLocale } = router;
	// const messages = languages[locale];

	return (
		<>
			<Head>
				<link rel="icon" href={icon.src} />
			</Head>
			<Suspense fallback={<div>Loadiingg ....</div>}>
				<Provider store={store}>
					{/* <I18nextProvider i18n={i18n}> */}
					{/* <LanguageProvider> */}
					<Main language={language}>
						<Component language={language} {...pageProps} />
					</Main>
					{/* </LanguageProvider> */}
					{/* </I18nextProvider> */}
				</Provider>
			</Suspense>
		</>
	);
}

export default appWithTranslation(App);

// App.getInitialProps = async ({ Component, ctx }) => {
// 	let pageProps = {};

// 	if (Component.getInitialProps) {
// 		pageProps = await Component.getInitialProps(ctx);
// 	}

// 	return { pageProps };
// };

// export async function getStaticProps({ locale }) {
// 	return {
// 		props: {
// 			...(await serverSideTranslations(locale, ['translation'])),
// 		},
// 	};
// }
