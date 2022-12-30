const checkLanguage = (language, contentData) => {
	let contentPage;
	switch (language) {
		case 'Cn':
			contentPage = contentData.Cn;
			break;
		case 'Vn':
			contentPage = contentData.Vn;
			break;

		default:
			contentPage = contentData.En;
			break;
	}

	return contentPage;
};

export function handleCheckLgAll(language) {
	return language === 'Cn' ? '全部' : language === 'Vn' ? 'Tất cả' : 'All';
}

export function handleChangeLg(language, data, getItem) {
	return language === 'Cn'
		? data[getItem + '_cn']
		: language === 'Vn'
		? data[getItem + '_vi']
		: data[getItem];
}

export default checkLanguage;
