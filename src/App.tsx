import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';
import { RootState } from './store';
import Notification from './components/Notification';
import { sendCartData } from './store/cart-slice';
import { fetchData } from './store/cart-actions';

let isFirstRender = true;

function App() {
  const cart = useSelector((state: RootState) => state.cart);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const notification = useSelector((state: RootState) => state.ui.notification);

  useEffect(() => {
    if (!cart.changed) return;
    dispatch(fetchData());
  }, [dispatch, cart.changed]);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <div className='App'>
      {notification?.open && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {isLoggedIn ? <Layout /> : <Auth />}
    </div>
  );
}

export default App;
