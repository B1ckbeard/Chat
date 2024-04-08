import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
  lastChannel: {},
});

export const defaultChannelId = 1;

const channelsSlice = createSlice({
  name: 'channels',
  username: '',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      state.lastChannel = payload;// eslint-disable-line no-param-reassign
    },
    addChannels: channelsAdapter.addMany,
    deleteChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = defaultChannelId;// eslint-disable-line no-param-reassign
      }
      channelsAdapter.removeOne(state, payload);
    },
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;// eslint-disable-line no-param-reassign
    },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
