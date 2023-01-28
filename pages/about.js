import Head from 'next/head';
import useSWR from 'swr';
import content from '../data/lgAboutPage';
import Banner from '../layouts/banner/Banner';
import Feedback from '../layouts/feedback/Feedback';
import DishVideo from '../layouts/home/DishVideo';
import Intro from '../layouts/intro/Intro';
import TitleHeader from '../layouts/title/TitleHeader';
import { fetcher, tmdbAPI } from './api/config';

import about5 from '../public/image/about-5.webp';
import about9 from '../public/image/about-9.webp';
import checkLanguage, { handleChangeLg } from '../utils/checkLg';

export default function AboutPage({ language }) {
	const { v4: uuidv4 } = require('uuid');

	const { data } = useSWR(tmdbAPI.getCategory('settings'), fetcher);
	if (!data) return null;

	const { about: about_link_video_youtube, library_images } = data;
	const listGallery = library_images.filter((item, index) => index < 6);

	const listSpecial = handleChangeLg(language, data.about, 'about_special');
	const specialLeftNew = listSpecial.filter((item, index) => index < 2);
	const specialRightNew = listSpecial.filter((item, index) => index > 1);

	const contentPage = checkLanguage(language, content);
	const { banner, intro, special, feedback, gallery } = contentPage;

	return (
		<>
			<Head>
				<title>Bờ Sông - About</title>
				<link rel="canonical" href="/about" />
				<meta name="description" content="Bờ sông quán About" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<section className="banner relative min-h-[450px] fl:min-h-[250px] mb:min-h-[200px] mb-[120px] mb:mb-20 fl:mb-24">
				<Banner title={banner.nav} language={language}>
					{banner.title}
				</Banner>
			</section>

			<section className="page-container flex items-center justify-center gap-[90px] fl:gap-[40px] mb-[120px] mb:gap-0 mb:mb-20 mat:flex-col-reverse">
				<Intro subText={intro} language={language} data={data.home}></Intro>
			</section>

			<section className="relative about-icon mb-[120px] mat:mb-22 mb:mb-20">
				<DishVideo dataLink={about_link_video_youtube}></DishVideo>
			</section>

			<section className="mb-[120px] mat:mb-22 mb:mb-20 about-special before:bg-[url('../public/image/about-6.webp')] after:bg-[url('../public/image/about-8.webp')]">
				<div className="page-container about-header">
					<TitleHeader>{special.title}</TitleHeader>

					<div className="flex items-center mt-12 space-x-14 mat:mt-11 mat:flex-col mat:space-x-0 mat:space-y-8 mat:text-center">
						<div className="grid flex-1 grid-cols-1 gap-y-14 mat:gap-x-10 mb:gap-y-6">
							{specialLeftNew.length > 0 &&
								specialLeftNew.map((item) => (
									<div className="mb:w-[80%] mb:mx-auto" key={uuidv4()}>
										<h3 className="mb-4 text-3xl text-primary font-lora fl:mb-3 fl:text-2xl mat:text-xl">
											{item.head}
										</h3>
										<p className="leading-snug text-xl fl:leading-[1.32] fl:text-lg text-[#A2A09B] line-clamp-3">
											{item.description}
										</p>
									</div>
								))}
						</div>
						<img
							src={about5.src}
							alt=""
							className="max-w-[496px] fl:max-w-[39%] mat:max-w-[55%] mb:max-w-[90%]"
						/>
						<div className="grid flex-1 grid-cols-1 gap-y-14 mat:gap-x-10 mb:gap-y-6">
							{specialRightNew.length > 0 &&
								specialRightNew.map((item) => (
									<div className="mb:w-[80%] mb:mx-auto" key={uuidv4()}>
										<h3 className="mb-4 text-3xl text-primary font-lora fl:mb-3 fl:text-2xl mat:text-xl">
											{item.head}
										</h3>
										<p className="leading-snug text-xl fl:leading-[1.32] fl:text-lg text-[#A2A09B] line-clamp-3">
											{item.description}
										</p>
									</div>
								))}
						</div>
					</div>
				</div>
			</section>

			<section className="feedback py-28 mb-[120px] mb:mb-20 mat:mb-22 mat:py-20 mb:py-14">
				<Feedback
					textLg={feedback}
					language={language}
					data={data.home}
				></Feedback>
			</section>

			<section className="mb-[120px] about-gallery relative mb:mb-20">
				<div className="page-container about-image">
					<TitleHeader>{gallery.title}</TitleHeader>

					<div className="grid grid-cols-4 mat:grid-cols-2 gap-5 max-w-[85%] mx-auto mt-11 mb:max-w-full">
						{listGallery.length > 0 &&
							listGallery.map((item, index) => (
								<div
									className={`overflow-hidden rounded-md max-h-[415px] ${
										index === listGallery.length - 1 ||
										index === listGallery.length - 2
											? 'col-span-2'
											: ''
									}`}
									key={item.id}
								>
									<img
										src={tmdbAPI.imageProduct(item.image_path)}
										alt={item.image_name}
										className="object-cover object-center w-full h-full"
									/>
								</div>
							))}
					</div>
				</div>
				<div className="absolute left-0 top-1/4 w-full max-w-[13%] -z-[1]">
					<img src={about9.src} alt="" className="w-full" />
				</div>
			</section>
		</>
	);
}
