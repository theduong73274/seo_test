import React, { useState } from 'react';
import useClickOutSide from '../../hooks/useClickOutSide';
import { AiFillCaretDown } from 'react-icons/ai';

const DropdownHook = ({ changeValue, data, isCheck = false, language }) => {
	const checkDataLg = data.find((item) => item.value === language);
	const { show, setShow, nodeRef } = useClickOutSide();
	const [label, setLabel] = useState({
		img: checkDataLg.img.src,
		text: checkDataLg.text,
	});

	const handleClick = (e) => {
		setShow(false);
		changeValue(e.target.parentNode.dataset.value || e.target.dataset.value);
		setLabel({
			img:
				e.target.parentNode.firstChild.currentSrc ||
				e.target.firstChild.currentSrc,
			text: e.target.parentNode.dataset.text || e.target.dataset.text,
		});
	};

	return (
		<div className="relative select-none" ref={nodeRef}>
			<div
				className={`flex items-center justify-between px-2 bg-[#1b1b1d] rounded-lg cursor-pointer ${
					isCheck ? '' : 'min-w-[138px]'
				}`}
				onClick={() => setShow(!show)}
			>
				<img
					src={label.img}
					alt="flag"
					className="max-h-[38px] object-cover object-center"
				/>
				{!isCheck && <span className="pl-1">{label.text}</span>}
				<AiFillCaretDown className="ml-2 cursor-pointer" size={'16px'} />
			</div>

			<div
				className={`absolute top-full mt-1 z-10 left-0 ${
					isCheck ? 'w-3/4' : 'w-full'
				} rounded-lg bg-[#1b1b1d] ${show ? '' : 'opacity-0 invisible'} `}
			>
				{data.map((item) => (
					<div
						key={item.id}
						className={`flex items-center cursor-pointer relative ${
							isCheck ? 'justify-center w-full' : 'justify-start'
						}`}
						onClick={handleClick}
						data-value={item.value}
						data-text={item.text}
					>
						<img
							src={item.img.src}
							alt="flag"
							className={`max-h-[38px] ${!isCheck ? 'pl-2 py-1' : ''}`}
						/>
						{!isCheck && <span className="w-full pl-2">{item.text}</span>}
					</div>
				))}
			</div>
		</div>
	);
};

export default DropdownHook;
