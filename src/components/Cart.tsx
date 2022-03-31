import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Cart.css';
import { RootState } from '../store/index';
import { cartActions } from 'src/store/cart-slice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const quantity = cartQuantity;

  const toggleShowCart = () => {
    dispatch(cartActions.toggleShowCart());
  };

  return (
    <div className='cartIcon' onClick={toggleShowCart}>
      <h3>Cart: {quantity} Items</h3>
    </div>
  );
};

export default Cart;
