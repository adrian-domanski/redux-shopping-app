import React from 'react';
import Header from './Header';
import Products from './Products';
import './Layout.css';
import CartItems from './CartItems';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
const Layout = () => {
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const isCartVisible = useSelector((state: RootState) => state.cart.showCart);

  return (
    <React.Fragment>
      <div className='layout'>
        <Header />
        <Products />
        {isCartVisible && <CartItems />}
        <div className='total-price'>
          <h3>Total: ${totalPrice}</h3>
          <button className='orderBtn'>Place Order</button>
        </div>{' '}
      </div>
    </React.Fragment>
  );
};

export default Layout;
