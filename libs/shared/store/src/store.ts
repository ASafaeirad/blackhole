import { authSlice } from '@blackhole/auth';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: authSlice.reducer,
});
