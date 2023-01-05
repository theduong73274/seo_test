import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';
import Button from '../components/button/Button';
import Navigation from '../components/navigation';
import content from '../data/lgHomePage';
import useTrans from '../hooks/useTrans';
import Feedback from '../layouts/feedback/Feedback';
import DishMenu from '../layouts/home/DishMenu';
import DishNews from '../layouts/home/DishNews';
import HomeContact from '../layouts/home/HomeContact';
import Intro from '../layouts/intro/Intro';
import TitleHeader from '../layouts/title/TitleHeader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import bird1 from '../public/image/bird-left.png';
import bird2 from '../public/image/bird-right.png';
import map from '../public/image/map.webp';
import checkLanguage, { handleChangeLg } from '../utils/checkLg';
import { fetcher, tmdbAPI } from './api/config';

export default function Home({ language }) {
	const { t } = useTranslation();
	console.log('🚀 ~ Home ~ t', t);
	console.log('🚀 ~ Home ~ t', t('home'));

	const { v4: uuidv4 } = require('uuid');
	const { data } = useSWR(tmdbAPI.getCategory('settings'), fetcher);
	if (!data) return null;

	const descFeature = handleChangeLg(language, data.home, 'home_feature');

	const contentPage = checkLanguage(language, content);
	const { button_title, intro, dishes, feature, feedback, contact, news } =
		contentPage;

	const featureNew = feature.list.map((item, index) => ({
		...item,
		description: descFeature[index],
	}));

	return (
		<>
			<Head>
				<title>{data.web_title}</title>
				<meta name="description" content={data.web_description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<Navigation />
			<div className="mt-5">
				<h1>{t('home.title')}</h1>
				<p>{t('home.Home description')}</p>
			</div>

			<section className="py-[180px] back-title mb-[200px] mat:py-32 fl:mb-40 mat:mb-[60px] mb:mb-4 mb:pb-20">
				<div className="relative page-container">
					<div className="max-w-[52%] mx-auto fl:max-w-[64%] mat:max-w-[90%]">
						<h1 className="font-semibold text-[80px] font-dancing text-center leading-[1.15] mb:text-[50px]">
							{handleChangeLg(language, data.home, 'home_title')}
						</h1>

						<div className="flex flex-col items-center">
							<div className="mt-[48px] flex items-center space-x-8 mb:mt-5 mat:space-x-6">
								<img
									src={bird1.src}
									title="icon"
									alt="bird.jpg"
									className="hd:max-w-[86px] mat:max-w-[60px]"
								/>
								<p className="text-[22px] text-primary text-center font-lora mb:text-lg">
									{handleChangeLg(language, data.home, 'home_sub_title')}
								</p>
								<img
									src={bird2.src}
									alt="bird.jpg"
									title="icon"
									className="hd:max-w-[86px] mat:max-w-[60px]"
								/>
							</div>

							<Link href="/menu">
								<Button className="inline-block mt-[58px]">
									{button_title}
								</Button>
							</Link>
						</div>
					</div>

					<div className="hidden absolute -right-[12%] flex-col items-center gap-8 py-[50px] link-social bottom-3/4 mb:right-5 translate-y-2/4 bg:-right-20 ft:right-0 fs:-right-10 mat:hidden">
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="17"
								height="17"
								viewBox="0 0 17 17"
							>
								<g
									id="Group_29"
									data-name="Group 29"
									transform="translate(5842.319 -395.836)"
								>
									<path
										id="Path_651"
										data-name="Path 651"
										d="M12.59,8A4.7,4.7,0,0,0,7.9,12.691v7.617A4.7,4.7,0,0,0,12.59,25h7.617A4.7,4.7,0,0,0,24.9,20.309V12.691A4.7,4.7,0,0,0,20.207,8Zm7.617,15.492H12.59a3.187,3.187,0,0,1-3.183-3.183V12.691A3.187,3.187,0,0,1,12.59,9.508h7.617a3.187,3.187,0,0,1,3.183,3.183v7.617h0A3.187,3.187,0,0,1,20.207,23.492Z"
										transform="translate(-5850.217 387.836)"
										fill="#f5c336"
										fillRule="evenodd"
									/>
									<g
										id="Group_28"
										data-name="Group 28"
										transform="translate(-5842.319 395.836)"
									>
										<path
											id="Path_648"
											data-name="Path 648"
											d="M11.775,16.258a4.38,4.38,0,1,0,4.381-4.38A4.385,4.385,0,0,0,11.775,16.258Zm1.508,0a2.872,2.872,0,1,1,2.872,2.872A2.875,2.875,0,0,1,13.284,16.258Z"
											transform="translate(-7.656 -7.758)"
											fill="#f5c336"
											fillRule="evenodd"
										/>
										<path
											id="Path_649"
											data-name="Path 649"
											d="M19.477,11a1.106,1.106,0,1,0,.781-.324A1.111,1.111,0,0,0,19.477,11Z"
											transform="translate(-7.195 -7.833)"
											fill="#f5c336"
										/>
									</g>
								</g>
							</svg>
						</button>

						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18.46"
								height="15"
								viewBox="0 0 18.46 15"
							>
								<path
									id="twitter"
									d="M5.8,17A10.7,10.7,0,0,0,16.576,6.23c0-.162,0-.325-.007-.487A7.713,7.713,0,0,0,18.46,3.779a7.682,7.682,0,0,1-2.179.6,3.809,3.809,0,0,0,1.67-2.1,7.538,7.538,0,0,1-2.408.915A3.791,3.791,0,0,0,9.086,6.65,10.759,10.759,0,0,1,1.278,2.694,3.8,3.8,0,0,0,2.453,7.749,3.834,3.834,0,0,1,.738,7.279v.052a3.794,3.794,0,0,0,3.037,3.713,3.7,3.7,0,0,1-1,.133,3.727,3.727,0,0,1-.708-.066,3.788,3.788,0,0,0,3.539,2.627A7.6,7.6,0,0,1,.9,15.361a7.292,7.292,0,0,1-.9-.052A10.781,10.781,0,0,0,5.8,17Z"
									transform="translate(0 -1.999)"
									fill="#f5c336"
								/>
							</svg>
						</button>

						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="9"
								height="18"
								viewBox="0 0 9 18"
							>
								<path
									id="Path_650"
									data-name="Path 650"
									d="M20,9.989V7.127A21.216,21.216,0,0,0,17.606,7c-2.369,0-3.992,1.49-3.992,4.229V13.75H11v3.2h2.614V25h3.205V16.95h2.509l.4-3.2H16.819v-2.2c0-.925.25-1.558,1.538-1.558Z"
									transform="translate(-11 -7)"
									fill="#f5c336"
								/>
							</svg>
						</button>
					</div>
				</div>
			</section>

			<section className="page-container flex items-center justify-center gap-[90px] fl:gap-[40px] mb-[120px] mb:gap-0 mb:mb-20 mat:flex-col-reverse">
				<Intro subText={intro} language={language} data={data.home}></Intro>
			</section>

			<section className="dishes-header mb-[90px] mb:mb-16">
				<div className="page-container dishes-icon">
					<TitleHeader>{dishes.title}</TitleHeader>
					<DishMenu language={language}></DishMenu>
				</div>
			</section>

			<section className="feature-header">
				<div className="mb-24 page-container feature-icon">
					<TitleHeader>{feature.title}</TitleHeader>

					<div className="grid grid-cols-4 gap-16 mt-16 hd:gap-12 mat:grid-cols-2 mat:gap-11 mb:gap-8 mb:mt-12">
						{featureNew.length > 0 &&
							featureNew.map((item) => (
								<div
									key={uuidv4()}
									className="flex flex-col items-center justify-content"
								>
									<span
										dangerouslySetInnerHTML={{ __html: item.icon }}
										className="relative bg-[#44444A] p-9 rounded-[50%] mb-8 transition-all feature-hover mb:mb-5"
									></span>

									<h3 className="mb-5 font-lora text-1xl mb:text-xl mb:mb-3">
										{item.title}
									</h3>

									<p className="text-[#94949E] font-medium text-center">
										{item.description}
									</p>
								</div>
							))}
					</div>
				</div>
			</section>

			<section className="feedback py-28 mat:py-20 mb:py-12">
				<Feedback
					textLg={feedback}
					language={language}
					data={data.home}
				></Feedback>
			</section>

			<section className="flex items-center bg-[#222226] relative mat:flex-col">
				<div className="w-2/4 mat:w-full">
					<Image src={map} alt="" className="object-cover w-full" />
				</div>

				<div className="w-2/4 pl-[6%] map-contact mat:w-full mat:pl-0 mat:my-12">
					<HomeContact language={contact}></HomeContact>
				</div>
			</section>

			<section className="news-header my-[100px] mat:my-16">
				<div className="page-container news-icon">
					<TitleHeader>{news.title}</TitleHeader>

					<DishNews language={language} sub={news.tab}></DishNews>

					<div className="mt-14 max-w-[30%] mx-auto flex flex-col items-center hd:max-w-[36%] mat:max-w-[54%] mat:mt-9 mb:max-w-[70%]">
						<p className="text-[#94949E] text-center">{news.description}</p>

						<Button className="inline-block mt-7">
							<Link href="/blog">{news.btn}</Link>
						</Button>
					</div>
				</div>
			</section>
		</>
	);
}

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
		},
	};
}
