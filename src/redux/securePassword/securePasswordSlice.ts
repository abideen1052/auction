import {createSlice} from '@reduxjs/toolkit';

interface SecurePasswordState {
  isSecure: boolean;
}

const initialState: SecurePasswordState = {
  isSecure: true,
};

const SecurePasswordSlice = createSlice({
  name: 'secure',
  initialState,
  reducers: {
    setIsSecure: (state, action) => {
      state.isSecure = action.payload;
    },
  },
});

export const {setIsSecure} = SecurePasswordSlice.actions;

export default SecurePasswordSlice.reducer;
