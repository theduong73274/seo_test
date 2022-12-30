import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from '../modal/Portal';

const TooltipAdvanced = ({ title, children }) => {
	const [visible, setVisible] = useState(false);
	const [coords, setCoords] = useState({
		top: 0,
		left: 0,
		height: 0,
		width: 0,
	});

	const handleMouseEnter = (e) => {
		setVisible(true);
		setCoords(e.target.getBoundingClientRect());
	};

	const handleMouseLeave = (e) => {
		setVisible(false);
	};

	return (
		<div className="relative inline-block">
			<CSSTransition in={visible} timeout={300} classNames="fade" unmountOnExit>
				{(status) => (
					<Portal overlay={false} visible={status !== 'exited'}>
						<p
							className="absolute transition-all -translate-x-2/4 tooltip z-[9999] inline-block max-w-[200px] px-3 py-2 text-white bg-black rounded-xl -translate-y-full"
							style={{
								top: coords.top - 10 + window.scrollY,
								left: coords.left + coords.width / 2,
							}}
						>
							{title}
						</p>
					</Portal>
				)}
			</CSSTransition>

			<div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				{children}
			</div>
		</div>
	);
};

export default TooltipAdvanced;
