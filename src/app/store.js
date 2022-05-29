import { configureStore } from '@reduxjs/toolkit'
import  userAuthSlice from '../features/auth/auth.js';
import  itemsSlice from '../features/items/itemsSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
    items : itemsSlice
  },
})