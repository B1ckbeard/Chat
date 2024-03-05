import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  defaultChannelId: null,
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  username: '',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      state.currentChannelId = payload.id;
    },
    addChannels: channelsAdapter.addMany,
    deleteChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setDefaultChannelId: (state, { payload }) => {
      state.defaultChannelId = payload;
    },
  },
});

export const {
  addChannel,
  addChannels,
  deleteChannel,
  updateChannel,
  setCurrentChannelId,
  setDefaultChannelId,
} = channelsSlice.actions;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
