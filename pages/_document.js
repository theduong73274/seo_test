import Document, { Html, Main, NextScript, Head } from 'next/document';

function MyDocument({ locale }) {
	return (
		<Html dir={locale === 'ar' ? 'rtl' : 'ltr'} lang={locale}>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

MyDocument.getInitialProps = async (ctx) => {
	const initialProps = await Document.getInitialProps(ctx);
	return { ...initialProps, locale: ctx?.locale || 'en' };
};

export default MyDocument;
