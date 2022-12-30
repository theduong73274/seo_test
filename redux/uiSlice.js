const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
	cartDrawerVisible: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		toggle(state) {
			state.cartDrawerVisible = !state.cartDrawerVisible;
		},
		toggleHide(state) {
			state.cartDrawerVisible = false;
		},
		toggleShow(state) {
			state.cartDrawerVisible = true;
		},
	},
});

const uiReducer = uiSlice.reducer;

export const { toggle, toggleHide, toggleShow } = uiSlice.actions;

export default uiReducer;
