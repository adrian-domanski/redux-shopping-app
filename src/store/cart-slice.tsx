import { createSlice } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { uiActions } from './ui-slice';

export interface IProductItem {
  id: number;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
}

interface IInitialState {
  itemsList: IProductItem[];
  totalQuantity: number;
  totalPrice: number;
  showCart: boolean;
  changed: boolean;
}

const initialState: IInitialState = {
  itemsList: [],
  totalQuantity: 0,
  totalPrice: 0,
  showCart: false,
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.itemsList = action.payload.itemsList;
      state.totalPrice = action.payload.totalPrice;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      // to check if item is already available
      const existingItem = state.itemsList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        state.totalQuantity++;
      }
      state.totalPrice += newItem.price;
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;

      const existingItem: IProductItem | undefined = state.itemsList.find(
        (item: IProductItem) => item.id === id
      );
      if (existingItem?.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id);
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
      } else if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
        state.totalPrice -= existingItem.price;
      }
    },
    toggleShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const sendCartData = (cart: IInitialState) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // Set state when sending...
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'warning',
          message: 'Sending data...',
        })
      );

      await fetch(
        'https://redux-shopping-caa93-default-rtdb.firebaseio.com/cartItems.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      // const data = await res.json();
      // Set state as success
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'success',
          message: 'Successfully updated database!',
        })
      );
    } catch (err) {
      // Set state as error
      dispatch(
        uiActions.showNotification({
          open: true,
          type: 'error',
          message: 'An unexpected error occuerd!',
        })
      );
      console.error(err);
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
