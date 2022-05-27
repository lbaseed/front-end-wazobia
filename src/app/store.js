import { configureStore } from '@reduxjs/toolkit'
import  userAuthSlice from '../features/auth/auth.js';

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
  },
})