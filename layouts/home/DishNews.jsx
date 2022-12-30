import moment from 'moment';
import { Router } from 'next/router';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../pages/api/config';
import { changePath200, changePathWebp } from '../../utils';
import { handleChangeLg } from '../../utils/checkLg';

const DishNews = ({ language, sub }) => {
	// const navigate = useNavigate();
	const { data } = useSWR(tmdbAPI.getBlogList('category-news', 0), fetcher);
	if (!data) return null;
	const listBlog = data?.news?.data || [];

	const blogMain = listBlog.slice(0, 2);
	const blogSub = listBlog.slice(2, 5);

	return (
		<div className="grid grid-cols-3 mt-16 fl:mt-12 gap-7 mat:mt-14 mb:mt-9 mat:grid-cols-2 mb:grid-cols-1 mat:gap-y-9">
			{blogMain.length > 0 &&
				blogMain.map((item) => (
					<div
						className="relative cursor-pointer shadow-intro group"
						key={item.id}
						onClick={() => Router.push(`/blog/${item.id}`)}
					>
						<div className="h-[500px] fl:h-[420px] mat:h-[404px]">
							<img
								src={changePathWebp(
									tmdbAPI.imageProduct(item.feature_image_path)
								)}
								alt={handleChangeLg(language, item, 'title')}
								className="object-cover object-center w-full h-full "
							/>
						</div>
						<div className="absolute inset-0 bg-back-img group-hover:bg-none"></div>
						<span className="absolute inline-block px-[14px] py-2 font-bold font-pro text-xs tracking-widest text-black uppercase top-7 bg-primary">
							{moment(item.created_at).format('DD  MMM  YYYY')}
						</span>
						<div className="absolute bottom-8 left-7 right-7">
							<h3 className="text-2xl leading-tight font-lora fl:text-1xl mb:text-xl line-clamp-2">
								{handleChangeLg(language, item, 'title')}
							</h3>
							<p className="mt-4 text-sm uppercase fl:mt-3 text-primary">
								{`${handleChangeLg(language, item.category, 'title')} ${sub}`}
							</p>
						</div>
					</div>
				))}

			<div className="grid grid-cols-1 gap-y-10 fl:gap-y-7 mat:col-span-2 mb:col-span-1">
				{blogSub.length > 0 &&
					blogSub.map((item) => (
						<div
							className="flex items-start cursor-pointer space-x-7 fl:space-x-4"
							key={item.id}
							onClick={() => navigate(`/blog/${item.id}`)}
						>
							<div className="h-[120px] w-[150px] min-w-[150px]">
								<img
									src={changePath200(
										tmdbAPI.imageProduct(item.feature_image_path)
									)}
									alt="Ảnh Blog"
									className="object-cover object-center w-full h-full"
								/>
							</div>

							<div className="w-full">
								<h3 className="text-1xl font-lora fl:text-lg mb:text-base line-clamp-2 hover:underline">
									{handleChangeLg(language, item, 'title')}
								</h3>
								<p className="mt-4 text-sm uppercase text-primary">
									{`${handleChangeLg(language, item.category, 'title')} ${sub}`}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default DishNews;
