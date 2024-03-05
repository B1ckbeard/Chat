import { combineReducers, configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';

const reducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
});

export default configureStore({
  reducer,
});
