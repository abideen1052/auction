import {createSlice} from '@reduxjs/toolkit';

interface ModalState {
  errorToastModal: boolean;
}

const initialState: ModalState = {
  errorToastModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setErrorToastModalVisible: (state, action) => {
      state.errorToastModal = action.payload;
    },
  },
});

export const {setErrorToastModalVisible} = modalSlice.actions;

export default modalSlice.reducer;
