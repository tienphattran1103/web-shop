// import { configureStore } from "@reduxjs/toolkit/dist/configureStore";
import { configureStore } from '@reduxjs/toolkit';
import productModalSlice from './product-modal/productModalSlice';
import cartItemsSlice from './cart-items/cartItemsSlice';
const store = configureStore({
    reducer: {
        productModal: productModalSlice,
        cartsItem: cartItemsSlice,
    },
});

export default store;
