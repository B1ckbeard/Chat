import React, {
  useState, useContext, useEffect, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import ioClient from '../../socket';
import { UserContext } from '../../context/context';
import { selectors as channelSelectors, actions as channelActions } from '../../store/channelsSlice';
import { selectors as messagesSelectors, addMessage, addMessages } from '../../store/messagesSlice';
import Channel from './Channel';
import Message from './Message';
import MessageForm from './MessageForm';
import AddChannelModal from './AddChannelModal';
import DeleteChannelModal from './DeleteChannelModal';
import RenameChannelModal from './RenameChannelModal';

const Chat = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const channels = useSelector(channelSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);

  const { currentChannelId } = useSelector((state) => state.channels);

  const currentChannel = useSelector((state) => (
    channelSelectors.selectById(state, currentChannelId)));

  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [removeableChannel, setRemoveableChannel] = useState();
  const [renameableChannel, setRenameableChannel] = useState();
  const [lastAddedChannel, setLastAddedChannel] = useState({});

  const toggleShowAddModal = () => setShowAddModal(!showAddModal);
  const handleChannelSelect = (id) => dispatch(channelActions.setCurrentChannelId(id));
  const handleChannelRemove = (id) => setRemoveableChannel(id);
  const handleChannelRename = (channel) => setRenameableChannel(channel);

  const messagesBoxRef = useRef(null);
  const channelsListRef = useRef(null);

  const scrollToBottom = (refEl) => refEl.current?.lastElementChild?.scrollIntoView();
  const scrollToTop = (refEl) => refEl.current?.firstElementChild?.scrollIntoView();

  useEffect(() => {
    if (context.username === lastAddedChannel.username) {
      scrollToBottom(channelsListRef);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAddedChannel]);

  useEffect(() => {
    scrollToBottom(messagesBoxRef);
  }, [currentMessages]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${context.token}` } });
        dispatch(channelActions.addChannels(data.channels));
        dispatch(channelActions.setCurrentChannelId(data.currentChannelId));
        dispatch(channelActions.setDefaultChannelId(data.channels[0].id));
        dispatch(addMessages(data.messages));
      } catch (e) {
        if (e.response.status === 401) {
          context.setContext({ ...context, token: null, username: null });
          window.localStorage.clear();
          navigate('/login');
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  ioClient.on('newChannel', (payload) => {
    if (context.username === payload.username) {
      dispatch(channelActions.setCurrentChannelId(payload.id));
    }
    dispatch(channelActions.addChannel(payload));
    setLastAddedChannel(payload);
  });

  ioClient.on('removeChannel', (payload) => {
    if (currentChannelId === payload.id) {
      scrollToTop(channelsListRef);
    }
    dispatch(channelActions.deleteChannel(payload.id));
  });

  ioClient.on('renameChannel', (payload) => {
    dispatch(channelActions.updateChannel({ id: payload.id, changes: { name: payload.name } }));
  });

  ioClient.on('newMessage', (message) => {
    dispatch(addMessage(message));
  });

  return (
    <div className="container h-100 w-100 mb-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column d-flex h-100">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels')}</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={toggleShowAddModal}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto d-block h-100" ref={channelsListRef}>
            {channels.map((channel) => (
              <Channel
                key={channel.id}
                channel={channel}
                currentChannelId={currentChannelId}
                onChannelSelect={handleChannelSelect}
                onChannelRemove={handleChannelRemove}
                onChannelRename={handleChannelRename}
              />
            ))}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <strong>
                  {'# '}
                  {currentChannel ? currentChannel.name : ''}
                </strong>
              </p>
              <span className="text-muted">
                {t('messages.amount', { count: currentMessages.length })}
              </span>
            </div>
            <div className="overflow-auto px-5" ref={messagesBoxRef}>
              {currentMessages.map((message) => <Message key={message.id} message={message} />)}
            </div>
            <div className="mt-auto px-5 py-3">
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
      <AddChannelModal show={showAddModal} onHide={toggleShowAddModal} />
      <DeleteChannelModal
        show={Boolean(removeableChannel)}
        onHide={() => setRemoveableChannel(null)}
        id={removeableChannel}
      />
      <RenameChannelModal
        show={Boolean(renameableChannel)}
        onHide={() => setRenameableChannel(null)}
        channel={renameableChannel}
      />
    </div>
  );
};

export default Chat;
