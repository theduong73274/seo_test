import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

// eslint-disable-next-line react/display-name
const DetailCartBtn = React.memo(({ data, textLg }) => {
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);

	const handleAddCart = () => {
		const newCart = {
			...data,
			quantity: count,
		};
		dispatch(addToCart(newCart));
	};

	const handleDecrement = () => {
		if (count <= 1) {
			setCount(1);
		} else {
			setCount(count - 1);
		}
	};

	const handleIncrement = () => {
		if (count > 10) {
			setCount(10);
		} else {
			setCount(count + 1);
		}
	};

	return (
		<div className="py-7 border-t-[1.2px] border-b-[1.2px] mt-8 fl:mt-7 border-[#7A7A82] select-none border-spacing-24 border-dashed flex items-center gap-x-5">
			<div className="flex items-center gap-x-6 border-[1.2px] border-[#7A7A82] p-2">
				<span className="cursor-pointer" onClick={handleDecrement}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="10"
						height="3"
						viewBox="0 0 8 1"
					>
						<line
							id="Line_5"
							data-name="Line 5"
							x2="8"
							transform="translate(0 0.5)"
							fill="none"
							stroke="#eee8e3"
							strokeWidth="1"
						></line>
					</svg>
				</span>
				<span className="text-lg font-lora min-w-[20px] text-center">
					{count}
				</span>
				<span className="cursor-pointer" onClick={handleIncrement}>
					<svg
						xmlns="http:www.w3.org/2000/svg"
						width="10"
						height="10"
						viewBox="0 0 8 8"
					>
						<g
							id="Group_162"
							data-name="Group 162"
							transform="translate(14012 -3271)"
						>
							<line
								id="Line_6"
								data-name="Line 6"
								x2="8"
								transform="translate(-14012 3275)"
								fill="none"
								stroke="#eee8e3"
								strokeWidth="1"
							></line>
							<line
								id="Line_7"
								data-name="Line 7"
								y2="8"
								transform="translate(-14008 3271)"
								fill="none"
								stroke="#eee8e3"
								strokeWidth="1"
							></line>
						</g>
					</svg>
				</span>
			</div>

			<button className="btn-button" onClick={handleAddCart}>
				{textLg}
			</button>
		</div>
	);
});

export default DetailCartBtn;
