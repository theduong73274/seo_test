const checkLanguage = (language, contentData) => {
	let contentPage;
	switch (language) {
		case 'cn':
			contentPage = contentData.cn;
			break;
		case 'vn':
			contentPage = contentData.vn;
			break;

		default:
			contentPage = contentData.en;
			break;
	}

	return contentPage;
};

export function handleCheckLgAll(language) {
	return language === 'cn' ? '全部' : language === 'vn' ? 'Tất cả' : 'All';
}

export function handleChangeLg(language, data, getItem) {
	return language === 'cn'
		? data[getItem + '_cn']
		: language === 'vn'
		? data[getItem + '_vi']
		: data[getItem];
}

export default checkLanguage;
