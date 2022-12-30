import React from 'react';
import PropTypes from 'prop-types';
import { handleChangeLg } from '../../utils/checkLg';
import Link from 'next/link';

const Banner = ({ children, title = '', detail = '', language }) => {
	return (
		<>
			<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.7)]"></div>

			<div className="page-container">
				<div className="absolute top-2/4 -translate-y-2/4 fl:px-10 mb:pl-5 ">
					<span className="text-primary font-dancing text-[80px] fl:text-7xl fl:mb-2 font-bold mat:text-6xl mb:text-5xl">
						{children}
					</span>

					<nav className="flex mb:hidden" aria-label="Breadcrumb">
						<ol className="inline-flex items-center space-x-1 md:space-x-3">
							<li className="inline-flex items-center">
								<Link
									href="/"
									className="inline-flex items-center hover:text-primary hover:underline hover:underline-offset-4 font-pro text-xl fl:text-lg font-medium text-[#fff] mb:text-base"
								>
									{language === 'Cn'
										? '家'
										: language === 'Vn'
										? 'Trang chủ'
										: 'Home'}
								</Link>
							</li>

							{detail && (
								<li>
									<div className="flex items-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="11.121"
											height="18"
											viewBox="0 0 11.121 19.243"
											className="mb:min-w-[12px] mb:h-[14px]"
										>
											<path
												id="chevron-left"
												d="M9,21l7.5-7.5L9,6"
												transform="translate(-6.879 -3.879)"
												fill="none"
												stroke="#fff"
												strokeLinejoin="round"
												strokeWidth="3"
											/>
										</svg>

										<Link
											href={detail.id ? `/blog?ca=${detail.id}` : `/menu`}
											className="ml-3 inline-flex items-center hover:text-primary hover:underline hover:underline-offset-4 font-pro text-xl fl:text-lg font-medium text-[#fff] mb:text-base"
										>
											{detail.id
												? handleChangeLg(language, detail, 'title')
												: detail.category}
										</Link>
									</div>
								</li>
							)}
							<li>
								<div className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="11.121"
										height="18"
										viewBox="0 0 11.121 19.243"
										className="mb:min-w-[12px] mb:h-[14px]"
									>
										<path
											id="chevron-left"
											d="M9,21l7.5-7.5L9,6"
											transform="translate(-6.879 -3.879)"
											fill="none"
											stroke="#fff"
											strokeLinejoin="round"
											strokeWidth="3"
										/>
									</svg>

									<span className="ml-3 font-medium font-pro text-xl text-[#fff] mb:text-base fl:text-lg line-clamp-1 max-w-[250px]">
										{title}
									</span>
								</div>
							</li>
						</ol>
					</nav>
				</div>

				<nav
					className="absolute hidden mt-3 mr-2 overflow-x-auto top-full mb:flex"
					aria-label="Breadcrumb"
				>
					<ol className="inline-flex items-center space-x-1 md:space-x-3">
						<li className="inline-flex items-center">
							<Link
								href="/"
								className="inline-flex items-center hover:text-primary hover:underline hover:underline-offset-4 font-pro text-xl fl:text-lg font-medium text-[#fff] mb:text-base"
							>
								{language === 'Cn' ? '家' : language === 'Vn' ? 'Home' : 'Home'}
							</Link>
						</li>

						{detail && (
							<li>
								<div className="flex items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="11.121"
										height="18"
										viewBox="0 0 11.121 19.243"
										className="mb:min-w-[12px] mb:h-[14px]"
									>
										<path
											id="chevron-left"
											d="M9,21l7.5-7.5L9,6"
											transform="translate(-6.879 -3.879)"
											fill="none"
											stroke="#fff"
											strokeLinejoin="round"
											strokeWidth="3"
										/>
									</svg>

									<Link
										href={`/blog?ca=${detail.id}`}
										className="ml-3 w-max inline-flex items-center hover:text-primary hover:underline hover:underline-offset-4 font-pro text-xl fl:text-lg font-medium text-[#fff] mb:text-base"
									>
										{handleChangeLg(language, detail, 'title')}
									</Link>
								</div>
							</li>
						)}
						<li>
							<div className="flex items-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="11.121"
									height="18"
									viewBox="0 0 11.121 19.243"
									className="mb:min-w-[12px] mb:h-[14px]"
								>
									<path
										id="chevron-left"
										d="M9,21l7.5-7.5L9,6"
										transform="translate(-6.879 -3.879)"
										fill="none"
										stroke="#fff"
										strokeLinejoin="round"
										strokeWidth="3"
									/>
								</svg>

								<span className="ml-3 font-medium font-pro text-xl text-[#fff] mb:text-base fl:text-lg flex-shrink-0 flex-nowrap">
									{title}
								</span>
							</div>
						</li>
					</ol>
				</nav>
			</div>
		</>
	);
};

Banner.propTypes = {
	children: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	language: PropTypes.string.isRequired,
	detail: PropTypes.object,
};

export default Banner;
