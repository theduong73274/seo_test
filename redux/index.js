import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import uiReducer from './uiSlice';

const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		ui: uiReducer,
	},
});

export default store;
