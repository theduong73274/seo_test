import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Coder({ data }) {
	return (
		<>
			<h1>Bry</h1>
			<div id={data.id}>
				<h1>{data.id}</h1>
				<h2>{data.name}</h2>
				<span>{data.brand}</span>
				<p>{data.content}</p>
			</div>
		</>
	);
}

export const getStaticPaths = async ({ locales }) => {
	console.log('🚀 ~ getStaticPaths ~ locales', locales);
	const res = await fetch('https://admin.bosong.restaurant/api/public/product');
	const data = await res.json();

	// Map data to an array of path objects with params(id);
	const paths = data?.data.map((coder) => {
		return {
			params: { id: coder.id.toString() },
			locale: 'cn',
			locale: 'en',
			locale: 'vn',
		};
	});

	return {
		paths,
		fallback: true,
	};
};

export const getStaticProps = async ({ locale, params }) => {
	console.log('🚀 ~ getStaticProps ~ locale', locale);
	const id = params.id;
	const res = await fetch(
		`https://admin.bosong.restaurant/api/public/product/${id}`
	);
	const data = await res.json();

	return {
		props: {
			data,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
};

// export async function getStaticProps({ locale }) {
//     const { data } = await fetch(
//       // forward the locale value to the server via query params
//       `https://admin.bosong.restaurant/api/public/product?lang=${locale}`
//     ).then((res) => res.json());

//     return {
//       props: {
//         data,
//         ...(await serverSideTranslations(locale, ["common"])),
//       },
//     };
//   }
