import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../pages/api/config';
import DishesList from '../../components/product/DishesList';
import { handleChangeLg, handleCheckLgAll } from '../../utils/checkLg';

const DishMenu = ({ type = 'category', language }) => {
	const [toggleState, setToggleState] = useState([]);
	const { data } = useSWR(tmdbAPI.getCategory(type), fetcher);
	if (!data) return null;
	const tabCategory = data?.data || [];

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<>
			<div className="flex items-center justify-center mt-4 fl:mt-6 font-pro header gap-x-14 mat:space-x-10 mat:gap-x-0 mat:pb-3 mat:mt-8 mb:overflow-x-auto mb:mx-1 mb:justify-start">
				<button
					className={`pb-[2px] transition-all border-b-[1.4px] uppercase flex-shrink-0 ${
						toggleState.length <= 0
							? 'border-primary text-primary'
							: 'border-transparent'
					}`}
					onClick={() => toggleTab([])}
				>
					{handleCheckLgAll(language)}
				</button>

				{tabCategory.length > 0 &&
					tabCategory.map((item) => (
						<button
							key={item.id}
							className={`pb-[2px] transition-all border-b-[1.4px] uppercase flex-shrink-0 ${
								toggleState === item.id
									? 'border-primary text-primary'
									: 'border-transparent'
							}`}
							onClick={() => toggleTab(item.id)}
						>
							{handleChangeLg(language, item, 'name')}
						</button>
					))}
			</div>

			<div className="transition-all content-tabs">
				{toggleState && (
					<DishesList
						value={toggleState.length <= 0 ? [] : [toggleState]}
						language={language}
					/>
				)}
			</div>
		</>
	);
};

export default DishMenu;
