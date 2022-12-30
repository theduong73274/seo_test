import { createSlice } from '@reduxjs/toolkit';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../pages/api/config';

const initialState = { loading: false, list: [] };

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		startFetch(state) {
			state.loading = true;
		},
		save(state, action) {
			const { payload } = action;
			state.loading = false;
			state.list = payload;
		},
	},
});

export const { startFetch, save } = productsSlice.actions;

export const fetchProducts = () => async (dispatch) => {
	dispatch(save([]));
	dispatch(startFetch());

	const { data } = useSWR(tmdbAPI.getCategory('settings'), fetcher);
	console.log('🚀 ~ fetchProducts ~ data', data);
	dispatch(save(data));
};

const productsReducer = productsSlice.reducer;

export default productsReducer;
