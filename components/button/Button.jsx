import React from 'react';

const Button = ({
	children,
	onClick,
	className = '',
	full = false,
	type = 'button',
	bgColor = 'primary',
	...props
}) => {
	// let bgClassName = 'bg-primary';
	// switch (bgColor) {
	// 	case 'primary':
	// 		bgClassName = 'bg-primary';
	// 		break;
	// 	case 'secondary':
	// 		bgClassName = 'bg-secondary';
	// 		break;

	// 	default:
	// 		break;
	// }

	return (
		<button
			type={type}
			onClick={onClick}
			className={`btn-button ${className || ''}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
