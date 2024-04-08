import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../../../store/modalSlice';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModal';
import DeleteChannelModal from './DeleteChannelModal';

const ModalWindow = () => {
  const dispatch = useDispatch();
  const modalType = useSelector((state) => state.modals.modalType);
  const channel = useSelector((state) => state.modals.channel);
  const showModal = useSelector((state) => state.modals.isOpened);

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  switch (modalType) {
    case 'add': {
      return <AddChannelModal show={showModal} onHide={handleCloseModal} />;
    }
    case 'remove': {
      return (
        <DeleteChannelModal
          show={showModal}
          onHide={handleCloseModal}
          id={channel.id}
        />
      );
    }
    case 'rename': {
      return (
        <RenameChannelModal
          show={showModal}
          onHide={handleCloseModal}
          channel={channel}
        />
      );
    }
    default: {
      return null;
    }
  }
};

export default ModalWindow;
