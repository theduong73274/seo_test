import { createSlice } from '@reduxjs/toolkit';

// const initialState = [];
const initialState = (process.browser ? localStorage.getItem('cartItems') : '')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart(state, { payload }) {
			const { id } = payload;
			const find = state.find((item) => item.id === id);

			if (find) {
				return payload.quantity
					? state.map((item) =>
							item.id === id
								? { ...item, quantity: item.quantity + payload.quantity }
								: item
					  )
					: state.map((item) =>
							item.id === id
								? {
										...item,
										quantity: item.quantity + 1,
								  }
								: item
					  );
			} else {
				payload.quantity
					? state.push({
							...payload,
							quantity: payload.quantity,
					  })
					: state.push({
							...payload,
							quantity: 1,
					  });
			}
		},
		increment(state, { payload }) {
			return state.map((item) =>
				item.id === payload
					? {
							...item,
							quantity: item.quantity + 1,
					  }
					: item
			);
		},
		decrement(state, { payload }) {
			return state.map((item) =>
				item.id === payload
					? {
							...item,
							quantity: item.quantity - 1,
					  }
					: item
			);
		},
		clear(state, { payload }) {
			return state.filter((item) => item.id !== payload);
		},
	},
});

export const { addToCart, increment, decrement, clear } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
