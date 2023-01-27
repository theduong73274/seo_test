import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../../styles/Home.module.scss';

export default function AllCoders({ data }) {
	return (
		<>
			<Head>
				<title>Coder | All Coders</title>
				<meta name="keywords" contents="coders" />
			</Head>

			<div>
				<h1>AllCoders</h1>
				{data.length > 0 &&
					data.map((coder) => (
						<Link
							href={`/coder/${coder.id}`}
							key={coder.id}
							className="cursor-pointer"
						>
							<h3>{coder.name}</h3>
						</Link>
					))}
			</div>
		</>
	);
}

export async function getStaticProps({ locale }) {
	const { data } = await fetch(
		// forward the locale value to the server via query params
		`https://admin.bosong.restaurant/api/public/product?lang=${locale}`
	).then((res) => res.json());

	return {
		props: {
			data,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
