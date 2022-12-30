import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Portal from './Portal';

function ModalBase({ visible, onClose, children, bodyClassName = '' }) {
	return (
		<>
			<CSSTransition in={visible} timeout={250} classNames="zoom" unmountOnExit>
				{(status) => (
					<Portal
						visible={status !== 'exited'}
						onClose={onClose}
						containerClassName="flex items-center justify-center fixed inset-0 z-[9999]"
						bodyStyle={{ transition: 'all 250ms' }}
						bodyClassName={`relative z-10 content ${bodyClassName}`}
					>
						{children}
					</Portal>
				)}
			</CSSTransition>
		</>
	);
}

export default ModalBase;
