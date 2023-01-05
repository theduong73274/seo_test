/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
	// target: 'serverless',
	reactStrictMode: true,
	swcMinify: true,
	i18n,
	// i18n: {
	// 	locales: ['en', 'vi'],
	// 	defaultLocale: 'en',
	// },
};

module.exports = nextConfig;
