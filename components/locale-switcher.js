import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LocaleSwitcher() {
	const router = useRouter();

	const { locales, locale: activeLocale } = router;

	const otherLocales = locales?.filter(
		(locale) => locale !== activeLocale && locale !== 'default'
	);

	return (
		<span className="cursor-pointer text-muted">
			{otherLocales?.map((locale) => {
				const { pathname, query, asPath } = router;
				return (
					<span key={'locale-' + locale}>
						<Link href={{ pathname, query }} as={asPath}>
							<span>
								{locale === 'en'
									? 'English'
									: locale === 'vn'
									? 'VietNam'
									: locale === 'cn'
									? 'China'
									: null}
							</span>
						</Link>
					</span>
				);
			})}
		</span>
	);
}
