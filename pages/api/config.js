import axios from 'axios';

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
const tmdbEndpoint = 'https://admin.bosong.restaurant';
// const tmdbEndpoint = 'https://adminbosong.aecongnghe.com';

export const tmdbAPI = {
	getCategory: (type) => `${tmdbEndpoint}/api/public/${type}`,
	getBlogList: (type, category, page = 1) =>
		`${tmdbEndpoint}/api/public/${type}/${category}?page=${page}&limit=6`,
	getDishList: (categoryId, page = 1) =>
		`${tmdbEndpoint}/api/public/product?category_ids=${categoryId}&page=${page}`,
	getDishDetail: (dishId) => `${tmdbEndpoint}/api/public/product/${dishId}?`,
	getDishSearch: (query, page = 1, categoryId) =>
		`${tmdbEndpoint}/api/public/product?category_ids=${categoryId}&search_query=${query}&page=${page}`,
	getNewsDetail: (blogId) => `${tmdbEndpoint}/api/public/news/${blogId}?`,
	getBlogSearch: (query, page = 1, blogId) =>
		`${tmdbEndpoint}/api/public/category-news/${blogId}?title=${query}&page=${page}`,
	imageProduct: (url) => `${tmdbEndpoint}${url}`,
};

export const axiosPost = (value, toast) => {
	return axios
		.post(`${tmdbEndpoint}/api/public/ticket`, value)
		.then((response) => toast)

		.catch((error) => {
			this.setState({ errorMessage: error.message });
			console.error('There was an error!', error);
		});
};
