import Head from 'next/head';
import React from 'react';
import contentDetail from '../../data/lgDeitalFood';
import Banner from '../../layouts/banner/Banner';
import DetailCartBtn from '../../layouts/detailPage/DetailCartBtn';
import DetailThumb from '../../layouts/detailPage/DetailThumb';
import checkLanguage, { handleChangeLg } from '../../utils/checkLg';
import { FaTelegramPlane } from 'react-icons/fa';
import { MdFacebook } from 'react-icons/md';
import { FacebookShareButton, TelegramShareButton } from 'react-share';
import Link from 'next/link';
import DetailDesc from '../../layouts/detailPage/DetailDesc';
import DishesList from '../../components/product/DishesList';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Get All Paths FOR NextJS
export const getStaticPaths = async () => {
	const res = await fetch('https://admin.bosong.restaurant/api/public/product');
	const data = await res.json();

	// Map data to an array of path objects with params(id);
	const paths = data?.data.map((coder) => {
		return {
			// locale: locales.data,
			params: { slug: coder.slug.toString() },
		};
	});
	console.log('🚀 ~ paths ~ paths', paths);

	return {
		paths,
		fallback: false,
	};
};

// Get id
export const getStaticProps = async (context) => {
	console.log('🚀 ~ getStaticProps ~ context', context);
	const slugs = context.params.slug;
	const res = await fetch(
		'https://admin.bosong.restaurant/api/public/product/' + slugs
	);
	const data = await res.json();
	console.log('🚀 ~ getStaticProps ~ data', data);

	return {
		props: {
			data: data,
			// ...(await serverSideTranslations(locale, ['common'])),
		},
	};
};

