import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutsideClick } from '../../hooks/useOutSide';

import ModalToast from '../../components/modal/ModalToast';
import OffcanvasMenu from '../../components/modal/OffcanvasMenu';
import { dataHeader } from '../../data/lgGeneral';
import {
	cartTotalPriceSelector,
	cartTotalSelector,
} from '../../redux/selectors';
import { toggle, toggleHide } from '../../redux/uiSlice';
import checkLanguage, { handleChangeLg } from '../../utils/checkLg';
import HeaderOrder from './HeaderOrder';

const HeaderMenu = ({ isCheck = '', language, className }) => {
	const contentHeader = checkLanguage(language, dataHeader);
	const { modal } = contentHeader;
	const total = useSelector(cartTotalSelector);
	const ui = useSelector((state) => state.ui);
	const dispatch = useDispatch();
	const [change, setChange] = useState(false);

	const [addClass, setAddClass] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const cart = useSelector((state) => state.cart);
	const totalPrice = useSelector(cartTotalPriceSelector);

	useEffect(() => {
		if (total !== 0) {
			setChange(true);

			setTimeout(() => {
				setChange(false);
			}, 1000);
		}
	}, [total]);

	const handleClickOutside = () => {
		if (!isCheck) {
			dispatch(toggleHide());
		}
	};

	const ref = useOutsideClick(handleClickOutside);

	const handleCopyWrite = () => {
		const textContext = `=== Items ===
		${cart
			.map(
				(itemCart) =>
					`\n${itemCart.quantity} x ${itemCart.name} - ${
						language !== 'En' ? handleChangeLg(language, itemCart, 'name') : ''
					} - ₱${itemCart.price - (itemCart.price * itemCart.discount) / 100}${
						itemCart.discount !== 0
							? ` *(discounted : ₱${itemCart.discount})`
							: ''
					}\n------------------------------------------`
			)
			.join(' ')}
		\nTotal: - ₱${totalPrice}
		\n=== End of Order ===`;

		// console.log('🚀 ~ DropdownList ~ totalPrice', totalPrice);
		// console.log('🚀 ~ DropdownList ~ cart', cart);

		navigator.clipboard.writeText(textContext);
		setOpenModal(true);
		dispatch(toggleHide());
	};

	const handleCloseOffcanvas = () => {
		setAddClass(true);
		setTimeout(() => {
			dispatch(toggleHide());
			setAddClass(false);
		}, 500);
	};

	return (
		<>
			<div className={`relative ${className}`} ref={ref}>
				<div
					className="cursor-pointer select-none"
					onClick={() => {
						dispatch(toggle());
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="17.731"
						height="21"
						viewBox="0 0 17.731 21"
					>
						<g id="shopping-bag" transform="translate(0 0)">
							<path
								id="Path_2"
								data-name="Path 2"
								d="M79.65-474.769a4.749,4.749,0,0,0-4.25,4.582v.494l-.9.02c-.86.014-.917.019-1.176.144a1.833,1.833,0,0,0-1.047,1.335c-.082.49-.922,12.528-.893,12.817a1.912,1.912,0,0,0,1.124,1.455l.274.11H87.717l.274-.11a1.912,1.912,0,0,0,1.124-1.455c.029-.289-.812-12.322-.893-12.812a1.98,1.98,0,0,0-.154-.5,2.043,2.043,0,0,0-.869-.831c-.288-.135-.327-.14-1.2-.154l-.9-.02v-.389a4.785,4.785,0,0,0-1.393-3.256,4.783,4.783,0,0,0-2.929-1.436A3.853,3.853,0,0,0,79.65-474.769Zm1.441,1.609a3.352,3.352,0,0,1,2.473,3.126v.351H76.937v-.351a3.647,3.647,0,0,1,.091-.715A3.332,3.332,0,0,1,81.091-473.16Zm-5.666,7.04-.034,2.031.11.163a.771.771,0,0,0,.581.375.75.75,0,0,0,.716-.355l.115-.182.014-2.031.014-2.027h6.617l.014,2.027.014,2.031.115.182a.75.75,0,0,0,.716.355.756.756,0,0,0,.576-.37c.106-.158.106-.163.106-2.189v-2.036h.744c.715,0,.744,0,.812.105.053.082.178,1.633.509,6.325l.442,6.219-.106.086c-.1.082-.432.086-7.251.086s-7.15,0-7.251-.086l-.106-.086.442-6.219c.331-4.691.456-6.243.509-6.325.067-.1.091-.105.84-.105h.773Z"
								transform="translate(-71.385 474.813)"
								fill={`${ui.cartDrawerVisible ? '#F5C336' : '#fff'} `}
							/>
						</g>
					</svg>
					<span
						className={`absolute text-[#000] font-pro font-medium text-sm top-[-10px] right-[-22px] px-[6px] rounded-[50%] bg-primary ${
							change ? 'animate-bounce' : ''
						} `}
					>
						{total}
					</span>
				</div>

				{!isCheck && ui.cartDrawerVisible && (
					<HeaderOrder
						className={`absolute mt-4 border right-0 z-20 select-none transition-all top-full border-primary w-[350px] bg-[#222224] overflow-hidden ${
							ui.cartDrawerVisible ? 'fade-menu-active' : 'fade-menu-hide'
						}`}
						handleBtnCopy={handleCopyWrite}
						language={language}
					></HeaderOrder>
				)}

				{isCheck && ui.cartDrawerVisible && (
					<OffcanvasMenu
						language={language}
						isCheck={isCheck}
						onBtnCopy={handleCopyWrite}
						onClose={handleCloseOffcanvas}
						bodyClassName={`h-full w-full ml-auto mat:max-w-[80%] bg-[#222226] pl-2 pr-2 py-2 ${
							addClass ? 'animate-move-in' : 'animate-offcanvas-in'
						}`}
					></OffcanvasMenu>
				)}
			</div>

			<ModalToast
				visible={openModal}
				contextLg={modal}
				onClose={() => setOpenModal(false)}
				// heading="Copy Order Success!"
				bodyClassName="w-full max-w-[34%] ft:max-w-[44%] mat:max-w-[70%] mb:max-w-[86%] bg-[#222226] p-10 mb:px-6 rounded-lg"
			></ModalToast>
		</>
	);
};

export default HeaderMenu;
