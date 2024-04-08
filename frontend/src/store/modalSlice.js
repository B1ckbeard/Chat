import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const modalAdapter = createEntityAdapter();
const initialState = modalAdapter.getInitialState({
  isOpened: false,
  modalType: null,
  channel: null,
});

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.isOpened = true;// eslint-disable-line no-param-reassign
      state.modalType = payload.modalType;// eslint-disable-line no-param-reassign
      state.channel = payload.channel;// eslint-disable-line no-param-reassign
    },
    closeModal: (state) => {
      state.isOpened = false;// eslint-disable-line no-param-reassign
    },
  },
});

export const selectors = modalAdapter.getSelectors((state) => state.modal);
export const { actions } = modalSlice;
export default modalSlice.reducer;
