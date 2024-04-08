import { combineReducers, configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalReducer from './modalSlice';

const reducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  modals: modalReducer,
});

export default configureStore({
  reducer,
});
