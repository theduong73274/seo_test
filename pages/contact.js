import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import Button from '../components/button/Button';
import content from '../data/lgHomePage';
import Feedback from '../layouts/feedback/Feedback';
import DishMenu from '../layouts/home/DishMenu';
import DishNews from '../layouts/home/DishNews';
import HomeContact from '../layouts/home/HomeContact';
import Intro from '../layouts/intro/Intro';
import TitleHeader from '../layouts/title/TitleHeader';

import bird1 from '../public/image/bird-left.png';
import bird2 from '../public/image/bird-right.png';
import map from '../public/image/map.webp';
import checkLanguage, { handleChangeLg } from '../utils/checkLg';
import { fetcher, tmdbAPI } from './api/config';

import contact1 from '../public/image/contact-1.png';
import contact2 from '../public/image/contact-2.png';
import contact3 from '../public/image/contact-3.png';
import Banner from '../layouts/banner/Banner';
import { contact } from '../data/lgContact';
import FormContact from '../layouts/contact/FormContact';

export default function Contact({ language }) {
	const { data } = useSWR(tmdbAPI.getCategory('settings'), fetcher);
	if (!data) return null;
	const { address_contact, email_contact, phone_contact } = data;

	const contentPage = checkLanguage(language, contact);
	const { banner, phone, email, location, form } = contentPage;

	console.log(contact2.src);

	return (
		<>
			{/* <Head>
				<title>Bờ Sông - Contact</title>
				<meta name="description" content={data.web_description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head> */}

			<section className="banner relative min-h-[450px] fl:min-h-[250px]">
				<Banner title={banner.nav} language={language}>
					{banner.title}
				</Banner>
			</section>

			<img
				src={contact1.src}
				alt="map.jpg"
				title="map position"
				className="max-h-[490px] w-full mb:min-h-[100px]"
			/>

			<section className="mb-[100px] -mt-16 mb:-mt-4">
				<div className="grid grid-cols-3 page-container gap-x-7 mat:grid-cols-1 mat:gap-y-8">
					<div className="overflow-hidden relative flex flex-col items-center p-12  font-pro bg-[#222226] rounded-2xl">
						<span className="mb-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								width="100"
								height="89"
								viewBox="0 0 100 89"
								className="mb:w-[90px] mb:h-[90px]"
							>
								<defs>
									<linearGradient
										id="linear-gradient"
										x1="0.5"
										x2="0.5"
										y2="1"
										gradientUnits="objectBoundingBox"
									>
										<stop offset="0" stopColor="#f5c336" />
										<stop offset="1" stopColor="#fa0" />
									</linearGradient>
								</defs>
								<g
									id="Group_212"
									data-name="Group 212"
									transform="translate(-495 -1579)"
								>
									<circle
										id="Ellipse_30"
										data-name="Ellipse 30"
										cx="40"
										cy="40"
										r="40"
										transform="translate(495 1579)"
										opacity="0.3"
										fill="url(#linear-gradient)"
									/>
									<circle
										id="Ellipse_31"
										data-name="Ellipse 31"
										cx="40"
										cy="40"
										r="40"
										transform="translate(515 1588)"
										opacity="0.3"
										fill="url(#linear-gradient)"
									/>
									<g id="Group_213" data-name="Group 213">
										<circle
											id="Ellipse_32"
											data-name="Ellipse 32"
											cx="40"
											cy="40"
											r="40"
											transform="translate(505 1584)"
											fill="url(#linear-gradient)"
										/>
										<path
											id="telephone"
											d="M7.308,2.656a1.356,1.356,0,0,0-2.03-.126L3.21,4.6a3.432,3.432,0,0,0-.9,3.54,35.135,35.135,0,0,0,8.336,13.216,35.137,35.137,0,0,0,13.216,8.336,3.432,3.432,0,0,0,3.54-.9l2.068-2.068a1.356,1.356,0,0,0-.126-2.03L24.73,21.106a1.356,1.356,0,0,0-1.16-.244l-4.38,1.094a3.49,3.49,0,0,1-3.314-.918l-4.912-4.914a3.49,3.49,0,0,1-.92-3.314l1.1-4.38A1.356,1.356,0,0,0,10.9,7.27ZM3.768,1.022a3.49,3.49,0,0,1,5.224.326L12.58,5.96a3.489,3.489,0,0,1,.63,2.988l-1.094,4.38a1.356,1.356,0,0,0,.356,1.286l4.914,4.914a1.356,1.356,0,0,0,1.288.356l4.378-1.094a3.49,3.49,0,0,1,2.988.63l4.612,3.588a3.489,3.489,0,0,1,.326,5.222L28.91,30.3a5.554,5.554,0,0,1-5.754,1.4,37.267,37.267,0,0,1-14.02-8.84A37.267,37.267,0,0,1,.3,8.844,5.559,5.559,0,0,1,1.7,3.09L3.77,1.022Z"
											transform="translate(529 1608)"
											fill="#fff"
										/>
									</g>
								</g>
							</svg>
						</span>

						<h3 className="mb-2 text-2xl mb:text-xl">{phone}</h3>
						<a href={`tel:${phone_contact}`} className="mt-1 text-secondary">
							{/* (+65) - 12345 - 78988 */}
							{phone_contact}
						</a>

						<div className="absolute top-0 left-0 ">
							<img src={contact2.src} alt="" className="w-full h-full" />
						</div>

						<div className="absolute bottom-0 right-0 ">
							<img src={contact3.src} alt="" className="w-full h-full" />
						</div>
					</div>

					<div className="overflow-hidden relative flex flex-col items-center p-12 font-pro bg-[#222226] rounded-2xl">
						<span className="mb-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								width="100"
								height="89"
								viewBox="0 0 100 89"
								className="mb:w-[90px] mb:h-[90px]"
							>
								<defs>
									<linearGradient
										id="linear-gradient"
										x1="0.5"
										x2="0.5"
										y2="1"
										gradientUnits="objectBoundingBox"
									>
										<stop offset="0" stopColor="#f5c336" />
										<stop offset="1" stopColor="#fa0" />
									</linearGradient>
								</defs>
								<g
									id="Group_212"
									data-name="Group 212"
									transform="translate(-495 -1579)"
								>
									<circle
										id="Ellipse_30"
										data-name="Ellipse 30"
										cx="40"
										cy="40"
										r="40"
										transform="translate(495 1579)"
										opacity="0.3"
										fill="url(#linear-gradient)"
									/>
									<circle
										id="Ellipse_31"
										data-name="Ellipse 31"
										cx="40"
										cy="40"
										r="40"
										transform="translate(515 1588)"
										opacity="0.3"
										fill="url(#linear-gradient)"
									/>
									<g id="Group_213" data-name="Group 213">
										<circle
											id="Ellipse_32"
											data-name="Ellipse 32"
											cx="40"
											cy="40"
											r="40"
											transform="translate(505 1584)"
											fill="url(#linear-gradient)"
										/>
										<path
											id="envelope"
											d="M0,6.333A4.333,4.333,0,0,1,4.333,2h26a4.333,4.333,0,0,1,4.333,4.333V23.667A4.333,4.333,0,0,1,30.333,28h-26A4.333,4.333,0,0,1,0,23.667ZM4.333,4.167A2.167,2.167,0,0,0,2.167,6.333V6.8l15.167,9.1L32.5,6.8v-.47a2.167,2.167,0,0,0-2.167-2.167ZM32.5,9.33,22.3,15.451l10.2,6.277Zm-.074,14.9-12.22-7.52L17.333,18.43,14.46,16.707,2.24,24.226a2.167,2.167,0,0,0,2.093,1.608h26a2.167,2.167,0,0,0,2.093-1.606Zm-30.26-2.5,10.2-6.277L2.167,9.33Z"
											transform="translate(527.667 1609)"
											fill="#fff"
										/>
									</g>
								</g>
							</svg>
						</span>

						<h3 className="mb-2 text-2xl mb:text-xl">{email}</h3>
						<a href={`mailto:${email_contact}`} className="mt-1 text-secondary">
							{/* bosongrestaurant@gmail.com */}
							{email_contact}
						</a>
						{/* <p className="mt-1 text-secondary">info.example@gmail.com</p> */}

						<div className="absolute top-0 left-0 ">
							<img src={contact2.src} alt="" className="w-full h-full" />
						</div>

						<div className="absolute bottom-0 right-0 ">
							<img
								src={contact3.src}
								width="100"
								height="100"
								alt=""
								className="w-full h-full"
							/>
						</div>
					</div>

					<div className="overflow-hidden relative flex flex-col items-center p-12 font-pro bg-[#222226] rounded-2xl">
						<span className="mb-6">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								width="100"
								height="89"
								viewBox="0 0 100 89"
								className="mb:w-[90px] mb:h-[90px]"
							>
								<defs>
									<linearGradient
										id="linear-gradient"
										x1="0.5"
										x2="0.5"
										y2="1"
										gradientUnits="objectBoundingBox"
									>
										<stop offset="0" stopColor="#f5c336" />
										<stop offset="1" stopColor="#fa0" />
									</linearGradient>
								</defs>
								<g
									id="Group_212"
									data-name="Group 212"
									transform="translate(-495 -1579)"
								>
									<circle
										id="Ellipse_30"
										data-name="Ellipse 30"
										cx="40"
										cy="40"
										r="40"
										transform="translate(495 1579)"
										opacity="0.3"
										fill="url(#linear-gradient)"
									/>
									<circle
										id="Ellipse_31"
										data-name="Ellipse 31"
										cx="40"
										cy="40"
										r="40"
										transform="translate(515 1588)"
										opacity="0.3"
										fill="url(#linear-gradient)"
									/>
									<g id="Group_213" data-name="Group 213">
										<circle
											id="Ellipse_32"
											data-name="Ellipse 32"
											cx="40"
											cy="40"
											r="40"
											transform="translate(505 1584)"
											fill="url(#linear-gradient)"
										/>
										<g id="geo-alt" transform="translate(531 1608)">
											<path
												id="Path_780"
												data-name="Path 780"
												d="M22.332,17.88a38.452,38.452,0,0,1-3.92,6.14A62.985,62.985,0,0,1,14,29.16a62.963,62.963,0,0,1-4.412-5.14,38.451,38.451,0,0,1-3.92-6.14A13.837,13.837,0,0,1,4,12a10,10,0,0,1,20,0,13.866,13.866,0,0,1-1.668,5.88ZM14,32S26,20.628,26,12A12,12,0,1,0,2,12C2,20.628,14,32,14,32Z"
												fill="#fff"
											/>
											<path
												id="Path_781"
												data-name="Path 781"
												d="M11,13a4,4,0,1,1,4-4A4,4,0,0,1,11,13Zm0,2A6,6,0,1,0,5,9,6,6,0,0,0,11,15Z"
												transform="translate(3 3)"
												fill="#fff"
											/>
										</g>
									</g>
								</g>
							</svg>
						</span>

						<h3 className="mb-2 text-2xl mb:text-xl">{location}</h3>
						<p className="mt-1 text-secondary max-w-[75%] mx-auto text-center leading-[1.8] mb:leading-[1.6]">
							{address_contact}
							{/* 1403 Washington Ave, New Orlea ns, LA 70130, United States */}
						</p>

						<div className="absolute top-0 left-0 ">
							<img src={contact2.src} alt="" className="w-full h-full" />
						</div>

						<div className="absolute bottom-0 right-0 ">
							<img src={contact3.src} alt="" className="w-full h-full" />
						</div>
					</div>
				</div>
			</section>

			<section className="mb-[100px]">
				<FormContact formText={form}></FormContact>
			</section>
		</>
	);
}
