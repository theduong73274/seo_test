const path = require('path');

module.exports = {
	i18n: {
		locales: ['en', 'vn', 'cn'],
		defaultLocale: 'en',
		localePath: path.resolve('./public/locales'),
	},
};
