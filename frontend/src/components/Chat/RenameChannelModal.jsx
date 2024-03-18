import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ioClient from '../../servicesSocket/socket';
import { selectors as channelSelectors } from '../../store/channelsSlice'

const RenameChannelModal = ({ show, onHide, channel }) => {
  const channels = useSelector(channelSelectors.selectAll);
  const { t } = useTranslation();

  const [inputRef, setInputRef] = useState();

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  if (!channel) {
    return null;
  }

  const validationSchema = Yup.object().shape({
    channelName: Yup
      .string()
      .required(t('errors.required'))
      .min(3, t('errors.min3'))
      .max(20, t('errors.max'))
      .notOneOf(channels.map((currentChannel) => (currentChannel.name)), t('errors.uniq')),
  });

  return (
    <Modal show={show}>
      <Formik
        initialValues={{
          channelName: channel.name,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          try {
            ioClient.emit('renameChannel', { id: channel.id, name: values.channelName });
            toast.success(t('toast.channelRenamed'));
            resetForm();
            onHide();
          } catch (e) {
            console.error(e);
          }
        }}
      >
        {({ errors, values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton onHide={onHide}>
              <Modal.Title>{t('renameChannel')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Floating className="mb-3">
                <Form.Control
                  ref={(el) => {
                    if (!el) {
                      return;
                    }
                    setInputRef(el);
                  }}
                  type="text"
                  placeholder={t('channelName')}
                  name="channelName"
                  id="channel"
                  autoComplete="channelName"
                  value={values.channelName}
                  onChange={handleChange}
                  isInvalid={errors.channelName}
                />
                <label htmlFor="channel">{t('channelName')}</label>
                <Form.Control.Feedback type="invalid">
                  {errors.channelName}
                </Form.Control.Feedback>
              </Form.Floating>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                {t('cancel')}
              </Button>
              <Button variant="primary" type="submit">
                {t('rename')}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RenameChannelModal;
