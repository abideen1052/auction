import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {baseUrl, inventoryEndPoint} from '../../constants/Api';

interface InventoryState {
  inventoryResult: any;
}

const initialState: InventoryState = {
  inventoryResult: null,
};

export const handleReduxInventoryList = createAsyncThunk(
  'handleReduxInventoryList',
  async ({id, authToken}: {id: any; authToken: any}) => {
    try {
      const response = await fetch(`${baseUrl}${inventoryEndPoint}${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Thrown error', error);
      throw error;
    }
  },
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(handleReduxInventoryList.pending, () => {
        console.log('loading');
      })
      .addCase(handleReduxInventoryList.fulfilled, (state, action) => {
        state.inventoryResult = action.payload;
      })
      .addCase(handleReduxInventoryList.rejected, () => {
        console.log('rejected');
      });
  },
});

export default inventorySlice.reducer;
