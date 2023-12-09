import {configureStore} from '@reduxjs/toolkit';
import securePasswordReducer from './securePassword/SecurePasswordSlice';
import loginReducer from './login/LoginSlice';
import inventoryReducer from './inventory/InventorySlice';

export const store = configureStore({
  reducer: {
    securePassword: securePasswordReducer,
    login: loginReducer,
    inventory: inventoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
