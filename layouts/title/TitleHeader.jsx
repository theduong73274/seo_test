import React from 'react';
import birdRight from '../../public/image/bird-right.png';
import birdLeft from '../../public/image/bird-left.png';

const TitleHeader = ({ children, className }) => {
	return (
		<div className="flex items-center justify-center space-x-6 ">
			<img
				src={birdLeft.src}
				alt="bird.jpg"
				title="icon"
				className="mb:max-w-[40px] w-full max-w-min"
			/>
			<h3 className="font-dancing text-[68px] fl:text-6xl mat:text-[48px] mb:text-[36px] mb:text-center">
				{children}
			</h3>
			<img
				src={birdRight.src}
				alt="bird.jpg"
				title="icon"
				className="mb:max-w-[40px] w-full max-w-min"
			/>
		</div>
	);
};

export default TitleHeader;
