import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseUrl, loginEndPoint} from '../../constants/Api';

interface LoginState {
  isLoading: boolean;
  result: any;
}

const initialState: LoginState = {
  isLoading: false,
  result: null,
};

export const handleReduxLogin = createAsyncThunk(
  'handleReduxLogin',
  async (values: any) => {
    try {
      const response = await fetch(`${baseUrl}${loginEndPoint}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: values,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Thrown error', error);
      throw error;
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(handleReduxLogin.pending, state => {
        state.isLoading = true;
      })
      .addCase(handleReduxLogin.fulfilled, (state, action) => {
        state.result = action.payload;
      })
      .addCase(handleReduxLogin.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const {setIsLoading} = loginSlice.actions;
export default loginSlice.reducer;
