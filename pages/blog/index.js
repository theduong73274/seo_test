import Head from 'next/head';
import useSWR from 'swr';
import Banner from '../layouts/banner/Banner';
import { fetcher, tmdbAPI } from './api/config';

import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import LoadingSkeleton from '../../components/loading/LoadingSkeleton';
import useDebounce from '../../hooks/useDebounce';
import { changePathWebp } from '../../utils';
import checkLanguage, { handleChangeLg } from '../utils/checkLg';

export default function AboutPage({ language }) {
	const contentPage = checkLanguage(language, blog);
	const { banner, list, search, notSearch } = contentPage;
	const router = useRouter();

	let [searchParams, setSearchParams] = useSearchParams();
	const categoryBlog = searchParams.get('ca') || 0;

	const [categoryState, setCategoryState] = useState(categoryBlog);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	const [nextPage, setNextPage] = useState(1);
	const [filter, setFilter] = useState('');
	const [url, setUrl] = useState(
		tmdbAPI.getBlogList('category-news', categoryState, nextPage)
	);
	// console.log(tmdbAPI.getBlogList('category-news', categoryState, nextPage));
	const filterDebounce = useDebounce(filter, 500);

	// if (!tabCategory.some((item) => item.id === categoryBlog)) {
	// 	setSearchParams(`ca=${tabCategory[0].id}`);
	// 	setToggleState(tabCategory[0].id);
	// }

	const { data, error } = useSWR(url, fetcher);
	const isLoading = !data && !error;

	const handlerOnChange = (e) => {
		setFilter(e.target.value);
	};

	const handlePageClick = (event) => {
		const newOffset = (event.selected * data.per_page) % data.total;
		setItemOffset(newOffset);
		setNextPage(event.selected + 1);
	};

	const blogList = data?.news?.data || [];

	useEffect(() => {
		if (!data || !data.news.total) return;
		setPageCount(Math.ceil(data.news.total / data.news.per_page));
	}, [data, itemOffset]);

	useEffect(() => {
		if (filterDebounce && filterDebounce !== '') {
			setUrl(tmdbAPI.getBlogSearch(filterDebounce, 1, categoryState));
		} else if (filterDebounce && filterDebounce === '') {
			setUrl(tmdbAPI.getBlogSearch(filterDebounce, 1, categoryState));
		} else {
			setUrl(tmdbAPI.getBlogList('category-news', categoryState, nextPage));
		}
	}, [filterDebounce, nextPage, categoryState]);

	return (
		<>
			<Head>
				<title>Bờ Sông Restaurant - Blog</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<section className="banner relative min-h-[450px] fl:min-h-[250px] mb-[90px] mat:mb-16 fl:mb-24">
				<Banner title={banner.nav} language={language}>
					{banner.title}
				</Banner>
			</section>

			<section className="mb-[120px] about-special before:bg-[url('../public/image/about-6.png')] after:bottom-2/4 after:bg-[url('../public/image/about-8.png')]">
				<div className="page-container news-icon after:bottom-2/4">
					<div className="w-full">
						<div className="flex items-center justify-between mat:flex-col">
							<h2 className="font-dancing text-[68px] fl:text-6xl mat:text-center mb:text-[54px]">
								{list.title}
							</h2>
							<div className="font-lora mt-6 min-w-[350px] relative mat:col-span-2 mat:max-w-[60%] mat:mx-auto mat:row-span-1 mb:min-w-full">
								<input
									type="text"
									className="px-4 py-3 w-full bg-transparent border border-[#94949E] text-base font-pro"
									placeholder={search.text}
									onChange={handlerOnChange}
								/>
								<span className="absolute right-4 top-2/4 -translate-y-2/4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="19"
										height="19"
										viewBox="0 0 15.002 15"
									>
										<g
											id="Group_2701"
											data-name="Group 2701"
											transform="translate(-1534.999 -746)"
										>
											<g id="search" transform="translate(1534.999 745.965)">
												<path
													id="Path_797"
													data-name="Path 797"
													d="M6.038,12.1a6.023,6.023,0,0,0,3.7-1.271l3.991,3.991a.75.75,0,0,0,1.061-1.061L10.8,9.772A6.035,6.035,0,1,0,6.038,12.1ZM2.831,2.864a4.535,4.535,0,1,1,0,6.414h0a4.519,4.519,0,0,1-.023-6.39l.023-.023Z"
													transform="translate(0)"
													fill="#7a7a82"
												/>
											</g>
										</g>
									</svg>
								</span>
							</div>
						</div>

						<CategoryTab
							language={language}
							toggleState={Number.parseInt(categoryState)}
							handleSetToggle={setCategoryState}
							handleSearchParams={setSearchParams}
						></CategoryTab>

						<div className="grid grid-cols-3 mt-14 gap-x-10 gap-y-12 mat:grid-cols-2 mb:grid-cols-1 mat:gap-y-16">
							{isLoading && (
								<>
									<BlogSkeleton></BlogSkeleton>
									<BlogSkeleton></BlogSkeleton>
									<BlogSkeleton></BlogSkeleton>
								</>
							)}

							{!isLoading && blogList.length > 0 ? (
								blogList.map((item) => (
									<div className="relative" key={item.id}>
										<div className="h-[500px] fl:h-[420px] mat:h-[404px]">
											<img
												src={changePathWebp(
													tmdbAPI.imageProduct(item.feature_image_path)
												)}
												alt={item.title}
												className="object-cover object-center w-full h-full "
											/>
										</div>
										<span className="absolute inline-block px-[14px] py-2 font-bold font-pro text-xs tracking-widest text-black uppercase top-7 bg-primary">
											{/* 18 FEB 2022 */}
											{moment(item.created_at).format('DD  MMM  YYYY')}
										</span>
										<div className="mt-5">
											<p className="text-sm uppercase font-pro fl:mt-3 text-primary">
												{`${handleChangeLg(language, item.category, 'title')} ${
													list.sub
												}`}
											</p>
											<h3 className="mt-3 text-2xl leading-snug font-lora fl:text-1xl mb:text-xl line-clamp-2 min-h-[60px]">
												{handleChangeLg(language, item, 'title')}
											</h3>
											<p className="line-clamp-3 text-[#94949E] mt-3 font-pro">
												{handleChangeLg(
													language,
													item,
													'short_description_attribute'
												)}
											</p>
										</div>
										<Button
											className="block mt-6 min-h-[48px]"
											onClick={() => router.push(`/blog/${item.slug}`)}
										>
											{list.btn}
										</Button>
									</div>
								))
							) : (
								<div className="col-span-5 mt-6 text-2xl font-medium text-center font-lora">
									{notSearch}
								</div>
							)}
						</div>
					</div>
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

const CategoryTab = ({
	language,
	handleSetToggle,
	handleSearchParams,
	toggleState,
}) => {
	const { data } = useSWR(tmdbAPI.getCategory('category-news'), fetcher);

	if (!data) return null;
	const tabCategory = data?.data || [];

	const toggleTab = (index) => {
		handleSetToggle(index);
		index === 0 ? handleSearchParams('') : handleSearchParams(`ca=${index}`);
	};

	return (
		<div className="flex items-center justify-center mt-6 text-lg fl:mt-6 font-pro header gap-x-14 mat:space-x-10 mat:gap-x-0 mat:pb-3 mat:mt-8 mb:overflow-x-auto mb:mx-1 mb:justify-start">
			<button
				className={`pb-[2px] transition-all border-b-[1.4px] uppercase flex-shrink-0 mb:text-base ${
					toggleState === 0
						? 'border-primary text-primary'
						: 'border-transparent'
				}`}
				onClick={() => toggleTab(0)}
			>
				{handleCheckLgAll(language)}
			</button>

			{tabCategory.length > 0 &&
				tabCategory.map((item, index) => (
					<button
						key={item.id}
						className={`pb-[2px] transition-all border-b-[1.4px] uppercase flex-shrink-0 mb:text-base ${
							toggleState === item.id
								? 'border-primary text-primary'
								: 'border-transparent'
						}`}
						onClick={() => toggleTab(item.id)}
					>
						{handleChangeLg(language, item, 'title')}
					</button>
				))}
		</div>
	);
};

const BlogSkeleton = () => {
	return (
		<div className="relative">
			<LoadingSkeleton className="h-[500px] fl:h-[420px] mat:h-[404px]" />
			<LoadingSkeleton className="absolute inline-block px-[14px] py-2  text-black uppercase top-7 bg-primary h-[32px] max-w-[120px]" />

			<div className="mt-5">
				<LoadingSkeleton className="min-h-[20px] max-w-[200px]" />
				<LoadingSkeleton className="w-full min-h-[66px] mt-3" />
			</div>
			<LoadingSkeleton className="max-w-[200px] min-h-[48px] mt-6" />
		</div>
	);
};