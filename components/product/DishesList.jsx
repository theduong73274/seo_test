import React, { useRef } from 'react';
import Dishes, { DishSkeleton } from './Dishes';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import { fetcher, tmdbAPI } from '../../pages/api/config';
import { withErrorBoundary } from 'react-error-boundary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Navigation } from 'swiper';

const DishesList = ({ value = [], initialGird = 3, language }) => {
	const { data, error } = useSWR(
		tmdbAPI.getDishList(JSON.stringify(value)),
		fetcher
	);
	const isLoading = !data && !error;
	const dishes = data?.data || [];

	const prevRef = useRef(null);
	const nextRef = useRef(null);

	return (
		<div className="relative mt-16 transition-all fl:mt-12 dishes-list mb:mt-[84px]">
			{isLoading && (
				<Swiper
					navigation={true}
					spaceBetween={30}
					slidesPerView={1}
					simulateTouch={false}
					allowTouchMove={true}
					grid={{
						rows: 3,
					}}
					breakpoints={{
						1600: {
							grid: {
								rows: initialGird,
							},
							slidesPerView: 2,
						},
						1024: {
							simulateTouch: false,
							spaceBetween: 30,
							slidesPerView: 2,
							grid: {
								rows: 2,
							},
						},
						475: {
							grid: {
								rows: 2,
							},
							slidesPerView: 2,
						},
					}}
					onInit={(swiper) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
						swiper.navigation.init();
						swiper.navigation.update();
					}}
					modules={[Grid, Navigation]}
				>
					<SwiperSlide>
						<DishSkeleton></DishSkeleton>
					</SwiperSlide>
					<SwiperSlide>
						<DishSkeleton></DishSkeleton>
					</SwiperSlide>
					<SwiperSlide>
						<DishSkeleton></DishSkeleton>
					</SwiperSlide>
					<SwiperSlide>
						<DishSkeleton></DishSkeleton>
					</SwiperSlide>
					<SwiperSlide>
						<DishSkeleton></DishSkeleton>
					</SwiperSlide>
					<SwiperSlide>
						<DishSkeleton></DishSkeleton>
					</SwiperSlide>
				</Swiper>
			)}

			{!isLoading && (
				<Swiper
					navigation={true}
					spaceBetween={16}
					slidesPerView={1}
					simulateTouch={true}
					grid={{
						rows: 3,
					}}
					breakpoints={{
						1600: {
							grid: {
								rows: initialGird,
							},
							slidesPerView: 2,
						},
						1024: {
							simulateTouch: false,
							spaceBetween: 30,
							slidesPerView: 2,
							grid: {
								rows: 2,
							},
						},
						475: {
							grid: {
								rows: 2,
							},
							slidesPerView: 2,
						},
					}}
					onInit={(swiper) => {
						swiper.params.navigation.prevEl = prevRef.current;
						swiper.params.navigation.nextEl = nextRef.current;
						swiper.navigation.init();
						swiper.navigation.update();
					}}
					modules={[Grid, Navigation]}
				>
					{dishes.length > 0 &&
						dishes.map((item, index) => (
							<SwiperSlide key={item.id}>
								<Dishes data={item} language={language}></Dishes>
							</SwiperSlide>
						))}
				</Swiper>
			)}

			<div
				ref={prevRef}
				className="absolute mr-12 cursor-pointer bl:mr-8 right-full top-2/4 -translate-y-2/4 ft:top-auto ft:bottom-full ft:-translate-y-full ft:right-auto ft:left-0 mb:bottom-[99%]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="60.726"
					height="37.379"
					viewBox="0 0 60.726 37.379"
				>
					<g
						id="arrowleft_1_"
						data-name="arrowleft (1)"
						transform="translate(-0.52 63)"
					>
						<path
							id="Path_663"
							data-name="Path 663"
							d="M53.254-61.991a39.9,39.9,0,0,1-5.7,10.5l-2.017,2.314-3.975-1.9C28.809-57.186,12.79-55.287,2.585-46.446-.56-43.717-.5-43.6,5.492-39.623a36.53,36.53,0,0,0,35.718,2.67l4.153-1.9,1.721,1.661c1.839,1.78,5.933,9.078,5.933,10.62,0,.653.534.949,1.78.949,1.661,0,1.78-.119,1.424-1.661a34.928,34.928,0,0,0-5.7-10.858c-2.967-3.738-2.373-4.687.771-1.187,2.492,2.729,5.637,8.781,6.23,11.866.356,1.543.653,1.839,2.077,1.839,1.6,0,1.721-.119,1.365-1.6a37.583,37.583,0,0,0-7.179-14.24L51.83-43.955,54.8-48.048A39.017,39.017,0,0,0,61.026-61.1c.415-1.9.356-1.958-1.187-1.78-1.365.178-1.721.712-2.729,3.56a30.724,30.724,0,0,1-5.755,10.442c-2.729,3.441-3.56,2.551-.89-.949A43.479,43.479,0,0,0,56.339-61.4c.356-1.424.237-1.6-1.187-1.6A1.877,1.877,0,0,0,53.254-61.991ZM31.776-51.074c3.857.831,10.561,3.441,10.561,4.094,0,.831-.8.967-1.483.593a29.718,29.718,0,0,0-5.1-2.077,36.76,36.76,0,0,0-17.74-.771c-3.56.831-10.205,3.975-10.5,5.043-.3.949,5.933,4.094,10.324,5.221,6.408,1.661,15.96.771,21.419-2.017,1.246-.653,2.611-.949,3.026-.712,1.78,1.127-11.214,5.34-16.435,5.4-5.577,0-15.664-3.441-19.995-6.823-1.187-.949-1.187-.949.3-2.077A33.8,33.8,0,0,1,31.776-51.074Zm.178,4.747c3.441.89,5.637,1.78,5.637,2.314,0,.89-5.577,2.433-9.79,2.789a27.284,27.284,0,0,1-12.638-1.958l-2.2-.89,2.077-.89C19.672-46.921,27.326-47.574,31.954-46.328Z"
							transform="translate(0)"
							fill="#f5c336"
						/>
						<path
							id="Path_664"
							data-name="Path 664"
							d="M.911.911,3.16.682,2.944,2.944.6,3.242Z"
							transform="translate(45.896 -47.096) rotate(45)"
							fill="#2c2c2f"
						/>
					</g>
				</svg>
			</div>

			<div
				ref={nextRef}
				className="absolute ml-6 cursor-pointer ft:top-auto ft:bottom-full ft:-translate-y-full ft:right-0 ft:left-auto left-full top-2/4 -translate-y-2/4 mb:bottom-[99%]"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="60.726"
					height="37.379"
					viewBox="0 0 60.726 37.379"
				>
					<g
						id="arrowleft_1_"
						data-name="arrowleft (1)"
						transform="translate(0)"
					>
						<path
							id="Path_663"
							data-name="Path 663"
							d="M8.513-61.991a39.9,39.9,0,0,0,5.7,10.5l2.017,2.314,3.975-1.9c12.756-6.111,28.776-4.213,38.981,4.628,3.145,2.729,3.085,2.848-2.907,6.823a36.53,36.53,0,0,1-35.718,2.67l-4.153-1.9-1.721,1.661c-1.839,1.78-5.933,9.078-5.933,10.62,0,.653-.534.949-1.78.949-1.661,0-1.78-.119-1.424-1.661a34.928,34.928,0,0,1,5.7-10.858c2.967-3.738,2.373-4.687-.771-1.187C7.979-36.6,4.834-30.546,4.241-27.46c-.356,1.543-.653,1.839-2.077,1.839-1.6,0-1.721-.119-1.365-1.6a37.583,37.583,0,0,1,7.179-14.24l1.958-2.492L6.97-48.048A39.017,39.017,0,0,1,.74-61.1c-.415-1.9-.356-1.958,1.187-1.78,1.365.178,1.721.712,2.729,3.56a30.724,30.724,0,0,0,5.755,10.442c2.729,3.441,3.56,2.551.89-.949A43.479,43.479,0,0,1,5.427-61.4C5.071-62.822,5.19-63,6.614-63A1.877,1.877,0,0,1,8.513-61.991ZM29.991-51.074c-3.857.831-10.561,3.441-10.561,4.094,0,.831.8.967,1.483.593a29.719,29.719,0,0,1,5.1-2.077,36.76,36.76,0,0,1,17.74-.771c3.56.831,10.205,3.975,10.5,5.043.3.949-5.933,4.094-10.324,5.221-6.408,1.661-15.96.771-21.419-2.017-1.246-.653-2.611-.949-3.026-.712-1.78,1.127,11.214,5.34,16.435,5.4,5.577,0,15.664-3.441,19.995-6.823,1.187-.949,1.187-.949-.3-2.077A33.8,33.8,0,0,0,29.991-51.074Zm-.178,4.747c-3.441.89-5.637,1.78-5.637,2.314,0,.89,5.577,2.433,9.79,2.789A27.284,27.284,0,0,0,46.6-43.183l2.2-.89-2.077-.89C42.094-46.921,34.441-47.574,29.813-46.328Z"
							transform="translate(-0.52 63)"
							fill="#f5c336"
						/>
						<path
							id="Path_664"
							data-name="Path 664"
							d="M.312,2.331l2.248.229L2.345.3,0,0Z"
							transform="translate(17.219 18.621) rotate(135)"
							fill="#2c2c2f"
						/>
					</g>
				</svg>
			</div>
		</div>
	);
};

DishesList.propTypes = {
	value: PropTypes.array.isRequired,
	initialGird: PropTypes.number,
	language: PropTypes.string.isRequired,
};

// export default DishesList;
function FallbackComponent() {
	return (
		<p className="text-red-400 bg-red-50">
			Something went wrong with this components
		</p>
	);
}

export default withErrorBoundary(DishesList, {
	FallbackComponent,
});
