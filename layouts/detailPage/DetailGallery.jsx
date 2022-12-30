import React from 'react';

import demo from '../../assets/image/details-3.png';

const DetailGallery = () => {
	return (
		<div className="grid grid-cols-3 gap-8 transition-all mat:grid-cols-2">
			<div className="max-h-[415px]">
				<img
					src={demo}
					alt=""
					className="object-cover object-center w-full h-full"
				/>
			</div>

			<div className="max-h-[415px]">
				<img
					src={demo}
					alt=""
					className="object-cover object-center w-full h-full"
				/>
			</div>

			<div className="max-h-[415px]">
				<img
					src={demo}
					alt=""
					className="object-cover object-center w-full h-full"
				/>
			</div>

			<div className="max-h-[415px]">
				<img
					src={demo}
					alt=""
					className="object-cover object-center w-full h-full"
				/>
			</div>

			<div className="max-h-[415px]">
				<img
					src={demo}
					alt=""
					className="object-cover object-center w-full h-full"
				/>
			</div>

			<div className="max-h-[415px]">
				<img
					src={demo}
					alt=""
					className="object-cover object-center w-full h-full"
				/>
			</div>
		</div>
	);
};

export default DetailGallery;
