import React, { useState } from 'react';
import { CountProvider, useCount } from '../../contexts/count-context';

const CounterProduct = ({
	value = 0,
	initialValue = 0,
	onChange,
	className,
}) => {
	const [count, setCount] = useState(initialValue);
	const isControlled = value !== null && !!onChange;

	const getCount = () => (isControlled ? value : count);

	const handleCountChange = (newValue) => {
		isControlled ? onChange(newValue) : setCount(newValue);
	};

	const handleDecrement = () => {
		handleCountChange(getCount() - 1);
	};

	const handleIncrement = () => {
		handleCountChange(getCount() + 1);
	};
	return (
		<CountProvider
			value={{ handleDecrement, handleIncrement, count: getCount() }}
		>
			<div
				className={`flex items-center gap-x-6 ${className ? className : ''}`}
			>
				<Decrement></Decrement>
				<Count></Count>
				<Increment></Increment>
			</div>
		</CountProvider>
	);
};

function Decrement() {
	const { handleDecrement } = useCount();
	return (
		<span
			className="cursor-pointer flex items-center min-h-[28px]"
			onClick={handleDecrement}
		>
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
				/>
			</svg>
		</span>
	);
}

function Count() {
	const { count } = useCount();
	return (
		<span className="text-lg font-lora min-w-[20px] text-center block">
			{count}
		</span>
	);
}

function Increment() {
	const { handleIncrement } = useCount();
	return (
		<span
			className="cursor-pointer flex items-center min-h-[28px]"
			onClick={handleIncrement}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
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
					/>
					<line
						id="Line_7"
						data-name="Line 7"
						y2="8"
						transform="translate(-14008 3271)"
						fill="none"
						stroke="#eee8e3"
						strokeWidth="1"
					/>
				</g>
			</svg>
		</span>
	);
}

export default CounterProduct;
