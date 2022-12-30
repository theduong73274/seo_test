import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { handleChangeLg } from '../../utils/checkLg';
import avatar from '../../public/image/avatar.webp';

const Feedback = ({ textLg, language, data }) => {
	const { v4: uuidv4 } = require('uuid');
	const commentFeedback = handleChangeLg(language, data, 'home_review');
	const userFeedback = handleChangeLg(language, data, 'home_user_review');
	const listFeedback = commentFeedback.map((item, index) => ({
		comment: item,
		user: userFeedback[index],
	}));

	return (
		<div className="flex items-center page-container gap-x-28 fl:gap-x-20 mat:flex-col-reverse mat:gap-y-14 mb:gap-y-8">
			<div className="max-w-[555px] feedback-item shadow-item pb-10 select-none mb:max-w-[100%]">
				<Swiper pagination={true} modules={[Pagination]} slidesPerView={1}>
					{listFeedback.length > 0 &&
						listFeedback.map((item) => (
							<SwiperSlide key={uuidv4()}>
								<div className="px-20 pt-12 mb:px-8 mb:pt-10">
									<p className="text-1xl font-voll">{`“${item.comment}”`}</p>

									<div className="flex items-center mt-6 gap-7">
										<img
											src={avatar.src}
											alt=""
											className="w-full h-full max-w-[100px]"
										/>
										<div className="">
											<h3 className="text-lg uppercase text-primary">
												{item.user}
											</h3>
											<p className="text-[#94949E] mt-[2px]">Actuary</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>

			<h2 className="text-[68px] max-w-[46%] font-dancing leading-tight fl:text-[52px] fl:max-w-[100%] mat:max-w-[82%] mb:max-w-[100%] mat:text-center mb:text-4xl mb:leading-snug">
				{textLg.title}
			</h2>
		</div>
	);
};

export default Feedback;
