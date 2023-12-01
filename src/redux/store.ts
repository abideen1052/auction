import {configureStore} from '@reduxjs/toolkit';
import securePasswordReducer from '../redux/securePassword/securePasswordSlice';

export const store = configureStore({
  reducer: {
    securePassword: securePasswordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
