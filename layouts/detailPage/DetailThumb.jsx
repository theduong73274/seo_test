import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper';
import 'swiper/css/navigation';
import { tmdbAPI } from '../../pages/api/config';

const DetailThumb = ({ data }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	return (
		<>
			<Swiper
				spaceBetween={20}
				navigation={false}
				thumbs={{
					swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
				}}
				modules={[FreeMode, Thumbs]}
				className="p-4 bg-white mb:p-2"
			>
				{data.length > 0 &&
					data.map((item) => (
						<SwiperSlide key={item.id}>
							<div className="pt-[100%] relative overflow-hidden">
								<img
									src={tmdbAPI.imageProduct(item.image_path)}
									alt=""
									className="absolute top-0 left-0 object-cover object-center w-full h-full"
								/>
							</div>
						</SwiperSlide>
					))}
				{/* <SwiperSlide>
					<div className="pt-[100%] relative overflow-hidden">
						<img
							src="https://images.unsplash.com/photo-1666473574287-0424cc6d0946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
							alt=""
							className="absolute top-0 left-0 object-cover object-center w-full h-full"
						/>
					</div>
				</SwiperSlide> */}
			</Swiper>
			<Swiper
				onSwiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={5}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Thumbs]}
				className="mt-3 thumbsSwiper mb:mt-4"
				breakpoints={{
					1024: {
						slidesPerView: 6,
					},
				}}
			>
				{data.length > 0 &&
					data.map((item) => (
						<SwiperSlide key={item.id}>
							<div className="pt-[100%] relative overflow-hidden">
								<img
									src={tmdbAPI.imageProduct(item.image_path)}
									alt=""
									className="absolute top-0 left-0 object-cover object-center w-full h-full"
								/>
							</div>
						</SwiperSlide>
					))}
				{/* <SwiperSlide>
					<div className="pt-[100%] relative overflow-hidden">
						<img
							src="https://images.unsplash.com/photo-1666473574287-0424cc6d0946?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
							alt=""
							className="absolute top-0 left-0 object-cover object-center w-full h-full"
						/>
					</div>
				</SwiperSlide> */}
			</Swiper>
		</>
	);
};

export default DetailThumb;
