import React, { useState } from 'react';
import ReactPlayer from 'react-player/lazy';

const DishVideo = ({ dataLink }) => {
	const [play, setPlay] = useState(false);
	const handleOverVideo = () => {
		setPlay(!play);
	};

	return (
		<>
			<div className="h-[640px] mat:h-[400px] mb:h-[300px]">
				<ReactPlayer
					url={dataLink.about_link_video_youtube}
					width="100%"
					height="100%"
					playing={play}
					controls={true}
				></ReactPlayer>
			</div>

			{!play && (
				<>
					<div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.65)] to-[rgba(0,0,0,0.7)] rounded-lg"></div>
					<div className="page-container">
						<div className="absolute bottom-0 translate-y-full z-[10] mat:-z-[1] mat:translate-y-2/4">
							<img src="../public/image/about-4.png" alt="" />
						</div>

						<div className="absolute inset-0 about-video">
							<div className="flex items-center justify-center w-full h-full">
								<span
									onClick={handleOverVideo}
									className="flex items-center justify-center w-20 h-20 rounded-full mb:w-14 mb:h-14 about-play bg-primary"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="#fff"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-10 h-10 mb:w-5 mb:h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
										/>
									</svg>
								</span>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default DishVideo;
