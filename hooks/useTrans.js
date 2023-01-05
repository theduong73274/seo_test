import { useRouter } from 'next/router';
import en from '../public/lang/en.js';
import vi from '../public/lang/vi.js';

const useTrans = () => {
	const { locale } = useRouter();
	console.log('🚀 ~ useTrans ~ locale', locale);

	const trans = locale === 'vi' ? vi : en;

	return trans;
};

export default useTrans;
