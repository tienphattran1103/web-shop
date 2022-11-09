import { createSlice } from '@reduxjs/toolkit';

const items = JSON.parse(localStorage.getItem('cart-item')) || [];

const initialState = {
    value: items,
};

export const cartItemSlice = createSlice({
    name: 'cartItems',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;

            const duplicate = findItem(state.value, newItem);

            if (duplicate.length > 0) {
                state.value = delItem(state.value, newItem);

                state.value = [
                    ...state.value,
                    {
                        ...newItem,
                        id: duplicate[0].id,
                        quantity: newItem.quantity + duplicate[0].quantity,
                    },
                ];
            } else {
                state.value = [
                    ...state.value,
                    {
                        ...newItem,
                        id: state.value.length > 0 ? state.value[state.value.length - 1].id + 1 : 1,
                    },
                ];
            }

            localStorage.setItem('cart-item', JSON.stringify(sortITem(state.value)));
            console.log('redux addItem');
        },
        updateItem: (state, action) => {
            const item = action.payload;

            const cartItem = findItem(state.value, item);

            if (cartItem.length > 0) {
                state.value = delItem(state.value, item);
                state.value = [
                    ...state.value,
                    {
                        ...item,
                        id: cartItem[0].id,
                    },
                ];
            }

            localStorage.setItem('cart-item', JSON.stringify(sortITem(state.value)));
            console.log('redux updateITem');
        },

        removeItem: (state, action) => {
            const item = action.payload;

            state.value = delItem(state.value, item);

            localStorage.setItem('cart-item', JSON.stringify(sortITem(state.value)));
            console.log('delete updateITem');
        },
    },
});

const findItem = (stateValue, newItem) =>
    stateValue.filter((e) => e.slug === newItem.slug && e.color === newItem.color && e.size === newItem.size);

const delItem = (stateValue, newItem) =>
    stateValue.filter((e) => e.slug !== newItem.slug || e.color !== newItem.color || e.size !== newItem.size);

// sort cart items from small id to large id
const sortITem = (arr) => arr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

export const { addItem, updateItem, removeItem } = cartItemSlice.actions;

export default cartItemSlice.reducer;
