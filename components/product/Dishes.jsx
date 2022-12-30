import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { tmdbAPI } from '../../pages/api/config';
import { addToCart } from '../../redux/cartSlice';
import LoadingSkeleton from '../loading/LoadingSkeleton';
// import dish1 from '../../assets/image/dish-1.png';
import { useDispatch } from 'react-redux';
import { changePath200 } from '../../utils';
import { handleChangeLg } from '../../utils/checkLg';
import Link from 'next/link';

const Dishes = ({ data, language }) => {
	const dispatch = useDispatch();
	const { price, slug, feature_image_path, discount } = data;
	const [isActive, setIsActive] = useState(false);

	const handleAddCart = () => {
		dispatch(addToCart(data));
		setIsActive((current) => !current);

		setTimeout(() => {
			setIsActive((current) => !current);
		}, 1100);
	};

	const handleBtnSeeMore = () => {
		window.scrollTo({
			top: 100,
			behavior: 'smooth',
		});
	};

	return (
		<div className="relative flex bg-no-repeat select-none gap-x-8 pb-7 mb:pb-16">
			<div className="relative w-[80%] mb:w-[92%] text-primary dishes-item bg-[#16181D] pl-5 pr-24 pt-4 pb-3 mat:max-w-[90%] mat:pr-[90px]">
				<img
					src={
						tmdbAPI.imageProduct(changePath200(feature_image_path)) ||
						tmdbAPI.imageProduct(feature_image_path)
					}
					// src={dish1}
					alt={handleChangeLg(language, data, 'name')}
					className="absolute top-0 left-full w-[210px] h-[210px] object-cover object-center rounded-full -translate-x-2/4 mat:max-w-[134px] mat:max-h-[134px] mat:top-0 mat:-translate-y-0 mat:left-[89%]"
				/>

				<h3 className="inline-block mb-2 min-h-[33px] text-1xl font-lora dishes-line mat:text-xl mat:min-h-[56px]">
					{handleChangeLg(language, data, 'name')}
				</h3>
				<p className="text-[#94949E] min-h-[48px] line-clamp-3 pr-[18px]">
					{handleChangeLg(language, data, 'content')}
				</p>

				<span className="block mt-2 font-lora text-1xl mat:mb-7">
					₱{price - (price * discount) / 100}
				</span>

				<button
					className="flex ml-auto text-xl mat:absolute mat:right-6 mat:bottom-4"
					onClick={handleBtnSeeMore}
				>
					<Link href={`/menu/${slug}`}>
						{language === 'Cn'
							? '看更多'
							: language === 'Vn'
							? 'Xem thêm'
							: 'See more'}
					</Link>
				</button>

				<div
					className={`absolute cursor-pointer hover:opacity-90 left-5 bottom-0 bg-primary p-[14px] rounded-lg translate-y-2/4 ${
						isActive ? 'btn-add' : ''
					}`}
					onClick={handleAddCart}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 16 16"
					>
						<g
							id="Group_2657"
							data-name="Group 2657"
							transform="translate(-36.5 -168)"
						>
							<rect
								id="Rectangle_43"
								data-name="Rectangle 43"
								width="3"
								height="16"
								transform="translate(43 168)"
								fill="#fff"
							/>
							<rect
								id="Rectangle_44"
								data-name="Rectangle 44"
								width="3"
								height="16"
								transform="translate(52.5 174.5) rotate(90)"
								fill="#fff"
							/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	);
};

Dishes.propTypes = {
	item: PropTypes.shape({
		slug: PropTypes.string,
		price: PropTypes.number,
		discount: PropTypes.number,
		feature_image_path: PropTypes.string,
	}),
};

// function FallbackComponent() {
// 	return (
// 		<p className="text-red-400 bg-red-50">
// 			Something went wrong with this components
// 		</p>
// 	);
// }

// export default withErrorBoundary(Dishes, {
// 	FallbackComponent,
// });

export default Dishes;

export function DishSkeleton() {
	return (
		<div className="relative flex bg-no-repeat select-none gap-x-8 pb-7">
			<div className="relative w-[80%] text-primary dishes-item bg-[#16181D] pl-5 pr-24 pt-4 pb-3 mat:max-w-[90%] mat:pr-[90px]">
				<LoadingSkeleton
					className="absolute top-0 left-full w-[210px] h-[210px] object-cover object-center rounded-full -translate-x-2/4 mat:max-w-[134px] mat:max-h-[134px] mat:top-0 mat:-translate-y-0 mat:left-[99%]"
					width="210px"
					height="210px"
				/>
				<h4 className="block mb-2 text-1xl font-lora dishes-line mat:text-lg ">
					<LoadingSkeleton width="100%" height="30px" radius="8px" />
				</h4>
				<LoadingSkeleton width="100%" height="72px" radius="8px" />

				<span className="block mt-2 font-lora text-1xl mat:mb-7">
					<LoadingSkeleton width="30%" height="30px" radius="8px" />
				</span>
				<LoadingSkeleton
					className="flex ml-auto text-xl mat:absolute mat:right-6 mat:bottom-4"
					width="77px"
					height="28px"
					radius="8px"
				/>

				<LoadingSkeleton
					className="absolute cursor-pointer hover:opacity-90 left-5 bottom-0 bg-primary p-[14px] rounded-lg translate-y-2/4"
					width="46px"
					height="46px"
				/>
			</div>
		</div>
	);
}
