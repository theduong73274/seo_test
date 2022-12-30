import React from 'react';
import { RiContactsFill } from 'react-icons/ri';
import {
	SiFacebook,
	SiSkype,
	SiTelegram,
	SiViber,
	SiWechat,
} from 'react-icons/si';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../pages/api/config';
import TooltipAdvanced from '../tooltip/TooltipAdvanced';
import ModalBase from './ModalBase';

const ModalToast = ({ children, contextLg, ...props }) => {
	const { v4: uuidv4 } = require('uuid');
	const { data } = useSWR(tmdbAPI.getCategory('settings'), fetcher);
	if (!data) return null;

	const {
		telegram_contact,
		zalo_contact,
		viber_contact,
		facebook_contact,
		wechat_contact,
		sky_contact,
		other_contact,
	} = data;

	return (
		<ModalBase {...props}>
			<span
				onClick={props.onClose}
				className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 p-1 bg-[#5f5f5f] rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
						fill="#fff"
					/>
				</svg>
			</span>

			<h2 className="mb-7 text-[34px] mat:text-3xl font-semibold text-center text-green-600 font-lora mb:text-2xl">
				{contextLg.title}
			</h2>

			<div className="text-center text-1xl mb:text-lg mb:max-w-[80%] mb:mx-auto">
				{contextLg.description.length > 0 &&
					contextLg.description.map((item) => <p key={uuidv4()}>{item}</p>)}
			</div>
			<div className="flex flex-wrap justify-center w-full mx-auto mt-10 space-x-8 item-center mb:mt-6">
				{telegram_contact && (
					<a
						href={telegram_contact}
						target="_blank"
						rel="noreferrer"
						className="mb-6"
					>
						<TooltipAdvanced title="Telegram">
							<SiTelegram
								size={'38px'}
								className="cursor-pointer hover:bg-[#ffffff] hover:fill-[#0088cc] rounded-full transition-all"
							/>
						</TooltipAdvanced>
					</a>
				)}

				{zalo_contact && (
					<a
						href={zalo_contact}
						target="_blank"
						rel="noreferrer"
						className="mb-5"
					>
						<TooltipAdvanced title="Zalo">
							<svg
								className="hover:bg-[#028FE3] rounded-full transition-all"
								xmlns="http://www.w3.org/2000/svg"
								version="1.0"
								width="38"
								height="38"
								viewBox="0 0 892.000000 891.000000"
								preserveAspectRatio="xMidYMid meet"
							>
								<g
									transform="translate(0.000000,891.000000) scale(0.100000,-0.100000)"
									fill="#fff"
									stroke="none"
								>
									<path d="M4182 8899 c-1475 -89 -2806 -906 -3567 -2189 -95 -161 -235 -447 -304 -625 -383 -980 -410 -2059 -76 -3051 485 -1439 1676 -2536 3150 -2899 1150 -283 2360 -100 3369 509 626 378 1143 897 1519 1523 779 1299 842 2916 167 4271 -800 1604 -2470 2569 -4258 2461z m-630 -2957 c95 -32 168 -107 213 -217 l24 -60 -887 -5 c-931 -6 -914 -5 -1003 -51 -48 -24 -103 -89 -117 -138 -17 -54 -15 -168 3 -229 22 -73 70 -132 134 -164 l55 -28 398 0 c312 0 398 -3 398 -12 -1 -13 -82 -129 -235 -333 -44 -59 -190 -254 -324 -434 -428 -570 -463 -623 -477 -718 -15 -103 47 -209 148 -253 79 -34 301 -41 1043 -35 569 6 638 8 710 25 44 11 97 22 117 26 l38 6 -6 -33 c-31 -175 -83 -254 -195 -295 -65 -24 -743 -41 -1034 -25 -155 9 -231 9 -289 1 -183 -26 -330 -95 -481 -225 -48 -41 -191 -143 -251 -178 -8 -4 -15 40 -23 146 -6 84 -14 176 -17 205 l-6 52 -197 0 c-303 1 -387 21 -465 112 -75 87 -70 6 -74 1318 -2 760 1 1205 7 1259 21 171 105 263 262 290 31 5 584 8 1274 7 949 -1 1228 -4 1257 -14z m2684 -162 c24 -12 58 -38 74 -58 63 -76 61 -34 58 -1193 l-3 -1054 -30 -60 c-21 -42 -43 -69 -73 -90 -41 -28 -49 -30 -140 -30 -138 1 -195 33 -244 140 l-23 50 0 1065 0 1065 26 56 c29 62 78 107 136 126 54 18 165 9 219 -17z m-2476 -1220 l0 -680 -505 0 c-475 0 -505 1 -496 17 10 19 994 1341 999 1342 1 1 2 -305 2 -679z m1182 502 c37 -11 104 -36 147 -55 l80 -34 98 24 c54 13 131 25 172 26 l73 2 35 -40 c20 -22 51 -73 71 -113 34 -71 35 -78 45 -245 6 -112 6 -345 0 -667 -9 -467 -10 -498 -30 -540 -24 -54 -49 -77 -100 -96 -56 -20 -121 -16 -288 14 l-150 28 -90 -43 c-286 -137 -563 -80 -803 165 -161 165 -245 348 -272 592 -30 276 75 611 250 790 88 91 243 176 375 206 87 20 300 12 387 -14z m2666 -1 c326 -95 557 -362 618 -714 20 -112 14 -340 -11 -432 -94 -349 -322 -581 -661 -671 -104 -28 -294 -26 -399 4 -423 120 -675 524 -633 1013 35 416 268 714 633 810 100 26 348 21 453 -10z" />
									<path d="M4712 4585 c-62 -17 -131 -62 -166 -108 -134 -176 -121 -492 26 -634 56 -55 119 -76 227 -77 86 -1 102 2 153 27 101 50 159 141 179 282 29 209 -62 420 -211 493 -60 29 -142 35 -208 17z" />
									<path d="M7326 4568 c-69 -9 -132 -43 -175 -95 -69 -84 -104 -255 -83 -408 20 -149 77 -241 180 -292 50 -25 68 -28 152 -28 83 1 102 4 152 28 143 70 214 236 188 442 -33 269 -168 384 -414 353z" />
								</g>
							</svg>
						</TooltipAdvanced>
					</a>
				)}

				{viber_contact && (
					<a
						href={viber_contact}
						target="_blank"
						rel="noreferrer"
						className="mb-6"
					>
						<TooltipAdvanced title="Viber">
							<SiViber
								size={'38px'}
								className="cursor-pointer hover:bg-transparent hover:fill-[#8f5db7] rounded-full transition-all"
							/>
						</TooltipAdvanced>
					</a>
				)}

				{facebook_contact && (
					<a
						href={facebook_contact}
						target="_blank"
						rel="noreferrer"
						className="mb-6 max-h-[38px] hover:bg-[#ffffff] transition-all rounded-full"
					>
						<TooltipAdvanced title="Facebook Messenger">
							<SiFacebook
								size={'38px'}
								className="cursor-pointer hover:bg-transparent hover:fill-[#1877f2]"
							/>
						</TooltipAdvanced>
					</a>
				)}

				{sky_contact && (
					<a
						href={sky_contact}
						target="_blank"
						rel="noreferrer"
						className="hover:bg-[#ffffff] rounded-full transition-all max-h-[38px]"
					>
						<TooltipAdvanced title="Skyper">
							<SiSkype
								size={'38px'}
								className="cursor-pointer hover:bg-transparent hover:fill-[#00aff0]"
							/>
						</TooltipAdvanced>
					</a>
				)}

				{wechat_contact && (
					<a href={wechat_contact} target="_blank" rel="noreferrer">
						<TooltipAdvanced title="Wechat">
							<SiWechat
								size={'38px'}
								className="cursor-pointer hover:bg-transparent hover:fill-[#7bb32e] transition-all"
							/>
						</TooltipAdvanced>
					</a>
				)}

				{other_contact && (
					<a href={other_contact} target="_blank" rel="noreferrer">
						<TooltipAdvanced title="Other message">
							<RiContactsFill
								size={'34px'}
								className="transition-all cursor-pointer hover:bg-transparent hover:fill-primary"
							/>
						</TooltipAdvanced>
					</a>
				)}
			</div>
		</ModalBase>
	);
};

export default ModalToast;
