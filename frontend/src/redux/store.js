import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartslice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
