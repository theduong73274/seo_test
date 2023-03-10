import { Inter } from '@next/font/google';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import useSWR from 'swr';
import Dishes, { DishSkeleton } from '../../components/product/Dishes';
import content from '../../data/lgMenu';
import useDebounce from '../../hooks/useDebounce';
import Banner from '../../layouts/banner/Banner';
import checkLanguage from '../../utils/checkLg';
import { fetcher, tmdbAPI } from '../api/config';
const inter = Inter({ subsets: ['latin'] });

export default function MenuPage({ language }) {
	const { v4: uuidv4 } = require('uuid');
	const contentPage = checkLanguage(language, content);
	const { banner, search, empty } = contentPage;
	const [categoryState, setCategoryState] = useState([]);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState('');
	const [url, setUrl] = useState(tmdbAPI.getDishList(categoryState, nextPage));
	const filterDebounce = useDebounce(filter, 500);

	const { data, error } = useSWR(url, fetcher);
	console.log('🚀 ~ MenuPage ~ data', data);
	const loading = !data && !error;

	const handlerOnChange = (e) => {
		setFilter(e.target.value);
	};

	const handlePageClick = (event) => {
		const newOffset = (event.selected * data.per_page) % data.total;
		setItemOffset(newOffset);
		setNextPage(event.selected + 1);

		// setNextPage(event.selected + 1);
		// setUrl(
		// 	tmdbAPI.getDishSearch(filterDebounce, event.selected + 1, categoryState)
		// );
	};

	const dishes = data?.data || [];

	useEffect(() => {
		if (!data || !data.total) return;
		setPageCount(Math.ceil(data.total / data.per_page));
	}, [data, itemOffset]);

	// useEffect(() => {
	// 	if (!data || !data.total) return;
	// 	setPageCount(Math.ceil(data.total / data.per_page));
	//   }, [data, filterDebounce, categoryState]);

	useEffect(() => {
		if (filterDebounce && filterDebounce !== '') {
			setUrl(tmdbAPI.getDishSearch(filterDebounce, 1, categoryState));
		} else if (filterDebounce && filterDebounce === '') {
			setUrl(tmdbAPI.getDishSearch(filterDebounce, 1, categoryState));
		} else {
			setUrl(tmdbAPI.getDishList(categoryState, nextPage));
		}
	}, [filterDebounce, nextPage, categoryState]);

	return (
		<>
			<Head>
				<title>Bờ Sông - Menu</title>
				<meta name="description" content="Menu Bờ sông quán" />
				<link rel="canonical" href="/menu" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section className="banner relative min-h-[450px] fl:min-h-[250px] mb:min-h-[200px] mb:mb-14">
				<Banner title={banner.nav} language={language}>
					{banner.title}
				</Banner>
			</section>

			<section className="page-container mb-[80px] mb:mb-20 about-reserve after:top-[70%]">
				<div className="flex mb-8 -mt-10 overflow-hidden rounded-lg shadow-item max-w-[90%] mx-auto mb:mt-0 mb:max-w-full">
					<div className="flex-1">
						<input
							type="text"
							className="w-full py-5 px-6 text-white outline-none text-lg bg-[#29292c] mb:py-4 mb:px-4 mb:pr-2"
							placeholder={search}
							onChange={handlerOnChange}
						/>
					</div>

					<button className="p-4 pr-6 text-white bg-[#29292c] mb:py-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				</div>

				<MenuCheck
					categoryArr={setCategoryState}
					language={language}
				></MenuCheck>

				{loading && (
					<div className="grid grid-cols-2 mt-14 mb:grid-cols-1">
						<DishSkeleton></DishSkeleton>
						{new Array(8).fill(0).map(() => (
							<DishSkeleton key={uuidv4()}></DishSkeleton>
						))}
					</div>
				)}

				<div className="grid grid-cols-2 gap-y-9 mt-14 mb:grid-cols-1 mb:mt-10">
					{!loading &&
						(dishes.length > 0 ? (
							dishes.map((item, index) => (
								<Dishes key={item.id} data={item} language={language}></Dishes>
							))
						) : (
							<div className="col-span-2 text-4xl font-normal text-center font-lora">
								{empty}
							</div>
						))}
				</div>

				<div className="mt-28 mb:mt-12">
					<ReactPaginate
						breakLabel="..."
						nextLabel="Next"
						onPageChange={handlePageClick}
						pageRangeDisplayed={5}
						pageCount={pageCount}
						previousLabel="Prev"
						renderOnZeroPageCount={null}
						className="pagination"
					/>
				</div>
			</section>
		</>
	);
}

const MenuCheck = ({ categoryArr: setCategoryState, language }) => {
	const [valueCheck, setValueCheck] = useState([]);
	const { data } = useSWR(tmdbAPI.getCategory('category'), fetcher);
	const listCategory = data?.data || [];

	const onHandleChange = (e) => {
		let updatedList = [...valueCheck];
		if (e.target.checked) {
			updatedList = [...valueCheck, Number.parseInt(e.target.value)];
		} else {
			updatedList.splice(
				valueCheck.indexOf(Number.parseInt(e.target.value)),
				1
			);
		}

		setValueCheck(updatedList);
		setCategoryState(JSON.stringify(updatedList) || []);
	};

	return (
		<div className="flex items-center space-x-6 font-lora max-w-[90%] mx-auto mb:max-w-full mb:flex-wrap mb:space-x-0 mb:justify-between">
			{listCategory.length > 0 &&
				listCategory.map((item) => (
					<label
						key={item.id}
						htmlFor={item.id}
						className={`capitalize shadow-intro py-2 px-7 rounded-3xl select-none cursor-pointer mb-5 ${
							valueCheck.includes(item.id)
								? 'bg-primary text-black'
								: 'bg-[#414141] text-white'
						}`}
					>
						<input
							type="checkbox"
							id={item.id}
							value={item.id}
							className="hidden"
							onChange={onHandleChange}
						/>
						{language === 'Cn'
							? item.name_cn
							: language === 'Vn'
							? item.name_vi
							: item.name}
					</label>
				))}
		</div>
	);
};
