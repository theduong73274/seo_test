import Head from 'next/head';
import React from 'react';
// import * as DOMPurify from 'dompurify';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { blogDetail } from '../../data/lgBlog';
import Banner from '../../layouts/banner/Banner';
import { changePath200, changePathWebp } from '../../utils';
import checkLanguage, { handleChangeLg } from '../../utils/checkLg';
import { fetcher, tmdbAPI } from '../api/config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function BlogDetail({ data, language }) {
	// const { v4: uuidv4 } = require('uuid');

	const contentPage = checkLanguage(language, blogDetail);
	const { banner, same } = contentPage;

	if (!data) return null;
	const {
		created_at,
		feature_image_path,
		feature_image_name,
		id,
		category,
		category_id,
		title,
		slug,
		short_description_attribute,
	} = data;

	const sanitizeHtml = require('sanitize-html');

	const safeDescription = sanitizeHtml(
		handleChangeLg(language, data, 'content')
	);

	return (
		<>
			<Head>
				<title>Bờ Sông - {title}</title>
				<meta name="keywords" contents="coders" />
				<meta name="description" content={title} />
				<meta property="og:title" content={title} />
				<meta
					property="og:image"
					content={tmdbAPI.imageProduct(feature_image_path)}
				/>
				<meta property="og:description" content={short_description_attribute} />
			</Head>

			<section className="banner relative min-h-[450px] fl:min-h-[250px] mb:min-h-[200px] mb-[70px] mat:mb-14 mb:mb-16 fl:mb-16">
				<Banner
					title={handleChangeLg(language, data, 'title')}
					detail={category}
					language={language}
				>
					{banner.title}
				</Banner>
			</section>

			<section className="mb-[120px] about-special before:bg-[url('../public/image/about-6.webp')] after:bottom-[38%] after:bg-[url('../public/image/about-8.webp')] mat:after:bottom-0">
				<div className="page-container news-icon after:bottom-0">
					<div className="grid grid-cols-3 gap-x-8 mat:grid-cols-1">
						<div className="w-full col-span-2 mat:col-span-1">
							<h1 className="font-lora leading-snug text-[42px] fl:leading-snug fl:text-3xl mb:text-2xl">
								{handleChangeLg(language, data, 'title')}
							</h1>

							<div className="mt-12 mb:mt-6">
								<img
									src={changePathWebp(tmdbAPI.imageProduct(feature_image_path))}
									alt={feature_image_name}
									className="object-cover object-center w-full h-full max-h-[500px] fl:max-h-[420px] mat:max-h-[404px]"
								/>

								<div className="flex items-center mt-8 mb-4 space-x-7 font-pro">
									<div className="flex items-center space-x-3 relative before:absolute before:h-full before:w-[1.4px] before:right-0 before:translate-x-[15px] before:bg-secondary">
										<svg
											id="calendar"
											xmlns="http://www.w3.org/2000/svg"
											width="14.006"
											height="14"
											viewBox="0 0 14.006 14"
										>
											<path
												id="Path_795"
												data-name="Path 795"
												d="M11.3,1.19H10.78V.661a.547.547,0,1,0-1.094,0V1.19H4.32V.661a.547.547,0,1,0-1.094,0V1.19H2.7A2.707,2.707,0,0,0,0,3.894V11.41a2.707,2.707,0,0,0,2.7,2.7h8.6a2.707,2.707,0,0,0,2.7-2.7V3.894a2.707,2.707,0,0,0-2.7-2.7ZM2.7,2.283h.522V3.35a.547.547,0,1,0,1.094,0V2.283H9.686V3.35a.547.547,0,0,0,1.094,0V2.283H11.3a1.612,1.612,0,0,1,1.61,1.61v.522H1.094V3.894A1.612,1.612,0,0,1,2.7,2.283ZM11.3,13.02H2.7a1.612,1.612,0,0,1-1.61-1.61V5.51H12.913v5.9a1.612,1.612,0,0,1-1.61,1.61ZM4.858,7.661a.547.547,0,0,1-.547.547H3.236a.547.547,0,1,1,0-1.094H4.311A.547.547,0,0,1,4.858,7.661Zm6.459,0a.547.547,0,0,1-.547.547H9.7a.547.547,0,1,1,0-1.094h1.076A.547.547,0,0,1,11.317,7.661Zm-3.233,0a.547.547,0,0,1-.547.547H6.462a.547.547,0,1,1,0-1.094H7.538A.547.547,0,0,1,8.085,7.661ZM4.858,10.887a.547.547,0,0,1-.547.547H3.236a.547.547,0,1,1,0-1.094H4.311A.547.547,0,0,1,4.858,10.887Zm6.459,0a.547.547,0,0,1-.547.547H9.7a.547.547,0,1,1,0-1.094h1.076A.547.547,0,0,1,11.317,10.887Zm-3.233,0a.547.547,0,0,1-.547.547H6.462a.547.547,0,1,1,0-1.094H7.538A.547.547,0,0,1,8.085,10.887Z"
												transform="translate(0 -0.114)"
												fill="#fff"
											/>
										</svg>

										<span className="text-sm text-primary">
											{/* 21 June,2022 */}
											{moment(created_at).format('DD MMMM, YYYY')}
										</span>
									</div>

									<div className="flex items-center space-x-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="13.999"
											height="14"
											viewBox="0 0 13.999 14"
										>
											<path
												id="price-tag"
												d="M6.335,14h0a1.63,1.63,0,0,1-1.16-.481L.812,9.15a1.643,1.643,0,0,1,0-2.318L6.692.941A3.186,3.186,0,0,1,8.962,0h3.73A1.642,1.642,0,0,1,14.333,1.64V5.359a3.186,3.186,0,0,1-.941,2.269l-5.9,5.892A1.63,1.63,0,0,1,6.335,14ZM8.962,1.093a2.1,2.1,0,0,0-1.5.62L1.586,7.6a.548.548,0,0,0,0,.773l4.362,4.368a.543.543,0,0,0,.386.16h0a.543.543,0,0,0,.386-.16l5.9-5.892a2.1,2.1,0,0,0,.62-1.5V1.64a.547.547,0,0,0-.547-.547ZM10.368,5.55a1.641,1.641,0,1,1,1.641-1.641A1.642,1.642,0,0,1,10.368,5.55Zm0-2.187a.547.547,0,1,0,.547.547A.547.547,0,0,0,10.368,3.363Zm0,0"
												transform="translate(-0.334 0.001)"
												fill="#fff"
											/>
										</svg>

										<span className="text-sm text-primary">
											{handleChangeLg(language, category, 'title')}
										</span>
									</div>
								</div>

								<div
									className="leading-relaxed blog-content text-secondary font-pro"
									dangerouslySetInnerHTML={{ __html: safeDescription }}
								/>
							</div>
						</div>

						<BlogSame
							categoryId={category_id}
							blogId={id}
							language={language}
							textLg={same}
						></BlogSame>
					</div>
				</div>
			</section>
		</>
	);
}

