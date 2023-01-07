import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineMenu } from 'react-icons/hi';
import { MdOutlineClose } from 'react-icons/md';
// import { Link, NavLink, useNavigate } from 'react-router-dom';
import flagCn from '../../public/image/flagCn.png';
import flagUs from '../../public/image/flagUs.png';
import flagVn from '../../public/image/flagVn.png';
import Button from '../../components/button/Button';
import DropdownHook from '../../components/dropdown/DropdownHook';
import checkLanguage from '../../utils/checkLg';
import HeaderMenu from './HeaderMenu';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
import { NavLink, useLocation } from 'react-router-dom';
import { dataHeader } from '../../data/lgGeneral';

const LanguageData = [
	{
		id: 1,
		value: 'en',
		text: 'English',
		img: flagUs,
	},
	{
		id: 2,
		value: 'vn',
		text: 'VietNam',
		img: flagVn,
	},
	{
		id: 3,
		value: 'cn',
		text: '中国',
		img: flagCn,
	},
];

const Header = ({ language }) => {
	const contentHeader = checkLanguage(language, dataHeader);
	const { btn, nav, nav_mobile } = contentHeader;

	const { v4: uuidv4 } = require('uuid');
	// const navigate = useNavigate();
	// Scroll Header
	const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
	const headerRef = useRef(null);

	// Handle Menu
	// const { show, setShow, nodeRef: dropdownRef1 } = useClickOutSide();
	const [openMenu, setOpenMenu] = useState(false);
	const handleMenu = () => {
		setOpenMenu(!openMenu);
	};

	// Resize Responsive
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});
	const [isMobile, setIsMobile] = useState(false);

	// Scroll Header: handle scroll event
	const handleScroll = (elTopOffset, elHeight) => {
		if (window.pageYOffset > elTopOffset + elHeight) {
			setSticky({ isSticky: true, offset: elHeight });
		} else {
			setSticky({ isSticky: false, offset: 0 });
		}
	};

	// Scroll Header: add/remove scroll event listener
	useEffect(() => {
		var header = headerRef.current.getBoundingClientRect();
		const handleScrollEvent = () => {
			handleScroll(header.top, header.height);
		};

		window.addEventListener('scroll', handleScrollEvent);
		return () => {
			window.removeEventListener('scroll', handleScrollEvent);
		};
	}, []);

	// Resize Responsive
	useEffect(() => {
		const handleSize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		handleSize();
		window.addEventListener('resize', handleSize);
		return () => window.addEventListener('resize', handleSize);
	}, []);

	useEffect(() => {
		if (windowSize.width <= 979) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [windowSize]);

	return (
		<header style={{ marginTop: sticky.offset }}>
			<div
				className={` header${sticky.isSticky ? ' sticky' : ''}`}
				ref={headerRef}
			>
				<div className="relative z-10 flex items-center justify-between py-6 fl:py-3 header-container mb:py-2">
					<div className="min-w-[450px] ft:min-w-[350px] fs:min-w-[250px] mat:min-w-fit">
						<Link href="/">
							<Image
								width={100}
								height={100}
								src="/logo.svg"
								alt="Logo"
								className="object-cover w-full max-w-[210px] mat:max-w-[180px] bg:ml-5 mat:ml-0 mb:max-w-[125px]"
							/>
						</Link>
					</div>

					{isMobile ? (
						<div className="relative flex items-center space-x-7">
							{/* Icon LogIn */}
							{/* <svg
								xmlns="http://www.w3.org/2000/svg"
								width="17.751"
								height="21.204"
								viewBox="0 0 17.751 21.204"
							>
								<g id="user" transform="translate(0.089 0.104)">
									<path
										id="Path_3"
										data-name="Path 3"
										d="M133.443-511.759a5,5,0,0,0-2.908,1.54,4.892,4.892,0,0,0-1.372,3.245,5.036,5.036,0,0,0,2.288,4.452,4.7,4.7,0,0,0,2.312.8,4.915,4.915,0,0,0,4.062-1.5,4.9,4.9,0,0,0,1.425-4,4.882,4.882,0,0,0-1.721-3.355,4.67,4.67,0,0,0-2.567-1.183A5.351,5.351,0,0,0,133.443-511.759Zm1.75,1.29a3.518,3.518,0,0,1,1.672.969,3.55,3.55,0,0,1,1.158,2.366,3.733,3.733,0,0,1-1.006,2.99,4.016,4.016,0,0,1-1.774,1.092,4.136,4.136,0,0,1-2.69-.246,3.956,3.956,0,0,1-2.074-2.587,5.094,5.094,0,0,1,.025-1.849A4.04,4.04,0,0,1,133-510.4,4.444,4.444,0,0,1,135.192-510.469Z"
										transform="translate(-125.576 511.813)"
										fill="#fff"
										stroke="#fff"
										strokeWidth="0.2"
									/>
									<path
										id="Path_4"
										data-name="Path 4"
										d="M46.1-264.741a4.06,4.06,0,0,0-1.791.649c-1.281.871-2.111,2.818-2.3,5.4a5.126,5.126,0,0,0,.353,2.924,3.517,3.517,0,0,0,.994,1.175,4.1,4.1,0,0,0,1.261.567l.37.1h11.5l.37-.095a3.38,3.38,0,0,0,2.53-2.452,10.408,10.408,0,0,0-.049-3.355c-.431-2.67-1.524-4.271-3.253-4.772a4.347,4.347,0,0,0-1.31-.161,3.841,3.841,0,0,0-1.113.592,4.861,4.861,0,0,1-1.3.682,4.347,4.347,0,0,1-1.6.3,4.426,4.426,0,0,1-1.6-.288,5.164,5.164,0,0,1-1.437-.755,5.291,5.291,0,0,0-.92-.509A1.41,1.41,0,0,0,46.1-264.741Zm1.068,1.622a6.375,6.375,0,0,0,1.774.879,5.946,5.946,0,0,0,5.269-.813c.768-.505.752-.5,1.076-.456,1.491.189,2.423,1.442,2.817,3.795a10.6,10.6,0,0,1,.1,2.834,2.116,2.116,0,0,1-1.585,1.651c-.246.07-.571.074-5.889.074s-5.639,0-5.893-.074a2.23,2.23,0,0,1-1.388-1.1,3.111,3.111,0,0,1-.234-1.684,10.587,10.587,0,0,1,.214-2.033,8.223,8.223,0,0,1,.534-1.721,2.828,2.828,0,0,1,2.181-1.746c.152-.021.292-.036.308-.041S46.793-263.356,47.171-263.118Z"
										transform="translate(-41.966 274.922)"
										fill="#fff"
										stroke="#fff"
										strokeWidth="0.2"
									/>
								</g>
							</svg> */}

							<div className="language-select">
								<DropdownHook
									language={language}
									isCheck={isMobile}
									data={LanguageData}
									changeValue={handleSetLanguage}
								></DropdownHook>
							</div>

							<HeaderMenu
								isCheck={isMobile}
								language={language}
								className="!ml-3"
							></HeaderMenu>

							{openMenu ? (
								<MdOutlineClose
									onClick={handleMenu}
									className="ml-1 cursor-pointer"
									size={'30px'}
								/>
							) : (
								<HiOutlineMenu
									size={'30px'}
									className="ml-1 cursor-pointer"
									onClick={handleMenu}
								/>
							)}

							{openMenu && (
								<div
									className="absolute flex z-10 flex-col py-5 rounded-lg bg-[#222226] right-0 min-w-[150px] top-full mt-2 header font-pro gap-y-2 border-[#5e5e5e] border shadow-intro"
									onClick={handleMenu}
								>
									{/* {nav_mobile.length > 0 &&
										nav_mobile.map((item) => (
											<Link
												key={uuidv4()}
												to={`${item.link}`}
												className={({ isActive }) =>
													'pb-[2px] px-7 hover:text-primary' +
													(isActive ? ' text-primary' : '')
												}
											>
												{item.title}
											</Link>
										))} */}
								</div>
							)}
						</div>
					) : (
						<>
							<HeaderNav navLink={nav}></HeaderNav>
							<HeaderInteract
								language={language}
								contentBtn={btn}
							></HeaderInteract>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

function HeaderNav({ navLink }) {
	const { v4: uuidv4 } = require('uuid');
	const router = useRouter();

	return (
		<nav className="flex items-center justify-center uppercase header font-pro gap-x-14 ft:gap-x-10 fs:gap-x-8">
			{navLink.length > 0 &&
				navLink.map((item) => (
					<Link
						key={uuidv4()}
						href={`/${item.link}`}
						className={`pb-[2px]${
							router.pathname == `/${item.link}`
								? ' border-b-[1.4px] border-primary text-primary'
								: ''
						}`}
					>
						{item.title}
					</Link>
				))}
		</nav>
	);
}

function HeaderInteract({ language, contentBtn }) {
	const router = useRouter();
	return (
		<div className="flex items-center gap-12">
			<div className="flex items-center gap-5">
				<div className="language-select">
					<DropdownHook language={language} data={LanguageData}></DropdownHook>
				</div>

				<button onClick={() => router.push('/menu')}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="#fff"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</button>

				{/* Icon LogIn */}
				{/* <svg
					xmlns="http://www.w3.org/2000/svg"
					width="17.751"
					height="21.204"
					viewBox="0 0 17.751 21.204"
				>
					<g id="user" transform="translate(0.089 0.104)">
						<path
							id="Path_3"
							data-name="Path 3"
							d="M133.443-511.759a5,5,0,0,0-2.908,1.54,4.892,4.892,0,0,0-1.372,3.245,5.036,5.036,0,0,0,2.288,4.452,4.7,4.7,0,0,0,2.312.8,4.915,4.915,0,0,0,4.062-1.5,4.9,4.9,0,0,0,1.425-4,4.882,4.882,0,0,0-1.721-3.355,4.67,4.67,0,0,0-2.567-1.183A5.351,5.351,0,0,0,133.443-511.759Zm1.75,1.29a3.518,3.518,0,0,1,1.672.969,3.55,3.55,0,0,1,1.158,2.366,3.733,3.733,0,0,1-1.006,2.99,4.016,4.016,0,0,1-1.774,1.092,4.136,4.136,0,0,1-2.69-.246,3.956,3.956,0,0,1-2.074-2.587,5.094,5.094,0,0,1,.025-1.849A4.04,4.04,0,0,1,133-510.4,4.444,4.444,0,0,1,135.192-510.469Z"
							transform="translate(-125.576 511.813)"
							fill="#fff"
							stroke="#fff"
							strokeWidth="0.2"
						/>
						<path
							id="Path_4"
							data-name="Path 4"
							d="M46.1-264.741a4.06,4.06,0,0,0-1.791.649c-1.281.871-2.111,2.818-2.3,5.4a5.126,5.126,0,0,0,.353,2.924,3.517,3.517,0,0,0,.994,1.175,4.1,4.1,0,0,0,1.261.567l.37.1h11.5l.37-.095a3.38,3.38,0,0,0,2.53-2.452,10.408,10.408,0,0,0-.049-3.355c-.431-2.67-1.524-4.271-3.253-4.772a4.347,4.347,0,0,0-1.31-.161,3.841,3.841,0,0,0-1.113.592,4.861,4.861,0,0,1-1.3.682,4.347,4.347,0,0,1-1.6.3,4.426,4.426,0,0,1-1.6-.288,5.164,5.164,0,0,1-1.437-.755,5.291,5.291,0,0,0-.92-.509A1.41,1.41,0,0,0,46.1-264.741Zm1.068,1.622a6.375,6.375,0,0,0,1.774.879,5.946,5.946,0,0,0,5.269-.813c.768-.505.752-.5,1.076-.456,1.491.189,2.423,1.442,2.817,3.795a10.6,10.6,0,0,1,.1,2.834,2.116,2.116,0,0,1-1.585,1.651c-.246.07-.571.074-5.889.074s-5.639,0-5.893-.074a2.23,2.23,0,0,1-1.388-1.1,3.111,3.111,0,0,1-.234-1.684,10.587,10.587,0,0,1,.214-2.033,8.223,8.223,0,0,1,.534-1.721,2.828,2.828,0,0,1,2.181-1.746c.152-.021.292-.036.308-.041S46.793-263.356,47.171-263.118Z"
							transform="translate(-41.966 274.922)"
							fill="#fff"
							stroke="#fff"
							strokeWidth="0.2"
						/>
					</g>
				</svg> */}

				<HeaderMenu language={language}></HeaderMenu>
			</div>
			<Link href={'/contact'}>
				<Button>{contentBtn}</Button>
			</Link>
		</div>
	);
}

export default Header;
