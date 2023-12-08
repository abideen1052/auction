import {configureStore} from '@reduxjs/toolkit';
import securePasswordReducer from './securePassword/SecurePasswordSlice';
import loginReducer from './login/LoginSlice';

export const store = configureStore({
  reducer: {
    securePassword: securePasswordReducer,
    login: loginReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
