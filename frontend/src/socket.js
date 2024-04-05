import { io } from 'socket.io-client';
import store from './store/store';
import { actions as channelActions } from './store/channelsSlice';
import { addMessage } from './store/messagesSlice';

const initSocket = () => {
  const ioClient = io();

  ioClient.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  const sendMessage = (data) => {
    ioClient.emit('newMessage', data);
  };

  ioClient.on('newChannel', (payload) => {
    store.dispatch(channelActions.setCurrentChannelId(payload.id));
    store.dispatch(channelActions.addChannel(payload));
  });
  const createChannel = (channel) => {
    ioClient.emit('newChannel', channel);
  };

  ioClient.on('removeChannel', (payload) => {
    store.dispatch(channelActions.deleteChannel(payload.id));
  });
  const deleteChannel = (channel) => {
    ioClient.emit('removeChannel', channel);
  };

  ioClient.on('renameChannel', (payload) => {
    store.dispatch(channelActions.updateChannel({
      id: payload.id, changes: { name: payload.name },
    }));
  });
  const renameChannel = (channel) => {
    ioClient.emit('renameChannel', channel);
  };
  return (
    {
      sendMessage, createChannel, deleteChannel, renameChannel,
    }
  );
};

export default initSocket;
