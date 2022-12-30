import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/button/Button';

import about3 from '../../assets/image/about-3.png';
import detail2 from '../../assets/image/details-2.png';

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-[60vh] flex items-center justify-center mat:min-h-[50vh]">
			<div className="relative text-center page-container font-pro">
				<h2 className="mb-11 text-7xl font-dancing mat:text-5xl mat:mb-9 mb:text-4xl">
					404 - Looks like you're lost
				</h2>
				<p className="text-secondary">
					Maybe this page used to exist or you just spelled something wrong.
				</p>
				<p className="mt-[2px] text-secondary">
					Chances are you spelled something wrong, so can you double check the
					URL?
				</p>
				<Button onClick={() => navigate('/')} className="block mx-auto mt-16">
					Return Home
				</Button>

				<div className="absolute max-w-[40%] w-full left-full top-0 -translate-y-2/4 mat:left-[70%] mat:-translate-y-3/4 -z-[1] mb:-translate-y-full">
					<img src={about3} alt="" className="object-cover w-full h-full" />
				</div>

				<div className="absolute max-w-[40%] w-full right-full bottom-0 translate-y-2/4 mat:right-[70%] mat:translate-y-3/4 -z-[1]">
					<img src={detail2} alt="" className="object-cover w-full h-full" />
				</div>
			</div>
		</div>
	);
};

export default NotFound;
