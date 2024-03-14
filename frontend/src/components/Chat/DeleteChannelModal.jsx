import React from "react";
import { Modal, Button } from "react-bootstrap";
import ioClient from "./../../servicesSocket/socket";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const DeleteChannelModal = ({ show, onHide, id }) => {
    const { t } = useTranslation();
    const handleChannelRemove = () => {
        ioClient.emit('removeChannel', { id });
        toast.success(t('toast.channelDeleted'));
        onHide();
    }
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
