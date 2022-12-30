import React from 'react';
import Portal from './Portal';

function OffcanvasBase({ onClose, children, bodyClassName = '' }) {
	return (
		<>
			<Portal
				onClose={onClose}
				containerClassName="fixed inset-0 z-[9999] mt-[53px]"
				bodyStyle={{ transition: 'all 250ms' }}
				bodyClassName={`relative z-10 content ${bodyClassName}`}
			>
				{children}
			</Portal>
		</>
	);
}

export default OffcanvasBase;
