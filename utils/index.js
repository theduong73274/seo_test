export function changePath100(pathLink) {
	return pathLink.replace('original', '100x100');
}

export function changePath200(pathLink) {
	return pathLink.replace('original', '200x200');
}

export function changePathWebp(pathLink) {
	return (
		pathLink.split('original/')[0] +
		'original/webp/' +
		pathLink.split('original/')[1]
	)
		.replace('.png', '.webp')
		.replace('.jpg', '.webp');
}