const BlogSame = ({ blogId, language, textLg, categoryId }) => {
	const { data } = useSWR(
		tmdbAPI.getBlogList('category-news', categoryId),
		fetcher
	);

	const router = useRouter();
	if (!data) return null;
	const listBlog = data?.news?.data || [];

	const newList = listBlog.filter((item) => item.id !== blogId);

	return (
		<div className="font-lora mat:mt-16">
			{/* mt-7 */}
			{/* <h3 className="text-2xl pb-4 border-[#7A7A82] border-b-[1.4px] border-dashed">
				Blog Search
			</h3>

			<div className="mt-6 relative mat:col-span-2 mat:max-w-[60%] mat:mx-auto mat:row-span-1 mb:min-w-full">
				<input
					type="text"
					className="px-4 py-3 w-full bg-transparent border border-[#94949E] text-base font-pro"
					placeholder="Search"
				/>

				<span className="absolute right-4 top-2/4 -translate-y-2/4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="19"
						height="19"
						viewBox="0 0 15.002 15"
					>
						<g
							id="Group_2701"
							data-name="Group 2701"
							transform="translate(-1534.999 -746)"
						>
							<g id="search" transform="translate(1534.999 745.965)">
								<path
									id="Path_797"
									data-name="Path 797"
									d="M6.038,12.1a6.023,6.023,0,0,0,3.7-1.271l3.991,3.991a.75.75,0,0,0,1.061-1.061L10.8,9.772A6.035,6.035,0,1,0,6.038,12.1ZM2.831,2.864a4.535,4.535,0,1,1,0,6.414h0a4.519,4.519,0,0,1-.023-6.39l.023-.023Z"
									transform="translate(0)"
									fill="#7a7a82"
								/>
							</g>
						</g>
					</svg>
				</span>
			</div> */}
			{/* mt-12 */}
			<h2 className="text-2xl pb-4 border-[#7A7A82] border-b-[1.4px] border-dashed">
				{textLg.title}
			</h2>

			<div className="grid grid-cols-1 mt-8 gap-y-8 fl:gap-y-7">
				{newList.length > 0 &&
					newList.map((item) => (
						<div
							className="flex items-start space-x-6 cursor-pointer fl:space-x-4"
							key={item.id}
							onClick={() => router.push(`/blog/${item.slug}`)}
						>
							<div className="min-w-[150px] h-[130px] mat:min-w-[195px] mb:min-w-[40%]">
								<img
									src={changePath200(
										tmdbAPI.imageProduct(item.feature_image_path)
									)}
									alt={item.feature_image_name}
									className="object-cover object-center w-full h-full"
								/>
							</div>

							<div className="w-full">
								<h3 className="leading-snug text-1xl font-lora fl:text-lg mb:text-base line-clamp-2 hover:underline">
									{handleChangeLg(language, item, 'title')}
								</h3>
								<p className="mt-4 text-sm uppercase text-primary mb:text-xs">
									{`${handleChangeLg(language, item.category, 'title')} ${
										textLg.sub
									}`}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

// Get All Paths FOR NextJS
export const getStaticPaths = async () => {
	const res = await fetch('https://admin.bosong.restaurant/api/public/news');
	const data = await res.json();

	// Map data to an array of path objects with params(id);
	const paths = data?.data.map((coder) => {
		return {
			params: { slug: coder.slug.toString() },
			locale: 'cn',
			locale: '',
			locale: 'en',
			locale: 'vn',
		};
	});

	return {
		paths,
		fallback: true,
	};
};

// Get id
export const getStaticProps = async ({ locale, params }) => {
	const slug = params.slug;
	const res = await fetch(
		`https://admin.bosong.restaurant/api/public/news/${slug}`
	);
	const data = await res.json();

	return {
		props: {
			data,
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
};
