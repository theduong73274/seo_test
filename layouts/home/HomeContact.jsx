import React from 'react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../pages/api/config';

const HomeContact = ({ language }) => {
	const { data } = useSWR(tmdbAPI.getCategory('settings'), fetcher);
	if (!data) return null;
	const { title, sub, location, lunch, dinner } = language;
	const {
		address_contact,
		phone_contact,
		open_lunch_date,
		open_dinner_date,
		open_lunch_time,
		open_dinner_time,
	} = data;

	return (
		<div className="py-14 px-16 max-w-[66%] map-border text-center bg:max-w-[75%] bg:p-14 fl:p-10 mat:mx-auto fl:max-w-[80%] mb:max-w-[90%]">
			<h3 className="font-dancing text-[68px] fl:text-[56px] mb-2 fl:text-6xl mb:text-5xl">
				{title}
			</h3>
			<p className="text-lg">{sub}</p>
			<a
				href={`tel:${phone_contact}`}
				className="block font-lora text-primary text-[42px] fl:text-4xl fl:mt-2 mb:text-[28px]"
			>
				{phone_contact}
			</a>

			<div className="pb-8 border-b border-dotted mt-5 border-[#434348]">
				<h4 className="mb-4 text-2xl font-lora mb:text-xl">{location}</h4>
				<p className="text-lg max-w-[60%] mx-auto mat:max-w-[54%] mb:max-w-[80%] mb:text-base">
					{address_contact}
				</p>
			</div>

			<div className="grid grid-cols-2 gap-8 mt-11 fl:mt-8 mb:grid-cols-1 mb:gap-6">
				<div className="flex flex-col justify-center mb:pb-5 mb:border-b-[1.4px] mb:border-[#434348]">
					<h4 className="mb-5 text-1xl font-lora fl:text-lg mb:text-xl">
						{lunch}
					</h4>
					<p className="text-lg mb:text-base">{open_lunch_date}</p>
					<span className="text-lg mb:text-base">{open_lunch_time}</span>
				</div>

				<div className="flex flex-col justify-center">
					<h4 className="mb-5 text-1xl font-lora fl:text-lg mb:text-xl">
						{dinner}
					</h4>
					<p className="text-lg mb:text-base">{open_dinner_date}</p>
					<span className="text-lg mb:text-base">{open_dinner_time}</span>
				</div>
			</div>
		</div>
	);
};

export default HomeContact;