export default function MenuDetail({ data, language }) {
	const { v4: uuidv4 } = require('uuid');

	const contentPage = checkLanguage(language, contentDetail);
	const { banner, product_text, info, list, description, same } = contentPage;

	if (!data) return null;
	const {
		images,
		feature_image_path,
		price,
		discount,
		brand,
		category,
		category_id,
	} = data;

	const listImage = [
		{
			id: uuidv4(),
			image_path: feature_image_path,
		},
		...images,
	];

	return (
		<>
			<Head>
				<title>Coder | Detail</title>
				<meta name="keywords" contents="coders" />
			</Head>

			<section className="banner relative min-h-[450px] fl:min-h-[250px] mb-[120px] mb:mb-14 fl:mb-24">
				<Banner
					title={handleChangeLg(language, data, 'name')}
					language={language}
					detail={banner}
				>
					{banner.title}
				</Banner>
			</section>

			<section className="mb-[120px] about-special before:bg-[url('../public/image/about-6.webp')] after:bg-[url('../public/image/about-8.webp')]">
				<div className="page-container detail-image">
					<div className="grid grid-cols-2 gap-x-8 mat:grid-cols-1">
						<div className="w-full">
							<DetailThumb data={listImage}></DetailThumb>
						</div>

						<div className="mt-7 font-lora">
							<h1 className="text-4xl fl:max-w-[80%] mat:text-[32px]">
								{handleChangeLg(language, data, 'name')}
							</h1>

							<div className="flex items-center mt-6 fl:mt-5 gap-x-5">
								<div className="flex items-end gap-x-5 mb:items-center">
									<span className="text-lg text-[#BCB9B1] line-through">
										₱{price}
									</span>
									<span className="leading-tight text-primary text-32xl">
										₱{price - (price * discount) / 100}
									</span>
								</div>

								{discount > 0 ? (
									<p className="px-5 py-1 text-sm uppercase bg-primary text-[#222224]">
										{product_text.title} {discount}%
									</p>
								) : null}
							</div>

							<DetailCartBtn
								data={data}
								textLg={product_text.btn}
							></DetailCartBtn>

							<div className="mt-8 font-pro">
								<div className="flex items-center mb-[10px] gap-x-2">
									<p className="text-[#94949E]">{info.brand}:</p>
									<p>{brand}</p>
								</div>

								<div className="flex items-center mb-[10px] gap-x-2">
									<p className="text-[#94949E]">{info.stock}:</p>
									<p>There are dishes left</p>
								</div>

								<div className="flex items-center mb-[10px] gap-x-2">
									<p className="text-[#94949E]">{info.category}:</p>
									<p>{category.name}</p>
								</div>

								<div className="flex items-center mb-2 gap-x-4">
									<p className="text-[#94949E]">{info.share}:</p>

									<TelegramShareButton
										className="w-6 h-6"
										url={'https://bosong.aecongnghe.com/'}
										quote={''}
										hashtag={'#hashtag'}
										description={'aiueo'}
									>
										<FaTelegramPlane size={'18px'} className="w-full h-full" />
									</TelegramShareButton>

									<FacebookShareButton
										className="w-6 h-6"
										url={'https://bosong.aecongnghe.com/'}
										quote={''}
										hashtag={'#monngon'}
										description={handleChangeLg(language, data, 'content')}
									>
										<MdFacebook size={'18px'} className="w-full h-full" />
									</FacebookShareButton>
								</div>
							</div>

							<div className="flex flex-col gap-4 mt-8 font-pro">
								{list.length > 0 &&
									list.map((item) => (
										<div
											key={uuidv4()}
											className="flex items-center gap-5 py-3 px-5 border border-[#94949E]"
										>
											<span
												dangerouslySetInnerHTML={{ __html: item.icon }}
											></span>

											<div className="">
												<span className="uppercase">{item.title}</span>
												<p className="text-sm text-[#94949E] mt-[2px]">
													{item.description}
												</p>
											</div>
										</div>
									))}

								{/* <div className="flex items-center gap-5 py-3 px-5 border border-[#94949E]">
									<svg
										id="headphones"
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 20 20"
									>
										<path
											id="Path_784"
											data-name="Path 784"
											d="M1.758,248.07H2.93a.586.586,0,0,0,.586-.586v-5.9A.586.586,0,0,0,2.93,241H1.758A1.758,1.758,0,0,0,0,242.758v3.555A1.758,1.758,0,0,0,1.758,248.07Zm0,0"
											transform="translate(0 -231.586)"
											fill="#fff"
										/>
										<path
											id="Path_785"
											data-name="Path 785"
											d="M192.172,241H191a.586.586,0,0,0-.586.586v7.07a.586.586,0,0,1-.586.586h-3.038a1.755,1.755,0,0,0-1.65-1.172h-2.383a1.758,1.758,0,1,0,0,3.516h2.383a1.755,1.755,0,0,0,1.65-1.172h3.038a1.76,1.76,0,0,0,1.758-1.758v-.586h.586a1.758,1.758,0,0,0,1.758-1.758v-3.555A1.758,1.758,0,0,0,192.172,241Zm0,0"
											transform="translate(-173.93 -231.586)"
											fill="#fff"
										/>
										<path
											id="Path_786"
											data-name="Path 786"
											d="M30.684,8.3a2.924,2.924,0,0,1,.559-.057h1.172a1.739,1.739,0,0,1,.61.115,6.477,6.477,0,0,1,12.921,0,1.739,1.739,0,0,1,.61-.115h1.172a2.924,2.924,0,0,1,.559.057,8.817,8.817,0,0,0-17.6,0Zm0,0"
											transform="translate(-29.485)"
											fill="#fff"
										/>
									</svg>

									<div className="">
										<h3 className="uppercase">SECURITY POLICY</h3>
										<p className="text-sm text-[#94949E] mt-[2px]">
											(Edit With The Customer Reassurance Module)
										</p>
									</div>
								</div>

								<div className="flex items-center gap-5 py-3 px-5 border border-[#94949E]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 20 20"
									>
										<g id="earth-globe" transform="translate(-0.001)">
											<g
												id="Group_2669"
												data-name="Group 2669"
												transform="translate(0.001)"
											>
												<path
													id="Path_783"
													data-name="Path 783"
													d="M17.072,2.929A10,10,0,0,0,2.93,17.071,10,10,0,0,0,17.072,2.929Zm.51,4.051a2.264,2.264,0,0,1-1.011-.212,5.47,5.47,0,0,0-.859-.262A2.221,2.221,0,0,0,13.39,7.74c-.152.27-.879,1.658-.26,2.51a2.49,2.49,0,0,0,.791.655,7.636,7.636,0,0,0,1.072.566c.083.034.166.064.246.094a1.4,1.4,0,0,1,.571.3.833.833,0,0,1,.066.56,3.259,3.259,0,0,1-.211.739,2.055,2.055,0,0,0,.657,2.8A8.693,8.693,0,0,1,1.719,7.35a4.654,4.654,0,0,0,.447.535A11.121,11.121,0,0,0,3.753,9.266c.042.03.1.074.134.1a1.6,1.6,0,0,1,0,.392,2.267,2.267,0,0,0,.2,1.272,3.429,3.429,0,0,0,.6.768,1.612,1.612,0,0,1,.416.56,1.652,1.652,0,0,1,0,.5,2.78,2.78,0,0,0,.032.89,2.753,2.753,0,0,0,.566,1.042,2.166,2.166,0,0,1,.322.5,2.108,2.108,0,0,1,.079.452,3.935,3.935,0,0,0,.091.565,1.464,1.464,0,0,0,1.322,1.174c.036,0,.072,0,.109,0,.695-.063,1.172-.684,1.245-1.62a1.861,1.861,0,0,1,.12-.639c.024-.01.082-.024.125-.034a1.346,1.346,0,0,0,.691-.348,1.325,1.325,0,0,0,.236-1.3A1.534,1.534,0,0,1,10,13.274c0-.154.32-.425.439-.527l1.192-1.018a1.582,1.582,0,0,0,.432-1.7,2.282,2.282,0,0,0-.94-1.158A1.83,1.83,0,0,0,9.414,8.6a2.193,2.193,0,0,0-.427.251c-.034.024-.079.056-.116.079a.412.412,0,0,1-.054-.078,2.449,2.449,0,0,1-.122-.29A3.427,3.427,0,0,0,8.489,8.1,2.133,2.133,0,0,0,6.641,7.061c-.1-.012-.192-.023-.284-.038A3.045,3.045,0,0,1,5,6.442a1.305,1.305,0,0,1,.4-.085c.066,0,.144.011.226.02a2.119,2.119,0,0,0,.843-.028,2.126,2.126,0,0,0,.742-.42c.054-.042.1-.082.152-.115A1.041,1.041,0,0,1,7.8,5.723,1.439,1.439,0,0,0,9.332,4.3a3.514,3.514,0,0,0-.361-1.7c-.158-.388-.312-.773-.446-1.172a8.7,8.7,0,0,1,4.544.434l-.086.084a9.152,9.152,0,0,0-.8.845,1.237,1.237,0,0,0-.276.574,1.261,1.261,0,0,0,.321.968,1.794,1.794,0,0,0,.953.723A1.289,1.289,0,0,0,13.5,5.1a2.062,2.062,0,0,0,.916-.271,1.37,1.37,0,0,1,.368-.146,1.231,1.231,0,0,1,.365.086,2.491,2.491,0,0,0,.706.152,1.227,1.227,0,0,0,.924-.361,8.7,8.7,0,0,1,1.372,2.405l-.136,0C17.884,6.966,17.74,6.968,17.582,6.98Z"
													transform="translate(-0.001)"
													fill="#fff"
												/>
											</g>
										</g>
									</svg>

									<div className="">
										<h3 className="uppercase">SECURITY POLICY</h3>
										<p className="text-sm text-[#94949E] mt-[2px]">
											(Edit With The Customer Reassurance Module)
										</p>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="mb-[90px]">
				<div className="page-container">
					<div className="flex items-center mb-7 transition-all gap-x-[70px] text-2xl fl:gap-x-14 fl:text-1xl font-lora border-b-[1.2px] border-[#7A7A82] border-dashed">
						<div
							// className={({ isActive }) =>
							// 	'pb-6' + (isActive ? ' nav-border' : '')
							// }
							className="pb-5"
						>
							{description.title}
						</div>
						{/* <NavLink
							to="/1/gallery"
							className={({ isActive }) =>
								'pb-6' + (isActive ? ' nav-border' : '')
							}
						>
							Gallery
						</NavLink> */}
					</div>

					<DetailDesc text={handleChangeLg(language, data, 'content')} />
				</div>
			</section>

			<section className="mb-[60px] about-special before:bg-[url('../public/image/about-1.webp')] after:bg-[url('../public/image/about-2.webp')] before:translate-y-[15%]">
				<div className="page-container">
					<h2 className="text-4xl font-lora fl:text-3xl mat:max-w-[70%] mat:mx-auto mat:text-center mb:max-w-full">
						{same}
					</h2>

					<DishesList
						value={[category_id]}
						initialGird={2}
						language={language}
					></DishesList>
				</div>
			</section>
		</>
	);
}
