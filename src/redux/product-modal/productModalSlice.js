import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    slug: null,
};

export const productModalSlice = createSlice({
    name: 'productModal',
    initialState,
    reducers: {
        set: (state, action) => {
            state.slug = action.payload;
        },
        remove: (state) => {
            state.slug = null;
        },
    },
});

export const { set, remove } = productModalSlice.actions;

export default productModalSlice.reducer;
