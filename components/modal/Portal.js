import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

// function createPortalWrapper() {
// 	const element = document.createElement('div');
// 	element.id = 'portal-wrapper';

// 	return element;
// }
// const portalWrapperElm = createPortalWrapper();

const Portal = ({
	containerClassName = '',
	bodyClassName = '',
	onClose = () => {},
	overlay = true,
	containerStyle = {},
	bodyStyle = {},
	children,
}) => {
	useEffect(() => {
		const element = document.createElement('div');
		element.id = 'portal-wrapper';

		// return element;
		document.body.appendChild(element);
	}, []);

	const renderContent = (
		<div className={containerClassName} style={containerStyle}>
			{overlay && (
				<div
					className="absolute inset-0 bg-black overlay bg-opacity-70"
					onClick={onClose}
				></div>
			)}

			<div className={bodyClassName} style={bodyStyle}>
				{children}
			</div>
		</div>
	);

	return createPortal(renderContent, portalWrapperElm);
};

Portal.propTypes = {
	containerClassName: PropTypes.string,
	bodyClassName: PropTypes.string,
	onClose: PropTypes.func,
	visible: PropTypes.bool,
	containerStyle: PropTypes.object,
	bodyStyle: PropTypes.object,
	children: PropTypes.node,
	overlay: PropTypes.bool,
};

export default Portal;
