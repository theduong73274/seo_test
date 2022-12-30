import { useEffect, useRef, useState } from 'react';

export default function useHover() {
	const nodeRef = useRef(null);
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		const handleMouseOver = () => {
			setHovered(true);
		};

		const handleMouseOut = () => {
			setHovered(false);
		};

		const dom = nodeRef.current;
		if (dom) {
			dom.addEventListener('mouseover', handleMouseOver);
			dom.addEventListener('mouseout', handleMouseOut);
		}

		return () => {
			dom.removeEventListener('mouseover', handleMouseOver);
			dom.removeEventListener('mouseout', handleMouseOut);
		};
	}, []);

	return {
		nodeRef,
		hovered,
	};
}
