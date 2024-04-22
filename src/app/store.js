import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import navReducer from '../features/navigation/navSlice'
import authReducer from '../features/auth/authSlice'
import orderReducer from '../features/order/orderSlice'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    nav: navReducer,
    auth: authReducer,
    order: orderReducer
  },
});
