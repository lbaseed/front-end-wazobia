import { configureStore } from '@reduxjs/toolkit'
import  userAuthReducer from '../features/auth/auth.js';
import  itemsReducer from '../features/items/itemsSlice';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    items : itemsReducer
  },
})