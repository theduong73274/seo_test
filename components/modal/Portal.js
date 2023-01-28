import React, { createElement, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

function createPortalWrapper() {
	const element = process.browser ? document.createElement('div') : null;
	element ? (element.id = 'portal-wrapper') : '';

	return element;
}
const portalWrapperElm = createPortalWrapper();

// function createPortalWrapper() {
// 	const element = React.createElement('div');
// 	const newElement = React.cloneElement(element, { id: 'portal-wrapper' });

// 	return newElement;
// }
// const portalWrapperElm = process.browser
// 	? document.getElementById('portal-wrapper')
// 	: null;

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
		// const element = document.createElement('div');
		// element.id = 'portal-wrapper';

		// return element;
		document.body.appendChild(portalWrapperElm);
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
