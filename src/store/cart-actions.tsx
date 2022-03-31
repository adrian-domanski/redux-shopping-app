import { Dispatch } from 'react';
import { cartActions } from './cart-slice';

export const fetchData = () => {
  return async (dispatch: Dispatch<any>) => {
    (async () => {
      try {
        const res = await fetch(
          'https://redux-shopping-caa93-default-rtdb.firebaseio.com/cartItems.json'
        );

        const data = await res.json();
        console.log(data);
        dispatch(cartActions.replaceData(data));
      } catch (err) {
        console.error(err);
      }
    })();
  };
};
