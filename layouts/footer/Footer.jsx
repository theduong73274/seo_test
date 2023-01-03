import React from 'react';
import useSWR from 'swr';
import { AiOutlineWechat } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { MdFacebook } from 'react-icons/md';
import { fetcher, tmdbAPI } from '../../pages/api/config';
import { dataFooter } from '../../data/lgGeneral';
import Image from 'next/image';
import Link from 'next/link';
// import logo from '../../public/image/next.svg';

const Footer = ({ language }) => {
	let contentFooter;
	switch (language) {
		case 'cn':
			contentFooter = dataFooter.cn;
			break;
		case 'vn':
			contentFooter = dataFooter.vn;
			break;

		default:
			contentFooter = dataFooter.en;
			break;
	}
	const { social, input_title, info, copy_right } = contentFooter;

	const { data } = useSWR(tmdbAPI.getCategory('settings'), fetcher);
	if (!data) return null;
	const {
		address_contact,
		email_contact,
		phone_contact,
		open_date,
		open_time,
		telegram_contact,
		fanpage,
	} = data;

	return (
		<footer className="bg-[#222226]">
			<div className="page-container">
				<div className="grid grid-cols-3 py-6 border-b border-[#707070] mat:grid-cols-2 mat:gap-y-5 mb:grid-cols-1 mb:gap-y-8">
					<div className="flex items-center space-x-4 min-w-[400px] mat:min-w-max mb:justify-center">
						<p className="uppercase">{social}:</p>

						{fanpage.page_telegram && (
							<Link
								href={fanpage.page_telegram}
								target="_blank"
								rel="noreferrer"
								className="w-7 h-7"
							>
								<FaTelegramPlane size={'22px'} className="w-full h-full" />
							</Link>
						)}

						{fanpage.page_wechat && (
							<a
								href={fanpage.page_wechat}
								target="_blank"
								rel="noreferrer"
								className="w-7 h-7"
							>
								<AiOutlineWechat size={'28px'} className="w-full h-full" />
							</a>
						)}

						{fanpage.page_facebook && (
							<a
								href={fanpage.page_facebook}
								target="_blank"
								rel="noreferrer"
								className="w-7 h-7"
							>
								<MdFacebook size={'22px'} className="w-full h-full" />
							</a>
						)}
					</div>

					{/* Logo */}
					<div className="max-w-[353px] mx-auto mat:ml-auto mb:mx-auto">
						<Image
							src="../../logo.svg"
							alt="Logo"
							width={100}
							height={100}
							className="object-cover w-full max-w-[210px] mb:max-w-full"
						/>
					</div>

					<div className="max-w-[400px] w-full relative  mat:max-w-[60%] mat:mx-auto mb:min-w-full">
						<input
							type="text"
							className="px-4 py-3 w-full bg-transparent border border-[#94949E] text-base"
							placeholder={input_title}
						/>

						<a
							href={telegram_contact}
							className="absolute right-4 top-2/4 -translate-y-3/4"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="19"
								height="19"
								viewBox="0 0 19 19"
							>
								<path
									id="send"
									d="M19,0,0,10.687l6.072,2.249,9.365-8.78-7.124,9.61.006,0-.007,0V19l3.405-3.973,4.314,1.6Z"
									fill="#94949e"
								/>
							</svg>
						</a>
					</div>
				</div>

				<div className="py-[78px] grid grid-cols-3 fl:py-16 mat:py-10 mb:grid-cols-1 mb:gap-y-8">
					<div className="flex flex-col justify-center text-center">
						<h3 className="text-[26px] mb-3 fl:text-2xl mat:text-xl">
							{info.title_address}
						</h3>
						<p className="text-lg text-[#94949E] max-w-[60%] mx-auto leading-relaxed mat:max-w-[80%] mat:text-base mb:max-w-[60%]">
							{address_contact}
						</p>
					</div>

					<div className="text-center border-line">
						<h3 className="relative text-[32px] fl:text-2xl mat:text-xl text-primary pb-3 before:content-[''] before:absolute before:bottom-0 before:left-2/4 before:-translate-x-2/4 before:h-[1.4px] before:w-[50px] before:bg-[#94949E]">
							{info.title_open}
						</h3>
						<p className="mt-7 text-primary fl:mt-5 fl:text-lg mat:mt-4">
							{open_date}
						</p>
						<span className="block mt-6 fl:text-lg fl:mt-5 mat:text-base">
							{open_time}
						</span>
						<p className="mt-2 fl:text-lg fl:mt-1 mat:text-base">
							(Breakfast , Lunch, Dinner)
						</p>
					</div>

					<div className="flex flex-col justify-center text-center">
						<h3 className="text-[26px] mb-3 fl:text-2xl mat:text-xl">
							{info.title_contact}
						</h3>
						<a
							href={`mailto:${email_contact}`}
							className="text-lg mat:text-base"
						>
							{email_contact}
						</a>
						<a
							href={`tel:${phone_contact}`}
							className="text-lg text-[#94949E] mt-1 mat:text-base"
						>
							{phone_contact}
						</a>
					</div>
				</div>
			</div>

			<div className="bg-[#15151A] py-6 text-center text-[#94949E] mat:text-sm">
				{copy_right}
			</div>
		</footer>
	);
};

export default Footer;
