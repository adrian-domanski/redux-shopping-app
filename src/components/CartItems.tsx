import React from 'react';
import CartItem from './CartItem';
import './Cart.css';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

const CartItems = () => {
  const cartItems = useSelector((state: RootState) => state.cart.itemsList);

  return (
    <div className='cart-container'>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <CartItem
              id={item.id}
              quantity={item.quantity}
              total={item.totalPrice}
              price={item.price}
              name={item.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartItems;
