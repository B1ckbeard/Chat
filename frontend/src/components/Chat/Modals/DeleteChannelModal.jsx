import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { SocketContext } from '../../../context/socketContext';

const DeleteChannelModal = ({ show, onHide, id }) => {
  const { deleteChannel } = useContext(SocketContext);
  const { t } = useTranslation();
  const handleChannelRemove = () => {
    deleteChannel({ id });
    toast.success(t('toast.channelDeleted'));
    onHide();
  };
  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <p className="lead">{t('areYouSure')}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('cancel')}
        </Button>
        <Button variant="primary" type="button" className="btn btn-danger" onClick={handleChannelRemove}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteChannelModal;
