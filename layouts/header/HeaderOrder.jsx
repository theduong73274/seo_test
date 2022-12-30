import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tmdbAPI } from '../../pages/api/config';
import imgNoCart from '../../public/image/cart-empty.png';
import { dataHeaderOrder } from '../../data/lgGeneral';
import { clear, decrement, increment } from '../../redux/cartSlice';
import { cartTotalPriceSelector } from '../../redux/selectors';
import { toggleHide } from '../../redux/uiSlice';
import { changePath100 } from '../../utils';
import checkLanguage, { handleChangeLg } from '../../utils/checkLg';
import { Router, useRouter } from 'next/router';

const HeaderOrder = ({ handleBtnCopy, isCheck = '', language, ...props }) => {
	const cart = useSelector((state) => state.cart);
	const totalPrice = useSelector(cartTotalPriceSelector);

	const contentPage = checkLanguage(language, dataHeaderOrder);
	const { title, description, button } = contentPage;

	return (
		<div {...props}>
			<div
				className={`border-primary ${
					cart.length > 0 ? 'border-b-[1.4px]' : ''
				} overflow-y-scroll overflow-x-hidden scroll-menu transition-all ${
					isCheck ? 'border-b-0' : 'max-h-[412px] mat:max-h-[312px]'
				} ${cart.length > 0 && isCheck ? 'h-full' : 'h-auto'}
				`}
			>
				{cart.length > 0 &&
					cart.map((cartItem) => (
						<DropdownItem
							key={cartItem.id}
							data={cartItem}
							isCheck={isCheck}
							language={language}
						></DropdownItem>
					))}
			</div>
			{/* <div className="py-[14px] px-[18px] border-b-[1.4px] border-primary flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<p className="text-[#C1B8AA]">Subtotal</p>
							<span className="font-lora">₱1.800</span>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-[#C1B8AA]">Shipping</p>
							<span className="font-lora">₱120</span>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-[#C1B8AA]">Taxes</p>
							<span className="font-lora">₱0.00</span>
						</div>
					</div> */}
			{cart.length > 0 ? (
				<div
					className={`px-[18px] flex flex-col space-y-3 ${
						isCheck
							? 'min-h-[165px] w-full border-t-[1.4px] border-primary pt-[14px] py-0 mb-8'
							: 'max-h-[412px] mat:max-h-[312px] py-[14px]'
					}`}
				>
					<div className="flex items-center justify-between">
						<p className="text-[#C1B8AA]">{title}</p>
						<span className="font-lora">₱{totalPrice}</span>
					</div>
					<p className="text-center text-[#C1B8AA] leading-snug text-[15px]">
						{description}
					</p>
					<button
						className="w-full p-2 mt-1 font-semibold tracking-widest text-gray-900 uppercase hover:opacity-80 font-pro bg-primary"
						onClick={handleBtnCopy}
					>
						{button}
					</button>
				</div>
			) : (
				<div className="p-8 animate-fade-in">
					<img src={imgNoCart.src} alt="No Products" />
					<p className="w-[80%] mx-auto font-lora text-lg text-primary font-bold mt-5 text-center">
						{language === 'Cn'
							? '您的购物车是空的'
							: language === 'Vn'
							? 'Your Cart Is Empty'
							: 'Your Cart Is Empty'}
					</p>
				</div>
			)}
		</div>
	);
};

const DropdownItem = ({ data, isCheck = '', language }) => {
	const [addClass, setAddClass] = useState(false);
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const router = useRouter();

	const {
		feature_image_path,
		feature_image_name,
		discount,
		price,
		quantity,
		id,
		slug,
	} = data;

	const handleRemoveItems = () => {
		setAddClass(true);
		setTimeout(() => {
			dispatch(clear(id));
		}, 500);
	};

	const handleClickItems = () => {
		// navigate(`/${slug}`);
		router.push(`/${slug}`);
		dispatch(toggleHide());
	};

	return (
		<div
			className={`relative flex items-center space-x-3 last:border-0 transition-all py-[14px] ${
				isCheck ? 'pr-6 mx-0' : 'pr-[24px] mx-[14px]'
			} border-b border-primary ${addClass ? 'animate-move-in' : ''}`}
		>
			<div className="min-w-[100px] h-[100px] w-[100px] mb:h-[95px] mb:w-[95px] mb:min-w-[95px]">
				<img
					src={
						tmdbAPI.imageProduct(changePath100(feature_image_path)) ||
						tmdbAPI.imageProduct(feature_image_path)
					}
					alt={feature_image_name}
					className="object-cover object-center w-full h-full rounded-full"
				/>
			</div>

			<div className="w-full">
				<h3
					className="mb-2 text-lg cursor-pointer font-lora"
					onClick={handleClickItems}
				>
					{handleChangeLg(language, data, 'name')}
				</h3>

				<p className="mb-1 text-lg font-lora text-primary">
					₱{price - (price * discount) / 100}
				</p>

				<div className="flex items-center space-x-6 select-none">
					<span
						className="cursor-pointer"
						onClick={() => {
							if (quantity > 1) dispatch(decrement(id));
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="10"
							height="3"
							viewBox="0 0 8 1"
						>
							<line
								id="Line_5"
								data-name="Line 5"
								x2="8"
								transform="translate(0 0.5)"
								fill="none"
								stroke="#eee8e3"
								strokeWidth="1"
							/>
						</svg>
					</span>

					<span className="text-lg font-lora min-w-[18px] text-center">
						{quantity}
					</span>

					<span
						className="cursor-pointer"
						onClick={() => {
							dispatch(increment(id));
						}}
					>
						<svg
							xmlns="http:www.w3.org/2000/svg"
							width="10"
							height="10"
							viewBox="0 0 8 8"
						>
							<g
								id="Group_162"
								data-name="Group 162"
								transform="translate(14012 -3271)"
							>
								<line
									id="Line_6"
									data-name="Line 6"
									x2="8"
									transform="translate(-14012 3275)"
									fill="none"
									stroke="#eee8e3"
									strokeWidth="1"
								/>
								<line
									id="Line_7"
									data-name="Line 7"
									y2="8"
									transform="translate(-14008 3271)"
									fill="none"
									stroke="#eee8e3"
									strokeWidth="1"
								/>
							</g>
						</svg>
					</span>
				</div>

				<span
					className={`absolute top-[18px] cursor-pointer ${
						isCheck ? 'right-2' : 'right-[4px]'
					}`}
					onClick={handleRemoveItems}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="13"
						height="13"
						viewBox="0 0 10.828 10.829"
						className={`${isCheck ? 'w-4 h-4' : ''}`}
					>
						<g id="x" transform="translate(-4.781 -4.977)">
							<line
								id="Line_8"
								data-name="Line 8"
								x1="8"
								y2="8"
								transform="translate(6.195 6.391)"
								fill="none"
								stroke="#c1b8aa"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
							<line
								id="Line_9"
								data-name="Line 9"
								x2="8"
								y2="8"
								transform="translate(6.195 6.391)"
								fill="none"
								stroke="#c1b8aa"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>
						</g>
					</svg>
				</span>
			</div>
		</div>
	);
};

export default HeaderOrder;
