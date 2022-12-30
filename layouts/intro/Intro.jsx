import React from 'react';
import Button from '../../components/button/Button';
import { handleChangeLg } from '../../utils/checkLg';
import * as DOMPurify from 'dompurify';
import { tmdbAPI } from '../../pages/api/config';
import { changePathWebp } from '../../utils';
import Link from 'next/link';

const Intro = ({ subText, language, data }) => {
	const { home_library_images } = data;
	const { btn, title } = subText;
	const listImage = home_library_images.filter((item, index) => index < 2);

	const safeDescription = DOMPurify.sanitize(
		handleChangeLg(language, data, 'home_tutorial')
	);

	return (
		<>
			<div className="max-w-[305px] mat:max-w-[80%] mat:mt-10">
				<p className="text-xl text-center font-lora mb:text-base mb:mb-2">
					{title}
				</p>
				<h2 className="text-7xl text-primary font-dancing mat:text-center mb:text-6xl">
					Bosong
				</h2>

				<div
					className="text-[#94949E] space-y-7 mt-7"
					dangerouslySetInnerHTML={{ __html: safeDescription }}
				></div>

				<Button className="block fl:mx-auto btn-button mt-[58px] mat:mt-11 ft:mx-auto">
					<Link href="/about">{btn}</Link>
				</Button>
			</div>

			<div className="flex items-center justify-between space-x-10 mat:space-x-0">
				{listImage.length > 0 &&
					listImage.map((item) => (
						<img
							key={item.id}
							src={changePathWebp(tmdbAPI.imageProduct(item.image_path))}
							alt="dish.jpg"
							className="shadow-intro fl:max-w-[362px] mat:max-w-[48%] mb:object-cover mb:w-full"
						/>
					))}
			</div>
		</>
	);
};

export default Intro;
