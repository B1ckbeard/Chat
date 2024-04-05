import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  defaultChannelId: 1,
  currentChannelId: null,
  lastChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  username: '',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      state.lastChannelId = payload.id;// eslint-disable-line no-param-reassign
    },
    addChannels: channelsAdapter.addMany,
    deleteChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = state.defaultChannelId;// eslint-disable-line no-param-reassign
      }
      channelsAdapter.removeOne(state, payload);
    },
    updateChannel: channelsAdapter.updateOne,
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;// eslint-disable-line no-param-reassign
    },
    setDefaultChannelId: (state, { payload }) => {
      state.defaultChannelId = payload;// eslint-disable-line no-param-reassign
    },
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
